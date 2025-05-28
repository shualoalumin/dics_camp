import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string | React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-gray-600 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;