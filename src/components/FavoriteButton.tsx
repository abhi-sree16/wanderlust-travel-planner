import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import * as store from '@/lib/store';
import { useAuth } from '@/context/AuthContext';

export default function FavoriteButton({
  destinationId,
  onRequireAuth,
}: {
  destinationId: string;
  onRequireAuth: () => void;
}) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      return;
    }
    setIsFavorite(store.isFavorite(user.id, destinationId));
  }, [user, destinationId]);

  const toggle = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setLoading(true);
    const nowFav = store.toggleFavorite(user.id, destinationId);
    setIsFavorite(nowFav);
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-all ${
        isFavorite
          ? 'bg-error-500 text-white'
          : 'bg-white/90 text-stone-400 hover:text-error-500'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      data-testid="favorite-button"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className={`h-5 w-5 ${isFavorite ? 'fill-white' : ''}`} />}
    </button>
  );
}
