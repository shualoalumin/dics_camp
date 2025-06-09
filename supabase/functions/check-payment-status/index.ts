// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface PaymentStatusResponse {
  orderId: string;
  status: string;
  paymentStatus: string;
  amount: number;
  paidAt: string | null;
  studentName: string;
}

serve(async (req: Request) => {
  const url = new URL(req.url);
  const orderId = url.searchParams.get("orderId");
  const email = url.searchParams.get("email");

  if (!orderId || !email) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response("Server configuration error", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from("registrations")
    .select("order_id, status, payment_status, amount, paid_at, student_name")
    .eq("order_id", orderId)
    .eq("student_email", email)
    .single();

  if (error || !data) {
    return new Response("Payment not found", { status: 404 });
  }

  const response: PaymentStatusResponse = {
    orderId: data.order_id,
    status: data.status,
    paymentStatus: data.payment_status,
    amount: data.amount,
    paidAt: data.paid_at,
    studentName: data.student_name
  };

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" }
  });
});
