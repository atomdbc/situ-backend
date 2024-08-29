import Listing from '../models/Listing.js';
import { cloudinary } from '../config/cloudinary.js';
import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);






// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
  try {
    const { page, limit, startIndex } = paginateResults(req.query.page, req.query.limit);

    const total = await Listing.countDocuments();
    const listings = await Listing.find()
      .skip(startIndex)
      .limit(limit)
      .populate('agent', 'name email');

    res.status(200).json({
      success: true,
      count: listings.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      data: listings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found',
      });
    }
    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found',
      });
    }
    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found',
      });
    }
    await listing.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const searchListings = async (req, res) => {
  try {
    // Log the query parameters to debug the incoming request
    console.log('req.query:', req.query);

    // Destructure the query parameters
    const { keyword, propertyType, minPrice, maxPrice, bedrooms, bathrooms, page, limit } = req.query;

    // Validate and parse pagination parameters
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    console.log('Parsed limitNum:', limitNum);  // Log the parsed limit number

    if (isNaN(limitNum) || limitNum <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid limit parameter',
      });
    }

    const startIndex = (pageNum - 1) * limitNum;

    // MongoDB Atlas Search aggregation pipeline
    const agg = [
      {
        $match: {
          ...(keyword && {
            $text: {
              $search: keyword,
              $caseSensitive: false,
              $diacriticSensitive: false,
            },
          }),
          ...(propertyType && { propertyType }),
          ...(minPrice && { price: { $gte: Number(minPrice) } }),
          ...(maxPrice && { price: { $lte: Number(maxPrice) } }),
          ...(bedrooms && { bedrooms: { $gte: Number(bedrooms) } }),
          ...(bathrooms && { bathrooms: { $gte: Number(bathrooms) } }),
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limitNum,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          price: 1,
          bedrooms: 1,
          bathrooms: 1,
          address: 1,
          location: 1,
          agent: 1,
          images: 1,          // Include images in the response
          amenities: 1,       // Include amenities in the response
          features: 1,        // Include features in the response
          averageRating: 1,   // Include average rating in the response
          status: 1,          // Include status in the response
          walkScore: 1,       // Include walkScore in the response
          parking: 1,         // Include parking in the response
          propertyTax: 1,     // Include propertyTax in the response
          ...(keyword && { score: { $meta: "textScore" } }), // Only project score if text search is used
        },
      },
    ];

    // Perform the aggregation
    const listings = await Listing.aggregate(agg).exec();

    // Count the total documents matching the query
    const total = await Listing.countDocuments(agg[0].$match);

    // Send a successful response with the listings and pagination data
    res.status(200).json({
      success: true,
      count: listings.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
      data: listings,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error during search:', error.message);

    // Send a response with the error message
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};



// Helper function for pagination
const paginateResults = (page, limit) => {
  console.log('Received limit:', limit);  // Log the received limit value

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = limit ? parseInt(limit, 10) : 10;

  console.log('Parsed limitNum:', limitNum);  // Log the parsed limitNum

  if (isNaN(limitNum) || limitNum <= 0) {
    throw new Error('Invalid limit parameter');
  }

  const startIndex = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    startIndex: startIndex,
  };
};



// @desc    Search listings by location
// @route   GET /api/listings/nearby
// @access  Public
export const getNearbyListings = async (req, res) => {
  try {
    const { longitude, latitude, distance = 10000, unit = 'm' } = req.query;
    const { page, limit, startIndex } = paginateResults(req.query.page, req.query.limit);

    // Calculate radius based on unit (m = meters, km = kilometers, mi = miles)
    const radius = unit === 'km' ? distance / 6378.1 : unit === 'mi' ? distance / 3963.2 : distance / 6378100;

    const query = {
      location: {
        $geoWithin: { $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius] },
      },
    };

    const total = await Listing.countDocuments(query);
    const listings = await Listing.find(query)
      .skip(startIndex)
      .limit(limit)
      .populate('agent', 'name email');

    res.status(200).json({
      success: true,
      count: listings.length,
      pagination: {
        total,
        page: page || 1,
        pages: Math.ceil(total / (limit || 10)),
      },
      data: listings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Upload images for a listing
// @route   POST /api/listings/:id/images
// @access  Private
export const uploadListingImages = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, error: 'Listing not found' });
    }

    // Check if the user is the agent of the listing or an admin
    if (listing.agent.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to upload images for this listing' });
    }

    if (!req.files) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const uploadedImages = req.files.map(file => file.path);

    // Add new images to the listing
    listing.images = listing.images.concat(uploadedImages);
    await listing.save();

    res.status(200).json({
      success: true,
      data: listing.images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete an image from a listing
// @route   DELETE /api/listings/:id/images/:imageId
// @access  Private
export const deleteListingImage = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, error: 'Listing not found' });
    }

    // Check if the user is the agent of the listing or an admin
    if (listing.agent.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to delete images from this listing' });
    }

    const imageIndex = listing.images.findIndex(img => img.includes(req.params.imageId));

    if (imageIndex === -1) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    // Delete image from Cloudinary
    const publicId = `situ_listings/${req.params.imageId}`;
    await cloudinary.uploader.destroy(publicId);

    // Remove image from listing
    listing.images.splice(imageIndex, 1);
    await listing.save();

    res.status(200).json({
      success: true,
      data: listing.images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};




// @desc    Advanced search listings
// @route   GET /api/listings/search
// @access  Public
export const advancedSearchListings = async (req, res) => {
  try {
    const {
      keyword,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms, // Default to 2 bedrooms if not provided
      bathrooms,
      minArea,
      maxArea,
      features,
      sortBy,
      page,
      limit,
    } = req.query;

    const { startIndex, limitNum } = paginateResults(page, limit);

    let query = {};

    // Text search for keyword
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // Filter by property type
    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Price range filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Bedrooms filtering
    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    // Bathrooms filtering
    if (bathrooms) {
      query.bathrooms = { $gte: Number(bathrooms) };
    }

    // Area range filtering
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }

    // Features filtering (e.g., pool, garage)
    if (features) {
      query.features = { $all: features.split(',') };
    }

    const total = await Listing.countDocuments(query);

    // Sorting options
    let sortOptions = {};
    if (keyword) {
      sortOptions.score = { $meta: "textScore" }; // Sort by text score if keyword search is performed
    }
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }

    // Fetch listings with pagination and sorting
    const listings = await Listing.find(query, keyword ? { score: { $meta: "textScore" } } : {})
      .skip(startIndex)
      .limit(limitNum)
      .sort(sortOptions)
      .populate('agent', 'name email')
      .select('title description price bedrooms bathrooms address location agent images amenities features averageRating status walkScore parking propertyTax listingType ' );

    res.status(200).json({
      success: true,
      count: listings.length,
      pagination: {
        total,
        page: Number(page) || 1,
        pages: Math.ceil(total / limitNum),
      },
      data: listings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};




// @desc    Get similar listings
// @route   GET /api/listings/:id/similar
// @access  Public
export const getSimilarListings = async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
  
      if (!listing) {
        return res.status(404).json({
          success: false,
          error: 'Listing not found',
        });
      }
  
      const cacheKey = `similar:${req.params.id}`;
      const cachedResults = await getAsync(cacheKey);
  
      if (cachedResults) {
        return res.status(200).json(JSON.parse(cachedResults));
      }
  
      const similarListings = await listing.getSimilarListings();
  
      const results = {
        success: true,
        count: similarListings.length,
        data: similarListings,
      };
  
      // Cache the results
      await setAsync(cacheKey, JSON.stringify(results), 'EX', 3600); // Cache for 1 hour
  
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };