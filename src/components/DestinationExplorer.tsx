import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, Compass } from 'lucide-react';
import DestinationCard from './DestinationCard';
import DestinationDetail from './DestinationDetail';
import { destinations as allDestinations } from '@/data/destinations';
import type { Destination } from '@/lib/types';

type Filters = {
  region: string;
  budget: string;
  style: string;
  rating: number;
};

const defaultFilters: Filters = { region: 'All', budget: 'All', style: 'All', rating: 0 };

export default function DestinationExplorer({
  searchQuery,
  setSearchQuery,
  onRequireAuth,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onRequireAuth: () => void;
}) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Destination | null>(null);

  const regions = useMemo(() => ['All', ...Array.from(new Set(allDestinations.map((d) => d.region)))], []);
  const budgetOptions = ['All', 'budget', 'mid-range', 'luxury'];
  const styleOptions = ['All', 'Beaches', 'Mountains', 'Cities', 'Cultural', 'Islands', 'Deserts'];

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allDestinations.filter((d) => {
      if (filters.region !== 'All' && d.region !== filters.region) return false;
      if (filters.budget !== 'All' && d.budgetTier !== filters.budget) return false;
      if (filters.style !== 'All' && d.category !== filters.style) return false;
      if (filters.rating > 0 && d.rating < filters.rating) return false;
      if (q) {
        const haystack = `${d.name} ${d.country} ${d.region} ${d.category} ${d.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [searchQuery, filters]);

  const activeFilterCount = [
    filters.region !== 'All',
    filters.budget !== 'All',
    filters.style !== 'All',
    filters.rating > 0,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  return (
    <section id="explorer" className="bg-stone-100/60 py-22 lg:py-30">
      <div className="section-shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Destination Explorer</span>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 text-balance sm:text-5xl">
            Find your perfect destination
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            Search across {allDestinations.length} curated places or filter by region,
            budget, travel style, and rating.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, country, or activity..."
              aria-label="Search destinations"
              data-testid="explorer-search-input"
              className="w-full rounded-2xl border border-stone-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all placeholder:text-stone-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                aria-label="Clear search"
                data-testid="explorer-search-clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-semibold transition-all ${
              showFilters || activeFilterCount > 0
                ? 'border-primary-500 bg-primary-600 text-white'
                : 'border-stone-200 bg-white text-stone-700 hover:border-primary-300 hover:text-primary-700'
            }`}
            data-testid="explorer-filters-toggle"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-primary-700">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 animate-fade-in rounded-4xl border border-stone-200 bg-white p-6 shadow-soft">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FilterGroup label="Region">
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <FilterChip
                      key={r}
                      active={filters.region === r}
                      onClick={() => setFilters((f) => ({ ...f, region: r }))}
                      testId={`filter-region-${r.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {r}
                    </FilterChip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Budget">
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <FilterChip
                      key={b}
                      active={filters.budget === b}
                      onClick={() => setFilters((f) => ({ ...f, budget: b }))}
                      testId={`filter-budget-${b}`}
                    >
                      {b === 'All' ? 'All Budgets' : b}
                    </FilterChip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Travel Style">
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((s) => (
                    <FilterChip
                      key={s}
                      active={filters.style === s}
                      onClick={() => setFilters((f) => ({ ...f, style: s }))}
                      testId={`filter-style-${s}`}
                    >
                      {s === 'All' ? 'All Styles' : s}
                    </FilterChip>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label="Min Rating">
                <div className="flex flex-wrap gap-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <FilterChip
                      key={r}
                      active={filters.rating === r}
                      onClick={() => setFilters((f) => ({ ...f, rating: r }))}
                      testId={`filter-rating-${r}`}
                    >
                      {r === 0 ? 'Any' : `${r}+`}
                    </FilterChip>
                  ))}
                </div>
              </FilterGroup>
            </div>

            {activeFilterCount > 0 && (
              <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
                <span className="text-sm text-stone-500">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
                <button
                  onClick={resetFilters}
                  className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  data-testid="explorer-filters-reset"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-sm font-medium text-stone-500" data-testid="explorer-results-count">
          {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'} found
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-4xl border border-stone-200 bg-white px-6 py-16 text-center" data-testid="explorer-empty">
            <Compass className="h-12 w-12 text-stone-300" />
            <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">No destinations found</h3>
            <p className="mt-2 max-w-sm text-sm text-stone-600">
              Try adjusting your search or filters to discover more places.
            </p>
            <button onClick={resetFilters} className="btn-outline mt-6" data-testid="explorer-clear-filters">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((dest, idx) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                index={idx}
                onView={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DestinationDetail dest={selected} onClose={() => setSelected(null)} onRequireAuth={onRequireAuth} />
      )}
    </section>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</h3>
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`chip ${
        active
          ? 'border-primary-600 bg-primary-600 text-white'
          : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-primary-300 hover:text-primary-700'
      }`}
    >
      {children}
    </button>
  );
}
