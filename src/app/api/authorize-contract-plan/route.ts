import { createHash, timingSafeEqual } from "node:crypto";

export async function POST(request: Request) {
  const expected = process.env.CONTRACT_THREE_YEAR_PASSWORD;
  if (!expected) return new Response(null, { status: 503 });

  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || !password || password.length > 1024) {
    return new Response(null, { status: 400 });
  }

  const digest = (value: string) => createHash("sha256").update(value).digest();
  const valid = timingSafeEqual(digest(password), digest(expected));
  return new Response(null, { status: valid ? 204 : 401 });
}
