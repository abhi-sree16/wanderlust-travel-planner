export type BudgetTier = 'budget' | 'mid-range' | 'luxury';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  bestTimeToVisit: string;
  budgetTier: BudgetTier;
  image: string;
  blurb: string;
  tags: string[];
  latitude?: number;
  longitude?: number;
}

export interface Review {
  id: string;
  destination_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface TripPlan {
  id: string;
  user_id: string;
  destination_id: string;
  destination_name: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget: number;
  interests: string[];
  notes: string | null;
  status: 'planned' | 'confirmed' | 'completed';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  duration: string;
  image: string;
}

export interface InspirationArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
}
