import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import AnimatedMenuIcon from './icons/AnimatedMenuIcon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const NavLink: React.FC<{ page?: Page; currentPage?: Page; setCurrentPage?: (page: Page) => void; onClick?: () => void; children: React.ReactNode; isMobile?: boolean; icon?: string }> = ({ page, currentPage, setCurrentPage, onClick, children, isMobile, icon }) => {
  const isActive = currentPage === page;
  const baseClasses = 'cursor-pointer transition-colors duration-300 font-medium';
  const mobileClasses = 'block py-4 text-lg flex items-center gap-3';
  const desktopClasses = 'py-2';
  const activeClasses = 'text-pastel-pink';
  const inactiveClasses = 'hover:text-pastel-pink';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (page && setCurrentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <a
      onClick={handleClick}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {isMobile && icon && <span className="text-2xl">{icon}</span>}
      {children}
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, isAdmin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const baseNavItems: Page[] = ['Home', 'Profile', 'Gallery', 'Media', 'Events'];
  // Only show AdminDashboard in menu if user is logged in
  const navItems: Page[] = isAdmin ? [...baseNavItems, 'AdminDashboard'] : baseNavItems;
  
  const menuIcons: Record<Page, string> = {
    'Home': '🏠',
    'Profile': '👤',
    'Gallery': '📷',
    'Media': '🎬',
    'Events': '🎉',
    'AdminDashboard': '⚙️',
    'AdminLogin': '🔐'
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [currentPage]);

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
             <a onClick={() => setCurrentPage('Home')} className="cursor-pointer text-2xl font-bold font-heading text-text-dark tracking-wider">
                Oline Manuel
            </a>
          </div>
          <nav className="hidden md:flex items-center md:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item} page={item} currentPage={currentPage} setCurrentPage={setCurrentPage}>{item === 'AdminDashboard' ? 'Admin' : item}</NavLink>
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
              {navItems.map((item) => (
                <NavLink key={item} page={item} currentPage={currentPage} setCurrentPage={setCurrentPage} isMobile icon={menuIcons[item]}>{item === 'AdminDashboard' ? 'Admin' : item}</NavLink>
              ))}
               {isAdmin && <NavLink onClick={onLogout} isMobile icon="🚪">Logout</NavLink>}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;