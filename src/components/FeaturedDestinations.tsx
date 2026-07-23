import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import DestinationCard from './DestinationCard';
import DestinationDetail from './DestinationDetail';
import { destinations } from '@/data/destinations';
import type { Destination } from '@/lib/types';

export default function FeaturedDestinations({ onRequireAuth }: { onRequireAuth: () => void }) {
  const [selected, setSelected] = useState<Destination | null>(null);

  const featured = [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <section id="destinations" className="py-22 lg:py-30">
      <div className="section-shell">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Featured Destinations</span>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 text-balance sm:text-5xl">
              Places that stay with you long after you leave
            </h2>
          </div>
          <button
            onClick={() => document.querySelector('#explorer')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost group self-start lg:self-auto"
            data-testid="featured-view-all"
          >
            View all destinations
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} onView={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <DestinationDetail dest={selected} onClose={() => setSelected(null)} onRequireAuth={onRequireAuth} />
      )}
    </section>
  );
}
