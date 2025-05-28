import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const galleryImages: GalleryImage[] = [
    {
      src: "/images/gallery/gallery1.JPG",
      alt: "WOLBI Jeju camp activity",
      caption: "Interactive English learning sessions"
    },
    {
      src: "/images/gallery/gallery2.JPG",
      alt: "WOLBI Jeju students",
      caption: "Building global friendships"
    },
    {
      src: "/images/gallery/gallery3.JPG",
      alt: "Camp activities",
      caption: "Engaging in meaningful discussions"
    },
    {
      src: "/images/gallery/gallery4.JPG",
      alt: "Student activities",
      caption: "Growing together in faith and language"
    },
    {
      src: "/images/gallery/gallery5.JPG",
      alt: "Group activities",
      caption: "Creating lasting memories"
    },
    {
      src: "/images/gallery/gallery6.JPG",
      alt: "Camp experience",
      caption: "Learning through experience"
    },
    {
      src: "/images/gallery/gallery7.JPG",
      alt: "Student interaction",
      caption: "Fostering meaningful connections"
    },
    {
      src: "/images/gallery/gallery8.JPG",
      alt: "Camp community",
      caption: "Building a supportive community"
    },
    {
      src: "/images/gallery/gallery9.JPG",
      alt: "Learning moments",
      caption: "Capturing transformative moments"
    }
  ];
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setActiveIndex(-1);
    document.body.style.overflow = '';
  };
  
  const navigateLightbox = (direction: number) => {
    const newIndex = (activeIndex + direction + galleryImages.length) % galleryImages.length;
    setActiveIndex(newIndex);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeIndex >= 0) {
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'Escape') closeLightbox();
    }
  };

  const videos = [
    {
      title: "WOLBI Camp 2024 Recap",
      thumbnail: "https://img.youtube.com/vi/SYoF3LEBEiM/maxresdefault.jpg",
      url: "https://youtu.be/SYoF3LEBEiM?si=57dvj58xGvBEv-41"
    },
    {
      title: "WOLBI Camp 2023 Recap",
      thumbnail: "https://img.youtube.com/vi/MYkxJfmRWGQ/maxresdefault.jpg",
      url: "https://youtu.be/MYkxJfmRWGQ?si=74JxH9cO-f8rSJj8"
    }
  ];

  return (
    <section 
      className="py-20 bg-white" 
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      id="gallery"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Camp Gallery"
          subtitle={<>Experience the transformative moments from previous WOLBI programs.<br/>Your journey of faith and language awaits.</>}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        {activeIndex >= 0 && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
              onClick={() => navigateLightbox(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
              onClick={() => navigateLightbox(1)}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="max-w-4xl w-full">
              <img 
                src={galleryImages[activeIndex].src} 
                alt={galleryImages[activeIndex].alt} 
                className="w-full max-h-[80vh] object-contain"
              />
              
              <div className="text-center mt-4">
                <p className="text-white text-lg">{galleryImages[activeIndex].caption}</p>
                <p className="text-gray-400 text-sm mt-2">{`${activeIndex + 1} / ${galleryImages.length}`}</p>
              </div>
            </div>
          </div>
        )}

        {/* Camp Recap Videos Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Camp Recap Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block aspect-video rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-4">
                    <Play className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h4 className="text-white font-semibold text-lg">{video.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;