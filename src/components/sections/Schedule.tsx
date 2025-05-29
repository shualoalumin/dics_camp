import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScheduleData {
  time: string;
  day1?: string;
  day2_3?: string;
  day4?: string;
  day5?: string;
}

const Schedule: React.FC = () => {
  const { language, t } = useLanguage();
  
  const scheduleData: ScheduleData[] = [
    {
      time: "07:00",
      day2_3: "Wake Up",
      day4: "Wake Up",
      day5: "Wake Up"
    },
    {
      time: "08:00",
      day5: "Morning Exercise 8:15 AM\nQuiet Time 8:30 AM",
      day2_3: "Morning Exercise 8:15 AM\nQuiet Time 8:30 AM",
      day4: "Morning Exercise 8:15 AM\nQuiet Time 8:30 AM"
    },
    {
      time: "09:00",
      day2_3: "Breakfast",
      day4: "Breakfast",
      day5: "Breakfast"
    },
    {
      time: "10:00",
      day2_3: "English Bible Study 1",
      day4: "English Bible Study 1",
      day5: "Bible Club"
    },
    {
      time: "11:00",
      day2_3: "English Bible Study 2",
      day4: "English Bible Study 2",
      day5: "Closing Ceremony"
    },
    {
      time: "12:00",
      day2_3: "Talk Talk Talk",
      day4: "Talk Talk Talk",
      day5: "Talk Talk Talk"
    },
    {
      time: "13:00",
      day2_3: "Lunch 12:30 PM",
      day4: "Lunch 12:30 PM",
      day5: "Lunch 12:30 PM"
    },
    {
      time: "14:00",
      day1: "Welcome to\nDICS Camp!",
      day2_3: "English Games",
      day4: "English Games",
      day5: "Departure"
    },
    {
      time: "15:00",
      day1: "Registration",
      day2_3: "English in Action",
      day4: "English in Action"
    },
    {
      time: "16:00",
      day1: "&",
      day2_3: "English in Action",
      day4: "English in Action"
    },
    {
      time: "17:00",
      day1: "Orientation",
      day2_3: "English in Action",
      day4: "English in Action"
    },
    {
      time: "18:00",
      day1: "Dinner",
      day2_3: "Dinner",
      day4: "Dinner"
    },
    {
      time: "19:00",
      day1: "Bible Club 19:30 PM",
      day2_3: "Bible Club 19:30 PM",
      day4: "Campfire"
    },
    {
      time: "20:00",
      day1: "Devotion 21:30 PM",
      day2_3: "Devotion 21:30 PM",
      day4: "Campfire"
    },
    {
      time: "22:00",
      day1: "Wash Up 22:30 PM",
      day2_3: "Wash Up 22:30 PM",
      day4: "Talent Show\n21:30 PM"
    },
    {
      time: "23:00",
      day1: "Good Night!",
      day2_3: "Good Night!",
      day4: "Good Night!"
    }
  ];

  return (
    <section className="py-20 bg-white" id="schedule">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('title', 'schedule')}
          subtitle={t('subtitle', 'schedule')}
        />
        
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Schedule Header */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg font-semibold text-center">
                Time
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg font-semibold text-center">
                Day 1
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg font-semibold text-center">
                Day 2~3
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg font-semibold text-center">
                Day 4
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-lg font-semibold text-center">
                Day 5
              </div>
            </div>

            {/* Schedule Body */}
            {scheduleData.map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-5 gap-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="p-3 flex items-center justify-center border-b">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="font-medium">{row.time}</span>
                </div>
                {['day1', 'day2_3', 'day4', 'day5'].map((day, dayIndex) => (
                  <div 
                    key={dayIndex}
                    className={`p-3 border-b min-h-[60px] flex items-center justify-center text-center ${
                      row[day as keyof ScheduleData] ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    {row[day as keyof ScheduleData]?.split('\n').map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < row[day as keyof ScheduleData]?.split('\n').length! - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">{t('note', 'schedule')}</p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;