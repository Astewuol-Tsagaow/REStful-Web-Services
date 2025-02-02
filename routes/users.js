const express = require('express');
const router = express.Router();
const CostModel = require('../module/costModel.js');
const UsersModel = require('../module/usersModel.js');



router.get('/:id', async (req, res) => {
  try {
      const userId = Number(req.params.id);

      if (isNaN(userId)) {
          return res.status(400).json({ message: "Invalid ID format" });
      }

      const getUser = await UsersModel.findOne({ id: userId });

      if (!getUser) {
          return res.status(404).json({ message: "User Not Found In DB" });
      }

      const userCosts = await CostModel.aggregate([
          {
              $match: { userid: userId }
          },
          {
              $group: {
                  _id: "$userid",
                  total: { $sum: "$sum" }
              }
          },
          {
              $project: {
                  _id: 0,
                  id: "$_id",
                  total: 1
              }
          }
      ]);

      const totalCost = userCosts.length > 0 ? userCosts[0].total : 0;

      return res.status(200).json({
          first_name: getUser.first_name,
          last_name: getUser.last_name,
          id: getUser.id,
          total: totalCost
      });

  } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Server Error" });
  }
});









module.exports = router;