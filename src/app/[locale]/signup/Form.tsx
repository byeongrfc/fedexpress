"use client";

import { type ChangeEvent, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { signup } from "@/actions/auth";
import TruckLoader from "@/components/TruckLoader";
import { Link } from "@/i18n/navigation";
import { type SignupType, signupSchema } from "@/lib/validations/auth";
import ErrorDialog from "@/components/ErrorDialog";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

export default function Form() {
  const t = useTranslations("signup");
  const locale = useLocale();

  const [formData, setFormData] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

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
    code: 400 | 409 | 429 | 500 | number | null;
  }>({
    exists: false,
    message: null,
    code: null,
  });

  const [confirmPassword, setConfirmPassword] = useState({
    error: false,
    value: "",
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

    if (confirmPassword.value !== formData.password)
      return setConfirmPassword((prev) => ({ ...prev, error: true }));

    const parsed = signupSchema.safeParse(formData);

    if (parsed.success) {
      startTransition(async () => {
        const result = await signup(parsed.data, locale);
        if (result.error) {
          setError({ exists: true, message: result.error, code: result.code });
        } else {
          setError({ exists: false, message: null, code: null });
        }
      });
    } else {
      const errors = z.flattenError(parsed.error).fieldErrors;
      setInvalidFormData({
        invalid: true,
        key: errors.name
          ? "name"
          : errors.email
          ? "email"
          : errors.password
          ? "password"
          : null,
      });
    }
  };

  useEffect(() => {
    if (invalidFormData.invalid && invalidFormData.key) {
      const targetEl = document.getElementById(invalidFormData.key);
      targetEl?.focus();
    }
  }, [invalidFormData]);

  useEffect(() => {
    if (confirmPassword.error) {
      const targetEl = document.getElementById("confirm-password");
      targetEl?.focus();
    }
  }, [confirmPassword.error]);

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
          title={t("failedToCreateAccount")}
          message={
            error.code === 400
              ? t("enterNameEmailAndPassword")
              : error.code === 409
              ? t("emailAlreadyInUse")
              : error.code === 429
              ? t("tooManyAttempts")
              : t("anErrorOccurred")
          }
        />
      )}
      {isPending && <TruckLoader displayText={t("creatingAccount")} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">{t("fullName")}</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={t("enterYourFullName")}
              className="pl-10"
              required
              value={formData.name}
              onChange={handleInput}
            />
          </div>
          <p
            className={cn(
              "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
              invalidFormData.invalid && invalidFormData.key === "name"
                ? "scale-100 h-full transition-all duration-150 ease-linear"
                : "scale-0 h-0"
            )}
          >
            {t("enterYourFullName")}
          </p>
        </div>

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
              required
              value={formData.email}
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
              type={showPassword.password ? "text" : "password"}
              placeholder={t("createAPassword")}
              className="pl-10"
              required
              minLength={6}
              value={formData.password}
              onChange={handleInput}
            />

            {showPassword.password ? (
              <Eye
                role="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, password: false }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
            ) : (
              <EyeClosed
                role="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, password: true }))
                }
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

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="confirm-password"
              name="confirm-password"
              type={showPassword.confirm ? "text" : "password"}
              placeholder={t("confirmYourPassword")}
              className="pl-10"
              required
              minLength={6}
              value={confirmPassword.value}
              onChange={(e) =>
                setConfirmPassword({ error: false, value: e.target.value })
              }
            />

            {showPassword.confirm ? (
              <Eye
                role="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, confirm: false }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
            ) : (
              <EyeClosed
                role="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, confirm: true }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
            )}
          </div>
          <p
            className={cn(
              "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
              confirmPassword.error
                ? "scale-100 h-full transition-all duration-150 ease-linear"
                : "scale-0 h-0"
            )}
          >
            {t("passwordMustMatch")}
          </p>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" size="lg">
          {t("createAccount")}
        </Button>

        {/* Login Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {t("alreadyHaveAnAccount")}{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              {t("logIn")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
