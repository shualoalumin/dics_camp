// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/*
 * 참고: "Cannot find name 'Deno'", "Cannot find module..." 등의 에러는
 * VS Code 에디터가 Deno 환경으로 설정되지 않았을 때 발생하는 정상적인 현상입니다.
 * 이 코드는 Supabase Edge Function 환경에서 올바르게 실행됩니다.
 *
 * VS Code에서 타입 에러를 완전히 없애려면:
 * 1. VS Code에서 "Deno" 확장 프로그램을 설치합니다.
 * 2. 프로젝트 최상위 폴더에 `.vscode/settings.json` 파일을 생성합니다.
 * 3. 아래 내용을 settings.json 파일에 추가합니다:
 *    {
 *      "deno.enable": true,
 *      "deno.lint": true,
 *      "deno.unstable": true
 *    }
 * 4. VS Code를 다시 시작합니다.
 */

console.log("Confirm payment function invoked.");

interface TossApiError {
  message: string;
  code: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
serve(async (req: Request) => {
  const startTime = Date.now();
  console.log("Payment confirmation function invoked");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const url = new URL(req.url);
  const paymentKey = url.searchParams.get("paymentKey");
  const orderId = url.searchParams.get("orderId");
  const amount = url.searchParams.get("amount");

  // 환경변수 확인
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const tossSecretKey = Deno.env.get("TOSS_SECRET_KEY");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const appUrl = Deno.env.get("VITE_APP_URL") || "http://localhost:5173";

  if (!tossSecretKey || !supabaseUrl || !serviceRoleKey) {
    console.error("Missing environment variables");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Response("Server configuration error", { status: 500 });
  }

  if (!paymentKey || !orderId || !amount) {
    const redirectUrl = `${appUrl}/payment/fail?message=${encodeURIComponent(
      "필수 결제 정보가 없습니다."
    )}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Response.redirect(redirectUrl, 303);
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // ✅ 수정: 중복 승인 방지를 위한 상태 확인
    const { data: registration, error: fetchError } = await supabase
      .from("registrations")
      .select("amount, status, payment_status") // ← status, payment_status 추가
      .eq("order_id", orderId)
      .single();

    if (fetchError || !registration) {
      console.error("Order not found:", { orderId, fetchError });
      const redirectUrl = `${appUrl}/payment/fail?message=${encodeURIComponent(
        "주문 정보를 찾을 수 없습니다."
      )}&orderId=${orderId}`;
      return Response.redirect(redirectUrl, 303);
    }

    // ✅ 추가: 이미 결제된 주문인지 확인
    if (
      registration.status === "paid" ||
      registration.payment_status === "paid"
    ) {
      console.error("Duplicate payment attempt detected:", {
        orderId,
        currentStatus: registration.status,
        currentPaymentStatus: registration.payment_status,
      });
      const redirectUrl = `${appUrl}/payment/success?orderId=${orderId}`;
      return Response.redirect(redirectUrl, 303);
    }

    // 2. 금액 검증
    const dbAmount = registration.amount;
    const requestAmount = parseInt(amount, 10);

    if (dbAmount !== requestAmount) {
      console.error("Amount mismatch:", { dbAmount, requestAmount, orderId });
      const redirectUrl = `${appUrl}/payment/fail?message=${encodeURIComponent(
        "결제 금액이 일치하지 않습니다."
      )}&orderId=${orderId}`;
      return Response.redirect(redirectUrl, 303);
    }

    // 로깅 유틸리티 함수 (DB + 콘솔)
    async function logPaymentEvent(
      event: string,
      data: Record<string, unknown>
    ) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        event,
        data,
        function: "confirmPayment",
      };
      console.log(JSON.stringify(logEntry));

      // payment_logs 테이블에도 저장
      try {
        await supabase.from("payment_logs").insert({
          order_id: orderId,
          event_type: event,
          event_data: data,
          ip_address:
            req.headers.get("x-forwarded-for") ||
            req.headers.get("cf-connecting-ip") ||
            null,
          user_agent: req.headers.get("user-agent") || null,
        });
      } catch (logError) {
        console.error("Failed to log to payment_logs:", logError);
      }
    }

    // 사용 예시
    await logPaymentEvent("payment_started", {
      orderId: orderId,
      amount: requestAmount,
      paymentKey: paymentKey,
      userAgent: req.headers.get("user-agent") || "",
      ip: req.headers.get("x-forwarded-for") || "",
    });

    // 3. Toss Payments 결제 승인 API 호출
    const basicToken = btoa(`${tossSecretKey}:`);
    const tossResponse = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          amount: dbAmount,
          paymentKey: paymentKey,
        }),
      }
    );

    if (!tossResponse.ok) {
      const errorData: TossApiError = await tossResponse.json();
      console.error("Toss Payments API Error:", errorData);

      // ✅ 추가: 결제 실패 시 DB 상태 업데이트
      await supabase
        .from("registrations")
        .update({
          status: "failed",
          payment_status: "failed",
        })
        .eq("order_id", orderId);

      throw new Error(
        `결제 승인 실패: ${errorData.message} (코드: ${errorData.code})`
      );
    }

    // 4. DB에 결제 완료 상태 업데이트
    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        paid_at: new Date().toISOString(),
        status: "paid",
        payment_status: "paid", // ✅ 이미 수정됨
      })
      .eq("order_id", orderId);

    if (updateError) {
      console.error("CRITICAL: DB update failed after payment confirmation:", {
        orderId,
        updateError,
      });
    }

    console.log(`Payment successful for orderId: ${orderId}`);
    const successUrl = `${appUrl}/payment/success?orderId=${orderId}`;
    await logPaymentEvent("payment_completed", {
      orderId: orderId,
      finalAmount: dbAmount,
      processingTime: Date.now() - startTime,
    });
    return Response.redirect(successUrl, 303);
  } catch (error) {
    console.error("Payment confirmation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const failUrl = `${appUrl}/payment/fail?message=${encodeURIComponent(
      errorMessage
    )}&orderId=${orderId}`;
    return Response.redirect(failUrl, 303);
  }
});
