import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { randomBytes } from "crypto";

const SESSION_PREFIX = "session:";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

export async function createSession(userId: string) {
  const sessionId = randomBytes(216).toString("hex");

  await redis.set(`${SESSION_PREFIX}${sessionId}`, userId, { ex: SESSION_TTL });

  (await cookies()).set("session", sessionId, {
    httpOnly: true,
    maxAge: SESSION_TTL,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return sessionId;
}

export async function getSessionUserId(): Promise<string | null> {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return null;

  const userId = await redis.get(`${SESSION_PREFIX}${sessionId}`);
  return typeof userId === "string" ? userId : null;
}

export async function destroySession() {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return;

  const userId = await redis.get(`${SESSION_PREFIX}${sessionId}`);
  await redis.del(`${SESSION_PREFIX}${sessionId}`);
  (await cookies()).delete("session");
  return typeof userId === "string" ? userId : null;
}
