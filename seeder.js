import mongoose from 'mongoose';
import User from './models/User.js';
import Listing from './models/Listing.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

const users = [
  {
    name: 'Kouassi Aya',
    email: 'kouassi.aya@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Diallo Mamadou',
    email: 'diallo.mamadou@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'N’Guessan Yao',
    email: 'nguessan.yao@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Traoré Fatou',
    email: 'traore.fatou@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Koné Ibrahim',
    email: 'kone.ibrahim@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Ouattara Kadi',
    email: 'ouattara.kadi@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Bamba Souleymane',
    email: 'bamba.souleymane@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Toure Aicha',
    email: 'toure.aicha@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Coulibaly Abdoulaye',
    email: 'coulibaly.abdoulaye@example.com',
    role: 'agent',
    password: 'password123'
  },
  {
    name: 'Yeo Salif',
    email: 'yeo.salif@example.com',
    role: 'agent',
    password: 'password123'
  },
];

const listings = [
  {
    title: 'Modern Apartment in Cocody',
    description: 'A beautiful, newly renovated apartment in the heart of Cocody.',
    price: 150000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    features: ['Air Conditioning', 'Security', 'Parking'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Spacious Villa in Assinie',
    description: 'Luxurious beachfront villa perfect for family vacations.',
    price: 500000000,
    location: {
      type: 'Point',
      coordinates: [-3.2769, 5.1406],
      formattedAddress: 'Assinie, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    features: ['Swimming Pool', 'Beach Access', 'Garden'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Office Space in Plateau',
    description: 'Modern office space in the business district of Abidjan.',
    price: 80000000,
    location: {
      type: 'Point',
      coordinates: [-4.0208, 5.3224],
      formattedAddress: 'Plateau, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'rent',
    status: 'available',
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    features: ['High-speed Internet', 'Conference Room', 'Parking'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Luxury Apartment in Marcory',
    description: 'A stunning luxury apartment with a panoramic view of the city.',
    price: 200000000,
    location: {
      type: 'Point',
      coordinates: [-4.0314, 5.3176],
      formattedAddress: 'Marcory, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    features: ['Swimming Pool', 'Gym', 'Parking'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Cozy Bungalow in Yamoussoukro',
    description: 'A quiet, cozy bungalow perfect for weekend getaways.',
    price: 120000000,
    location: {
      type: 'Point',
      coordinates: [-5.2763, 6.8276],
      formattedAddress: 'Yamoussoukro, Côte d\'Ivoire'
    },
    propertyType: 'Bungalow',
    listingType: 'sale',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    features: ['Garden', 'Parking', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Beach House in Grand-Bassam',
    description: 'A beautiful beach house with direct ocean access.',
    price: 450000000,
    location: {
      type: 'Point',
      coordinates: [-3.8470, 5.2084],
      formattedAddress: 'Grand-Bassam, Côte d\'Ivoire'
    },
    propertyType: 'House',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    features: ['Beach Access', 'Garden', 'Swimming Pool'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Commercial Building in Treichville',
    description: 'Prime location for businesses in the heart of Treichville.',
    price: 300000000,
    location: {
      type: 'Point',
      coordinates: [-4.0193, 5.3050],
      formattedAddress: 'Treichville, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'sale',
    status: 'available',
    bedrooms: 0,
    bathrooms: 4,
    area: 500,
    features: ['Parking', 'Security', 'Elevator'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Penthouse in Cocody',
    description: 'Exclusive penthouse with a private terrace and panoramic views.',
    price: 750000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 5,
    area: 400,
    features: ['Private Terrace', 'Swimming Pool', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Modern Office in Zone 4',
    description: 'High-end office space in the commercial district of Zone 4.',
    price: 100000000,
    location: {
      type: 'Point',
      coordinates: [-4.0267, 5.3085],
      formattedAddress: 'Zone 4, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'rent',
    status: 'available',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    features: ['Conference Room', 'Parking', 'High-speed Internet'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Farmhouse in Bouaké',
    description: 'A rustic farmhouse with plenty of land for agriculture.',
    price: 80000000,
    location: {
      type: 'Point',
      coordinates: [-5.0377, 7.6894],
      formattedAddress: 'Bouaké, Côte d\'Ivoire'
    },
    propertyType: 'Farm',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2,
    area: 500,
    features: ['Land', 'Barn', 'Water Well'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Luxury Villa in Bingerville',
    description: 'A lavish villa with state-of-the-art amenities in Bingerville.',
    price: 400000000,
    location: {
      type: 'Point',
      coordinates: [-3.8783, 5.3558],
      formattedAddress: 'Bingerville, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 6,
    bathrooms: 5,
    area: 600,
    features: ['Swimming Pool', 'Garden', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Beachfront Property in San Pedro',
    description: 'Exclusive beachfront property in San Pedro.',
    price: 900000000,
    location: {
      type: 'Point',
      coordinates: [-6.6484, 4.7438],
      formattedAddress: 'San Pedro, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 7,
    bathrooms: 6,
    area: 800,
    features: ['Beach Access', 'Swimming Pool', 'Helipad'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Contemporary Loft in Deux Plateaux',
    description: 'A stylish contemporary loft in a prime neighborhood.',
    price: 250000000,
    location: {
      type: 'Point',
      coordinates: [-4.0194, 5.3772],
      formattedAddress: 'Deux Plateaux, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    features: ['Balcony', 'Open Floor Plan', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Family House in Abobo',
    description: 'A spacious family house with a large backyard.',
    price: 60000000,
    location: {
      type: 'Point',
      coordinates: [-4.0079, 5.4039],
      formattedAddress: 'Abobo, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'House',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 2,
    area: 250,
    features: ['Garden', 'Parking', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Mountain Lodge in Man',
    description: 'A serene mountain lodge perfect for nature lovers.',
    price: 180000000,
    location: {
      type: 'Point',
      coordinates: [-7.4126, 7.4126],
      formattedAddress: 'Man, Côte d\'Ivoire'
    },
    propertyType: 'Lodge',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    features: ['Mountain View', 'Fireplace', 'Outdoor Deck'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Urban Loft in Abidjan',
    description: 'A modern urban loft in the heart of Abidjan.',
    price: 220000000,
    location: {
      type: 'Point',
      coordinates: [-4.0219, 5.3364],
      formattedAddress: 'Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    features: ['City View', 'Rooftop Access', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Lakefront House in Jacqueville',
    description: 'A beautiful lakefront property in Jacqueville.',
    price: 320000000,
    location: {
      type: 'Point',
      coordinates: [-4.7170, 5.2575],
      formattedAddress: 'Jacqueville, Côte d\'Ivoire'
    },
    propertyType: 'House',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    features: ['Lake View', 'Boat Dock', 'Garden'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Modern Studio in Cocody',
    description: 'A compact yet stylish studio apartment in Cocody.',
    price: 90000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Studio',
    listingType: 'rent',
    status: 'available',
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    features: ['Air Conditioning', 'Security', 'Parking'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Secluded Cabin in Danané',
    description: 'A secluded cabin surrounded by lush greenery in Danané.',
    price: 70000000,
    location: {
      type: 'Point',
      coordinates: [-8.1257, 7.2595],
      formattedAddress: 'Danané, Côte d\'Ivoire'
    },
    propertyType: 'Cabin',
    listingType: 'sale',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    features: ['Fireplace', 'Garden', 'Mountain View'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  // Additional listings to reach 50 total
  {
    title: 'Luxury Penthouse in Plateau',
    description: 'Top-floor penthouse with an amazing city view in Plateau.',
    price: 850000000,
    location: {
      type: 'Point',
      coordinates: [-4.0208, 5.3224],
      formattedAddress: 'Plateau, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 4,
    area: 400,
    features: ['Panoramic View', 'Private Elevator', 'Rooftop Pool'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Seaside Villa in Abidjan',
    description: 'Exclusive villa with private beach access in Abidjan.',
    price: 1200000000,
    location: {
      type: 'Point',
      coordinates: [-4.0098, 5.3191],
      formattedAddress: 'Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 8,
    bathrooms: 7,
    area: 1000,
    features: ['Private Beach', 'Infinity Pool', 'Spa'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Countryside Retreat in Toumodi',
    description: 'A peaceful retreat in the countryside, perfect for relaxation.',
    price: 60000000,
    location: {
      type: 'Point',
      coordinates: [-5.0271, 6.5576],
      formattedAddress: 'Toumodi, Côte d\'Ivoire'
    },
    propertyType: 'Farm',
    listingType: 'sale',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    area: 400,
    features: ['Orchard', 'Fishing Pond', 'Garden'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Boutique Hotel in Assinie',
    description: 'A charming boutique hotel in a prime tourist destination.',
    price: 2000000000,
    location: {
      type: 'Point',
      coordinates: [-3.2769, 5.1406],
      formattedAddress: 'Assinie, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'sale',
    status: 'available',
    bedrooms: 15,
    bathrooms: 15,
    area: 2000,
    features: ['Swimming Pool', 'Restaurant', 'Beachfront'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'High-end Office Space in Cocody',
    description: 'Spacious office with modern amenities in Cocody.',
    price: 500000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'rent',
    status: 'available',
    bedrooms: 0,
    bathrooms: 3,
    area: 300,
    features: ['Conference Room', 'Parking', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Historic Mansion in Grand-Bassam',
    description: 'A historic mansion with colonial architecture in Grand-Bassam.',
    price: 1000000000,
    location: {
      type: 'Point',
      coordinates: [-3.8470, 5.2084],
      formattedAddress: 'Grand-Bassam, Côte d\'Ivoire'
    },
    propertyType: 'Mansion',
    listingType: 'sale',
    status: 'available',
    bedrooms: 8,
    bathrooms: 7,
    area: 1200,
    features: ['Large Garden', 'Swimming Pool', 'Event Space'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Suburban House in Port-Bouet',
    description: 'A comfortable suburban house with modern amenities.',
    price: 250000000,
    location: {
      type: 'Point',
      coordinates: [-3.9832, 5.2614],
      formattedAddress: 'Port-Bouet, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'House',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    features: ['Garden', 'Garage', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Mountain Cottage in Man',
    description: 'A cozy mountain cottage with stunning views.',
    price: 100000000,
    location: {
      type: 'Point',
      coordinates: [-7.4126, 7.4126],
      formattedAddress: 'Man, Côte d\'Ivoire'
    },
    propertyType: 'Cottage',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    features: ['Mountain View', 'Fireplace', 'Outdoor Deck'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Executive Office in Plateau',
    description: 'Premium office space in the heart of Abidjan’s business district.',
    price: 750000000,
    location: {
      type: 'Point',
      coordinates: [-4.0208, 5.3224],
      formattedAddress: 'Plateau, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Commercial',
    listingType: 'rent',
    status: 'available',
    bedrooms: 0,
    bathrooms: 4,
    area: 400,
    features: ['Conference Room', 'Parking', 'High-speed Internet'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Rustic Farmhouse in Korhogo',
    description: 'A traditional farmhouse with ample farmland.',
    price: 90000000,
    location: {
      type: 'Point',
      coordinates: [-5.6342, 9.4572],
      formattedAddress: 'Korhogo, Côte d\'Ivoire'
    },
    propertyType: 'Farm',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2,
    area: 600,
    features: ['Barn', 'Land', 'Water Well'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Beach Cottage in Sassandra',
    description: 'A charming beach cottage with a direct view of the ocean.',
    price: 200000000,
    location: {
      type: 'Point',
      coordinates: [-6.0839, 4.9516],
      formattedAddress: 'Sassandra, Côte d\'Ivoire'
    },
    propertyType: 'Cottage',
    listingType: 'sale',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    features: ['Beachfront', 'Garden', 'Fireplace'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Luxury House in Cocody',
    description: 'A high-end luxury house in a prestigious neighborhood.',
    price: 1200000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'House',
    listingType: 'sale',
    status: 'available',
    bedrooms: 6,
    bathrooms: 5,
    area: 700,
    features: ['Swimming Pool', 'Home Cinema', 'Garden'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Private Villa in Yopougon',
    description: 'A spacious villa in a quiet residential area.',
    price: 300000000,
    location: {
      type: 'Point',
      coordinates: [-4.0836, 5.3171],
      formattedAddress: 'Yopougon, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: 500,
    features: ['Garden', 'Parking', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'City Center Apartment in Abidjan',
    description: 'A modern apartment in the bustling city center of Abidjan.',
    price: 150000000,
    location: {
      type: 'Point',
      coordinates: [-4.0181, 5.3366],
      formattedAddress: 'Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    features: ['City View', 'Balcony', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Family Villa in Bassam',
    description: 'A comfortable family villa near the beach in Bassam.',
    price: 350000000,
    location: {
      type: 'Point',
      coordinates: [-3.8470, 5.2084],
      formattedAddress: 'Bassam, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    features: ['Garden', 'Parking', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Industrial Warehouse in Yopougon',
    description: 'Large warehouse suitable for industrial use in Yopougon.',
    price: 600000000,
    location: {
      type: 'Point',
      coordinates: [-4.0836, 5.3171],
      formattedAddress: 'Yopougon, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Warehouse',
    listingType: 'rent',
    status: 'available',
    bedrooms: 0,
    bathrooms: 2,
    area: 1000,
    features: ['High Ceilings', 'Loading Dock', 'Security'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Beachfront Villa in Assinie',
    description: 'A luxurious villa with stunning views of the beach.',
    price: 500000000,
    location: {
      type: 'Point',
      coordinates: [-3.2769, 5.1406],
      formattedAddress: 'Assinie, Côte d\'Ivoire'
    },
    propertyType: 'Villa',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    features: ['Beach Access', 'Swimming Pool', 'Garden'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
  {
    title: 'Penthouse in Cocody',
    description: 'Exclusive penthouse with a private terrace and panoramic views.',
    price: 750000000,
    location: {
      type: 'Point',
      coordinates: [-4.0169, 5.3547],
      formattedAddress: 'Cocody, Abidjan, Côte d\'Ivoire'
    },
    propertyType: 'Apartment',
    listingType: 'sale',
    status: 'available',
    bedrooms: 5,
    bathrooms: 5,
    area: 400,
    features: ['Private Terrace', 'Swimming Pool', 'Gym'],
    images: ['https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1440']
  },
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Listing.deleteMany();

    const createdUsers = await User.create(users);

    const sampleListings = listings.map(listing => {
      return { ...listing, agent: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id };
    });

    await Listing.create(sampleListings);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Listing.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// npm run data:import
// npm run data:destroy
