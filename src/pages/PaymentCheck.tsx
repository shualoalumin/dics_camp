import React, { useState } from "react";

// ✅ 타입 정의 추가
interface PaymentInfo {
  orderId: string;
  status: string;
  paymentStatus: string;
  amount: number;
  paidAt?: string;
  studentName: string;
}

const PaymentCheck: React.FC = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);  // ✅ 타입 명시

  const checkPayment = async () => {
    const response = await fetch(
      `/functions/v1/check-payment-status?orderId=${orderId}&email=${email}`
    );
    
    if (response.ok) {
      const data: PaymentInfo = await response.json();  // ✅ 타입 명시
      setPaymentInfo(data);
    } else {
      alert("결제 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">결제 상태 확인</h2>
      <input
        type="text"
        placeholder="주문번호"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="email"
        placeholder="등록 시 사용한 이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      <button 
        onClick={checkPayment}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        확인하기
      </button>
      
      {paymentInfo && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p><strong>상태:</strong> {paymentInfo.status}</p>
          <p><strong>결제상태:</strong> {paymentInfo.paymentStatus}</p>
          <p><strong>금액:</strong> {paymentInfo.amount.toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCheck; 