import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort('-createdAt')
      .populate('listing', 'title');

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
export const markNotificationAsRead = async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found',
      });
    }

    // Make sure notification belongs to user
    if (notification.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this notification',
      });
    }

    notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Create new listing notification
// @route   POST /api/notifications/new-listing
// @access  Private (Admin only)
export const createNewListingNotification = async (req, res) => {
  try {
    const { listingId } = req.body;

    // Get all users
    const users = await User.find();

    // Create a notification for each user
    const notifications = users.map(user => ({
      user: user._id,
      listing: listingId,
      type: 'new_listing',
      message: 'A new property has been listed!',
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: 'Notifications created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Create price change notification
// @route   POST /api/notifications/price-change
// @access  Private (Admin only)
export const createPriceChangeNotification = async (req, res) => {
  try {
    const { listingId, oldPrice, newPrice } = req.body;

    // Get all users
    const users = await User.find();

    // Create a notification for each user
    const notifications = users.map(user => ({
      user: user._id,
      listing: listingId,
      type: 'price_change',
      message: `Price updated from $${oldPrice} to $${newPrice}`,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: 'Notifications created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
