"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Shield, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";
import { reverifySignup, verifySignup } from "@/actions/auth";
import { cn } from "@/lib/utils";

const Verify = () => {
  const t = useTranslations("verify");
  const locale = useLocale();

  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [isResendPending, startResendTransition] = useTransition();
  const [otp, setOtp] = useState("");
  const [invalidData, setInvalidData] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length === 6) {
      startSubmitTransition(async () => {
        const result = await verifySignup(otp);
        if (result?.error) {
          toast(t("invalidCode"), {
            description: t("enterCorrectCode"),
            action: {
              label: t("ok"),
              onClick: () => {
                setOtp("");
              },
            },
          });
        } else {
          toast(t("verificationSuccessful"), {
            description: t("emailVerified"),
          });
        }
      });
    } else {
      setInvalidData(true);
    }
  };

  const handleResend = () => {
    startResendTransition(async () => {
      const resent = await reverifySignup(locale);
      if (resent.error) {
        toast(t("failedToSendCode"), {
          description:
            resent.code === 400
              ? t("accountDeleted")
              : resent.code === 401
              ? t("verificationTimeout")
              : resent.code === 429
              ? t("tooManyAttempts")
              : t("anErrorOccurred"),
        });
      } else {
        toast(t("codeSent"), {
          description: t("newCodeSent"),
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header page="/verify" />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                {t("enterCode")}
              </CardTitle>
              <CardDescription className="mt-2">
                {t("sentCodeToEmail")}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <span className="mx-2">&ndash;</span>
                    <InputOTPSlot index={3} className="border-l" />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <p
                className={cn(
                  "translate-x-3 -translate-y-1 text-red-500 text-xs lg:text-sm overflow-hidden scale-3d origin-left",
                  invalidData
                    ? "scale-100 h-full transition-all duration-150 ease-linear"
                    : "scale-0 h-0"
                )}
              >
                {t("invalidCode")}
              </p>

              <Button
                type="submit"
                className="w-full"
                disabled={otp.length !== 6 || isSubmitPending}
              >
                {isSubmitPending ? t("verifying") : t("verify")}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResendPending}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isResendPending ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  t("resend")
                )}
              </Button>

              <div className="text-sm">
                <button
                  type="button"
                  /* onClick={() => navigate("/login")} */
                  className="text-primary hover:underline"
                >
                  {t("backToLogin")}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Verify;
