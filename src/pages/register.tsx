import { v4 as uuid } from "uuid";
import { FormEventHandler, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 생성 - 환경 변수에서 URL과 키를 가져옵니다.
// NEXT_PUBLIC_ 접두사는 브라우저 환경에 변수를 노출하기 위해 필요합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or anonymous key is not defined. Check your .env.local file."
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TossPayments 타입 정의
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

// 전역 Window 객체에 TossPayments 타입 추가
declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPayments;
  }
}

interface FormData {
  amount: number;
  name: string;
}

const RegisterPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData: FormData = {
      // 예시 금액, 실제로는 form에서 입력받아야 합니다.
      amount: 50000,
      // 예시 이름, 실제로는 form에서 입력받아야 합니다.
      name: "김토스",
    };

    const orderId = `registration-${uuid()}`;

    // 1. Supabase에 등록 정보 저장
    try {
      const { error } = await supabase.from("registrations").insert({
        order_id: orderId,
        student_name: formData.name,
        amount: formData.amount,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("등록 중 오류가 발생했습니다.");
      return;
    }

    // 2. Toss Payments 결제 요청
    if (typeof window.TossPayments === "undefined") {
      console.error("TossPayments is not loaded.");
      return;
    }

    const toss = window.TossPayments(process.env.NEXT_PUBLIC_TOSS_PUBLIC_KEY!);

    toss.requestPayment("카드", {
      amount: formData.amount,
      orderId: orderId,
      orderName: "캠프 등록비",
      customerName: formData.name,
      flowMode: "DEFAULT",
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/functions/v1/confirmPayment`,
      failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
    });
  };

  return (
    <>
      <div>
        <h1>캠프 등록</h1>
        <form onSubmit={handleSubmit}>
          {/* 실제 폼 필드들이 여기에 위치합니다. */}
          <button type="submit">등록 및 결제</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
