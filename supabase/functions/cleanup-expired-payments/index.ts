// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
serve(async (_req: Request) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response("Server configuration error", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 10분 이상 된 미완료 결제 만료 처리
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("registrations")
    .update({
      status: "expired",
      payment_status: "expired",
    })
    .eq("status", "pending")
    .lt("created_at", tenMinutesAgo)
    .select("order_id");

  if (error) {
    console.error("Cleanup error:", error);
    return new Response("Cleanup failed", { status: 500 });
  }

  return new Response(
    JSON.stringify({
      expiredCount: data?.length || 0,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
