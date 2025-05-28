import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { GraduationCap, MapPin, Handshake, Users } from 'lucide-react';

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
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="about">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="About the Camp"
          subtitle="After years of fruitful partnership and shared vision with WOLBI Jeju, DICS is honored to host its first-ever international christian camp in the Daegu-Gyeongsan region. This camp marks a new beginning — a celebration of faith, language, and mission."
        />

        <div className="flex justify-center items-center gap-8 md:gap-16 my-12">
          <div className="text-center">
            <img 
              src="/images/logos/DICS로고1_transparent.png"
              alt="DICS Logo" 
              className="h-24 md:h-32 object-contain mb-4"
            />
            <h3 className="text-blue-600 font-bold">DICS</h3>
            <p className="text-sm text-gray-600">Host & Organizer</p>
          </div>

          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Handshake size={32} className="text-blue-500" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-blue-600">
              Partnership
            </div>
          </div>

          <div className="text-center">
            <img 
              src="/images/logos/wolbilogo.png"
              alt="WOLBI Logo" 
              className="h-24 md:h-32 object-contain mb-4"
            />
            <h3 className="text-blue-600 font-bold">WOLBI Jeju</h3>
            <p className="text-sm text-gray-600">Program Partner</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[
            {
              icon: <GraduationCap size={24} />,
              title: "5 Days of Impact",
              description: "Full English-immersion experience in a supportive Christian environment. Live, learn, and grow together in faith and language."
            },
            {
              icon: <MapPin size={24} />,
              title: "DICS Campus",
              description: "Beautiful Daegu-Gyeongsan campus providing the perfect setting for spiritual growth and international learning."
            },
            {
              icon: <Handshake size={24} />,
              title: "WOLBI Partnership",
              description: "Bringing the internationally recognized WOLBI Jeju experience to your local community for the very first time."
            },
            {
              icon: <Users size={24} />,
              title: "Target Students",
              description: "Designed for students born 2011 or earlier (grades 8-12), ready to embrace faith and English fluency."
            }
          ].map((card, index) => (
            <AboutCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-blue-500/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            A Unique Collaboration
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            DICS and WOLBI Jeju join forces to bring you an unparalleled 
            English camp experience. <br/>This collaboration combines DICS's educational excellence with 
            WOLBI's proven English immersion program, creating a transformative environment where 
            faith meets language learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;