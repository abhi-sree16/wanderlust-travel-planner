import type { BudgetTier } from '@/lib/types';

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  image: string;
  blurb: string;
  tags: string[];
  bestTimeToVisit: string;
  budgetTier: BudgetTier;
  latitude: number | null;
  longitude: number | null;
};

const img = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const heroImage = img(28901735, 1920);

export const destinations: Destination[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Mediterranean',
    category: 'Islands',
    rating: 4.9,
    reviews: 12840,
    price: 2400,
    duration: '5-7 days',
    image: img(221532),
    blurb: 'Whitewashed cliffside villages perched above a drowned volcanic caldera. Watch the sky ignite at Oia, swim at Red Beach, and sip Assyrtiko where the vineyards twist close to the soil.',
    tags: ['Sunset Views', 'Wine Tasting', 'Cliffside Villages', 'Romantic'],
    bestTimeToVisit: 'Apr-Oct',
    budgetTier: 'luxury',
    latitude: 36.3932,
    longitude: 25.4615,
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    category: 'Cultural',
    rating: 4.9,
    reviews: 9650,
    price: 3100,
    duration: '7-10 days',
    image: img(38363018),
    blurb: 'A thousand years of Japanese art and ceremony live in these wooden streets. Walk between vermilion gates at Fushimi Inari, meditate at Ryoan-ji, and time your visit for cherry blossoms or autumn maples.',
    tags: ['Temples', 'Tea Ceremony', 'Cherry Blossoms', 'Gardens'],
    bestTimeToVisit: 'Mar-May',
    budgetTier: 'luxury',
    latitude: 35.0116,
    longitude: 135.7681,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    category: 'Islands',
    rating: 4.8,
    reviews: 18200,
    price: 1500,
    duration: '7-14 days',
    image: img(35635112),
    blurb: 'Emerald rice terraces, hidden waterfalls, and coral reefs all share one small island. Surf at dawn in Uluwatu, find stillness in an Ubud yoga shala, and end the day at a beach club as the sun drops behind the palm line.',
    tags: ['Surfing', 'Yoga', 'Rice Terraces', 'Beach Clubs'],
    bestTimeToVisit: 'Apr-Oct',
    budgetTier: 'mid-range',
    latitude: -8.3405,
    longitude: 115.092,
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Chile & Argentina',
    region: 'South America',
    category: 'Mountains',
    rating: 4.9,
    reviews: 5400,
    price: 3800,
    duration: '10-14 days',
    image: img(18823718),
    blurb: 'The end of the road is just the beginning. Hike past granite cathedrals in Torres del Paine, walk the base of Fitz Roy at dawn, and watch glaciers calve into milky-grey lakes. This is the wild at its most grand.',
    tags: ['Hiking', 'Glaciers', 'Wildlife', 'Stargazing'],
    bestTimeToVisit: 'Nov-Mar',
    budgetTier: 'luxury',
    latitude: -49.3275,
    longitude: -72.8862,
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'North Africa',
    category: 'Cities',
    rating: 4.7,
    reviews: 8200,
    price: 950,
    duration: '4-6 days',
    image: img(30374225),
    blurb: 'A city of color, spice, and shadow. Lose yourself in the medina, sip mint tea on a riad rooftop, and watch Jemaa el-Fnaa come alive at dusk with storytellers, snake charmers, and the smell of slow-cooked tagine.',
    tags: ['Souks', 'Riads', 'Tagine', 'Desert Trips'],
    bestTimeToVisit: 'Mar-May',
    budgetTier: 'budget',
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Mediterranean',
    category: 'Coastal',
    rating: 4.8,
    reviews: 11200,
    price: 2800,
    duration: '5-7 days',
    image: img(27025488),
    blurb: 'Lemon groves and pastel villages stacked along a vertical coastline. Drive the cliff-hugging road, eat spaghetti alle vongole in Positano, and take a boat to Capri for a swim in the Blue Grotto.',
    tags: ['Coastal Drive', 'Limoncello', 'Boat Trips', 'Cliffside Towns'],
    bestTimeToVisit: 'May-Sep',
    budgetTier: 'luxury',
    latitude: 40.634,
    longitude: 14.6027,
  },
  {
    id: 'banff',
    name: 'Banff',
    country: 'Canada',
    region: 'North America',
    category: 'Mountains',
    rating: 4.9,
    reviews: 7100,
    price: 2200,
    duration: '5-7 days',
    image: img(33870395),
    blurb: 'Turquoise lakes cradled by limestone peaks in the heart of the Canadian Rockies. Paddle Moraine Lake at first light, ride the gondola for a 360° summit view, and soak in hot springs as snow falls silently.',
    tags: ['Lakes', 'Hiking', 'Wildlife', 'Skiing'],
    bestTimeToVisit: 'Jun-Sep',
    budgetTier: 'mid-range',
    latitude: 51.4968,
    longitude: -115.9281,
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Indian Ocean',
    category: 'Beaches',
    rating: 4.9,
    reviews: 13400,
    price: 4200,
    duration: '5-7 days',
    image: img(28843967),
    blurb: 'A nation of 1,200 islands scattered across the equator. Sleep in an overwater villa, snorkel with manta rays in warm lagoons, and dine on a sandbar lit only by lanterns and the Southern Cross.',
    tags: ['Overwater Villas', 'Snorkeling', 'Diving', 'Honeymoon'],
    bestTimeToVisit: 'Nov-Apr',
    budgetTier: 'luxury',
    latitude: 3.2028,
    longitude: 73.2207,
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Southern Africa',
    category: 'Cities',
    rating: 4.8,
    reviews: 6800,
    price: 1800,
    duration: '7-10 days',
    image: img(37759559),
    blurb: 'Where two oceans meet beneath Table Mountain. Hike or cable-car to the flat summit, drive Chapman\'s Peak to Cape Point, and meet the penguins at Boulders Beach before a braai at sunset.',
    tags: ['Table Mountain', 'Wine Country', 'Penguins', 'Coastal Drive'],
    bestTimeToVisit: 'Oct-Apr',
    budgetTier: 'mid-range',
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Nordic',
    category: 'Nature',
    rating: 4.9,
    reviews: 9900,
    price: 2600,
    duration: '7-10 days',
    image: img(14434230),
    blurb: 'A land of fire and ice. Chase the northern lights across black-sand deserts, soak in geothermal lagoons, and stand between two continents in Thingvellir. Every waterfall feels like the first one ever discovered.',
    tags: ['Northern Lights', 'Hot Springs', 'Waterfalls', 'Glaciers'],
    bestTimeToVisit: 'Sep-Mar',
    budgetTier: 'luxury',
    latitude: 64.9631,
    longitude: -19.0208,
  },
  {
    id: 'petra',
    name: 'Petra',
    country: 'Jordan',
    region: 'Middle East',
    category: 'Cultural',
    rating: 4.9,
    reviews: 4500,
    price: 1600,
    duration: '3-5 days',
    image: img(720254),
    blurb: 'A rose-red city carved into sandstone cliffs by the Nabataeans 2,000 years ago. Walk the Siq at dawn to reach the Treasury in solitude, climb to the Monastery, and sleep under the stars in Wadi Rum.',
    tags: ['Ancient Ruins', 'Desert', 'Archaeology', 'Bedouin Culture'],
    bestTimeToVisit: 'Mar-May',
    budgetTier: 'mid-range',
    latitude: 30.3285,
    longitude: 35.4444,
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Mediterranean',
    category: 'Cities',
    rating: 4.8,
    reviews: 15600,
    price: 1100,
    duration: '4-6 days',
    image: img(18911193),
    blurb: 'Seven hills of pastel facades, tiled streets, and Fado drifting from candlelit taverns. Ride the rattling Tram 28 through Alfama, watch the Tagus glow from a Miradouro, and day-trip to fairytale Sintra.',
    tags: ['Fado Music', 'Tram Rides', 'Pastel de Nata', 'Sintra Day Trip'],
    bestTimeToVisit: 'Apr-Oct',
    budgetTier: 'budget',
    latitude: 38.7223,
    longitude: -9.1393,
  },
];

