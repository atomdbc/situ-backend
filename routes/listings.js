import express from 'express';
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  getNearbyListings,
  uploadListingImages,
  deleteListingImage,
  advancedSearchListings,
  getSimilarListings,
} from '../controllers/listingController.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import {
  createListingValidation,
  updateListingValidation,
} from '../validations/listingValidations.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Base route: /api/listings

// Get all listings and search listings
router.get('/', getListings);
router.get('/search', advancedSearchListings);
router.get('/nearby', getNearbyListings);

// Create a new listing
router.post(
  '/',
  protect,
  authorize('agent', 'admin'),
  validate(createListingValidation),
  createListing
);

// Get, update, and delete a specific listing
router
  .route('/:id')
  .get(getListing)
  .put(
    protect,
    authorize('agent', 'admin'),
    validate(updateListingValidation),
    updateListing
  )
  .delete(protect, authorize('agent', 'admin'), deleteListing);

// Image upload and delete routes
router.post(
  '/:id/images',
  protect,
  authorize('agent', 'admin'),
  upload.array('images', 5),
  uploadListingImages
);
router.delete(
  '/:id/images/:imageId',
  protect,
  authorize('agent', 'admin'),
  deleteListingImage
);

router.get('/:id/similar', getSimilarListings);


export default router;
