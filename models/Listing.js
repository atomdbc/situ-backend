import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    index: true, // Simple index
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  description: { 
    type: String, 
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Review'
    }
  ],
  price: { 
    type: Number, 
    required: true,
    index: true, // Simple index
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: {
    street: String,
    city: { type: String, index: true },
    state: String,
    zipCode: String,
    country: { type: String, index: true },
  },
  bedrooms: { 
    type: Number, 
    required: true,
    index: true, // Simple index
  },
  bathrooms: { 
    type: Number, 
    required: true,
  },
  area: { 
    type: Number, 
    required: true,
    index: true, // Simple index
  },
  propertyType: { 
    type: String, 
    required: true,
    index: true, // Simple index
  },
  listingType: { 
    type: String, 
    enum: ['sale', 'rent'], 
    required: true,
    index: true, // Simple index
  },
  images: [String],
  features: [String],
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    default: 'available',
    index: true, // Simple index
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true, // Simple index
  },
  updatedAt: { 
    type: Date, 
    default: Date.now,
  },
  agent: {
    name: String,
    contact: String,
  },
  amenities: [String],
  nearbySchools: [String],
  walkScore: {
    type: Number,
    index: true, // Simple index
  },
  crimeRate: {
    type: String,
    enum: ['low', 'medium', 'high'],
    index: true, // Simple index
  },
  yearBuilt: {
    type: Number,
    index: true, // Simple index
  },
  parking: {
    type: Number,
    index: true, // Simple index
  },
  propertyTax: {
    type: Number,
    index: true, // Simple index
  },
});

// Text index for full-text search on multiple fields
listingSchema.index({ title: 'text', description: 'text', address: 'text', features: 'text', amenities: 'text' });

// Geospatial index for location-based queries
listingSchema.index({ location: '2dsphere' });

// Compound index for common search patterns
listingSchema.index({ propertyType: 1, listingType: 1, price: 1, bedrooms: 1, bathrooms: 1, status: 1 });

// Compound index for price range searches with filtering by location, property type, and listing type
listingSchema.index({ price: 1, location: '2dsphere', propertyType: 1, listingType: 1 });

// Index for filtering by agent, price, and status
listingSchema.index({ 'agent.name': 1, price: 1, status: 1 });

// Index for date-based searches, combined with status
listingSchema.index({ createdAt: 1, status: 1 });

// Compound index for property characteristics searches
listingSchema.index({ bedrooms: 1, bathrooms: 1, area: 1, yearBuilt: 1, parking: 1, status: 1 });

// Index on walkScore and crimeRate for safety and livability-focused searches
listingSchema.index({ walkScore: 1, crimeRate: 1, price: 1 });

// Index for sorting by property tax and filtering by listing type
listingSchema.index({ propertyTax: 1, listingType: 1 });

// Ensure Mongoose creates indexes
listingSchema.on('index', error => {
  if (error) {
    console.error('Index creation failed:', error);
  }
});

listingSchema.methods.getSimilarListings = async function(limit = 3) {
  const similar = await this.model('Listing').find({
    _id: { $ne: this._id },
    propertyType: this.propertyType,
    bedrooms: { $gte: this.bedrooms - 1, $lte: this.bedrooms + 1 },
    bathrooms: { $gte: this.bathrooms - 1, $lte: this.bathrooms + 1 },
    price: { $gte: this.price * 0.8, $lte: this.price * 1.2 },
    'location.city': this.location.city
  }).limit(limit);

  return similar;
};

export default mongoose.model('Listing', listingSchema);
