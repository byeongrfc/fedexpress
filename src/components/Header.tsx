"use client";

import { useState } from "react";
import { Menu, X, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "./LanguageSelector";

interface Props {
  page: `/${string}`;
}

const Header = ({ page }: Props) => {
  const t = useTranslations("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">
              Fed<span className="text-accent">Express</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/services"
              className={`transition-colors ${
                page === "/services"
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {t("services")}
            </Link>
            <Link
              href="/track"
              className={`transition-colors ${
                page === "/track"
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {t("track")}
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                page === "/about"
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {t("about")}
            </Link>
            <Link
              href="/support"
              className={`transition-colors ${
                page === "/support"
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {t("support")}
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Link href="/track">
                <Search className="h-4 w-4 mr-2" />
                {t("trackPackage")}
              </Link>
            </Button>
            <LanguageSelector />
            <Link
              href="/login"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {t("logIn")}
            </Link>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/signup">{t("signUp")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/services"
                className={`transition-colors px-2 py-1 ${
                  page === "/services"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                href="/track"
                className={`transition-colors px-2 py-1 ${
                  page === "/track"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {t("track")}
              </Link>
              <Link
                href="/about"
                className={`transition-colors px-2 py-1 ${
                  page === "/about"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {t("about")}
              </Link>
              <Link
                href="/support"
                className={`transition-colors px-2 py-1 ${
                  page === "/support"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {t("support")}
              </Link>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <LanguageSelector />
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link href="/track">
                    <Search className="h-4 w-4 mr-2" />
                    {t("trackPackage")}
                  </Link>
                </Button>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary transition-colors px-2 py-1"
                >
                  {t("logIn")}
                </Link>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link href="/signup">{t("signUp")}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
