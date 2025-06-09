import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">결제 성공</h1>
      <p className="text-gray-600 mb-6">
        캠프 등록이 성공적으로 완료되었습니다.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default PaymentSuccess;
