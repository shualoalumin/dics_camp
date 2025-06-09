import { createClient } from "@supabase/supabase-js";
// 이벤트별로 정확한 타입을 지정하는 오버로드 인터페이스
interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  on(event: "data", callback: (chunk: Buffer) => void): void;
  on(event: "end", callback: () => void): void;
  on(event: "error", callback: (err: Error) => void): void;
}

interface ApiResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    end: (message?: string) => void;
    send: (data: string) => void;
    json: (data: Record<string, unknown>) => void;
  };
}

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

// Next.js에서 raw body를 읽기 위한 유틸리티 (로직 동일, 타입만 수정)
async function buffer(req: ApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", (err: Error) => {
      reject(err);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// 함수 시그니처만 변경, 로직 100% 동일
const tossWebhookHandler = async (req: ApiRequest, res: ApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const signature = req.headers["toss-signature"] as string;
  const secret = process.env.TOSS_WEBHOOK_SECRET;

  if (!secret) {
    console.error("TOSS_WEBHOOK_SECRET not configured");
    return res.status(500).send("Server configuration error");
  }

  try {
    const payload = await buffer(req);

    if (!verifyTossSignature(payload, signature, secret)) {
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(payload.toString());

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Supabase environment variables not configured");
      return res.status(500).send("Server configuration error");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const orderId = event.data.orderId;

    switch (event.eventType) {
      case "PAYMENT.AUTHORIZED":
        await supabase
          .from("registrations")
          .update({
            paid_at: event.createdAt,
            status: "paid",
          })
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook error:", errorMessage);
    res.status(400).send(`Webhook Error: ${errorMessage}`);
  }
};

export default tossWebhookHandler;
