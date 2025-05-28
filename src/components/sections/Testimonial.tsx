import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

const Testimonial: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "The WOLBI Jeju camp completely transformed my life. I made global friends, discovered my calling, and met God in such a powerful way. The English immersion helped me gain confidence, but the spiritual growth was life-changing.",
      author: "Sarah K.",
      role: "WOLBI Jeju Alumni"
    },
    {
      quote: "Coming to the camp as a shy student with limited English, I never imagined how much I would grow. The counselors created such a welcoming environment that I found myself speaking English naturally within days!",
      author: "Min-ho J.",
      role: "WOLBI Jeju Alumni"
    },
    {
      quote: "My daughter returned from WOLBI Jeju with not just improved English, but with purpose and confidence. The spiritual foundation they provided has helped her navigate high school with strong values and clear direction.",
      author: "Mrs. Park",
      role: "Parent of WOLBI Student"
    },
    {
      quote: "The combination of faith and English learning at WOLBI created an incredible atmosphere. I not only improved my language skills but also deepened my relationship with God. It was truly a life-changing experience.",
      author: "Ji-eun L.",
      role: "WOLBI Jeju Alumni"
    },
    {
      quote: "As an international counselor at WOLBI Jeju, I witnessed countless students transform over just a few days. The program's unique blend of spiritual growth and language immersion creates lasting impact.",
      author: "David M.",
      role: "Former WOLBI Counselor"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };
  
  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Testimonials
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 bg-white rounded-full p-2 shadow-lg z-10 text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 bg-white rounded-full p-2 shadow-lg z-10 text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-6 left-6 text-blue-100">
              <Quote size={64} />
            </div>
            
            <div className={`relative z-10 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-xl md:text-2xl text-gray-700 font-medium italic mb-6 relative z-10">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center justify-center mt-8">
                <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div className="ml-4 text-left">
                  <p className="font-bold text-blue-600">
                    {testimonials[currentIndex].author}
                  </p>
                  {testimonials[currentIndex].role && (
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;