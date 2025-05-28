import React from 'react';
import { ArrowRight } from 'lucide-react';

const Special: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white" id="special">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          A New Beginning — A Historic First
        </h2>
        
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-12 text-lg">
          This is the first time the internationally recognized WOLBI English camp has reached the Daegu-Gyeongsan region. 
          It's more than just a camp — it's a movement of faith and global learning, and you're invited to be part of this exciting new chapter.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 md:w-72 text-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl mb-4 block">🏝️</span>
            <h3 className="font-bold text-xl mb-2">WOLBI Jeju</h3>
            <p className="text-white/90">Years of Impact</p>
          </div>
          
          <div className="hidden md:flex">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping"></div>
              <ArrowRight size={48} className="text-yellow-300 relative z-10" />
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative w-16 h-16 flex items-center justify-center rotate-90">
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping"></div>
              <ArrowRight size={32} className="text-yellow-300 relative z-10" />
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 md:w-72 text-center transform scale-110 border border-yellow-300/50 shadow-yellow-300/20 shadow-lg hover:scale-115 transition-transform duration-300">
            <span className="text-3xl mb-4 block">🌟</span>
            <h3 className="font-bold text-xl mb-2">Historic Collaboration</h3>
            <p className="text-white/90">2025</p>
          </div>
          
          <div className="hidden md:flex">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping"></div>
              <ArrowRight size={48} className="text-yellow-300 relative z-10" />
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative w-16 h-16 flex items-center justify-center rotate-90">
              <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping"></div>
              <ArrowRight size={32} className="text-yellow-300 relative z-10" />
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 md:w-72 text-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl mb-4 block">🏫</span>
            <h3 className="font-bold text-xl mb-2">DICS Campus</h3>
            <p className="text-white/90">New Chapter</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Special;