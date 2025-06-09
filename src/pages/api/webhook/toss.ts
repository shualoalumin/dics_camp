import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

// Toss로부터 전달받는 서명을 검증하는 함수
function verifyTossSignature(
  payload: Buffer,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const computedSignature = hmac.digest("base64");
  return computedSignature === signature;
}

// Next.js에서 raw body를 읽기 위한 유틸리티
async function buffer(req: NextApiRequest): Promise<Buffer> {
  const chunks: any[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const tossWebhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const signature = req.headers["toss-signature"] as string;
  const secret = process.env.TOSS_WEBHOOK_SECRET!;

  try {
    const payload = await buffer(req);

    if (!verifyTossSignature(payload, signature, secret)) {
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(payload.toString());
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const orderId = event.data.orderId;

    switch (event.eventType) {
      case "PAYMENT.AUTHORIZED":
        await supabase
          .from("registrations")
          .update({ paid_at: event.createdAt })
          .eq("order_id", orderId);
        break;
      case "PAYMENT.FAILED":
        await supabase
          .from("registrations")
          .update({ status: "failed" })
          .eq("order_id", orderId);
        break;
      // 다른 이벤트 타입에 대한 처리를 추가할 수 있습니다.
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export default tossWebhookHandler;
