import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import SectionHeading from '../ui/SectionHeading';
import { Calendar, Users, DollarSign, Phone, AlertCircle, Info, CheckCircle2, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface RegistrationItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

interface FormData {
  studentName: string;
  studentNameEnglish: string;
  studentPhone: string;
  studentEmail: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: 'male' | 'female' | '';
  school: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  church: string;
  specialNeeds: string;
  agreement: boolean;
}

interface AddressData {
  base: string;
  detail: string;
}

declare global {
  interface Window {
    daum: any;
  }
}

const RegistrationItem: React.FC<RegistrationItemProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="text-blue-500 mb-3 flex justify-center">{icon}</div>
      <h3 className="text-blue-600 font-semibold mb-1">{title}</h3>
      <p className="text-gray-800 font-bold text-lg">{value}</p>
    </div>
  );
};

interface GuidelineSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const GuidelineSection: React.FC<GuidelineSectionProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={onToggle}
      >
        <h4 className="font-semibold text-gray-800 flex items-center">
          <CheckCircle2 className="mr-2" size={20} />
          {title}
        </h4>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Registration: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  
  const initialFormData: FormData = {
    studentName: '',
    studentNameEnglish: '',
    studentPhone: '',
    studentEmail: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    school: '',
    grade: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    church: '',
    specialNeeds: '',
    agreement: false
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [addressData, setAddressData] = useState<AddressData>({
    base: '',
    detail: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState({
    refund: false,
    campLife: false,
    photo: false
  });

  const resetForm = () => {
    setFormData(initialFormData);
    setAddressData({ base: '', detail: '' });
    setFormSubmitted(false);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Daum Postcode script loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load Daum Postcode script');
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const openAddressSearch = () => {
    const isBoltPreview = window.location.hostname.includes('stackblitz.io');
    
    if (isBoltPreview) {
      alert('주소 검색 서비스는 실제 배포된 환경에서 사용 가능합니다.\n(Address search is available in the deployed environment.)');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.buildingName !== '') {
          extraAddress = ` (${data.buildingName})`;
        }

        setAddressData(prev => ({
          ...prev,
          base: fullAddress + extraAddress
        }));

        setFormData(prev => ({
          ...prev,
          address: (fullAddress + extraAddress)
        }));
      },
      width: 500,
      height: 600,
      animation: true,
      theme: {
        bgColor: "#FFFFFF",
        searchBgColor: "#0077FF",
        contentBgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        textColor: "#333333",
        queryTextColor: "#FFFFFF",
        postcodeTextColor: "#0077FF",
        emphTextColor: "#0077FF",
        outlineColor: "#E5E7EB"
      }
    }).open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'addressDetail') {
      setAddressData(prev => {
        const newDetail = value;
        const newCombined = prev.base + (newDetail ? `, ${newDetail}` : '');
        
        setFormData(prev => ({
          ...prev,
          address: newCombined
        }));
        
        return {
          ...prev,
          detail: value
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;
      
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            student_name: formData.studentName,
            student_name_english: formData.studentNameEnglish,
            student_phone: formData.studentPhone,
            student_email: formData.studentEmail,
            birth_date: birthDate,
            gender: formData.gender,
            school: formData.school,
            grade: formData.grade,
            parent_name: formData.parentName,
            parent_phone: formData.parentPhone,
            parent_email: formData.parentEmail,
            address: formData.address,
            church: formData.church || null,
            special_needs: formData.specialNeeds || null
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting registration:', error);
        alert(`Registration failed: ${error.message}`);
        return;
      }

      console.log('Registration submitted successfully:', data);
      setFormSubmitted(true);
      
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const registrationItems = [
    {
      icon: <Calendar size={24} />,
      title: "Date",
      value: "August 5-9, 2025"
    },
    {
      icon: <Users size={24} />,
      title: "Capacity",
      value: "60 Students"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Fee",
      value: "470,000 KRW"
    },
    {
      icon: <Phone size={24} />,
      title: "Contact",
      value: "053-812-1855"
    }
  ];

  const years = Array.from({ length: 15 }, (_, i) => 2011 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const grades = ["중2", "중3", "고1", "고2", "고3"];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="register">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Registration"
          subtitle={<>
            Secure your spot in this historic first camp.<br />
            Space is limited to ensure quality experience and personal attention.
          </>}
        />
        
        <div className="flex items-center justify-center mt-6 mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start max-w-2xl w-full">
            <AlertCircle className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-yellow-800 font-medium">Important Notice</p>
              <p className="text-yellow-700 mt-1">
                Registration is on a first-come, first-served basis. The registration may close early once capacity is reached. Early registration is highly recommended to secure your spot.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {registrationItems.map((item, index) => (
            <RegistrationItem
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Info className="mr-2" size={24} />
            Camp Regulations and Guidelines
          </h3>
          
          <div className="space-y-2">
            <GuidelineSection
              title="Refund Policy"
              isOpen={openSections.refund}
              onToggle={() => toggleSection('refund')}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                <li>15 days before camp: Full refund (excluding 5,000 KRW bank transfer fee)</li>
                <li>7-14 days before camp: 50% refund</li>
                <li>Less than 7 days before camp: No refund</li>
                <li>Medical emergency with doctor's note (within 3 days): 60% refund</li>
                <li>No refund for personal reasons or violation of camp rules</li>
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title="Camp Life Regulations"
              isOpen={openSections.campLife}
              onToggle={() => toggleSection('campLife')}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                <li>Dating, theft, smoking, drinking, violence, and unauthorized departure are strictly prohibited</li>
                <li>Mobile phones will be collected during camp and returned upon departure</li>
                <li>Students must bring any required personal medications</li>
                <li>Valuable items should not be brought (camp is not responsible for lost items)</li>
                <li>No outside food/snacks allowed except for medical purposes (prior approval required)</li>
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title="Photo and Video Consent"
              isOpen={openSections.photo}
              onToggle={() => toggleSection('photo')}
            >
              <p className="text-gray-600 ml-7">
                Photos and videos taken during the camp may be used for promotional purposes 
                (website, social media, etc.)
              </p>
            </GuidelineSection>
          </div>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto" ref={formRef}>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {formSubmitted ? 'Thank You for Your Interest!' : 'Camp Registration Form'}
            </h3>
            
            {formSubmitted ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">
                  We've received your registration. Our team will contact you shortly with payment information and next steps.
                </p>
                <button 
                  onClick={resetForm}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Register Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Student Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                        Student Name (Korean) *
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="studentNameEnglish" className="block text-sm font-medium text-gray-700 mb-1">
                        Student Name (English) *
                      </label>
                      <input
                        type="text"
                        id="studentNameEnglish"
                        name="studentNameEnglish"
                        required
                        placeholder="i.e. Chris, Amy, etc."
                        value={formData.studentNameEnglish}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Student Phone Number (If none, enter parent's number) *
                    </label>
                    <input
                      type="tel"
                      id="studentPhone"
                      name="studentPhone"
                      required
                      value={formData.studentPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Student Email *
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      name="studentEmail"
                      required
                      value={formData.studentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birth Date *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          name="birthYear"
                          required
                          value={formData.birthYear}
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Year</option>
                          {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <select
                          name="birthMonth"
                          required
                          value={formData.birthMonth}
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Month</option>
                          {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select
                          name="birthDay"
                          required
                          value={formData.birthDay}
                          onChange={handleChange}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Day</option>
                          {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <div className="flex gap-4 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                            className="form-radio text-blue-500"
                          />
                          <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                            className="form-radio text-blue-500"
                          />
                          <span className="ml-2">Female</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                        School Name *
                      </label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        required
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                        Grade *
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select grade</option>
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Parent/Guardian Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Parent/Guardian Phone *
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Email *
                    </label>
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      required
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Additional Information</h4>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Home Address *
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="address"
                          value={addressData.base}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Click 'Search Address' to find your address"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={openAddressSearch}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          <Search size={16} />
                          Search Address
                        </button>
                      </div>
                      {addressData.base && (
                        <input
                          type="text"
                          name="addressDetail"
                          value={addressData.detail}
                          onChange={handleChange}
                          placeholder="Enter detailed address (building, unit number, etc.)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="church" className="block text-sm font-medium text-gray-700 mb-1">
                      Church Name (If attending)
                    </label>
                    <input
                      type="text"
                      id="church"
                      name="church"
                      value={formData.church}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Needs or Requests
                    </label>
                    <textarea
                      id="specialNeeds"
                      name="specialNeeds"
                      rows={3}
                      value={formData.specialNeeds}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please let us know if you have any dietary restrictions, medical conditions, or other special needs."
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      required
                      className="mt-1 form-checkbox text-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I have read and agree to all camp regulations and guidelines, including the refund policy, 
                      camp life regulations, and photo/video consent. I confirm that all provided information is accurate.
                    </span>
                  </label>
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-md"
                  >
                    Submit Registration
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * Required fields. We'll contact you with payment information.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;