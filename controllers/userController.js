import User from '../models/User.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateProfile = async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    bio: req.body.bio,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc    Update password
// @route   PUT /api/users/updatepassword
// @access  Private
export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({ success: false, error: 'Password is incorrect' });
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
};

// @desc    Upload profile image
// @route   PUT /api/users/me/image
// @access  Private
export const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    // Delete old profile image from Cloudinary if it exists and is not the default
    if (user.profileImage && user.profileImage !== 'default-profile.jpg') {
      const publicId = user.profileImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    user.profileImage = req.file.path;
    await user.save();

    res.status(200).json({
      success: true,
      data: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export const getFavorites = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('favorites');
      res.status(200).json({
        success: true,
        count: user.favorites.length,
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };
  
  export const addFavorite = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const listing = await Listing.findById(req.params.listingId);
  
      if (!listing) {
        return res.status(404).json({
          success: false,
          error: 'Listing not found',
        });
      }
  
      if (user.favorites.includes(listing._id)) {
        return res.status(400).json({
          success: false,
          error: 'Listing already in favorites',
        });
      }
  
      user.favorites.push(listing._id);
      await user.save();
  
      res.status(200).json({
        success: true,
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };
  
  export const removeFavorite = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user.favorites.includes(req.params.listingId)) {
        return res.status(400).json({
          success: false,
          error: 'Listing not in favorites',
        });
      }
  
      user.favorites = user.favorites.filter(
        id => id.toString() !== req.params.listingId
      );
      await user.save();
  
      res.status(200).json({
        success: true,
        data: user.favorites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateUser = async (req, res) => {
    try {
      const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        bio: req.body.bio,
      };
  
      const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };

// @desc    Delete user profile
// @route   DELETE /api/users/me
// @access  Private
export const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
  
      // Delete user profile image from Cloudinary if it exists and is not the default
      if (user.profileImage && user.profileImage !== 'default-profile.jpg') {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
  
      await user.remove();
  
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  };
  