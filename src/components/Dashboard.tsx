import { useState, useEffect } from 'react';
import { User, Heart, Calendar, MapPin, Wallet, Star, Trash2, Loader2 } from 'lucide-react';
import * as store from '@/lib/store';
import { useAuth } from '@/context/AuthContext';
import { destinations as allDestinations } from '@/data/destinations';
import type { Destination, TripPlan, Review } from '@/lib/types';

export default function Dashboard({ onNavigate }: { onNavigate: (section: string) => void }) {
  const { user, signOut } = useAuth();
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'profile' | 'favorites' | 'trips' | 'reviews'>('profile');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const favIds = store.getFavorites(user.id);
    setFavorites(allDestinations.filter((d) => favIds.includes(d.id)));
    setTrips(store.getTrips(user.id));
    setReviews(store.getUserReviews(user.id));
    setLoading(false);
  }, [user]);

  const deleteTrip = (tripId: string) => {
    if (!user) return;
    store.deleteTrip(user.id, tripId);
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'favorites' as const, label: 'Favorites', icon: Heart },
    { id: 'trips' as const, label: 'My Trips', icon: Calendar },
    { id: 'reviews' as const, label: 'My Reviews', icon: Star },
  ];

  return (
    <section id="dashboard" className="min-h-screen bg-stone-50 pt-28 pb-20">
      <div className="section-shell">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">Your Dashboard</span>
          <h1 className="font-serif text-4xl font-bold text-stone-900">
            Welcome back, {user?.full_name || user?.email?.split('@')[0] || 'Traveler'}
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-stone-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
              data-testid={`dashboard-tab-${t.id}`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        ) : (
          <div className="mt-8">
            {tab === 'profile' && (
              <div className="max-w-md space-y-4 rounded-3xl border border-stone-200 bg-white p-8" data-testid="dashboard-profile">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold text-stone-900">{user?.full_name || 'Traveler'}</p>
                    <p className="text-sm text-stone-500">{user?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-4">
                  <div className="text-center">
                    <p className="font-serif text-2xl font-bold text-primary-700">{favorites.length}</p>
                    <p className="text-xs text-stone-500">Favorites</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-2xl font-bold text-primary-700">{trips.length}</p>
                    <p className="text-xs text-stone-500">Trips</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-2xl font-bold text-primary-700">{reviews.length}</p>
                    <p className="text-xs text-stone-500">Reviews</p>
                  </div>
                </div>
                <button onClick={signOut} className="btn-outline w-full" data-testid="dashboard-signout">
                  Sign Out
                </button>
              </div>
            )}

            {tab === 'favorites' && (
              <div data-testid="dashboard-favorites">
                {favorites.length === 0 ? (
                  <p className="text-sm text-stone-500">No favorites yet. Browse destinations and save your favorites!</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((dest) => (
                      <div key={dest.id} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
                        <img src={dest.image} alt={dest.name} className="h-40 w-full object-cover" />
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-bold text-stone-900">{dest.name}</h3>
                          <p className="text-sm text-stone-500">{dest.country}</p>
                          <p className="mt-1 font-serif text-lg font-bold text-primary-700">${dest.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'trips' && (
              <div data-testid="dashboard-trips">
                {trips.length === 0 ? (
                  <p className="text-sm text-stone-500">No trips planned yet. Use the "Plan a Trip" button on any destination!</p>
                ) : (
                  <div className="space-y-4">
                    {trips.map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between rounded-3xl border border-stone-200 bg-white p-5" data-testid={`dashboard-trip-${trip.id}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary-500" />
                            <h3 className="font-serif text-lg font-bold text-stone-900">{trip.destination_name}</h3>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              trip.status === 'planned' ? 'bg-primary-50 text-primary-700' :
                              trip.status === 'confirmed' ? 'bg-success-50 text-success-700' :
                              'bg-stone-100 text-stone-600'
                            }`}>
                              {trip.status}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-500">
                            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {trip.start_date} → {trip.end_date}</span>
                            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {trip.travelers} travelers</span>
                            <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> ${trip.budget.toLocaleString()}</span>
                          </div>
                          {trip.interests.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {trip.interests.map((i) => (
                                <span key={i} className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">{i}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-error-50 hover:text-error-500"
                          data-testid={`trip-delete-${trip.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div data-testid="dashboard-reviews">
                {reviews.length === 0 ? (
                  <p className="text-sm text-stone-500">No reviews yet. Share your experiences on destination pages!</p>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((review) => (
                      <div key={review.id} className="rounded-3xl border border-stone-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-stone-800">Rating: {review.rating}/5</span>
                          <span className="text-xs text-stone-400">{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-2 text-sm text-stone-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button onClick={() => onNavigate('home')} className="mt-8 text-sm font-semibold text-primary-600 hover:text-primary-700" data-testid="dashboard-back-home">
          ← Back to home
        </button>
      </div>
    </section>
  );
}
