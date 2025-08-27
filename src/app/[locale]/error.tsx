"use client";

import { RefreshCw, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useEffect } from "react";
import { useLogger } from "@logtail/next";
import { useTranslations } from "next-intl";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  const t = useTranslations("error");

  const logger = useLogger();

  useEffect(() => {
    logger.error("Client-side error in app/error.tsx", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
    console.error(error);
  }, [error, logger]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Package className="w-24 h-24 text-slate-600" strokeWidth={1} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-lg font-bold">
                !
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t("somethingWentWrong")}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t("itLooksLikeWeHitASnag")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => reset()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 text-base"
            size="lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t("tryAgain")}
          </Button>

          <Link
            href="/"
            className="w-full text-slate-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 py-2"
          >
            <Home className="w-4 h-4" />
            {t("backToHomepage")}
          </Link>
        </div>

        {/* FedExpress Branding */}
        <div className="pt-8 border-t border-slate-700">
          <p className="text-slate-500 text-sm">
            {t("reliableShippingSolutions")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
