"use server";

import User from "@/models/User";
import {
  type SignupType,
  type LoginType,
  signupSchema,
  loginSchema,
} from "@/lib/validations/auth";
import { connectToDatabase } from "@/lib/mongoose";
import bcrypt from "bcrypt";
import { redis } from "@/lib/redis";
import { createSession, destroySession } from "@/lib/session";
import { redirect } from "next/navigation";
import logger, { structureError } from "@/lib/logger";
import { generateOtp, sendOtpEmail } from "@/lib/otp";
import { cookies } from "next/headers";
import type { Locale } from "@/i18n/routing";

const SIGNUP_ID = "signup_user_id";
const OTP_PREFIX = "otp:";

export async function reverifySignup(locale: Locale | string) {
  try {
    const cookie = await cookies();
    const userId = cookie.get(SIGNUP_ID)?.value;

    if (!userId) return { error: "Invalid parameters recieved", code: 401 };

    await connectToDatabase();

    const user = await User.findOne({ _id: userId }).select("email");

    if (!user) return { error: "User not found", code: 400 };

    // Rate limit
    const count = await redis.incr(`resend:${user.email}`);
    if (count === 1) await redis.expire(`resend:${user.email}`, 300); // 3 min window

    if (count > 3) {
      return {
        error: "Too many attempts. Please wait and try again.",
        code: 429,
      };
    }

    const otp = generateOtp();
    await redis.set(`${OTP_PREFIX}${user._id.toString()}`, otp, { ex: 600 });

    await sendOtpEmail({ email: user.email, otp, language: locale });

    return { success: "Resent OTP" };
  } catch (error) {
    logger.error("Failed to verify user", structureError(error));
    return { error: "An error occurred", code: 500 };
  }
}

export async function verifySignup(otp: string) {
  try {
    const cookie = await cookies();
    const userId = cookie.get(SIGNUP_ID)?.value;

    if (!userId) redirect("/signup");

    const stored = (
      (await redis.get(`${OTP_PREFIX}${userId}`)) as string | number
    ).toString();

    const passCheck =
      stored && `${stored.slice(0, 3)}${process.env.OTP_SECRET!}`;

    if (!passCheck || passCheck !== otp) {
      return {
        error: "Invalid or expired OTP",
        code: 410,
      };
    }

    await connectToDatabase();

    await User.updateOne({ _id: userId }, { $set: { verified: true } });
    await redis.del(`${OTP_PREFIX}${userId}`);
    cookie.delete(SIGNUP_ID);

    await createSession(userId);

    logger.info("User verified", { userId });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    logger.error("Failed to verify user", structureError(error));
    return { error: "An error occurred", code: 500 };
  }

  redirect("/dashboard");
}

export async function signup(signupData: SignupType, locale: Locale | string) {
  try {
    const parsed = signupSchema.safeParse(signupData);

    if (!parsed.success) {
      return { error: "Enter name, email and password", code: 400 };
    }

    const { name, email, password } = parsed.data;

    // Rate limit
    const count = await redis.incr(`signup:${email}`);
    if (count === 1) await redis.expire(`signup:${email}`, 60); // 1 min window

    if (count > 3) {
      return {
        error: "Too many attempts. Please wait and try again.",
        code: 429,
      };
    }

    await connectToDatabase();

    const exists = await User.findOne({ email });
    if (exists) {
      if (exists.verified) return { error: "Email already in use.", code: 409 };
      else {
        const cookie = await cookies();
        cookie.set(SIGNUP_ID, exists._id.toString(), {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        redirect("/verify");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      verified: false,
    });

    const otp = generateOtp();
    await redis.set(`${OTP_PREFIX}${user._id.toString()}`, otp, { ex: 600 });

    const cookie = await cookies();
    cookie.set(SIGNUP_ID, user._id.toString(), {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    await sendOtpEmail({ email, otp, language: locale });

    logger.info("User signed up", { userId: user._id.toString() });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    logger.error("Failed to signup user", structureError(error));
    return { error: "An error occurred", code: 500 };
  }

  redirect("/verify");
}

export async function login(loginData: LoginType) {
  try {
    const parsed = loginSchema.safeParse(loginData);

    if (!parsed.success) {
      return { error: "Enter email and password", code: 400 };
    }

    const { email, password } = parsed.data;

    await connectToDatabase();
    const user = await User.findOne({ email }).select(
      "name email password verified"
    );

    if (!user) {
      return { error: "User not found", code: 404 };
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return { error: "Incorrect password", code: 401 };
    }

    if (!user.verified) {
      const cookie = await cookies();
      cookie.set(SIGNUP_ID, user._id.toString(), {
        httpOnly: true,
        secure: true,
        path: "/",
      });

      redirect("/verify");
    }

    await createSession(user._id.toString());

    logger.info("User logged in", { userId: user._id.toString() });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;
    logger.error("Failed to login user", structureError(error));
    return { error: "An error occurred", code: 500 };
  }

  redirect("/dashboard");
}

export async function logout() {
  try {
    const userId = await destroySession();
    logger.info("User logged out", { userId });
  } catch (error) {
    logger.error("Failed to logout user", structureError(error));
    return { error: "An error occurred", code: 500 };
  }

  redirect("/login");
}
