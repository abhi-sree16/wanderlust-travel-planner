import { Star, MapPin, ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';
import type { Destination } from '@/lib/types';

export default function DestinationCard({
  dest,
  onView,
}: {
  dest: Destination;
  onView: (dest: Destination) => void;
}) {
  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float"
      onClick={() => onView(dest)}
      data-testid={`destination-card-${dest.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-800 backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
          {dest.rating}
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {dest.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin className="h-3.5 w-3.5" />
          {dest.country}, {dest.region}
        </div>
        <h3 className="mt-2 font-serif text-xl font-bold text-stone-900 group-hover:text-primary-700">
          {dest.name}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-stone-600 line-clamp-2">
          {dest.blurb}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
          <div>
            <span className="font-serif text-lg font-bold text-primary-700">
              ${dest.price.toLocaleString()}
            </span>
            <span className="text-xs text-stone-500"> / person</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700 transition-colors group-hover:text-primary-600">
            View
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
