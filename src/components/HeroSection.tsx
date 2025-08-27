import { Button } from "@/components/ui/button";
import { Package, Search, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import DeliveryTruckSVG from "./DeliveryTruckSVG";

const HeroSection = () => {
  const t = useTranslations("home");

  return (
    <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {t.rich("fastReliableDeliveryWorldwide", {
                  primary: (chunk) => (
                    <span className="text-primary block">{chunk}</span>
                  ),
                  accent: (chunk) => (
                    <span className="text-accent">{chunk}</span>
                  ),
                })}
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                {t("shipYourPackagesWithConfidence")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg"
              >
                <Link href="/dashboard">
                  <Package className="h-5 w-5 mr-2" />
                  {t("sendAPackage")}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg"
              >
                <Link href="/track">
                  <Search className="h-5 w-5 mr-2" />
                  {t("trackParcel")}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                {t.rich("statsCountries", {
                  primary: (chunks) => (
                    <div className="text-3xl font-bold text-primary">
                      {chunks}
                    </div>
                  ),
                  gray: (chunks) => (
                    <div className="text-sm text-gray-600">{chunks}</div>
                  ),
                })}
              </div>
              <div className="text-center">
                {t.rich("fullSupport", {
                  primary: (chunks) => (
                    <div className="text-3xl font-bold text-primary">
                      {chunks}
                    </div>
                  ),
                  gray: (chunks) => (
                    <div className="text-sm text-gray-600">{chunks}</div>
                  ),
                })}
              </div>
              <div className="text-center">
                {t.rich("onTime", {
                  accent: (chunks) => (
                    <div className="text-3xl font-bold text-accent">
                      {chunks}
                    </div>
                  ),
                  gray: (chunks) => (
                    <div className="text-sm text-gray-600">{chunks}</div>
                  ),
                })}
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="animate-float">
              <DeliveryTruckSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
