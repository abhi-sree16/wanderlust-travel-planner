import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationSearch from '@/components/DestinationSearch';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import DestinationExplorer from '@/components/DestinationExplorer';
import PopularExperiences from '@/components/PopularExperiences';
import TravelInspiration from '@/components/TravelInspiration';
import Footer from '@/components/Footer';
import TravelAssistant from '@/components/TravelAssistant';
import AuthModal from '@/components/AuthModal';
import Dashboard from '@/components/Dashboard';

type View = 'home' | 'dashboard';

function AppContent() {
  const { user } = useAuth();
  const [view, setView] = useState<View>('home');
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login',
  });

  const openAuth = (mode: 'login' | 'signup') => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal({ open: false, mode: 'login' });

  const requireAuth = () => openAuth('login');

  const goToDashboard = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (authModal.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [authModal.open]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        onAuthClick={openAuth}
        onDashboard={goToDashboard}
        onHome={goToHome}
      />

      {view === 'home' && (
        <main>
          <Hero />
          <DestinationSearch />
          <FeaturedDestinations onRequireAuth={requireAuth} />
          <DestinationExplorer onRequireAuth={requireAuth} />
          <PopularExperiences />
          <TravelInspiration />
        </main>
      )}

      {view === 'dashboard' && user && (
        <main>
          <Dashboard onNavigate={(section) => { if (section === 'home') goToHome(); }} />
        </main>
      )}

      <Footer />
      <TravelAssistant />

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={closeAuth}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
