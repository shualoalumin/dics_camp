import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');

  const backgroundImages = [
    '/images/hero/hero1.JPG',
    '/images/hero/hero2.JPG',
    '/images/hero/hero3.JPG',
    '/images/hero/hero4.JPG',
    '/images/hero/hero5.JPG',
    '/images/hero/hero6.JPG'
  ];

  useEffect(() => {
    const targetDate = new Date('August 5, 2025 00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setSlideDirection('left');
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3500);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden" id="home">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              currentImageIndex === index 
                ? 'translate-x-0' 
                : index === ((currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length)
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
          >
            <img 
              src={image}
              alt={`Hero background ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/80"></div>
          </div>
        ))}
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 animate-float blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-yellow-400/10 animate-float-delay blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 h-screen flex flex-col justify-center" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <div 
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-6 shadow-lg animate-bounce"
          >
            🔥 Summer Launch • 1st Edition
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            From Jeju to <br/>
            Daegu-Gyeongsan
            <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse mt-4 block">
              The Spirit Moves!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-2xl mt-8 opacity-0 animate-[fadeIn_1s_ease-out_0.9s_forwards]">
            Experience the life-changing power of WOLBI Jeju, <br/>now launching for the first time in your city.
          </p>
          
          <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-8 drop-shadow-md opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
            1st English Christian Camp Ever in Our Region
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-12 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards] items-center">
            {Object.entries(countdown).map(([label, value], index) => (
              <React.Fragment key={label}>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 md:p-5 w-24 md:w-28 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">{label}</div>
                </div>
                {label === 'seconds' && (
                  <div className="relative transform -rotate-3">
                    {/* Stitched Badge */}
                    <div className="bg-sky-500 text-white px-6 py-3 rounded-lg font-serif text-2xl tracking-tight relative overflow-hidden
                      [background-image:linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_25%,rgba(255,255,255,.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.2)_75%,rgba(255,255,255,.2))]
                      [background-size:4px_4px]
                      shadow-[2px_2px_0px_rgba(0,0,0,0.2)]
                      before:content-['']
                      before:absolute before:inset-[2px]
                      before:border-[2px] before:border-dashed before:border-white/30
                      before:rounded-[4px]">
                      AUGUST 5-9
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start opacity-0 animate-[fadeIn_1s_ease-out_1.8s_forwards] items-center">
            <a 
              href="#register" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105 hover:shadow-xl shadow-lg group"
            >
              <span className="group-hover:animate-pulse">Be Part of the First Wave</span>
            </a>
            <div className="flex items-center gap-8">
              <a 
                href="#highlights" 
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-semibold py-4 px-8 rounded-full text-lg transition hover:bg-white/20 group"
              >
                <span className="group-hover:translate-x-1 inline-block transition-transform">View Camp Highlights</span>
              </a>
              <div className="flex flex-col items-center text-white/80 opacity-0 animate-[fadeIn_1s_ease-out_2.1s_forwards]">
                <span className="text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <div className="w-1.5 h-3 bg-white/80 rounded-full animate-scrollDown mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;