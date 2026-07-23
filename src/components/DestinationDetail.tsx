import { useEffect, useState } from 'react';
import { Star, X, Clock, Calendar, Wallet, MapPin, Tag, Map as MapIcon } from 'lucide-react';
import SmartImage from './SmartImage';
import MapView from './MapView';
import FavoriteButton from './FavoriteButton';
import ReviewSection from './ReviewSection';
import TripPlannerModal from './TripPlannerModal';
import type { Destination } from '@/lib/types';

const budgetLabels: Record<string, string> = {
  budget: 'Budget-friendly',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

export default function DestinationDetail({
  dest,
  onClose,
  onRequireAuth,
}: {
  dest: Destination;
  onClose: () => void;
  onRequireAuth: () => void;
}) {
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-stone-950/60 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      data-testid="destination-detail-overlay"
    >
      <div
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-4xl bg-white shadow-float animate-fade-up sm:rounded-4xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="destination-detail-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-700 backdrop-blur transition-colors hover:bg-white hover:text-stone-900"
          aria-label="Close details"
          data-testid="destination-detail-close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-56 shrink-0 sm:h-72">
          <SmartImage
            src={dest.image}
            alt={`${dest.name}, ${dest.country}`}
            className="h-full w-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur">
                {dest.category}
              </span>
              <FavoriteButton destinationId={dest.id} onRequireAuth={onRequireAuth} />
            </div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              {dest.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-200">
              <MapPin className="h-4 w-4" />
              {dest.country}, {dest.region}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Star} label="Rating" value={`${dest.rating} (${dest.reviews.toLocaleString()})`} />
            <Stat icon={Clock} label="Duration" value={dest.duration} />
            <Stat icon={Calendar} label="Best Time" value={dest.bestTimeToVisit} />
            <Stat icon={Wallet} label="Budget" value={budgetLabels[dest.budgetTier] ?? dest.budgetTier} />
          </div>

          {dest.latitude != null && dest.longitude != null && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900">
                  <MapIcon className="h-4 w-4 text-primary-500" />
                  Location
                </h3>
                <button
                  onClick={() => setShowMap((v) => !v)}
                  className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  data-testid="destination-detail-toggle-map"
                >
                  {showMap ? 'Hide map' : 'View on Map'}
                </button>
              </div>
              {showMap ? (
                <MapView dest={dest} className="mt-3 h-64 w-full" />
              ) : (
                <p className="mt-2 text-sm text-stone-500">
                  {dest.latitude.toFixed(4)}°, {dest.longitude.toFixed(4)}°
                </p>
              )}
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-serif text-lg font-bold text-stone-900">Overview</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{dest.blurb}</p>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-3xl bg-primary-50 px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">Estimated Price</p>
              <p className="font-serif text-2xl font-bold text-primary-800">
                ${dest.price.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-primary-500">/ person</span>
              </p>
            </div>
            <button
              onClick={() => setShowTripPlanner(true)}
              className="btn-primary"
              data-testid="destination-detail-plan"
            >
              Plan This Trip
            </button>
          </div>

          <div className="mt-6">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900">
              <Tag className="h-4 w-4 text-primary-500" />
              Travel Highlights
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {dest.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ReviewSection destinationId={dest.id} onRequireAuth={onRequireAuth} />
        </div>
      </div>

      <TripPlannerModal
        open={showTripPlanner}
        dest={dest}
        onClose={() => setShowTripPlanner(false)}
        onRequireAuth={onRequireAuth}
        onSaved={() => {}}
      />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Star; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-stone-800">{value}</div>
    </div>
  );
}
