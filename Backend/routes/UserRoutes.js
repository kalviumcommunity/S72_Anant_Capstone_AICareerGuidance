const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const runAI = require("../../AI/ai");

const router = express.Router();
console.log("UserRoutes Loaded");

// Submit responses and get AI recommendations
router.post("/submit-response", async (req, res) => {
  console.log("📩 Request received at /submit-response");
  console.log("📝 Body:", req.body); // Debug incoming body

  const { userId, responses } = req.body;

  if (!userId || !responses || !Array.isArray(responses)) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert questionId to ObjectId
    const formattedResponses = responses.map((r) => ({
      questionId: new mongoose.Types.ObjectId(r.questionId),
      answer: r.answer,
    }));

    console.log("📦 Formatted responses:", formattedResponses);

    // Save responses
    user.responses.push(...formattedResponses);

    // Run AI model (pass responses if needed)
    const aiRecommendations = await runAI(formattedResponses); // <-- update if your AI uses input

    // Store recommendations in database
    user.careerRecommendations = aiRecommendations;
    await user.save();

    // Respond to frontend
    res.status(200).json({
      message: "Responses submitted",
      recommendations: aiRecommendations,
    });
  } catch (error) {
    console.error("❌ Error in /submit-response:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
