import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const signupSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signupSchema>;
