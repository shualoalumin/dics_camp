import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqItems: FAQItem[] = [
    {
      question: "What makes this camp special compared to other English camps?",
      answer: "This is the historic first expansion of the WOLBI Jeju English camp to the Daegu-Gyeongsan region. Beyond language learning, our program integrates faith-based education, character development, and spiritual growth in a fully immersive English environment led by native speakers. Students experience transformative community living that impacts their language skills and life perspective."
    },
    {
      question: "How good does my English need to be to join the camp?",
      answer: "All English levels are welcome! Our program is designed to accommodate students at different proficiency levels. The immersive environment naturally helps improve fluency, and our mentors provide appropriate support based on individual needs. The most important requirement is your willingness to try speaking English and participate actively."
    },
    {
      question: "What is the daily schedule like?",
      answer: "A typical day includes morning devotions, English language sessions, Bible-based discussions, recreational activities, evening programs with worship, and small group sharing. All activities are conducted in English, providing continuous language practice throughout the day in different contexts."
    },
    {
      question: "What should students bring to the camp?",
      answer: "Students should bring personal items (toiletries, clothes for 5 days), Bible (English version if possible), notebook, pen, sports clothes, modest swimwear, any medications needed, and a positive attitude! A detailed packing list will be sent after registration."
    },
    {
      question: "Will there be follow-up activities after the camp?",
      answer: "Yes! We organize reunion events, online community groups, and regular meet-ups to maintain the friendships and momentum built during the camp. Students become part of the broader DICS and WOLBI community with ongoing opportunities for growth."
    }
  ];
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="faq">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about the DICS International English Camp."
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