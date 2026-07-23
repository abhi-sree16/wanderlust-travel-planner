import { Clock, MapPin, ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { experiences } from '@/data/destinations';

export default function PopularExperiences() {
  return (
    <section id="experiences" className="bg-stone-900 py-22 lg:py-30">
      <div className="section-shell">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow !text-accent-300">Popular Experiences</span>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-white text-balance sm:text-5xl">
              Adventures worth crossing the world for
            </h2>
            <p className="mt-4 max-w-lg text-stone-400">
              Beyond the sights, it's the experiences that transform a trip into
              a memory. Here are the ones our travelers can't stop talking about.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="group relative overflow-hidden rounded-4xl bg-stone-800 transition-all duration-500 hover:-translate-y-1.5"
              data-testid={`experience-card-${exp.id}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <SmartImage
                  src={exp.image}
                  alt={exp.title}
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-accent-400/90 px-3 py-1 text-xs font-semibold text-stone-900 backdrop-blur">
                  {exp.category}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-1.5 text-xs text-stone-300">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-tight text-white">
                    {exp.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-300">
                      <Clock className="h-3.5 w-3.5" />
                      {exp.duration}
                    </div>
                    <div className="font-serif text-lg font-bold text-accent-300">
                      ${exp.price}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-stone-900 transition-all duration-300 hover:bg-accent-300 hover:shadow-float active:scale-[0.98]"
            data-testid="experiences-browse-all"
          >
            Browse all experiences
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
