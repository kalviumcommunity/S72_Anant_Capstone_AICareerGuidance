const validateEmail = (req, res, next) => {
  const { email } = req.body;

  // Email regex pattern for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ 
      message: "Please provide a valid email address" 
    });
  }

  next();
};

module.exports = validateEmail;