import { MapPin, Clock, Phone, Package, Plane, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { Delivery, Route } from "@/lib/validations/shipment";
import { getCityStateCountry, getFlagUrl } from "@/lib/geocode";
import {
  formatDateTimeShort,
  formatFriendlyDate,
  formatRelativeTime,
} from "@/lib/date";
import Image from "next/image";
import { formatTrackingNumberWithSpaces } from "@/lib/package";
import { useTranslations, useLocale } from "next-intl";

interface Props {
  trackingCode: string;
  deliveryType: Delivery;
  sender: {
    name: string;
    countryName: string;
    countryCode: string;
  };
  recipient: {
    name: string;
    countryName: string;
    countryCode: string;
  };
  routes: Route[];
  pickUpDate: Date;
  lastUpdated: Date;
}

interface Tag {
  name: string;
  message: string;
}

export default function Display({
  trackingCode,
  deliveryType,
  sender,
  recipient,
  routes,
  pickUpDate,
  lastUpdated,
}: Props) {
  const locale = useLocale();
  const t = useTranslations("track");

  const shipped = routes[0].status === "current";
  const arrived = routes.at(-1)!.status === "current";
  const currentLocation = routes.find((route) => route.status === "current")!;

  const pastTags: Tag[] = [
    {
      name: t("sortingFacility"),
      message: t("packagePickedUpAndProcessed"),
    },
    {
      name: t("freight"),
      message: t("inTransitTo"),
    },
    {
      name: t("distributionCenter"),
      message: t("packageArrivedAtDistributionCenter"),
    },
    {
      name: t("outForDelivery"),
      message: t("packageDeliveredToRecipient"),
    },
  ];

  const futureTags: Tag[] = [
    {
      name: t("sortingFacility"),
      message: t("packageWillBePickedUpAndProcessed"),
    },
    {
      name: t("freight"),
      message: t("waitingToTransitTo"),
    },
    {
      name: t("distributionCenter"),
      message: t("packageWillArriveAtDistributionCenter"),
    },
    {
      name: t("outForDelivery"),
      message: t("packageWillBeDeliveredToRecipient"),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Info Card */}
      <div className="lg:col-span-2">
        <Card className="bg-white/70 shadow-xl border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  FDX-
                  {formatTrackingNumberWithSpaces(
                    trackingCode,
                    deliveryType
                  ).replaceAll(" ", "-")}
                </CardTitle>
                {/*  <p className="text-gray-600 mt-1">
                  {sender.name} → {recipient.name}
                </p> */}
              </div>
              <div className="flex items-center gap-2">
                {shipped ? (
                  <Package className="h-5 w-5 text-orange-500" />
                ) : arrived ? (
                  <Truck className="h-5 w-5 text-orange-500" />
                ) : (
                  <Plane className="h-5 w-5 text-blue-500" />
                )}
                <span className="font-semibold text-gray-900">
                  {shipped
                    ? t("shipped")
                    : arrived
                    ? t("outForDelivery")
                    : t("inTransit")}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  alt={sender.countryName}
                  width={40}
                  height={40}
                  className="w-5 h-[13px] lg:w-6 lg:h-[16px]"
                  src={getFlagUrl(sender.countryCode, 40)}
                />
                <div>
                  <p className="text-sm text-gray-600">{t("from")}</p>
                  <p className="font-medium">{sender.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  alt={recipient.countryName}
                  width={40}
                  height={40}
                  className="w-5 h-[13px] lg:w-6 lg:h-[16px]"
                  src={getFlagUrl(recipient.countryCode, 40)}
                />
                <div>
                  <p className="text-sm text-gray-600">{t("to")}</p>
                  <p className="font-medium">{recipient.name}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t("currentLocation")}
                  </p>
                  <p className="font-medium">
                    {getCityStateCountry(currentLocation.address)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {t("estimatedDelivery")}
                  </p>
                  <p className="font-medium text-primary">
                    {formatFriendlyDate(pickUpDate, locale)}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                {t("trackingHistory")}
              </h3>
              <div className="space-y-4">
                {routes.map((route, index) => (
                  <div
                    key={route.latlng.join("")}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          route.status === "completed"
                            ? "bg-green-500"
                            : route.status === "current"
                            ? "bg-orange-500 animate-pulse"
                            : "bg-gray-300"
                        }`}
                      />
                      {route.status !== "upcoming" && (
                        <div
                          className={`w-0.5 h-8 mt-2 ${
                            route.status === "completed"
                              ? "bg-green-500"
                              : route.status === "current"
                              ? "bg-orange-500"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {route.status !== "upcoming"
                            ? pastTags[index].name
                            : futureTags[index].name}
                        </h4>
                        {route.timeStamp && (
                          <span className="text-sm text-gray-500">
                            {formatDateTimeShort(
                              route.timeStamp as Date,
                              locale
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {route.status !== "upcoming"
                          ? pastTags[index].message
                          : futureTags[index].message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        <Card className="bg-white/70 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("needHelp")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="/support"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-full">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {t("contactSupport")}
                </p>
                <p className="text-sm text-gray-600">
                  {t("getHelpWithYourShipment")}
                </p>
              </div>
            </Link>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">
                {t("lastUpdated", {
                  lastUpdated: formatRelativeTime(lastUpdated, locale),
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
