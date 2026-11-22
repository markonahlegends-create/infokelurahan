import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Rate limit sederhana per-IP untuk mencegah brute force. */
const attempts = new Map<string, { count: number; until: number }>();

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export async function POST(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const record = attempts.get(key);

  if (record && record.count >= 6 && record.until > now) {
    const seconds = Math.ceil((record.until - now) / 1000);
    return NextResponse.json(
      { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${seconds} detik.` },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Format permintaan tidak valid." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    const next =
      record && record.until > now
        ? { count: record.count + 1, until: now + 10 * 60 * 1000 }
        : { count: 1, until: now + 10 * 60 * 1000 };
    attempts.set(key, next);
    return NextResponse.json(
      { ok: false, error: "Kata sandi salah. Silakan coba lagi." },
      { status: 401 },
    );
  }

  attempts.delete(key);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
