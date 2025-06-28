const express = require('express');
const router = express.Router();
const { run: runAI } = require('../controller/ai');

router.post('/recommend', async (req, res) => {
  try {
    const userAnswers = req.body.answers;
    const apiKey = process.env.API_KEY; // Retrieve API key from environment variables
    const aiResponse = await runAI(userAnswers); // The API key is now accessed within ai.js
    res.json(aiResponse);
  } catch (error) {
    res.status(500).json({ error: error.message || 'AI processing failed' });
  }
});

module.exports = router;