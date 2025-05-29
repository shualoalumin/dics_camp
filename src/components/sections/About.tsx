import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, MapPin, Handshake, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-blue-500">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="about">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('title', 'about')}
          subtitle={t('subtitle', 'about')}
        />

        <div className="flex justify-center items-center gap-8 md:gap-16 my-12">
          <div className="text-center">
            <img 
              src="/images/logos/DICS로고1_transparent.png"
              alt="DICS Logo" 
              className="h-24 md:h-32 object-contain mb-4"
            />
            <h3 className="text-blue-600 font-bold">{t('organizations.dics.name', 'about')}</h3>
            <p className="text-sm text-gray-600">{t('organizations.dics.role', 'about')}</p>
          </div>

          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Handshake size={32} className="text-blue-500" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-blue-600">
              {t('organizations.partnership', 'about')}
            </div>
          </div>

          <div className="text-center">
            <img 
              src="/images/logos/wolbilogo.png"
              alt="WOLBI Logo" 
              className="h-24 md:h-32 object-contain mb-4"
            />
            <h3 className="text-blue-600 font-bold">{t('organizations.wolbi.name', 'about')}</h3>
            <p className="text-sm text-gray-600">{t('organizations.wolbi.role', 'about')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <AboutCard
            icon={<GraduationCap size={24} />}
            title={t('features.duration.title', 'about')}
            description={t('features.duration.description', 'about')}
          />
          <AboutCard
            icon={<MapPin size={24} />}
            title={t('features.location.title', 'about')}
            description={t('features.location.description', 'about')}
          />
          <AboutCard
            icon={<Handshake size={24} />}
            title={t('features.partnership.title', 'about')}
            description={t('features.partnership.description', 'about')}
          />
          <AboutCard
            icon={<Users size={24} />}
            title={t('features.students.title', 'about')}
            description={t('features.students.description', 'about')}
          />
        </div>

        <div className="mt-16 bg-blue-500/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            {t('collaboration.title', 'about')}
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            {t('collaboration.description', 'about')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;