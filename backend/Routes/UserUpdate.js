const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/updateUserData
// @desc    Update user profile data (except email)
// @access  Public or Protected based on your setup
router.post('/updateUserData', async (req, res) => {
  const { email, name, location, profilePic } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, location, profilePic } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
