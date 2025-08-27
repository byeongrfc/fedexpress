import { PackageX } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getShipment } from "@/lib/shipment";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Map from "./SafeMap";
import Display from "./Display";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

const Track = async ({ params }: Props) => {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "track" });
  const shipment = await getShipment(
    id.replace("FDX", "").replace(/[ -]/g, ""),
    false
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Header page="/track" />

      {/* Fixed Search Bar */}
      <SearchBar trackingCode={id} />

      {shipment ? (
        <>
          {/* Map Background */}
          <Map routes={shipment.routes} />

          {/* Main Content */}
          <main className="relative z-10 mt-32 w-[calc(100%-32px)] max-w-7xl mx-auto min-h-screen mb-8 lg:mb-0">
            <Display
              trackingCode={id}
              deliveryType={shipment.package.deliveryType}
              sender={{
                name: shipment.sender.name,
                countryCode: shipment.routes[0].address.country_code,
                countryName: shipment.routes[0].address.country,
              }}
              recipient={{
                name: shipment.recipient.name,
                countryCode: shipment.routes.at(-1)!.address.country_code,
                countryName: shipment.routes.at(-1)!.address.country,
              }}
              routes={shipment.routes}
              pickUpDate={shipment.pickup.date}
              lastUpdated={shipment.updatedAt}
            />
          </main>
        </>
      ) : (
        <>
          {/* Map Background */}
          <div className="absolute inset-0 pt-32 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Mock Map Grid */}
            <div className="absolute inset-0 opacity-30">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                      <PackageX className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {t("packageNotFound")}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    {t("noShipmentFoundWithThatTrackingNumber")}
                  </p>
                </CardHeader>
              </Card>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Track;
