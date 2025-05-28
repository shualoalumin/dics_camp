import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Register', href: '#register' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleBannerDismiss = () => {
    const banner = document.querySelector('.banner-container');
    banner?.classList.add('slide-up');
    
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  return (
    <>
      {showBanner && (
        <div className="banner-container fixed w-full z-50 transition-transform duration-300">
          <div className="bg-yellow-500 text-gray-900">
            <div className="container mx-auto px-4 py-2 text-center font-semibold text-sm">
              <span className="animate-pulse inline-block">🔥</span>{' '}
              Registration opens June 2nd (Monday) - Limited spots available!{' '}
              <a href="#register" className="underline hover:text-yellow-900 transition-colors">Register early</a>
              <button
                onClick={handleBannerDismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-yellow-900 transition-colors"
                aria-label="Close banner"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <header 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
        style={{
          top: showBanner ? '34px' : '0'
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className={`font-bold text-xl md:text-2xl ${isScrolled ? 'text-blue-500' : 'text-white'}`}>
              DICS International English Camp
            </h1>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`hidden md:flex items-center space-x-3 ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}>
            <button className="font-medium hover:text-yellow-400 transition-colors">EN</button>
            <span>|</span>
            <button className="font-medium hover:text-yellow-400 transition-colors">KO</button>
          </div>

          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 animate-slideDown">
            <ul className="flex flex-col space-y-3 px-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="block font-medium text-gray-800 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex space-x-4 pt-2 border-t border-gray-200 mt-2">
                <button className="font-medium text-gray-800 hover:text-blue-600">EN</button>
                <span className="text-gray-400">|</span>
                <button className="font-medium text-gray-800 hover:text-blue-600">KO</button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <div style={{ height: showBanner ? '34px' : '0' }} />
    </>
  );
};

export default Header;