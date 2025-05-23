
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import { useTheme } from '@/contexts/ThemeContext';
import ContactModal from '@/components/ContactModal';
import { Switch } from '@/components/ui/switch';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About Us', path: '/about' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };
  
  return (
    <>
      <nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
          scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purpleAccent to-blueAccent rounded-full 
                             group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-1 bg-brand-950 rounded-full flex items-center justify-center
                             group-hover:scale-90 transition-transform duration-300">
                <span className="font-bold text-white text-sm">FF</span>
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-white transition-colors duration-300">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
                Fact
              </span>
              Fusion
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'relative py-2 px-1 text-sm font-medium transition-colors duration-300 hover:text-white',
                  isActive(item.path) 
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purpleAccent after:to-blueAccent' 
                    : 'text-gray-300'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">{theme === 'dark' ? 'Dark' : 'Light'}</span>
              <Switch 
                checked={theme === 'light'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-purpleAccent"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              />
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-gray-400" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 ripple-btn"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? user?.name || 'Dashboard' : 'Get Started'}
            </Button>

            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
              onClick={handleContactClick}
            >
              Contact Us
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Switch 
                checked={theme === 'light'}
                onCheckedChange={toggleTheme}
                size="sm"
                className="data-[state=checked]:bg-purpleAccent"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              />
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-gray-400" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </div>
            
            <button className="p-2" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white animate-fade-in" />
              ) : (
                <Menu className="w-6 h-6 text-white animate-fade-in" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md shadow-lg animate-slide-in-bottom">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300',
                    isActive(item.path) 
                      ? 'bg-secondary text-white' 
                      : 'text-gray-300 hover:bg-secondary/50 hover:text-white',
                    `animate-fade-in animate-delay-${index * 100}`
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                className="animate-fade-in animate-delay-400 bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 ripple-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetStarted();
                }}
              >
                {isAuthenticated ? user?.name || 'Dashboard' : 'Get Started'}
              </Button>

              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white animate-fade-in animate-delay-500"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleContactClick();
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </nav>
      
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactModal && (
          <ContactModal onClose={() => setShowContactModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
