import React from "react";
import { AlertCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentFail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMessage =
    queryParams.get("message") || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">결제 실패</h1>
      <p className="text-gray-600 mb-4">결제 처리 중 문제가 발생했습니다.</p>
      <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 max-w-md">
        <p className="font-semibold">오류 메시지:</p>
        <p>{errorMessage}</p>
      </div>
      <Link
        to="/#register"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        등록 페이지로 다시 시도하기
      </Link>
    </div>
  );
};

export default PaymentFail;
