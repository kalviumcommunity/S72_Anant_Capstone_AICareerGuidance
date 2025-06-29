const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();


// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (without password) and token
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Google OAuth route (for when users sign in with Google)
router.post('/google', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user for Google sign-in
      user = new User({
        name,
        email,
        password: '', // Empty password for OAuth users
        authMethod: 'google',
        profilePicture: '' // You can add Google profile picture URL here if needed
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.status(200).json({
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: "Invalid token" });
  }
});


// Logout route (frontend will handle clearing localStorage)
router.post('/logout', async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the token
    // For now, we'll just return a success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; 