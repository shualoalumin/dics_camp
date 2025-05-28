import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { MessageSquare, Heart, Flag, Home, Target, Globe, Users, Coffee, Utensils, Moon } from 'lucide-react';

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-blue-500 group">
      <div className="text-blue-500 mx-auto mb-6 bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-blue-600">{title}</h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
  );
};

const Highlights: React.FC = () => {
  const highlights = [
    {
      icon: <MessageSquare size={32} />,
      title: "24/7 English Immersion",
      description: "Learn with native-speaking mentors in a completely English environment, building confidence through natural conversation and daily practice."
    },
    {
      icon: <Heart size={32} />,
      title: "Dynamic Worship",
      description: "Experience powerful spiritual moments through contemporary worship, Bible study, and life-changing messages that speak to your heart."
    },
    {
      icon: <Flag size={32} />,
      title: "Expert Program Leaders",
      description: "Benefit from WOLBI's unmatched expertise in creating diverse, engaging activities that naturally enhance language learning through meaningful interactions."
    },
    {
      icon: <Home size={32} />,
      title: "Dormitory Life",
      description: "Build lasting friendships through shared living experiences, evening activities, and meaningful conversations with roommates from diverse backgrounds."
    },
    {
      icon: <Moon size={32} />,
      title: "24/7 Counselor Support",
      description: "Experience personal growth with dedicated counselors who live alongside campers, providing guidance, spiritual mentoring, and creating a safe, nurturing environment."
    },
    {
      icon: <Globe size={32} />,
      title: "Global Perspective",
      description: "Broaden your worldview by connecting with international mentors and fellow students, preparing you for future global opportunities."
    },
    {
      icon: <Coffee size={32} />,
      title: "Cultural Exchange",
      description: "Engage in authentic cultural experiences with international staff, fostering natural English conversation and global understanding."
    },
    {
      icon: <Utensils size={32} />,
      title: "International Cuisine",
      description: "Enjoy diverse meals prepared by Western and Asian chefs, supported by mission-minded staff dedicated to providing excellent dining experiences."
    },
    {
      icon: <Users size={32} />,
      title: "Community Living",
      description: "Experience transformative community life where faith, friendship, and English learning naturally blend through shared daily activities and meaningful interactions."
    }
  ];

  return (
    <section className="py-20 bg-white" id="highlights">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Camp Highlights"
          subtitle={<>
            Experience a transformative program that combines English language immersion<br />
            with spiritual growth in a supportive community environment.
          </>}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;