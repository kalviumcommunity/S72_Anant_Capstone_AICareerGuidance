const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/user.model');
const auth = require('../middleware/auth'); // Import the auth middleware
const { run: runAI } = require('../controller/ai');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

// Route to upload profile picture
router.post('/upload-profile-pic', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const userId = req.user.userId; // Get user ID from the auth middleware

    // Save the file path to the user's profile in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded successfully!', profilePicUrl: user.profilePicture });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to get profile picture
router.get('/profile-pic', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ profilePicUrl: user.profilePicture });
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to get user's test history
router.get('/tests', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('testHistory'); // Assuming 'testHistory' is a field in your user model

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ tests: user.testHistory });
  } catch (error) {
    console.error('Error fetching test history:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Route to submit assessment and save recommendations to testHistory
router.post('/submit-response', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: 'Answers are required.' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Run AI to get recommendations
    const aiResult = await runAI(answers);
    // Save to testHistory
    user.testHistory.push({
      date: new Date(),
      recommendations: aiResult.career_recommendations
    });
    await user.save();
    res.status(200).json({ recommendations: aiResult.career_recommendations });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT endpoint to update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const paramId = req.params.id;
    // Only allow users to update their own profile
    if (userId !== paramId) {
      return res.status(403).json({ message: 'You can only update your own profile.' });
    }
    const { name, email, profilePicture } = req.body;
    // Validate input (basic)
    if (!name && !email && !profilePicture) {
      return res.status(400).json({ message: 'At least one field (name, email, profilePicture) must be provided.' });
    }
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (profilePicture) updateFields.profilePicture = profilePicture;
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;