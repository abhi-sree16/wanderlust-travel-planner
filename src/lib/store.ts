import type { User, TripPlan, Review } from './types';

const USERS_KEY = 'wanderlust_users';
const SESSION_KEY = 'wanderlust_session';
const FAVORITES_KEY = 'wanderlust_favorites';
const TRIPS_KEY = 'wanderlust_trips';
const REVIEWS_KEY = 'wanderlust_reviews';

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ---------- Auth ---------- */

export function getUsers(): (User & { password: string })[] {
  return read<User & { password: string }>(USERS_KEY);
}

export function signUp(email: string, password: string, fullName: string): { user: User | null; error: string | null } {
  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    return { user: null, error: 'An account with this email already exists' };
  }
  const user: User & { password: string } = {
    id: genId(),
    email,
    full_name: fullName,
    created_at: new Date().toISOString(),
    password,
  };
  users.push(user);
  write(USERS_KEY, users);
  const session: User = { id: user.id, email: user.email, full_name: user.full_name, created_at: user.created_at };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { user: session, error: null };
}

export function signIn(email: string, password: string): { user: User | null; error: string | null } {
  const users = getUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    return { user: null, error: 'Invalid email or password' };
  }
  const session: User = { id: found.id, email: found.email, full_name: found.full_name, created_at: found.created_at };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { user: session, error: null };
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ---------- Favorites ---------- */

export function getFavorites(userId: string): string[] {
  const all = read<{ user_id: string; destination_id: string }>(FAVORITES_KEY);
  return all.filter((f) => f.user_id === userId).map((f) => f.destination_id);
}

export function toggleFavorite(userId: string, destinationId: string): boolean {
  const all = read<{ user_id: string; destination_id: string }>(FAVORITES_KEY);
  const idx = all.findIndex((f) => f.user_id === userId && f.destination_id === destinationId);
  if (idx >= 0) {
    all.splice(idx, 1);
    write(FAVORITES_KEY, all);
    return false;
  }
  all.push({ user_id: userId, destination_id: destinationId });
  write(FAVORITES_KEY, all);
  return true;
}

export function isFavorite(userId: string, destinationId: string): boolean {
  return getFavorites(userId).includes(destinationId);
}

/* ---------- Trips ---------- */

export function getTrips(userId: string): TripPlan[] {
  return read<TripPlan>(TRIPS_KEY).filter((t) => t.user_id === userId);
}

export function createTrip(userId: string, data: Omit<TripPlan, 'id' | 'user_id' | 'created_at'>): TripPlan {
  const all = read<TripPlan>(TRIPS_KEY);
  const trip: TripPlan = {
    ...data,
    id: genId(),
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  all.push(trip);
  write(TRIPS_KEY, all);
  return trip;
}

export function deleteTrip(userId: string, tripId: string): void {
  const all = read<TripPlan>(TRIPS_KEY);
  write(TRIPS_KEY, all.filter((t) => t.id !== tripId && t.user_id === userId));
}

/* ---------- Reviews ---------- */

export function getReviews(destinationId: string): Review[] {
  return read<Review>(REVIEWS_KEY)
    .filter((r) => r.destination_id === destinationId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getUserReviews(userId: string): Review[] {
  return read<Review>(REVIEWS_KEY).filter((r) => r.user_id === userId);
}

export function addReview(review: Omit<Review, 'id' | 'created_at'>): Review {
  const all = read<Review>(REVIEWS_KEY);
  const newReview: Review = { ...review, id: genId(), created_at: new Date().toISOString() };
  all.push(newReview);
  write(REVIEWS_KEY, all);
  return newReview;
}
