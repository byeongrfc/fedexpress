"use client";

import { FormEvent, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  trackingCode?: string;
}

export default function SearchBar({ trackingCode }: Props) {
  const t = useTranslations("common");
  const [trackingNumber, setTrackingNumber] = useState(trackingCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    const formatedTrackingCode = trackingNumber.trim().toUpperCase();

    if (formatedTrackingCode === trackingCode || !formatedTrackingCode) return;

    setIsLoading(true);
    router.push(`/track/${formatedTrackingCode}`);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">{t("back")}</span>
          </button>
          <form
            onSubmit={handleTrack}
            className="flex-1 flex items-center gap-2"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("enterTrackingNumber")}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              onClick={handleTrack}
              disabled={isLoading || !trackingNumber.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                t("track")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
