"use client";

import { type ChangeEvent, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { Link } from "@/i18n/navigation";
import TruckLoader from "@/components/TruckLoader";
import { z } from "zod";
import { login } from "@/actions/auth";
import { type LoginType, loginSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import ErrorDialog from "@/components/ErrorDialog";
import { useTranslations } from "next-intl";

export default function Form() {
  const t = useTranslations("login");

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [invalidFormData, setInvalidFormData] = useState<{
    invalid: boolean;
    key: keyof typeof formData | null;
  }>({
    invalid: false,
    key: null,
  });

  const [error, setError] = useState<{
    exists: boolean;
    message: string | null;
    code: 400 | 401 | 403 | 404 | 500 | number | null;
  }>({
    exists: false,
    message: null,
    code: null,
  });

  const [isPending, startTransition] = useTransition();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setInvalidFormData({
      invalid: false,
      key: null,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse(formData);

    if (parsed.success) {
      startTransition(async () => {
        const result = await login(parsed.data);
        if (result.error) {
          setError({
            exists: true,
            message: result.error,
            code: result.code,
          });
        } else {
          setError({ exists: false, message: null, code: null });
        }
      });
    } else {
      const errors = z.flattenError(parsed.error).fieldErrors;
      setInvalidFormData({
        invalid: true,
        key: errors.email ? "email" : errors.password ? "password" : null,
      });
    }
  };

  useEffect(() => {
    if (invalidFormData.invalid && invalidFormData.key) {
      const targetEl = document.getElementById(invalidFormData.key);
      targetEl?.focus();
    }
  }, [invalidFormData]);

  return (
    <>
      {error.exists && (
        <ErrorDialog
          open={error.exists}
          onOpenChange={() =>
            setError({
              exists: false,
              message: null,
              code: null,
            })
          }
          title={t("loginFailed")}
          message={
            error.code === 400
              ? t("enterEmailAndPassword")
              : error.code === 401
              ? t("incorrectPassword")
              : error.code === 403
              ? t("verifyYourEmail")
              : error.code === 404
              ? t("userNotFound")
              : t("anErrorOccurred")
          }
        />
      )}

      {isPending && <TruckLoader displayText={t("loggingIn")} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">{t("emailAddress")}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("enterYourEmail")}
              className="pl-10"
              value={formData.email}
              required
              onChange={handleInput}
            />
          </div>
          <p
            className={cn(
              "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
              invalidFormData.invalid && invalidFormData.key === "email"
                ? "scale-100 h-full transition-all duration-150 ease-linear"
                : "scale-0 h-0"
            )}
          >
            {t("invalidEmailAddress")}
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("enterYourPassword")}
              className="pl-10"
              required
              minLength={6}
              value={formData.password}
              onChange={handleInput}
            />

            {showPassword ? (
              <Eye
                role="button"
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
            ) : (
              <EyeClosed
                role="button"
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
            )}
          </div>
          <p
            className={cn(
              "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
              invalidFormData.invalid && invalidFormData.key === "password"
                ? "scale-100 h-full transition-all duration-150 ease-linear"
                : "scale-0 h-0"
            )}
          >
            {t("passwordShouldBeLong")}
          </p>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link href="/login" className="text-sm text-primary hover:underline">
            {t("forgotPassword")}
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          disabled={invalidFormData.invalid && !!invalidFormData.key}
          type="submit"
          className="w-full transition-all duration-150 ease-linear"
          size="lg"
        >
          {t("logIn")}
        </Button>

        {/* Signup Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              {t("createOne")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
