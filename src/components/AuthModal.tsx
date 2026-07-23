import { useState } from 'react';
import { X, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'signup';

export default function AuthModal({
  open,
  mode: initialMode,
  onClose,
}: {
  open: boolean;
  mode: Mode;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error);
      else onClose();
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else onClose();
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      data-testid="auth-modal-overlay"
    >
      <div
        className="w-full max-w-md rounded-4xl border border-stone-200 bg-white p-8 shadow-float animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        data-testid="auth-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-serif text-2xl font-bold text-stone-900">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          {mode === 'signup'
            ? 'Join Wanderlust to save favorites and plan trips.'
            : 'Sign in to access your trips and favorites.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Traveler"
                  required
                  data-testid="auth-name-input"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                data-testid="auth-email-input"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                data-testid="auth-password-input"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 pl-12 pr-4 text-sm font-medium text-stone-800 transition-all placeholder:text-stone-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-600" data-testid="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
            data-testid="auth-submit"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-stone-500">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setMode(mode === 'signup' ? 'login' : 'signup');
              setError(null);
            }}
            className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
            data-testid="auth-toggle-mode"
          >
            {mode === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
