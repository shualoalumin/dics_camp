import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { MessageSquare, Heart, Flag, Home, Target, Globe, Users, Coffee, Utensils, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  const highlights = [
    {
      icon: <MessageSquare size={32} />,
      title: t('features.immersion.title', 'highlights'),
      description: t('features.immersion.description', 'highlights')
    },
    {
      icon: <Heart size={32} />,
      title: t('features.worship.title', 'highlights'),
      description: t('features.worship.description', 'highlights')
    },
    {
      icon: <Flag size={32} />,
      title: t('features.leaders.title', 'highlights'),
      description: t('features.leaders.description', 'highlights')
    },
    {
      icon: <Home size={32} />,
      title: t('features.dormitory.title', 'highlights'),
      description: t('features.dormitory.description', 'highlights')
    },
    {
      icon: <Moon size={32} />,
      title: t('features.counselors.title', 'highlights'),
      description: t('features.counselors.description', 'highlights')
    },
    {
      icon: <Globe size={32} />,
      title: t('features.perspective.title', 'highlights'),
      description: t('features.perspective.description', 'highlights')
    },
    {
      icon: <Coffee size={32} />,
      title: t('features.exchange.title', 'highlights'),
      description: t('features.exchange.description', 'highlights')
    },
    {
      icon: <Utensils size={32} />,
      title: t('features.cuisine.title', 'highlights'),
      description: t('features.cuisine.description', 'highlights')
    },
    {
      icon: <Users size={32} />,
      title: t('features.community.title', 'highlights'),
      description: t('features.community.description', 'highlights')
    }
  ];

  return (
    <section className="py-20 bg-white" id="highlights">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('title', 'highlights')}
          subtitle={t('subtitle', 'highlights')}
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