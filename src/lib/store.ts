import type { Review, TripPlan, User } from './types';

const KEYS = {
  users: 'wl_users',
  session: 'wl_session',
  favorites: 'wl_favorites',
  trips: 'wl_trips',
  reviews: 'wl_reviews',
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

type StoredUser = User & { password: string };

export function signUp(email: string, password: string, fullName: string): { error: string | null; user: User | null } {
  const users = read<StoredUser[]>(KEYS.users, []);
  if (users.some((u) => u.email === email)) {
    return { error: 'An account with this email already exists', user: null };
  }
  const user: StoredUser = { id: uid(), email, full_name: fullName, password };
  users.push(user);
  write(KEYS.users, users);
  const session: User = { id: user.id, email: user.email, full_name: user.full_name };
  write(KEYS.session, session);
  return { error: null, user: session };
}

export function signIn(email: string, password: string): { error: string | null; user: User | null } {
  const users = read<StoredUser[]>(KEYS.users, []);
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    return { error: 'Invalid email or password', user: null };
  }
  const session: User = { id: found.id, email: found.email, full_name: found.full_name };
  write(KEYS.session, session);
  return { error: null, user: session };
}

export function getSession(): User | null {
  return read<User | null>(KEYS.session, null);
}

export function signOut(): void {
  localStorage.removeItem(KEYS.session);
}

type Favorite = { user_id: string; destination_id: string };

export function getFavorites(userId: string): string[] {
  const all = read<Favorite[]>(KEYS.favorites, []);
  return all.filter((f) => f.user_id === userId).map((f) => f.destination_id);
}

export function isFavorite(userId: string, destinationId: string): boolean {
  const all = read<Favorite[]>(KEYS.favorites, []);
  return all.some((f) => f.user_id === userId && f.destination_id === destinationId);
}

export function toggleFavorite(userId: string, destinationId: string): boolean {
  const all = read<Favorite[]>(KEYS.favorites, []);
  const existing = all.findIndex((f) => f.user_id === userId && f.destination_id === destinationId);
  if (existing >= 0) {
    all.splice(existing, 1);
    write(KEYS.favorites, all);
    return false;
  }
  all.push({ user_id: userId, destination_id: destinationId });
  write(KEYS.favorites, all);
  return true;
}

export function getTrips(userId: string): TripPlan[] {
  const all = read<TripPlan[]>(KEYS.trips, []);
  return all.filter((t) => t.user_id === userId);
}

export function createTrip(userId: string, trip: Omit<TripPlan, 'id' | 'user_id' | 'created_at'>): TripPlan {
  const all = read<TripPlan[]>(KEYS.trips, []);
  const newTrip: TripPlan = {
    ...trip,
    id: uid(),
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  all.push(newTrip);
  write(KEYS.trips, all);
  return newTrip;
}

export function deleteTrip(userId: string, tripId: string): void {
  const all = read<TripPlan[]>(KEYS.trips, []);
  write(KEYS.trips, all.filter((t) => !(t.id === tripId && t.user_id === userId)));
}

export function getReviews(destinationId: string): Review[] {
  const all = read<Review[]>(KEYS.reviews, []);
  return all.filter((r) => r.destination_id === destinationId);
}

export function getUserReviews(userId: string): Review[] {
  const all = read<Review[]>(KEYS.reviews, []);
  return all.filter((r) => r.user_id === userId);
}

export function upsertReview(userId: string, authorName: string, destinationId: string, rating: number, comment: string): Review {
  const all = read<Review[]>(KEYS.reviews, []);
  const existing = all.findIndex((r) => r.user_id === userId && r.destination_id === destinationId);
  const review: Review = {
    id: existing >= 0 ? all[existing].id : uid(),
    user_id: userId,
    destination_id: destinationId,
    rating,
    comment,
    created_at: existing >= 0 ? all[existing].created_at : new Date().toISOString(),
    authorName,
  };
  if (existing >= 0) {
    all[existing] = review;
  } else {
    all.push(review);
  }
  write(KEYS.reviews, all);
  return review;
}
