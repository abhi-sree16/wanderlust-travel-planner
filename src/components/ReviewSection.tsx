import { useState, useEffect } from 'react';
import { Star, Loader2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import * as store from '@/lib/store';
import type { Review } from '@/lib/types';

export default function ReviewSection({
  destinationId,
  onRequireAuth,
}: {
  destinationId: string;
  onRequireAuth: () => void;
}) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setReviews(store.getReviews(destinationId));
  }, [destinationId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }
    if (!comment.trim()) return;
    setLoading(true);
    const newReview = store.addReview({
      destination_id: destinationId,
      user_id: user.id,
      user_name: user.full_name,
      rating,
      comment: comment.trim(),
    });
    setReviews((prev) => [newReview, ...prev]);
    setComment('');
    setRating(5);
    setShowForm(false);
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900">
          <MessageSquare className="h-4 w-4 text-primary-500" />
          Reviews ({reviews.length})
        </h3>
        <button
          onClick={() => (user ? setShowForm((v) => !v) : onRequireAuth())}
          className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
          data-testid="review-toggle-form"
        >
          {showForm ? 'Cancel' : 'Write a review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mt-4 space-y-3 rounded-3xl border border-stone-200 bg-stone-50 p-4" data-testid="review-form">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-600">Rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                data-testid={`review-star-${n}`}
              >
                <Star
                  className={`h-5 w-5 transition-colors ${
                    n <= rating ? 'fill-accent-400 text-accent-400' : 'text-stone-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your experience..."
            required
            data-testid="review-comment-input"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button type="submit" disabled={loading} className="btn-primary" data-testid="review-submit">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            Submit Review
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="mt-4 space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl border border-stone-200 bg-white p-4" data-testid={`review-item-${review.id}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-stone-800">{review.user_name}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-accent-400 text-accent-400' : 'text-stone-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-stone-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
