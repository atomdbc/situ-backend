import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router
  .route('/me')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.get('/favorites', getFavorites);
router.post('/favorites/:listingId', addFavorite);
router.delete('/favorites/:listingId', removeFavorite);

export default router;
