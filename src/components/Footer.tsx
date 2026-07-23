import { Compass, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  Explore: ['Destinations', 'Experiences', 'Inspiration', 'Travel Guides'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Contact'],
  Support: ['Help Center', 'Booking Terms', 'Privacy Policy', 'Cookie Settings'],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer id="about" className="border-t border-stone-800 bg-stone-950 text-stone-400">
      <div className="section-shell border-b border-stone-800 py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white text-balance sm:text-4xl">
              Let the world come to your inbox
            </h2>
            <p className="mt-3 max-w-md text-stone-400">
              Get curated travel guides, insider tips, and exclusive offers.
              No spam, just wanderlust.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
            data-testid="footer-newsletter-form"
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email address"
                data-testid="footer-newsletter-input"
                className="w-full rounded-2xl border border-stone-700 bg-stone-900 py-3.5 pl-12 pr-4 text-sm font-medium text-white transition-all placeholder:text-stone-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-900"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-500 active:scale-[0.98]"
              data-testid="footer-newsletter-submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="section-shell py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <a href="#home" className="flex items-center gap-2.5" aria-label="Wanderlust home" data-testid="footer-logo">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white">
                <Compass className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-serif text-2xl font-bold text-white">Wanderlust</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Curated travel experiences for the curious. Discover the world one
              story at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all hover:border-primary-500 hover:bg-primary-600 hover:text-white"
                >
                  <social.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-testid={`footer-link-${heading.toLowerCase()}-${link.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-sm text-stone-400 transition-colors hover:text-primary-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="section-shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Wanderlust. Crafted for the curious traveler.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="transition-colors hover:text-primary-400" data-testid="footer-terms">Terms</a>
            <a href="#" className="transition-colors hover:text-primary-400" data-testid="footer-privacy">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary-400" data-testid="footer-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