export type Experience = {
  id: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  image: string;
};

export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Hot Air Balloon Ride Over Cappadocia',
    location: 'Cappadocia, Turkey',
    category: 'Adventure',
    duration: '2 hours',
    price: 180,
    image: img(19228322, 800),
  },
  {
    id: 'exp2',
    title: 'Great Barrier Reef Snorkeling Tour',
    location: 'Queensland, Australia',
    category: 'Water Sports',
    duration: 'Full day',
    price: 220,
    image: img(17100727, 800),
  },
  {
    id: 'exp3',
    title: 'Sahara Desert Camel Trek & Camp',
    location: 'Merzouga, Morocco',
    category: 'Adventure',
    duration: '2 days',
    price: 150,
    image: img(30757358, 800),
  },
  {
    id: 'exp4',
    title: 'Machu Picchu Sunrise Hike',
    location: 'Cusco, Peru',
    category: 'Hiking',
    duration: '4 hours',
    price: 120,
    image: img(18662531, 800),
  },
];

export type InspirationArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
};

export const inspirationArticles: InspirationArticle[] = [
  {
    id: 'art1',
    title: 'How to Travel Slowly: A Guide to Staying Longer in Fewer Places',
    excerpt: 'Slow travel is not about doing less — it is about seeing more by going deeper. Here is how to plan a trip that changes you.',
    category: 'Travel Philosophy',
    readTime: '6 min',
    image: img(9119917, 800),
  },
  {
    id: 'art2',
    title: 'The Best Coffee Cities in the World, Ranked by Roasters',
    excerpt: 'We asked 50 roasters where they would travel just for a cup. The answers surprised us — and will surprise you.',
    category: 'Food & Drink',
    readTime: '8 min',
    image: img(9051645, 800),
  },
  {
    id: 'art3',
    title: 'Packing for Two Weeks in a Carry-On: The Complete Checklist',
    excerpt: 'Everything you need, nothing you do not. Our tested carry-on system works from Iceland to Bali.',
    category: 'Travel Tips',
    readTime: '5 min',
    image: img(8212231, 800),
  },
];
