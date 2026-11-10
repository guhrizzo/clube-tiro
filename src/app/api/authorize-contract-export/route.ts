import { createHash, timingSafeEqual } from "node:crypto";

function matches(value: string, expected: string) {
  const digest = (text: string) => createHash("sha256").update(text).digest();
  return timingSafeEqual(digest(value), digest(expected));
}

export async function POST(request: Request) {
  const expectedUser = process.env.CONTRACT_EXPORT_USER;
  const expectedPassword = process.env.CONTRACT_EXPORT_PASSWORD;
  const specialPassword = process.env.CONTRACT_THREE_YEAR_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return new Response(null, { status: 503 });
  }

  const credentials = await request.json().catch(() => null);
  if (
    typeof credentials?.username !== "string" ||
    typeof credentials?.password !== "string" ||
    credentials.username.length > 256 ||
    credentials.password.length > 1024
  ) {
    return new Response(null, { status: 400 });
  }

  const validUser = matches(credentials.username, expectedUser);
  const validPassword = matches(credentials.password, expectedPassword);
  const validSpecial = specialPassword ? matches(credentials.password, specialPassword) : false;

  if (validUser && validSpecial) {
    return Response.json({ plan: "3" });
  }
  return new Response(null, { status: validUser && validPassword ? 204 : 401 });
}
