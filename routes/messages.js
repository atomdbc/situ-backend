import express from 'express';
import {
  getMessages,
  sendMessage,
  markMessageAsRead,
} from '../controllers/messageController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMessages)
  .post(sendMessage);

router.route('/:id')
  .put(markMessageAsRead);

export default router;
