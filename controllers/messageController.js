import Message from '../models/Message.js';
import User from '../models/User.js';
import Listing from '../models/Listing.js';

// @desc    Get messages for a user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    })
      .populate('sender receiver', 'name email')
      .populate('listing', 'title');

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, listingId, content } = req.body;

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        error: 'Receiver not found',
      });
    }

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found',
      });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      listing: listingId,
      content,
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id
// @access  Private
export const markMessageAsRead = async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found',
      });
    }

    // Make sure the message belongs to the user
    if (message.receiver.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this message',
      });
    }

    message = await Message.findByIdAndUpdate(req.params.id, { read: true }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
