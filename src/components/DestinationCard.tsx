import { Star, ArrowUpRight, Clock, Calendar, Wallet } from 'lucide-react';
import SmartImage from './SmartImage';
import type { Destination } from '@/lib/types';

const budgetLabels: Record<string, string> = {
  budget: 'Budget',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

export default function DestinationCard({
  dest,
  index = 0,
  onView,
}: {
  dest: Destination;
  index?: number;
  onView: (dest: Destination) => void;
}) {
  return (
    <article
      className="group flex animate-fade-up flex-col overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float"
      style={{ animationDelay: `${index * 0.06}s` }}
      data-testid={`destination-card-${dest.id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur">
          {dest.category}
        </span>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-stone-950/50 px-3 py-1.5 backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-accent-300 text-accent-300" />
          <span className="text-sm font-semibold text-white">{dest.rating}</span>
          <span className="text-xs text-stone-300">({dest.reviews.toLocaleString()})</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">{dest.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-stone-500">{dest.country} · {dest.region}</p>
          </div>
          <div className="text-right">
            <div className="font-serif text-lg font-bold text-primary-700">${dest.price.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-stone-400">
              <Clock className="h-3 w-3" />
              {dest.duration}
            </div>
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{dest.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary-500" />
            {dest.bestTimeToVisit}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-primary-500" />
            {budgetLabels[dest.budgetTier] ?? dest.budgetTier}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {dest.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onView(dest)}
          data-testid={`destination-view-${dest.id}`}
          className="mt-5 flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition-all group-hover:border-primary-300 group-hover:bg-primary-50 group-hover:text-primary-700"
        >
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
