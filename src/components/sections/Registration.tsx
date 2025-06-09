import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";
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

interface TossPayments {
  requestPayment(
    paymentType: string,
    paymentInfo: {
      amount: number;
      orderId: string;
      orderName: string;
      customerName: string;
      flowMode: "DEFAULT";
      successUrl: string;
      failUrl: string;
    }
  ): void;
}

interface DaumPostcodeData {
  address: string;
  buildingName: string;
  zonecode: string;
}

interface DaumPostcode {
  new (options: { oncomplete: (data: DaumPostcodeData) => void }): {
    open: () => void;
  };
}

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPayments;
    daum: {
      Postcode: DaumPostcode;
    };
  }
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
  const { t } = useLanguage();
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

  // 결제 시작 시 타임아웃 설정
  const PAYMENT_TIMEOUT = 10 * 60 * 1000; // 10분

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.address) {
      alert("집 주소를 검색·선택해주세요.");
      return;
    }

    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

    if (!clientKey || !supabaseUrl) {
      const errorMessage =
        "결제 연동에 필요한 환경변수가 설정되지 않았습니다. (.env.local 파일에 VITE_TOSS_CLIENT_KEY, VITE_SUPABASE_URL를 확인해주세요.)";
      setSubmitError(errorMessage);
      console.error(errorMessage);
      return;
    }

    if (typeof window.TossPayments !== "function") {
      setSubmitError(
        "결제 모듈을 로딩하고 있습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    try {
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(
        2,
        "0"
      )}-${formData.birthDay.padStart(2, "0")}`;

      const orderId = `registration-${uuid()}`;
      const amount = parseInt(import.meta.env.VITE_CAMP_FEE || "470000", 10);

      const { data: existingOrder } = await supabase
        .from("registrations")
        .select("status")
        .eq("order_id", orderId)
        .single();

      if (existingOrder && existingOrder.status === "paid") {
        setSubmitError("이미 결제가 완료된 주문입니다.");
        return;
      }

      const { error } = await supabase
        .from("registrations")
        .insert([
          {
            order_id: orderId,
            amount: amount,
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
        setSubmitError(`등록 중 오류가 발생했습니다: ${error.message}`);
        return;
      }

      const toss = window.TossPayments(clientKey);
      const successUrl = new URL(`/functions/v1/confirmPayment`, supabaseUrl);
      successUrl.searchParams.set("orderId", orderId);
      successUrl.searchParams.set("amount", String(amount));

      toss.requestPayment("카드", {
        amount: amount,
        orderId: orderId,
        orderName: "DICS 캠프 등록비",
        customerName: formData.studentName,
        flowMode: "DEFAULT",
        successUrl: successUrl.href,
        failUrl: `${appUrl}/payment/fail`,
      });

      // 결제 요청 후 타임아웃 설정
      const timeoutId = setTimeout(async () => {
        try {
          await supabase
            .from("registrations")
            .update({
              status: "expired",
              payment_status: "expired",
            })
            .eq("order_id", orderId)
            .eq("status", "pending");

          console.log(`Payment timeout for orderId: ${orderId}`);
        } catch (error) {
          console.error("Timeout update failed:", error);
        }
      }, PAYMENT_TIMEOUT);

      // 결제 완료 시 타임아웃 취소
      window.addEventListener("beforeunload", () => {
        clearTimeout(timeoutId);
      });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
      setSubmitError(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAddressData({ base: "", detail: "" });
    setFormSubmitted(false);
    setSubmitError(null);
  };

  useEffect(() => {
    const daumScript = document.createElement("script");
    daumScript.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    daumScript.async = true;
    document.head.appendChild(daumScript);

    const tossScript = document.createElement("script");
    tossScript.src = "https://js.tosspayments.com/v1";
    tossScript.async = true;
    document.head.appendChild(tossScript);

    return () => {
      if (document.head.contains(daumScript)) {
        document.head.removeChild(daumScript);
      }
      if (document.head.contains(tossScript)) {
        document.head.removeChild(tossScript);
      }
    };
  }, []);

  const openAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 모듈을 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const isBoltPreview = window.location.hostname.includes("stackblitz.io");

    if (isBoltPreview) {
      alert(
        "주소 검색 서비스는 실제 배포된 환경에서 사용 가능합니다.\n(Address search is available in the deployed environment.)"
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const fullAddress = data.address;
        const extraAddress = data.buildingName ? ` (${data.buildingName})` : "";

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
      title: t("info.date.title", "registration") as string,
      value: t("info.date.value", "registration") as string,
    },
    {
      icon: <Users size={24} />,
      title: t("info.capacity.title", "registration") as string,
      value: t("info.capacity.value", "registration") as string,
    },
    {
      icon: <DollarSign size={24} />,
      title: t("info.fee.title", "registration") as string,
      value: t("info.fee.value", "registration") as string,
    },
    {
      icon: <Phone size={24} />,
      title: t("info.contact.title", "registration") as string,
      value: t("info.contact.value", "registration") as string,
    },
  ];

  const years = Array.from({ length: 15 }, (_, i) => 2011 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const grades = ["중2", "중3", "고1", "고2", "고3"];

  const refundItems = t("guidelines.refund.items", "registration");
  const campLifeItems = t("guidelines.campLife.items", "registration");

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
      id="register"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("title", "registration") as string}
          subtitle={t("subtitle", "registration") as string}
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
              title={t("guidelines.refund.title", "registration") as string}
              isOpen={openSections.refund}
              onToggle={() => toggleSection("refund")}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                {Array.isArray(refundItems) &&
                  refundItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title={t("guidelines.campLife.title", "registration") as string}
              isOpen={openSections.campLife}
              onToggle={() => toggleSection("campLife")}
            >
              <ul className="space-y-2 text-gray-600 ml-7 list-disc">
                {Array.isArray(campLifeItems) &&
                  campLifeItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </GuidelineSection>

            <GuidelineSection
              title={t("guidelines.photo.title", "registration") as string}
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
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {submitError}
                  </div>
                )}
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
                        value={formData.studentNameEnglish}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="010-0000-0000"
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
                        placeholder="student@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="birthYear"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.student.birth.year", "registration")}
                      </label>
                      <select
                        id="birthYear"
                        name="birthYear"
                        required
                        value={formData.birthYear}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">년도</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="birthMonth"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.student.birth.month", "registration")}
                      </label>
                      <select
                        id="birthMonth"
                        name="birthMonth"
                        required
                        value={formData.birthMonth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">월</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="birthDay"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t("form.sections.student.birth.day", "registration")}
                      </label>
                      <select
                        id="birthDay"
                        name="birthDay"
                        required
                        value={formData.birthDay}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">일</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        {t(
                          "form.sections.student.gender.label",
                          "registration"
                        )}
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">성별 선택</option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                      </select>
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
                        <option value="">학년 선택</option>
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.student.school.label", "registration")}
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
                        placeholder="010-0000-0000"
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
                      placeholder="parent@example.com"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      {t("form.sections.address.label", "registration")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={addressData.base}
                        readOnly
                        placeholder="주소 검색 버튼을 클릭해주세요"
                        className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={openAddressSearch}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                      >
                        <Search size={16} className="mr-1" />
                        검색
                      </button>
                    </div>
                  </div>

                  {addressData.base && (
                    <div>
                      <label
                        htmlFor="addressDetail"
                        className="block text-sm font-medium text-white mb-1"
                      >
                        상세주소
                      </label>
                      <input
                        type="text"
                        id="addressDetail"
                        name="addressDetail"
                        value={addressData.detail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="상세주소를 입력해주세요"
                      />
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="church"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.church.label", "registration")}
                    </label>
                    <input
                      type="text"
                      id="church"
                      name="church"
                      value={formData.church}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder={t(
                        "form.sections.church.placeholder",
                        "registration"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="specialNeeds"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      {t("form.sections.special.label", "registration")}
                    </label>
                    <textarea
                      id="specialNeeds"
                      name="specialNeeds"
                      rows={3}
                      value={formData.specialNeeds}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder={t(
                        "form.sections.special.placeholder",
                        "registration"
                      )}
                    />
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    required
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="agreement" className="text-sm text-white">
                    {t("form.agreement", "registration")}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  {t("form.submit", "registration")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
