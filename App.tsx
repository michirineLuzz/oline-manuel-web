import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GalleryPage from './pages/GalleryPage';
import MediaPage from './pages/MediaPage';
import EventsPage from './pages/EventsPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { supabase } from './lib/supabase';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAdmin(true);
      }
    });
  }, []);

  // Handle hash-based routing for /admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove '#' prefix
      if (hash === 'admin') {
        setCurrentPage(isAdmin ? 'AdminDashboard' : 'AdminLogin');
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdmin]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleSetPage = (page: Page) => {
    setCurrentPage(page);
    // Update hash for admin pages
    if (page === 'AdminLogin' || page === 'AdminDashboard') {
      window.location.hash = 'admin';
    } else {
      // Clear hash for non-admin pages
      if (window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentPage('Home');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setCurrentPage('Home');
  };



  const renderPage = () => {
    if (currentPage === 'AdminLogin') {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    
    if (currentPage === 'AdminDashboard') {
      if (!isAdmin) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      }
      return <AdminDashboard onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'Profile':
        return <ProfilePage />;
      case 'Gallery':
        return <GalleryPage />;
      case 'Media':
        return <MediaPage />;
      case 'Events':
        return <EventsPage />;
      default:
        return <HomePage setCurrentPage={handleSetPage} />;
    }
  };

  return (
    <div className="bg-white font-body text-text-dark min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={handleSetPage} 
        isAdmin={isAdmin} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow">
         <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {renderPage()}
        </div>
      </main>
      <Footer setCurrentPage={handleSetPage} />
    </div>
  );
};

export default App;