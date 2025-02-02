const express = require("express");
const router = express.Router();
const teamMembers = [
    { first_name: "עומר", last_name: "צעדי" },
    { first_name: "אסטוול", last_name: "צגאו" },
    { first_name: "שמואל", last_name: "אומרי" }
  ];




router.get('/', async (req , res)=>{
 try{
   
      
      return res.status(200).json(teamMembers);
 }
 catch (err) {
    console.log("Fail to get names of developers", err);  
    return res.status(500).json({ message: "Failed to retrieve team members" }); 
  }
});


module.exports = router;