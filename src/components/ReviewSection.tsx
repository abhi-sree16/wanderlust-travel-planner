import { useState, useEffect } from 'react';
import { Star, Loader2, MessageSquare } from 'lucide-react';
import * as store from '@/lib/store';
import { useAuth } from '@/context/AuthContext';
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = () => {
    setLoading(true);
    setReviews(store.getReviews(destinationId));
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [destinationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }
    setSubmitting(true);
    setError(null);

    store.upsertReview(user.id, user.full_name, destinationId, rating, comment);
    setComment('');
    setRating(5);
    fetchReviews();
    setSubmitting(false);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-6" data-testid="review-section">
      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900">
        <MessageSquare className="h-4 w-4 text-primary-500" />
        Reviews {avgRating && <span className="text-sm font-normal text-stone-500">· {avgRating} avg · {reviews.length} total</span>}
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="mt-4 rounded-3xl border border-stone-200 bg-stone-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-stone-600">Your rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  data-testid={`review-star-${star}`}
                >
                  <Star className={`h-5 w-5 ${star <= rating ? 'fill-accent-400 text-accent-400' : 'text-stone-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            data-testid="review-comment-input"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-3" data-testid="review-submit">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Submit Review
          </button>
        </form>
      )}

      {!user && (
        <div className="mt-4 rounded-3xl border border-stone-200 bg-stone-50 p-5 text-center">
          <p className="text-sm text-stone-500">
            <button onClick={onRequireAuth} className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in
            </button>{' '}
            to write a review.
          </p>
        </div>
      )}

      {loading ? (
        <div className="mt-4 flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="mt-4 text-sm text-stone-400">No reviews yet. Be the first to share your experience!</p>
      ) : (
        <div className="mt-4 space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl border border-stone-200 bg-white p-4" data-testid={`review-card-${review.id}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-800">{review.authorName}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? 'fill-accent-400 text-accent-400' : 'text-stone-200'}`} />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{review.comment}</p>
              <p className="mt-2 text-xs text-stone-400">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
