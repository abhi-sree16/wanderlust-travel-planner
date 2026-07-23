import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationSearch from '@/components/DestinationSearch';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import DestinationExplorer from '@/components/DestinationExplorer';
import DestinationDetail from '@/components/DestinationDetail';
import PopularExperiences from '@/components/PopularExperiences';
import TravelInspiration from '@/components/TravelInspiration';
import Footer from '@/components/Footer';
import TravelAssistant from '@/components/TravelAssistant';
import AuthModal from '@/components/AuthModal';
import Dashboard from '@/components/Dashboard';
import TripPlannerModal from '@/components/TripPlannerModal';
import { useAuth } from '@/context/AuthContext';
import type { Destination } from '@/lib/types';

export default function App() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login',
  });
  const [tripPlannerDest, setTripPlannerDest] = useState<Destination | null>(null);
  const [view, setView] = useState<'home' | 'dashboard'>('home');

  const requireAuth = useCallback(() => {
    setAuthModal({ open: true, mode: 'login' });
  }, []);

  const goHome = useCallback(() => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goDashboard = useCallback(() => {
    if (!user) {
      requireAuth();
      return;
    }
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user, requireAuth]);

  const navigateToSection = useCallback((section: string) => {
    if (view === 'dashboard') setView('home');
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [view]);

  useEffect(() => {
    if (selectedDest || authModal.open || tripPlannerDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedDest, authModal.open, tripPlannerDest]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onAuthClick={(mode) => setAuthModal({ open: true, mode })}
        onDashboard={goDashboard}
        onHome={goHome}
      />

      {view === 'dashboard' && user ? (
        <Dashboard onNavigate={(s) => (s === 'home' ? goHome() : navigateToSection(s))} />
      ) : (
        <main>
          <Hero />
          <DestinationSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <FeaturedDestinations onRequireAuth={requireAuth} />
          <DestinationExplorer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRequireAuth={requireAuth}
          />
          <PopularExperiences />
          <TravelInspiration />
        </main>
      )}

      <Footer />
      <TravelAssistant />

      {selectedDest && (
        <DestinationDetail
          dest={selectedDest}
          onClose={() => setSelectedDest(null)}
          onRequireAuth={requireAuth}
        />
      )}

      <TripPlannerModal
        open={!!tripPlannerDest}
        dest={tripPlannerDest}
        onClose={() => setTripPlannerDest(null)}
        onRequireAuth={requireAuth}
        onSaved={() => {}}
      />

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
      />
    </div>
  );
}
