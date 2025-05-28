import React from 'react';
import { Globe, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white/80 py-8" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:pr-8">
            <h3 className="font-bold text-white text-lg mb-4">DICS International English Camp</h3>
            <p className="mb-4">
              A life-changing experience of faith and language for students in the Daegu-Gyeongsan region.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">About the Camp</a></li>
              <li><a href="#highlights" className="hover:text-yellow-400 transition-colors">Camp Highlights</a></li>
              <li><a href="#schedule" className="hover:text-yellow-400 transition-colors">Schedule</a></li>
              <li><a href="#register" className="hover:text-yellow-400 transition-colors">Registration</a></li>
              <li className="flex items-center">
                <span>DICS School</span>
                <a 
                  href="https://dics.co.kr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 hover:text-yellow-400 transition-colors"
                  aria-label="DICS School Website"
                >
                  <Globe size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/dics_official/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 hover:text-yellow-400 transition-colors"
                  aria-label="DICS School Instagram"
                >
                  <Instagram size={16} />
                </a>
              </li>
              <li className="flex items-center">
                <span>WOLBI Jeju</span>
                <a 
                  href="https://www.wolbijeju.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 hover:text-yellow-400 transition-colors"
                  aria-label="WOLBI Jeju Website"
                >
                  <Globe size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/wolbijeju/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 hover:text-yellow-400 transition-colors"
                  aria-label="WOLBI Jeju Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="https://www.youtube.com/@wordoflifebibleinstituteje1608" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 hover:text-yellow-400 transition-colors"
                  aria-label="WOLBI Jeju YouTube"
                >
                  <Youtube size={16} />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:pl-8">
            <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a 
                  href="https://naver.me/Fswn0DLR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors"
                >
                  DICS Campus, Daegu-Gyeongsan
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:053-812-1855" className="hover:text-yellow-400 transition-colors">
                  053-812-1855
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@dicscamp.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DICS International Camp. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a> | 
            <a href="#" className="hover:text-yellow-400 transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;