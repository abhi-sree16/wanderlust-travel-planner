import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

const categories = ['All', 'Beaches', 'Mountains', 'Cities', 'Cultural', 'Islands', 'Deserts'];

export default function DestinationSearch() {
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('');

  return (
    <section id="search" className="relative z-20 -mt-12 lg:-mt-16">
      <div className="section-shell">
        <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-float sm:p-8 lg:p-10">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Find Your Journey</span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                Where will you go next?
              </h2>
            </div>
            <p className="max-w-sm text-sm text-stone-500">
              Search across 120+ curated destinations or filter by the kind of
              adventure you're craving.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="search-location" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Destination
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                <input
                  id="search-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Santorini, Bali..."
                  data-testid="search-location-input"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="search-date" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                When
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                <input
                  id="search-date"
                  type="date"
                  data-testid="search-date-input"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="search-travelers" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Travelers
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                <select
                  id="search-travelers"
                  data-testid="search-travelers-select"
                  className="w-full appearance-none rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-10 text-sm font-medium text-stone-800 transition-all focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full"
                data-testid="search-submit"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                data-testid={`search-category-${cat.toLowerCase()}`}
                className={`chip ${
                  category === cat
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-primary-300 hover:text-primary-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
