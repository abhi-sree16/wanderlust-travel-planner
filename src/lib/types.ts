export type BudgetTier = 'budget' | 'mid-range' | 'luxury';

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

export type Review = {
  id: string;
  user_id: string;
  destination_id: string;
  rating: number;
  comment: string;
  created_at: string;
  authorName: string;
};

export type TripPlan = {
  id: string;
  user_id: string;
  destination_id: string | null;
  destination_name: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget: number;
  interests: string[];
  notes: string | null;
  status: string;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
};
