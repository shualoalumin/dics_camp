import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import SectionHeading from "../ui/SectionHeading";
import {
  Calendar,
  Users,
  DollarSign,
  Phone,
  AlertCircle,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  studentName: string;
  studentNameEnglish: string;
  studentPhone: string;
  studentEmail: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: "male" | "female" | "";
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

interface RegistrationItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

interface GuideSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const RegistrationItem: React.FC<RegistrationItemProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-blue-500 mr-3">{icon}</div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-gray-600">{value}</p>
    </div>
  );
};

const GuidelineSection: React.FC<GuideSectionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left font-medium text-gray-800 hover:text-blue-500 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Registration: React.FC = () => {
  const { language, t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);

  const initialFormData: FormData = {
    studentName: "",
    studentNameEnglish: "",
    studentPhone: "",
    studentEmail: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
    school: "",
    grade: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    church: "",
    specialNeeds: "",
    agreement: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [addressData, setAddressData] = useState<AddressData>({
    base: "",
    detail: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState({
    refund: false,
    campLife: false,
    photo: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name === "addressDetail") {
      setAddressData((prev) => {
        const newDetail = value;
        const newCombined = prev.base + (newDetail ? `, ${newDetail}` : "");

        setFormData((prev) => ({
          ...prev,
          address: newCombined,
        }));

        return {
          ...prev,
          detail: value,
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.address) {
      alert("집 주소를 검색·선택해주세요.");
      return;
    }

    try {
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(
        2,
        "0"
      )}-${formData.birthDay.padStart(2, "0")}`;

      const { data, error } = await supabase
        .from("registrations")
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
            special_needs: formData.specialNeeds || null,
          },
        ])
        .select();

      if (error) {
        console.error("Error submitting registration:", error);
        setSubmitError(`Registration failed: ${error.message}`);
        return;
      }

      setFormSubmitted(true);

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAddressData({ base: "", detail: "" });
    setFormSubmitted(false);
    setSubmitError(null);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const openAddressSearch = () => {
    const isBoltPreview = window.location.hostname.includes("stackblitz.io");

    if (isBoltPreview) {
      alert(
        "주소 검색 서비스는 실제 배포된 환경에서 사용 가능합니다.\n(Address search is available in the deployed environment.)"
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.buildingName !== "") {
          extraAddress = ` (${data.buildingName})`;
        }

        setAddressData((prev) => ({
          ...prev,
          base: fullAddress + extraAddress,
        }));

        setFormData((prev) => ({
          ...prev,
          address: fullAddress + extraAddress,
        }));
      },
    }).open();
  };

  const registrationItems = [
    {
      icon: <Calendar size={24} />,
      title: t("info.date.title", "registration"),
      value: t("info.date.value", "registration"),
    },
    {
      icon: <Users size={24} />,
      title: t("info.capacity.title", "registration"),
      value: t("info.capacity.value", "registration"),
    },
    {
      icon: <DollarSign size={24} />,
      title: t("info.fee.title", "registration"),
      value: t("info.fee.value", "registration"),
    },
    {
      icon: <Phone size={24} />,
      title: t("info.contact.title", "registration"),
      value: t("info.contact.value", "registration"),
    },
  ];

  const years = Array.from({ length: 15 }, (_, i) => 2011 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const grades = ["중2", "중3", "고1", "고2", "고3"];

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
      id="register"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("title", "registration")}
          subtitle={t("subtitle", "registration")}
        />

        <div className="flex items-center justify-center mt-6 mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start max-w-2xl w-full">
            <AlertCircle
              className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <p className="text-yellow-800 font-medium">
                {t("notice.title", "registration")}
              </p>
              <p className="text-yellow-700 mt-1">
                {t("notice.content", "registration")}
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
            <Info className="mr-2 text-blue-500" size={24} />
            {t("guidelines.title", "registration")}
          </h3>

          <div className="space-y-2">
            <GuidelineSection
              title={t("guidelines.refund.title", "registration")}
              isOpen={openSections.refund}
              onToggle={() => toggleSection("refund")}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                {t("guidelines.refund.items", "registration").map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title={t("guidelines.campLife.title", "registration")}
              isOpen={openSections.campLife}
              onToggle={() => toggleSection("campLife")}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                {t("guidelines.campLife.items", "registration").map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title={t("guidelines.photo.title", "registration")}
              isOpen={openSections.photo}
              onToggle={() => toggleSection("photo")}
            >
              <p className="text-gray-600 ml-7">
                {t("guidelines.photo.content", "registration")}
              </p>
            </GuidelineSection>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto" ref={formRef}>
          <div className="bg-gray-700 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              {formSubmitted
                ? t("form.success.title", "registration")
                : t("form.title", "registration")}
            </h3>

            {formSubmitted ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-white mb-4">
                  {t("form.success.message", "registration")}
                </p>
                <button
                  onClick={resetForm}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t("form.success.button", "registration")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white border-b border-gray-400 pb-2">
                    {t("form.sections.student.title", "registration")}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="studentName"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.student.name.label", "registration")}
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="studentNameEnglish"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t(
                          "form.sections.student.nameEnglish.label",
                          "registration"
                        )}
                      </label>
                      <input
                        type="text"
                        id="studentNameEnglish"
                        name="studentNameEnglish"
                        required
                        placeholder={t(
                          "form.sections.student.nameEnglish.placeholder",
                          "registration"
                        )}
                        value={formData.studentNameEnglish}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="studentPhone"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.student.phone.label", "registration")}
                    </label>
                    <input
                      type="tel"
                      id="studentPhone"
                      name="studentPhone"
                      required
                      value={formData.studentPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="studentEmail"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.student.email.label", "registration")}
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      name="studentEmail"
                      required
                      value={formData.studentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        {t(
                          "form.sections.student.birthDate.label",
                          "registration"
                        )}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          name="birthYear"
                          required
                          value={formData.birthYear}
                          onChange={handleChange}
                          className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        >
                          <option value="">
                            {t(
                              "form.sections.student.birthDate.year",
                              "registration"
                            )}
                          </option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <select
                          name="birthMonth"
                          required
                          value={formData.birthMonth}
                          onChange={handleChange}
                          className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        >
                          <option value="">
                            {t(
                              "form.sections.student.birthDate.month",
                              "registration"
                            )}
                          </option>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <select
                          name="birthDay"
                          required
                          value={formData.birthDay}
                          onChange={handleChange}
                          className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        >
                          <option value="">
                            {t(
                              "form.sections.student.birthDate.day",
                              "registration"
                            )}
                          </option>
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        {t(
                          "form.sections.student.gender.label",
                          "registration"
                        )}
                      </label>
                      <div className="flex gap-4 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            className="form-radio text-blue-500 bg-white border-gray-300"
                          />
                          <span className="ml-2 text-white">
                            {t(
                              "form.sections.student.gender.male",
                              "registration"
                            )}
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            className="form-radio text-blue-500 bg-white border-gray-300"
                          />
                          <span className="ml-2 text-white">
                            {t(
                              "form.sections.student.gender.female",
                              "registration"
                            )}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="school"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t(
                          "form.sections.student.school.label",
                          "registration"
                        )}
                      </label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        required
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="grade"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.student.grade.label", "registration")}
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">
                          {t(
                            "form.sections.student.grade.placeholder",
                            "registration"
                          )}
                        </option>
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent Information Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white border-b border-gray-400 pb-2">
                    {t("form.sections.parent.title", "registration")}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="parentName"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.parent.name.label", "registration")}
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="parentPhone"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.parent.phone.label", "registration")}
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        required
                        value={formData.parentPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="parentEmail"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.parent.email.label", "registration")}
                    </label>
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      required
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-white border-b border-gray-400 pb-2">
                    {t("form.sections.additional.title", "registration")}
                  </h4>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t(
                        "form.sections.additional.address.label",
                        "registration"
                      )}
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={addressData.base}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder={t(
                            "form.sections.additional.address.placeholder",
                            "registration"
                          )}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={openAddressSearch}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          <Search size={16} />
                          {t(
                            "form.sections.additional.address.searchButton",
                            "registration"
                          )}
                        </button>
                      </div>
                      {addressData.base && (
                        <input
                          type="text"
                          name="addressDetail"
                          value={addressData.detail}
                          onChange={handleChange}
                          placeholder={t(
                            "form.sections.additional.address.detailPlaceholder",
                            "registration"
                          )}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="church"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t(
                        "form.sections.additional.church.label",
                        "registration"
                      )}
                    </label>
                    <input
                      type="text"
                      id="church"
                      name="church"
                      value={formData.church}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="specialNeeds"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t(
                        "form.sections.additional.specialNeeds.label",
                        "registration"
                      )}
                    </label>
                    <textarea
                      id="specialNeeds"
                      name="specialNeeds"
                      rows={3}
                      value={formData.specialNeeds}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder={t(
                        "form.sections.additional.specialNeeds.placeholder",
                        "registration"
                      )}
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
                      className="mt-1 form-checkbox text-blue-500 bg-white border-gray-300"
                    />
                    <span className="ml-2 text-sm text-white">
                      {t("form.agreement.text", "registration")}
                    </span>
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-md"
                  >
                    {t("form.submit.button", "registration")}
                  </button>
                  <p className="text-xs text-gray-200 mt-2 text-center">
                    {t("form.submit.note", "registration")}
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
