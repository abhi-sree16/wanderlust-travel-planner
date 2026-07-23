import { ArrowRight, Star, MapPin } from 'lucide-react';
import SmartImage from './SmartImage';
import { heroImage } from '@/data/destinations';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage
          src={heroImage}
          alt="Dramatic mountain landscape at sunset"
          className="h-full w-full"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 section-shell flex min-h-[100svh] flex-col justify-end pb-20 pt-32 lg:justify-center lg:pb-32">
        <div className="max-w-3xl">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-accent-300 text-accent-300" />
              Curated by 500+ travel experts
            </span>
          </div>

          <h1
            className="mt-6 animate-fade-up font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ animationDelay: '0.2s' }}
          >
            The world is
            <br />
            <span className="italic text-accent-200">your story</span> to tell
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-stone-200 sm:text-xl"
            style={{ animationDelay: '0.35s' }}
          >
            Discover handpicked destinations, immersive experiences, and travel
            guides crafted for the curious. Your next adventure begins here.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.5s' }}
          >
            <button
              onClick={() => document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-base"
              data-testid="hero-explore"
            >
              Explore Destinations
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline !border-white/30 !bg-white/10 !text-white hover:!border-white/50 hover:!bg-white/20"
              data-testid="hero-search"
            >
              <MapPin className="h-5 w-5" />
              Search by Location
            </button>
          </div>
        </div>

        <div
          className="mt-16 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8 lg:mt-24"
          style={{ animationDelay: '0.65s' }}
        >
          {[
            { value: '120+', label: 'Destinations' },
            { value: '50K+', label: 'Happy Travelers' },
            { value: '4.9', label: 'Avg. Rating' },
            { value: '24/7', label: 'Trip Support' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wider text-stone-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
