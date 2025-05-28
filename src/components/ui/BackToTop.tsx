import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        flex items-center gap-2 
        px-4 py-3
        bg-sky-500 text-white
        rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-sky-600 hover:shadow-xl hover:scale-110
        active:scale-95
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
      `}
    >
      <ArrowUp size={20} className="animate-bounce" />
      <span className="font-medium text-sm">TOP</span>
    </button>
  );
};

export default BackToTop;