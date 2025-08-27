"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

interface Language {
  code: Locale;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const LanguageSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>(
    locale as Locale
  );

  useEffect(() => {
    if (selectedLanguage !== locale) {
      router.replace(pathname, { locale: selectedLanguage });
      router.refresh();
    }
  }, [selectedLanguage, locale, pathname, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`${
            isMobile ? "justify-start px-2" : ""
          } text-gray-700 hover:text-primary hover:bg-gray-50`}
        >
          <Globe className="h-4 w-4 mr-2" />
          {selectedLanguage.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {selectedLanguage === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { languages };
export default LanguageSelector;
