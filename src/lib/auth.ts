import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Sesi admin sederhana berbasis cookie bertanda-tangan HMAC.
 * Cukup untuk redaksi skala kelurahan tanpa menambah layanan auth berbayar.
 */

const COOKIE_NAME = "ik_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 jam

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    "info-kelurahan-dev-secret-change-me"
  );
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "infokelurahan2026";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string): boolean {
  return safeEqual(input, adminPassword());
}

export function createSessionToken(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expires, signature] = parts;
  const payload = `${role}.${expires}`;
  if (!safeEqual(signature, sign(payload))) return false;
  if (role !== "admin") return false;
  const exp = Number(expires);
  return Number.isFinite(exp) && exp > Date.now();
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
