import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import CurrencySelector from './CurrencySelector';
import { clearSession, getSession } from '../../utils/session';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const session = getSession();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Dashboard', path: '/exchange-dashboard', icon: 'LayoutDashboard' },
    { label: 'Create Exchange', path: '/create-exchange', icon: 'Plus' },
    { label: 'Find Partners', path: '/exchange-matching', icon: 'Users' },
  ];
  
  if (!session) {
    navigationItems.push({ label: 'Sign In', path: '/user-login', icon: 'User' });
  }

  const isActivePath = (path) => location?.pathname === path;

  const handleSignOut = () => {
    clearSession();
    setIsMobileMenuOpen(false);
    navigate('/user-login', { replace: true });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-fluid ease-fluid pt-6 px-4 pointer-events-none`}>
      <div className={`mx-auto max-w-max pointer-events-auto transition-all duration-fluid ${scrolled ? 'scale-95' : 'scale-100'}`}>
        <div className="fluid-island-nav flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/exchange-dashboard" className="flex items-center space-x-3 mr-8 group">
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-fluid group-hover:bg-primary/20">
              <Icon name="ArrowLeftRight" size={18} className="text-primary" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">SecureSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-fluid ease-fluid ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{item?.label}</span>
              </Link>
            ))}
            
            <div className="w-px h-6 bg-border mx-4 hidden lg:block" />
            
            <div className="flex items-center space-x-2">
              <CurrencySelector />
              
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-fluid"
                aria-label="Toggle Theme"
              >
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} strokeWidth={1.5} />
              </button>
              
              {session && (
                <button 
                  onClick={handleSignOut} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-destructive hover:bg-destructive/10 transition-all duration-fluid"
                >
                  <Icon name="LogOut" size={18} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-black/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Navigation Expansion */}
        <div className={`md:hidden absolute top-full left-0 right-0 mt-4 mx-4 rounded-[2rem] bg-card shadow-diffusion overflow-hidden transition-all duration-fluid ease-fluid ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} strokeWidth={1.5} />
                <span>{item?.label}</span>
              </Link>
            ))}
            {session && (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium text-destructive hover:bg-destructive/10 w-full transition-smooth"
              >
                <Icon name="LogOut" size={20} strokeWidth={1.5} />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
