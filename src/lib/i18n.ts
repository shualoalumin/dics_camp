import type { Language } from "./types";

export type { Language };

// Helper function to get nested values of any type
export function getNestedValue(obj: Record<string, any>, path: string): any {
  const value = path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") {
      return acc[part];
    }
    return undefined;
  }, obj);

  return value;
}

export const translations = {
  header: {
    en: {
      about: "About",
      highlights: "Highlights",
      schedule: "Schedule",
      gallery: "Gallery",
      register: "Register",
      faq: "FAQ",
      contact: "Contact",
      banner: {
        registration:
          "Registration opens June 2nd (Monday) - Limited spots available!",
        registerEarly: "Register early",
      },
    },
    ko: {
      about: "소개",
      highlights: "특징",
      schedule: "일정",
      gallery: "갤러리",
      register: "등록",
      faq: "FAQ",
      contact: "문의",
      banner: {
        registration: "6월 2일(월) 신청 오픈 - 선착순 마감!",
        registerEarly: "서두르세요",
      },
    },
  },
  hero: {
    en: {
      badge: "🔥 2025 Summer 1st Launch ",
      title: {
        line1: "From Jeju to",
        line2: "Daegu-Gyeongsan",
        line3: "The Spirit Moves!",
      },
      subtitle:
        "Experience the life-changing power of WOLBI Jeju, now launching for the first time in your city.",
      highlight: "1st English Christian Camp Ever in Our Region",
      cta: {
        primary: "Be Part of the First Wave",
        secondary: "View Camp Recap Videos",
      },
      scroll: "Scroll to explore",
      countdown: {
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds",
      },
    },
    ko: {
      badge: "🔥 2025년 여름 첫 런칭",
      title: {
        line1: "제주에서",
        line2: "대구,경산으로",
        line3: "The Spirit Moves!",
      },
      subtitle: "WOLBI Jeju Camp의 감동이\n이제 여러분의 도시에서 시작됩니다.",
      highlight: "지역 최초의 크리스천 영어캠프",
      cta: {
        primary: "첫 물결의 주인공이 되세요",
        secondary: "캠프 리캡영상 보기",
      },
      scroll: "스크롤하여 더 보기",
      countdown: {
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds",
      },
    },
  },
  about: {
    en: {
      title: "About the Camp",
      subtitle:
        "After years of fruitful partnership and shared vision with WOLBI Jeju, DICS is honored to host its first-ever international christian camp in the Daegu-Gyeongsan region. This camp marks a new beginning — a celebration of faith, language, and mission.",
      organizations: {
        dics: {
          name: "DICS",
          role: "Host & Organizer",
        },
        wolbi: {
          name: "WOLBI Jeju",
          role: "Program Partner",
        },
        partnership: "Partnership",
      },
      features: {
        duration: {
          title: "5 Days of Impact",
          description:
            "Full English-immersion experience in a supportive Christian environment. Live, learn, and grow together in faith and language.",
        },
        location: {
          title: "DICS Campus",
          description:
            "Beautiful Daegu-Gyeongsan campus providing the perfect setting for spiritual growth and international learning.",
        },
        partnership: {
          title: "WOLBI Partnership",
          description:
            "Bringing the internationally recognized WOLBI Jeju experience to your local community for the very first time.",
        },
        students: {
          title: "Target Students",
          description:
            "Designed for students born 2011 or earlier (grades 8-12), ready to embrace faith and English fluency.",
        },
      },
      collaboration: {
        title: "A Unique Collaboration",
        description:
          "DICS and WOLBI Jeju join forces to bring you an unparalleled English camp experience. This collaboration combines DICS's educational excellence with WOLBI's proven English immersion program, creating a transformative environment where faith meets language learning.",
      },
    },
    ko: {
      title: "캠프 소개",
      subtitle:
        "WOLBI Jeju와의 다년간의 협력과 비전 공유를 통해,\nDICS는 대구경산 지역 최초의 국제 크리스천 캠프를 개최하게 되었습니다.\n이 캠프는 우리지역 청소년의 신앙, 언어, 그리고 선교의 새로운 시작이 될 것입니다.",
      organizations: {
        dics: {
          name: "DICS",
          role: "주최 & 주관",
        },
        wolbi: {
          name: "WOLBI Jeju",
          role: "프로그램 파트너",
        },
        partnership: "파트너십",
      },
      features: {
        duration: {
          title: "5일간의 변화",
          description:
            "크리스천 환경에서 진행되는 완벽한 영어 몰입 경험을 통해 신앙과 언어를 함께 배우고 성장하세요.",
        },
        location: {
          title: "DICS 캠퍼스",
          description:
            "영적 성장과 국제적 학습을 위한 프로그램 환경과 완벽한 숙소를 제공합니다.",
        },
        partnership: {
          title: "월비제주 파트너십",
          description:
            "국제적으로 인정받은 WOLBI의 경험을 여러분의 지역사회에 처음으로 선보입니다.",
        },
        students: {
          title: "대상 학생",
          description:
            "2011년 이전 출생 학생(중2~고3)을 대상으로 하며, 신앙과 영어 실력 향상을 함께 추구합니다.",
        },
      },
      collaboration: {
        title: "Special Collaboration",
        description:
          "DICS의 국제적 교육 전문성과 WOLBI의 검증된 영어 몰입 프로그램이 만나 신앙과 언어 학습이 조화를 이루는 변화의 장을 만듭니다.",
      },
    },
  },
  special: {
    en: {
      title: "A New Beginning — A Historic First",
      subtitle:
        "This is the first time the internationally recognized WOLBI English camp has reached the Daegu-Gyeongsan region. It's more than just a camp — it's a movement of faith and global learning, and you're invited to be part of this exciting new chapter.",
      timeline: {
        wolbi: {
          title: "WOLBI Jeju",
          subtitle: "Years of Impact",
        },
        collaboration: {
          title: "Historic Collaboration",
          subtitle: "2025",
        },
        dics: {
          title: "DICS Campus",
          subtitle: "New Chapter",
        },
      },
    },
    ko: {
      title: "A New Beginning — A Historic First",
      subtitle:
        "국제적으로 인정받은 WOLBI Camp가 처음으로 대구경산 지역에 찾아옵니다. 단순한 캠프를 넘어 신앙과 글로벌 학습의 움직임이 시작됩니다. 이 흥미진진한 새 장을 함께 열어갈 여러분을 초대합니다.",
      timeline: {
        wolbi: {
          title: "WOLBI Jeju",
          subtitle: "Years of Impact",
        },
        collaboration: {
          title: "Historic Collaboration",
          subtitle: "2025",
        },
        dics: {
          title: "DICS Campus",
          subtitle: "New Chapter",
        },
      },
    },
  },
  highlights: {
    en: {
      title: "Camp Highlights",
      subtitle:
        "Experience a transformative program that combines English language immersion with spiritual growth in a supportive community environment.",
      features: {
        immersion: {
          title: "24/7 English Immersion",
          description:
            "Learn with native-speaking mentors in a completely English environment, building confidence through natural conversation and daily practice.",
        },
        worship: {
          title: "Dynamic Worship",
          description:
            "Experience powerful spiritual moments through contemporary worship, Bible study, and life-changing messages that speak to your heart.",
        },
        leaders: {
          title: "Expert Program Leaders",
          description:
            "Benefit from DICS+WOLBI's unmatched expertise in creating diverse, engaging activities that naturally enhance language learning through meaningful interactions.",
        },
        dormitory: {
          title: "Dormitory Life",
          description:
            "Build lasting friendships through shared living experiences, evening activities, and meaningful conversations with roommates from diverse backgrounds.",
        },
        counselors: {
          title: "24/7 Counselor Support",
          description:
            "Experience personal growth with dedicated counselors who live alongside campers, providing guidance, spiritual mentoring, and creating a safe, nurturing environment.",
        },
        perspective: {
          title: "Global Perspective",
          description:
            "Broaden your worldview by connecting with international mentors and fellow students, preparing you for future global opportunities.",
        },
        exchange: {
          title: "Cultural Exchange",
          description:
            "Engage in authentic cultural experiences with international staff, fostering natural English conversation and global understanding.",
        },
        cuisine: {
          title: "International Cuisine",
          description:
            "Enjoy diverse meals prepared by Western and Asian chefs, supported by mission-minded staff dedicated to providing excellent dining experiences.",
        },
        community: {
          title: "Community Living",
          description:
            "Experience transformative community life where faith, friendship, and English learning naturally blend through shared daily activities and meaningful interactions.",
        },
      },
    },
    ko: {
      title: "캠프 특징",
      subtitle:
        "영어 몰입 환경과 신앙 성장이 어우러진 특별한 프로그램으로, \n따뜻한 공동체 안에서 진정한 변화를 경험해 보세요.",
      features: {
        immersion: {
          title: "24시간 영어 몰입 환경",
          description:
            "원어민 멘토들과 함께 완전한 영어 환경에서 생활하며 자연스러운 대화와 매일의 연습을 통해 자신감을 키워보세요.",
        },
        worship: {
          title: "역동적인 예배",
          description:
            "현대적이고 생동감 있는 예배와 성경 공부, 삶을 변화시키는 메시지를 통해 깊은 영적 감동을 느껴보세요.",
        },
        leaders: {
          title: "전문 프로그램 리더",
          description:
            "의미 있는 상호작용과 다양한 활동을 통해 자연스럽게 영어 실력을 키워주는 DICS와 WOLBI의 독보적인 교육 전문성을 경험해보세요.",
        },
        dormitory: {
          title: "기숙사 생활",
          description:
            "다양한 배경을 가진 룸메이트들과의 생활, 저녁 활동, 그리고 의미 있는 대화를 통해 오래 지속될 소중한 우정을 쌓아보세요.",
        },
        counselors: {
          title: "24시간 전담 캠프카운슬러",
          description:
            "캠프 참가자들과 함께 생활하며 정서적 지지와 영적 멘토링을 제공하고, 안전하고 따뜻한 환경 속에서 개인적 성장을 돕는 전담 카운슬러와 함께하세요.",
        },
        perspective: {
          title: "글로벌 감각 확장",
          description:
            "다양한 국적의 멘토 및 친구들과의 만남을 통해 시야를 넓히고, 글로벌 시대를 준비하세요.",
        },
        exchange: {
          title: "글로벌 문화 교류",
          description:
            "국제적 스태프들과의 진정한 문화 교류 활동에 참여하며 자연스러운 영어 대화 능력과 세계적 이해력을 길러보세요.",
        },
        cuisine: {
          title: "국제적 식사 제공",
          description:
            "서양과 아시아 출신 전문 셰프가 준비하는 다양한 식사를 즐기며, 선교적 사명감을 지닌 스탭들이 최상의 식사 경험을 제공해드립니다.",
        },
        community: {
          title: "공동체 생활",
          description:
            "매일의 활동과 의미 있는 교제를 통해 신앙, 우정, 영어 학습이 자연스럽게 어우러지는 특별한 공동체 생활을 경험해보세요.",
        },
      },
    },
  },
  schedule: {
    en: {
      title: "Camp Schedule",
      subtitle:
        "Experience 5 days of transformative activities. Each day is carefully designed to maximize your growth in faith and English.",
      note: "* Schedule may be subject to minor adjustments",
      days: {
        day1: "Day 1",
        day2_3: "Day 2~3",
        day4: "Day 4",
        day5: "Day 5",
      },
      activities: {
        welcome: "Welcome to\nOUr Camp!",
        registration: "Registration",
        orientation: "Orientation",
        wakeUp: "Wake Up",
        morningExercise: "Morning Exercise",
        quietTime: "Quiet Time",
        breakfast: "Breakfast",
        ebs1: "EBS 1 (English Bible Study)",
        ebs2: "EBS 2",
        talkTalkTalk: "Talk Talk Talk",
        lunch: "Lunch",
        englishGame: "English Game",
        englishInAction: "English in Action",
        dinner: "Dinner",
        bibleClub: "Bible Club",
        devotion: "Devotion",
        washUp: "Wash Up",
        goodNight: "Good Night!",
        campFire: "Camp Fire",
        talentShow: "Talent Show",
        ending: "Ending\nCeremony",
        goHome: "Go Back\nHome",
      },
    },
    ko: {
      title: "캠프 일정",
      subtitle:
        "5일간 진행되는 특별한 변화를 경험하세요. 매일 매시간의 일정은 신앙과 영어 실력의 성장을 극대화할 수 있도록 세심하게 구성되어 있습니다.",
      note: "* 일정은 약간의 조정이 있을 수 있습니다",
      days: {
        day1: "1일차",
        day2_3: "2~3일차",
        day4: "4일차",
        day5: "5일차",
      },
      activities: {
        welcome: "캠프에 오신 것을\n환영합니다!",
        registration: "등록",
        orientation: "오리엔테이션",
        wakeUp: "기상",
        morningExercise: "아침 운동",
        quietTime: "QT",
        breakfast: "아침 식사",
        ebs1: "English Bible 1",
        ebs2: "English Bible 2",
        talkTalkTalk: "Talk Talk Talk",
        lunch: "점심 식사",
        englishGame: "즐기면서 배우는 영어",
        englishInAction: "참여형 영어 액티비티",
        dinner: "저녁 식사",
        bibleClub: "바이블 클럽",
        devotion: "경건 시간",
        washUp: "세면 시간",
        goodNight: "취침",
        campFire: "Campfire",
        talentShow: "Talent Show",
        ending: "수료식",
        goHome: "귀가",
      },
    },
  },
  gallery: {
    en: {
      title: "Camp Gallery",
      subtitle:
        "Experience the transformative moments from previous WOLBI programs. Your journey of faith and language awaits.",
      videos: {
        title: "Camp Recap Videos",
        2024: "WOLBI Camp 2024 Recap",
        2023: "WOLBI Camp 2023 Recap",
      },
    },
    ko: {
      title: "캠프 갤러리",
      subtitle:
        "이전 월드바이블 프로그램의 변화의 순간들을 경험하세요. 여러분의 신앙과 언어의 여정이 기다립니다.",
      videos: {
        title: "캠프 하이라이트 영상",
        2024: "2024 월드바이블 캠프 하이라이트",
        2023: "2023 월드바이블 캠프 하이라이트",
      },
    },
  },
  registration: {
    en: {
      title: "Registration",
      subtitle:
        "Secure your spot in this historic first camp. Space is limited to ensure quality experience and personal attention.",
      notice: {
        title: "Important Notice",
        content:
          "Registration is on a first-come, first-served basis. The registration may close early once capacity is reached. Early registration is highly recommended to secure your spot.",
      },
      info: {
        date: {
          title: "Date",
          value: "August 5-9, 2025",
        },
        capacity: {
          title: "Capacity",
          value: "60 Students",
        },
        fee: {
          title: "Fee",
          value: "470,000 KRW",
        },
        contact: {
          title: "Contact",
          value: "053-812-1855",
        },
      },
      guidelines: {
        title: "Camp Regulations and Guidelines",
        refund: {
          title: "Refund Policy",
          items: [
            "15 days before camp: Full refund (excluding 5,000 KRW bank transfer fee)",
            "7-14 days before camp: 50% refund",
            "Less than 7 days before camp: No refund",
            "Medical emergency with doctor's note (within 3 days): 60% refund",
            "No refund for personal reasons or violation of camp rules",
          ],
        },
        campLife: {
          title: "Camp Life Regulations",
          items: [
            "Dating, theft, smoking, drinking, violence, and unauthorized departure are strictly prohibited",
            "Mobile phones will be collected during camp and returned upon departure",
            "Students must bring any required personal medications",
            "Valuable items should not be brought (camp is not responsible for lost items)",
            "No outside food/snacks allowed except for medical purposes (prior approval required)",
          ],
        },
        photo: {
          title: "Photo and Video Consent",
          content:
            "Photos and videos taken during the camp may be used for promotional purposes (website, social media, etc.)",
        },
      },
      form: {
        title: "Camp Registration Form",
        success: {
          title: "Thank You for Your Interest!",
          message:
            "We've received your registration. Our team will contact you shortly with payment information and next steps.",
          button: "Register Another Student",
        },
        sections: {
          student: {
            title: "Student Information",
            name: {
              label: "Student Name (Korean) *",
              placeholder: "",
            },
            nameEnglish: {
              label: "Student Name (English) *",
              placeholder: "i.e. Chris, Amy, etc.",
            },
            phone: {
              label: "Student Phone Number (If none, enter parent's number) *",
              placeholder: "",
            },
            email: {
              label: "Student Email *",
              placeholder: "",
            },
            birthDate: {
              label: "Birth Date *",
              year: "Year",
              month: "Month",
              day: "Day",
            },
            gender: {
              label: "Gender *",
              male: "Male",
              female: "Female",
            },
            school: {
              label: "School Name *",
              placeholder: "",
            },
            grade: {
              label: "Grade *",
              placeholder: "Select grade",
            },
          },
          parent: {
            title: "Parent/Guardian Information",
            name: {
              label: "Parent/Guardian Name *",
              placeholder: "",
            },
            phone: {
              label: "Parent/Guardian Phone *",
              placeholder: "",
            },
            email: {
              label: "Parent Email *",
              placeholder: "",
            },
          },
          additional: {
            title: "Additional Information",
            address: {
              label: "Home Address *",
              searchButton: "Search Address",
              placeholder: "Click 'Search Address' to find your address",
              detailPlaceholder:
                "Enter detailed address (building, unit number, etc.)",
            },
            church: {
              label: "Church Name (If attending)",
              placeholder: "",
            },
            specialNeeds: {
              label: "Special Needs or Requests",
              placeholder:
                "Please let us know if you have any dietary restrictions, medical conditions, or other special needs.",
            },
          },
        },
        agreement: {
          text: "I have read and agree to all camp regulations and guidelines, including the refund policy, camp life regulations, and photo/video consent. I confirm that all provided information is accurate.",
        },
        submit: {
          button: "Submit Registration",
          note: "* Required fields. We'll contact you with payment information.",
        },
      },
    },
    ko: {
      title: "등록",
      subtitle:
        "역사적인 첫 캠프에 참여할 기회를 놓치지 마세요. 높은 수준의 경험과 세심한 관리를 보장하기 위해 인원이 제한됩니다.",
      notice: {
        title: "중요 안내",
        content:
          "신청은 선착순으로 마감되며, 정원 초과 시 조기 마감될 수 있습니다. 자리 확보를 위해 빠른 신청을 권장합니다.",
      },
      info: {
        date: {
          title: "일정",
          value: "2025년 8월 5-9일",
        },
        capacity: {
          title: "정원",
          value: "60명",
        },
        fee: {
          title: "참가비",
          value: "470,000원",
        },
        contact: {
          title: "문의",
          value: "053-812-1855",
        },
      },
      guidelines: {
        title: "캠프 규정 및 안내사항",
        refund: {
          title: "환불 정책",
          items: [
            "캠프 15일 전: 전액 환불 (송금 수수료 5,000원 제외)",
            "캠프 7-14일 전: 50% 환불",
            "캠프 7일 이내: 환불 불가",
            "의료적 응급상황 (의사 소견서 제출, 3일 이내): 60% 환불",
            "개인 사유 또는 캠프 규정 위반으로 인한 퇴소 시 환불 불가",
          ],
        },
        campLife: {
          title: "캠프 생활 규정",
          items: [
            "이성교제, 절도, 흡연, 음주, 폭력, 무단이탈은 엄격히 금지됩니다",
            "휴대폰은 캠프 기간 동안 수거되며 종료 시 반환됩니다",
            "필요한 개인 약물은 반드시 지참해야 합니다",
            "귀중품 지참을 삼가해 주세요 (분실 시 캠프에서 책임지지 않습니다)",
            "의료적 목적 외 외부 음식/간식 반입은 금지됩니다 (사전 승인 필요)",
          ],
        },
        photo: {
          title: "사진 및 영상 동의",
          content:
            "캠프 중 촬영된 사진과 영상은 홍보 목적(웹사이트, 소셜 미디어 등)으로 사용될 수 있습니다",
        },
      },
      form: {
        title: "캠프 등록 양식",
        success: {
          title: "관심 가져주셔서 감사합니다!",
          message:
            "등록이 접수되었습니다. 곧 담당자가 결제 정보와 다음 단계를 안내해 드리겠습니다.",
          button: "다른 학생 등록하기",
        },
        sections: {
          student: {
            title: "학생 정보",
            name: {
              label: "학생 이름 (한글) *",
              placeholder: "",
            },
            nameEnglish: {
              label: "학생 이름 (영어) *",
              placeholder: "예: Chris, Amy 등",
            },
            phone: {
              label: "학생 전화번호 (없을 경우 보호자 번호) *",
              placeholder: "",
            },
            email: {
              label: "학생 이메일 *",
              placeholder: "",
            },
            birthDate: {
              label: "생년월일 *",
              year: "년",
              month: "월",
              day: "일",
            },
            gender: {
              label: "성별 *",
              male: "남",
              female: "여",
            },
            school: {
              label: "학교명 *",
              placeholder: "",
            },
            grade: {
              label: "학년 *",
              placeholder: "학년 선택",
            },
          },
          parent: {
            title: "보호자 정보",
            name: {
              label: "보호자 성명 *",
              placeholder: "",
            },
            phone: {
              label: "보호자 전화번호 *",
              placeholder: "",
            },
            email: {
              label: "보호자 이메일 *",
              placeholder: "",
            },
          },
          additional: {
            title: "추가 정보",
            address: {
              label: "집 주소 *",
              searchButton: "주소 검색",
              placeholder: "'주소 검색' 버튼을 클릭하여 주소를 찾아주세요",
              detailPlaceholder:
                "상세 주소를 입력해 주세요 (건물명, 동호수 등)",
            },
            church: {
              label: "교회명 (해당 시)",
              placeholder: "",
            },
            specialNeeds: {
              label: "특별 요청사항",
              placeholder:
                "식이 제한, 의료 조건 또는 기타 특별한 요구사항이 있으시면 알려주세요.",
            },
          },
        },
        agreement: {
          text: "본인은 환불 정책, 캠프 생활 규정, 사진/영상 동의를 포함한 모든 캠프 규정 및 안내사항을 읽고 동의합니다. 제공된 모든 정보가 정확함을 확인합니다.",
        },
        submit: {
          button: "등록 신청",
          note: "* 필수 항목. 등록 후 결제 정보를 안내해 드립니다.",
        },
      },
    },
  },
  testimonial: {
    en: {
      title: "Testimonials",
      items: [
        {
          quote:
            "The WOLBI Jeju camp completely transformed my life. I made global friends, discovered my calling, and met God in such a powerful way. The English immersion helped me gain confidence, but the spiritual growth was life-changing.",
          author: "Sarah K.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "Coming to the camp as a shy student with limited English, I never imagined how much I would grow. The counselors created such a welcoming environment that I found myself speaking English naturally within days!",
          author: "Min-ho J.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "My daughter returned from WOLBI Jeju with not just improved English, but with purpose and confidence. The spiritual foundation they provided has helped her navigate high school with strong values and clear direction.",
          author: "Mrs. Park",
          role: "Parent of WOLBI Student",
        },
        {
          quote:
            "The combination of faith and English learning at WOLBI created an incredible atmosphere. I not only improved my language skills but also deepened my relationship with God. It was truly a life-changing experience.",
          author: "Ji-eun L.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "As an international counselor at WOLBI Jeju, I witnessed countless students transform over just a few days. The program's unique blend of spiritual growth and language immersion creates lasting impact.",
          author: "David M.",
          role: "Former WOLBI Counselor",
        },
      ],
    },
    ko: {
      title: "참가자 후기",
      items: [
        {
          quote:
            "제 인생을 완전히 바꿔놓았어요. 세계 각지의 친구들을 사귀고, 제 소명을 발견했으며, 하나님을 강력하게 만났습니다. 영어 몰입을 통해 자신감을 얻었지만, 영적 성장이 진정한 삶의 변화였죠.",
          author: "Sarah K.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "영어가 서툴고 수줍음 많은 학생으로 캠프에 왔는데, 이렇게 많이 성장할 줄 몰랐어요. 카운슬러들이 만들어준 따뜻한 환경 덕분에 며칠 만에 자연스럽게 영어로 대화하고 있는 제 모습을 발견했죠!",
          author: "Min-ho J.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "딸이 캠프에서 돌아온 후 영어 실력뿐만 아니라 목적의식과 자신감도 함께 성장했어요. 그들이 제공한 영적 기초는 딸이 강한 가치관과 명확한 방향성을 가지고 고등학교 생활을 해나가는 데 큰 도움이 되고 있습니다.",
          author: "Mrs. Park",
          role: "Parent of WOLBI Student",
        },
        {
          quote:
            "월비의 신앙과 영어 학습의 조화는 놀라운 분위기를 만들어냈어요. 언어 실력이 향상됐을 뿐만 아니라 하나님과의 관계도 더욱 깊어졌죠. 정말 인생을 바꾸는 경험이었습니다.",
          author: "Ji-eun L.",
          role: "WOLBI Jeju Alumni",
        },
        {
          quote:
            "카운슬러로서, 불과 며칠 만에 수많은 학생들이 변화하는 모습을 목격했습니다. 영적 성장과 언어 몰입이 독특하게 어우러진 이 프로그램은 지속적인 영향력을 만들어냅니다.",
          author: "David M.",
          role: "Former WOLBI Counselor",
        },
      ],
    },
  },
  faq: {
    en: {
      title: "Frequently Asked Questions",
      subtitle:
        "Find answers to common questions about the DICS International English Camp.",
      items: [
        {
          question:
            "What makes this camp special compared to other English camps?",
          answer:
            "This is the historic first expansion of the WOLBI Jeju English camp to the Daegu-Gyeongsan region. Beyond language learning, our program integrates faith-based education, character development, and spiritual growth in a fully immersive English environment led by native speakers. Students experience transformative community living that impacts their language skills and life perspective.",
        },
        {
          question: "How good does my English need to be to join the camp?",
          answer:
            "All English levels are welcome! Our program is designed to accommodate students at different proficiency levels. The immersive environment naturally helps improve fluency, and our mentors provide appropriate support based on individual needs. The most important requirement is your willingness to try speaking English and participate actively.",
        },
        {
          question: "What is the daily schedule like?",
          answer:
            "A typical day includes morning devotions, English language sessions, Bible-based discussions, recreational activities, evening programs with worship, and small group sharing. All activities are conducted in English, providing continuous language practice throughout the day in different contexts.",
        },
        {
          question: "What should students bring to the camp?",
          answer:
            "Students should bring personal items (toiletries, clothes for 5 days), Bible (English version if possible), notebook, pen, sports clothes, modest swimwear, any medications needed, and a positive attitude! A detailed packing list will be sent after registration.",
        },
        {
          question: "Will there be follow-up activities after the camp?",
          answer:
            "Yes! We organize reunion events, online community groups, and regular meet-ups to maintain the friendships and momentum built during the camp. Students become part of the broader DICS and WOLBI community with ongoing opportunities for growth.",
        },
      ],
    },
    ko: {
      title: "자주 묻는 질문",
      subtitle:
        "DICS International Camp에 대한 일반적인 질문들에 대한 답변을 찾아보세요.",
      items: [
        {
          question:
            "이 캠프가 다른 영어 캠프와 비교해서 특별한 점은 무엇인가요?",
          answer:
            "이번 캠프는 제주 월드바이블 영어 캠프가 대구경산 지역으로 처음 확장되는 역사적인 순간입니다. 단순한 언어 학습을 넘어, 원어민 강사진이 이끄는 완벽한 영어 몰입 환경에서 신앙 기반 교육, 인성 개발, 영적 성장이 통합된 프로그램을 제공합니다. 학생들은 언어 실력과 삶의 관점에 영향을 미치는 변화의 공동체 생활을 경험하게 됩니다.",
        },
        {
          question: "캠프 참가를 위해 어느 정도의 영어 실력이 필요한가요?",
          answer:
            "모든 영어 수준의 학생들을 환영합니다! 우리 프로그램은 다양한 숙련도의 학생들을 수용할 수 있도록 설계되었습니다. 몰입 환경은 자연스럽게 유창성 향상을 돕고, 멘토들은 개인의 필요에 맞는 적절한 지원을 제공합니다. 가장 중요한 요구사항은 영어로 말하려는 의지와 적극적인 참여입니다.",
        },
        {
          question: "일과는 어떻게 진행되나요?",
          answer:
            "하루 일과는 아침 묵상, 영어 수업, 성경 기반 토론, 레크리에이션 활동, 예배가 포함된 저녁 프로그램, 소그룹 나눔으로 구성됩니다. 모든 활동은 영어로 진행되어 하루 종일 다양한 상황에서 지속적인 언어 연습 기회를 제공합니다.",
        },
        {
          question: "학생들은 무엇을 준비해야 하나요?",
          answer:
            "개인용품(세면도구, 5일치 의류), 성경(가능하면 영어 버전), 노트, 필기구, 운동복, 단정한 수영복, 필요한 약품, 그리고 긍정적인 태도가 필요합니다! 자세한 준비물 목록은 등록 후 발송됩니다.",
        },
        {
          question: "캠프 이후에도 후속 활동이 있나요?",
          answer:
            "네! 캠프 동안 쌓은 우정과 동력을 유지하기 위해 동창회 행사, 온라인 커뮤니티 그룹, 정기 모임을 조직합니다. 학생들은 DICS와 월드바이블 커뮤니티의 일원이 되어 지속적인 성장 기회를 갖게 됩니다.",
        },
      ],
    },
  },
  footerCta: {
    en: {
      title: "Don't Miss This Once-in-a-Generation First Wave",
      subtitle:
        "English, faith, and transformation await. Be part of history as we launch the first DICS International English Camp.",
      cta: {
        primary: "Yes, I'll Join the Camp",
        secondary: "Call Us: 053-812-1855",
      },
    },
    ko: {
      title: "세대에 한 번뿐인 첫 물결을 놓치지 마세요",
      subtitle:
        "영어, 신앙, 그리고 변화가 기다립니다. DICS 국제 영어 캠프의 첫 역사를 함께 만들어가세요.",
      cta: {
        primary: "캠프 참가하기",
        secondary: "전화 문의: 053-812-1855",
      },
    },
  },
};
