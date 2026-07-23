import { ArrowUpRight, Clock } from 'lucide-react';
import SmartImage from './SmartImage';
import { inspirationArticles } from '@/data/destinations';

export default function TravelInspiration() {
  return (
    <section id="inspiration" className="py-22 lg:py-30">
      <div className="section-shell">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Travel Inspiration</span>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-stone-900 text-balance sm:text-5xl">
              Stories, guides, and ideas for the curious traveler
            </h2>
          </div>
          <button className="btn-ghost group self-start lg:self-auto" data-testid="inspiration-read-journal">
            Read the journal
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {inspirationArticles.map((article) => (
            <article
              key={article.id}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float"
              data-testid={`inspiration-card-${article.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} read
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold leading-snug text-stone-900 group-hover:text-primary-700">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
