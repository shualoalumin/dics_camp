import React from 'react';

const FooterCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Don't Miss This Once-in-a-Generation First Wave
        </h2>
        
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
          English, faith, and transformation await. Be part of history <br/>as we launch the 
          first DICS International English Camp.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#register" 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            Yes, I'll Join the Camp
          </a>
          <a 
            href="tel:053-812-1855" 
            className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold py-4 px-8 rounded-full text-lg transition hover:bg-white/20"
          >
            Call Us: 053-812-1855
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;