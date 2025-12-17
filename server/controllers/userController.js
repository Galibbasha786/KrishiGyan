// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Helper function to get user ID from request
const getUserId = (req) => {
  // Try different possible property names
  return req.user?.userId || req.user?.id || req.user?._id;
};

// 👤 Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = getUserId(req);
    console.log('Getting profile for user ID:', userId); // Debug log
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID not found in token" 
      });
    }
    
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ 
      success: false,
      message: "User not found" 
    });
    
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    const userId = getUserId(req);
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID not found in token" 
      });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, location },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({ 
      success: true,
      message: "Profile updated successfully ✅", 
      user: updatedUser 
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// 🔑 Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = getUserId(req);
    
    console.log('Change password for user ID:', userId); // Debug
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID not found in token" 
      });
    }
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Current password is incorrect" 
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ 
      success: true,
      message: "Password changed successfully ✅" 
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// 🗑️ Delete account
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = getUserId(req);
    
    console.log('Delete account for user ID:', userId); // Debug
    
    if (!userId) {
      return res.status(400).json({ 
        success: false,
        message: "User ID not found in token" 
      });
    }
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Verify password before deletion
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Password is incorrect" 
      });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ 
      success: true,
      message: "Account deleted successfully ✅" 
    });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};