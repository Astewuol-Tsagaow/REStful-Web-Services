const express = require("express");
const router = express.Router();
const CostModel = require("../module/costModel.js");

router.get("/", async (req, res) => {
    try {
        const costsFromDb = await CostModel.find({});
        if (costsFromDb.length === 0) {
            return res.status(404).json({ message: "No costs found in the database" });
        }
        return res.status(200).json(costsFromDb);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/add", async (req, res) => {
    try {
        const { descriptions, category, sum, userid } = req.body;

        if (!descriptions || !category || !sum || !userid) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const costData = {
            descriptions: descriptions.trim(),
            category: category.trim(),
            sum: Number(sum),
            userid: Number(userid)
        };

        if (isNaN(costData.sum) || costData.sum <= 0) {
            return res.status(400).json({ error: "Sum must be a positive number" });
        }

        const addSomeCostToDb = await CostModel.create(costData);

        return res.status(201).json({
            message: "New cost item was added successfully",
            cost: addSomeCostToDb
        });

    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error - failed to add cost item" });
    }
});

router.get("/report", async (req, res) => {
    try {
        const getId = Number(req.query.id);
        const getYear = Number(req.query.year);
        const getMonth = Number(req.query.month);

        if (isNaN(getId) || isNaN(getYear) || isNaN(getMonth)) {
            return res.status(400).json({ error: "Missing or invalid query parameters" });
        }

        const reportFromDb = await CostModel.aggregate([
            {
                $match: {
                    userid: getId,
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$createdAt" }, getYear] },
                            { $eq: [{ $month: "$createdAt" }, getMonth] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        userid: "$userid",
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        category: "$category"
                    },
                    expenses: {
                        $push: {
                            sum: "$sum",
                            description: "$descriptions",
                            day: { $dayOfMonth: "$createdAt" }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        userid: "$_id.userid",
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    costs: {
                        $push: {
                            k: "$_id.category",
                            v: "$expenses"
                        }
                    }
                }
            },
            {
                $addFields: {
                    costs: {
                        $arrayToObject: {
                            $setUnion: [
                                "$costs",
                                [
                                    { k: "food", v: [] },
                                    { k: "education", v: [] },
                                    { k: "health", v: [] },
                                    { k: "housing", v: [] }
                                ]
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    userid: "$_id.userid",
                    year: "$_id.year",
                    month: "$_id.month",
                    costs: 1
                }
            }
        ]);

        if (!reportFromDb.length) {
            return res.status(404).json({ message: "There is no report for this user." });
        }

        return res.status(200).json(reportFromDb[0]); // ✅ מחזיר אובייקט יחיד במקום מערך
    } catch (err) {
        console.error("Error generating report:", err);
        return res.status(500).json({ error: "Internal Server Error - failed to generate report" });
    }
});


module.exports = router;
