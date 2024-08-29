import express from 'express';
import {
  getUserNotifications,
  markNotificationAsRead,
  createNewListingNotification,
  createPriceChangeNotification,
} from '../controllers/notificationController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getUserNotifications);

router.route('/:id')
  .put(markNotificationAsRead);

router.route('/new-listing')
  .post(authorize('admin'), createNewListingNotification);

router.route('/price-change')
  .post(authorize('admin'), createPriceChangeNotification);

export default router;
