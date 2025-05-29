import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqItems = t('items', 'faq');
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="faq">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('title', 'faq')}
          subtitle={t('subtitle', 'faq')}
        />
        
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'shadow-lg' : ''
              }`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-800">{item.question}</span>
                <span className="text-blue-500">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;