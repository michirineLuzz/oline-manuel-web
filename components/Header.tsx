import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedMenuIcon from './icons/AnimatedMenuIcon';

interface HeaderProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const NavLink: React.FC<{ to?: string; onClick?: () => void; children: React.ReactNode; isMobile?: boolean; icon?: string }> = ({ to, onClick, children, isMobile, icon }) => {
  const location = useLocation();
  const isActive = to ? location.pathname === to : false;
  const baseClasses = 'transition-colors duration-300 font-medium';
  const mobileClasses = 'block py-4 text-lg flex items-center gap-3';
  const desktopClasses = 'py-2';
  const activeClasses = 'text-pastel-pink';
  const inactiveClasses = 'hover:text-pastel-pink';

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses} ${inactiveClasses}`}
      >
        {isMobile && icon && <span className="text-2xl">{icon}</span>}
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to || '/'}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {isMobile && icon && <span className="text-2xl">{icon}</span>}
      {children}
    </Link>
  );
};

const Header: React.FC<HeaderProps> = ({ isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/gallery', label: 'Gallery', icon: '📷' },
    { path: '/media', label: 'Media', icon: '🎬' },
    { path: '/events', label: 'Events', icon: '🎉' },
  ];

  const adminNavItem = { path: '/admin', label: 'Admin', icon: '⚙️' };
  const allNavItems = isAdmin ? [...navItems, adminNavItem] : navItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const location = useLocation();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
             <Link to="/" className="text-2xl font-bold font-heading text-text-dark tracking-wider">
                Oline Manuel
            </Link>
          </div>
          <nav className="hidden md:flex items-center md:space-x-8">
            {allNavItems.map((item) => (
              <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
            ))}
            {isAdmin && <NavLink onClick={onLogout}>Logout</NavLink>}
          </nav>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-lg hover:bg-pastel-pink/10 transition-all duration-300"
            >
              <AnimatedMenuIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-pastel-pink/20 via-white to-lavender/20 backdrop-blur-sm md:hidden z-[100] overflow-y-auto animate-fade-in">
          <div className="flex justify-end items-center h-20 px-6 bg-white/80 backdrop-blur-lg border-b border-pastel-pink/20">
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-pastel-pink/10 transition-all duration-300"
              >
                  <AnimatedMenuIcon isOpen={isOpen} />
              </button>
          </div>
          <nav className="flex flex-col items-start px-8 mt-12 space-y-2">
              {allNavItems.map((item) => (
                <NavLink key={item.path} to={item.path} isMobile icon={item.icon}>{item.label}</NavLink>
              ))}
               {isAdmin && <NavLink onClick={onLogout} isMobile icon="🚪">Logout</NavLink>}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;