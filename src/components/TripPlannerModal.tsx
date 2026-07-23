import { useState } from 'react';
import { X, Loader2, Calendar, Users, Wallet, MapPin, Tag } from 'lucide-react';
import * as store from '@/lib/store';
import { useAuth } from '@/context/AuthContext';
import type { Destination } from '@/lib/types';

const INTEREST_OPTIONS = ['Adventure', 'Culture', 'Food', 'Nature', 'Relaxation', 'Photography', 'History', 'Nightlife'];

export default function TripPlannerModal({
  open,
  dest,
  onClose,
  onRequireAuth,
  onSaved,
}: {
  open: boolean;
  dest: Destination | null;
  onClose: () => void;
  onRequireAuth: () => void;
  onSaved: () => void;
}) {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(dest?.price?.toString() ?? '');
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open || !dest) return null;

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select travel dates');
      return;
    }
    setLoading(true);
    setError(null);

    store.createTrip(user.id, {
      destination_id: dest.id,
      destination_name: dest.name,
      start_date: startDate,
      end_date: endDate,
      travelers,
      budget: parseFloat(budget) || 0,
      interests,
      notes: notes.trim() || null,
      status: 'planned',
    });

    setSuccess(true);
    setTimeout(() => {
      onSaved();
      onClose();
      setSuccess(false);
      setStartDate('');
      setEndDate('');
      setNotes('');
      setInterests([]);
    }, 1500);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      data-testid="trip-planner-overlay"
    >
      <div
        className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-4xl border border-stone-200 bg-white p-8 shadow-float animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        data-testid="trip-planner-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-stone-900">Plan a Trip</h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="h-4 w-4 text-primary-500" />
          {dest.name}, {dest.country}
        </p>

        {success ? (
          <div className="mt-6 rounded-3xl bg-success-50 px-6 py-8 text-center" data-testid="trip-planner-success">
            <p className="font-serif text-lg font-bold text-success-700">Trip saved successfully!</p>
            <p className="mt-1 text-sm text-success-600">Check your dashboard to view this trip.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    data-testid="trip-start-date"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    data-testid="trip-end-date"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    data-testid="trip-travelers"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Budget ($)
                </label>
                <div className="relative">
                  <Wallet className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                  <input
                    type="number"
                    min={0}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    data-testid="trip-budget"
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                <Tag className="mr-1 inline h-3.5 w-3.5" />
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    data-testid={`trip-interest-${interest.toLowerCase()}`}
                    className={`chip ${
                      interests.includes(interest)
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-primary-300 hover:text-primary-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Any special requests or notes..."
                data-testid="trip-notes"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {error && (
              <p className="rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-600" data-testid="trip-error">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full" data-testid="trip-submit">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Save Trip Plan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
