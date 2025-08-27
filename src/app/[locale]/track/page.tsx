import { Package } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { useTranslations } from "next-intl";

const Track = () => {
  const t = useTranslations("track");

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Header page="/track" />

      {/* Fixed Search Bar */}
      <SearchBar />

      {/* Map Background */}
      <div className="absolute inset-0 pt-32 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Mock Map Grid */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="map-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-32 min-h-screen">
        <div className="flex items-center justify-center h-[calc(100vh-8rem)] px-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {t("trackYourPackage")}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {t("enterYourTrackingNumber")}
              </p>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Track;
