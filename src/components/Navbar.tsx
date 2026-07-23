import { useState, useEffect } from 'react';
import { Compass, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar({
  onAuthClick,
  onDashboard,
  onHome,
}: {
  onAuthClick: (mode: 'login' | 'signup') => void;
  onDashboard: () => void;
  onHome: () => void;
}) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', target: 'destinations' },
    { label: 'Experiences', target: 'experiences' },
    { label: 'Inspiration', target: 'inspiration' },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex items-center justify-between py-4">
        <button onClick={onHome} className="flex items-center gap-2.5" data-testid="navbar-logo">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-transform hover:scale-105`}>
            <Compass className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className={`font-serif text-2xl font-bold transition-colors ${scrolled ? 'text-stone-900' : 'text-white'}`}>
            Wanderlust
          </span>
        </button>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className={`text-sm font-semibold transition-colors ${
                scrolled ? 'text-stone-600 hover:text-primary-700' : 'text-stone-200 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <button
                onClick={onDashboard}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                data-testid="navbar-dashboard"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </button>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-stone-600 transition-colors hover:text-error-600"
                data-testid="navbar-signout"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onAuthClick('login')}
                className={`text-sm font-semibold transition-colors ${
                  scrolled ? 'text-stone-700 hover:text-primary-700' : 'text-stone-200 hover:text-white'
                }`}
                data-testid="navbar-signin"
              >
                Sign In
              </button>
              <button
                onClick={() => onAuthClick('signup')}
                className="btn-primary"
                data-testid="navbar-signup"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? 'text-stone-800' : 'text-white'}`}
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="section-shell space-y-3 bg-white/95 pb-6 pt-2 shadow-soft backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="block w-full text-left text-sm font-semibold text-stone-700 hover:text-primary-700"
              >
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <button onClick={onDashboard} className="block w-full text-left text-sm font-semibold text-stone-700">
                  Dashboard
                </button>
                <button onClick={signOut} className="block w-full text-left text-sm font-semibold text-error-600">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setMenuOpen(false); onAuthClick('login'); }} className="block w-full text-left text-sm font-semibold text-stone-700">
                  Sign In
                </button>
                <button onClick={() => { setMenuOpen(false); onAuthClick('signup'); }} className="block w-full text-left text-sm font-semibold text-primary-700">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
