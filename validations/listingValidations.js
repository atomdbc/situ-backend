import { body } from 'express-validator';

export const createListingValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters'),
  
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  
  body('location.coordinates')
    .isArray()
    .withMessage('Location coordinates must be an array'),
  
  body('location.coordinates.*')
    .isNumeric()
    .withMessage('Coordinates must be numbers'),
  
  body('propertyType')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial'])
    .withMessage('Invalid property type'),
  
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['For Sale', 'For Rent', 'Sold', 'Rented'])
    .withMessage('Invalid status'),
  
  body('bedrooms')
    .notEmpty()
    .withMessage('Number of bedrooms is required')
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  
  body('bathrooms')
    .notEmpty()
    .withMessage('Number of bathrooms is required')
    .isNumeric()
    .withMessage('Bathrooms must be a number'),
  
  body('area')
    .notEmpty()
    .withMessage('Area is required')
    .isNumeric()
    .withMessage('Area must be a number'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  
  body('agent')
    .notEmpty()
    .withMessage('Agent is required')
    .isMongoId()
    .withMessage('Invalid agent ID')
];

export const updateListingValidation = [
  body('title')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters'),
  
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  
  body('location.coordinates')
    .optional()
    .isArray()
    .withMessage('Location coordinates must be an array'),
  
  body('location.coordinates.*')
    .optional()
    .isNumeric()
    .withMessage('Coordinates must be numbers'),
  
  body('propertyType')
    .optional()
    .isIn(['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial'])
    .withMessage('Invalid property type'),
  
  body('status')
    .optional()
    .isIn(['For Sale', 'For Rent', 'Sold', 'Rented'])
    .withMessage('Invalid status'),
  
  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),
  
  body('bathrooms')
    .optional()
    .isNumeric()
    .withMessage('Bathrooms must be a number'),
  
  body('area')
    .optional()
    .isNumeric()
    .withMessage('Area must be a number'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  
  body('agent')
    .optional()
    .isMongoId()
    .withMessage('Invalid agent ID')
];
