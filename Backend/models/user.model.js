const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  responses: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: { type: String, required: true },
    },
  ],
  careerRecommendations: {
    type: Object, // Stores AI-generated recommendations
    default: {},
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Check if model already exists before defining
const User = mongoose.model("Users", UserSchema);

module.exports = User;