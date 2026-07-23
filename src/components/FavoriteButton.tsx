import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import * as store from '@/lib/store';

export default function FavoriteButton({
  destinationId,
  onRequireAuth,
}: {
  destinationId: string;
  onRequireAuth: () => void;
}) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFav(store.isFavorite(user.id, destinationId));
    }
  }, [user, destinationId]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onRequireAuth();
      return;
    }
    const nowFav = store.toggleFavorite(user.id, destinationId);
    setIsFav(nowFav);
  };

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-700 backdrop-blur transition-all hover:scale-110 hover:text-error-500"
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      data-testid={`favorite-button-${destinationId}`}
    >
      <Heart
        className={`h-4.5 w-4.5 transition-all ${isFav ? 'fill-error-500 text-error-500' : 'text-stone-600'}`}
      />
    </button>
  );
}
