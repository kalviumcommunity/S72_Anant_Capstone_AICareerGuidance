const express = require("express");
const router = express.Router();
const UserResponse = require("../models/userResponse.model");
const User=require('../models/user.model')

// POST user responses
router.post("/", async (req, res) => {
  try {
    const { userId, responses } = req.body;

    const newResponse = new UserResponse({
      userId,
      responses,
    });

    await newResponse.save();
    res.json({ message: "Responses saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving responses" });
  }
});


module.exports = router;
