import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const paymentKey = url.searchParams.get("paymentKey");
  const orderId = url.searchParams.get("orderId");

  if (!paymentKey || !orderId) {
    return new Response(
      JSON.stringify({ error: "Missing paymentKey or orderId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // 1. Toss Payments 결제 승인 API 호출
    const tossSecretKey = Deno.env.get("TOSS_SECRET_KEY");
    const basicToken = btoa(tossSecretKey + ":");

    const tossResponse = await fetch(
      `https://api.tosspayments.com/v1/payments/${paymentKey}/confirm`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          // 이 부분은 요청에 따라 금액을 다시 확인해야 할 수 있습니다.
          // 현재는 토스 문서 기본값으로 진행합니다.
          amount: (
            await (
              await fetch(
                `https://api.tosspayments.com/v1/payments/${paymentKey}`,
                { headers: { Authorization: `Basic ${basicToken}` } }
              )
            ).json()
          ).totalAmount,
        }),
      }
    );

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      throw new Error(`Toss Payments API error: ${tossData.message}`);
    }

    // 2. Supabase 데이터베이스 업데이트
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase environment variables are not set.");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from("registrations")
      .update({ paid_at: new Date().toISOString() })
      .eq("order_id", orderId)
      .select();

    if (error) {
      throw error;
    }

    // 성공 시, 결제 성공 페이지로 리디렉션
    const successUrl = Deno.env.get("NEXT_PUBLIC_APP_URL") + "/payment/success";
    return Response.redirect(successUrl, 302);
  } catch (error) {
    console.error(error);
    // 실패 시, 결제 실패 페이지로 리디렉션
    const failUrl =
      Deno.env.get("NEXT_PUBLIC_APP_URL") +
      `/payment/fail?message=${encodeURIComponent(error.message)}`;
    return Response.redirect(failUrl, 302);
  }
});
