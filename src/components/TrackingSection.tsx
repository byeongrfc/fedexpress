"use client";

import { useState } from "react";
import {
  Search,
  Package,
  Star,
  Users,
  Globe,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const TrackingSection = () => {
  const t = useTranslations("home");
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    router.push(`/track/${trackingNumber}`);
  };

  const accomplishments = [
    {
      icon: Package,
      number: t("packagesDeliveredNumber"),
      label: t("packagesDelivered"),
      color: "text-primary",
    },
    {
      icon: Globe,
      number: t("countriesServedNumber"),
      label: t("countriesServed"),
      color: "text-accent",
    },
    {
      icon: Clock,
      number: t("onTimeDeliveryNumber"),
      label: t("onTimeDelivery"),
      color: "text-primary",
    },
    {
      icon: Users,
      number: t("happyCustomersNumber"),
      label: t("happyCustomers"),
      color: "text-accent",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: t("newYorkUSA"),
      rating: 5,
      comment: t("FedExpressHasBeenIncrediblyReliable"),
      avatar: "SJ",
    },
    {
      name: "Miguel Rodriguez",
      location: t("madridSpain"),
      rating: 5,
      comment: t("outstandingInternationalShippingService"),
      avatar: "MR",
    },
    {
      name: "Lisa Chen",
      location: t("singapore"),
      rating: 5,
      comment: t("theCustomerSupportIsExceptional"),
      avatar: "LC",
    },
  ];

  return (
    <section
      id="tracking"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("trackYourPackage")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("enterYourTrackingNumber")}
          </p>
        </div>

        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-primary">
                {t("packageTracking")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder={t("enterTrackingNumber")}
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 text-lg py-6"
                />
                <Button
                  onClick={handleTrack}
                  className="bg-accent hover:bg-accent/90 px-8 py-6 text-lg"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {t("track")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accomplishments Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("trustedByMillionsWorldwide")}
            </h3>
            <p className="text-lg text-gray-600">
              {t("ourTrackRecordSpeaksForItself")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accomplishments.map((item, index) => (
              <Card
                key={index}
                className="text-center border-gray-200 hover:border-primary/30 transition-colors duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gray-50">
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {item.number}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t("whatOurCustomersSay")}
            </h3>
            <p className="text-lg text-gray-600">
              {t("realReviewsFromSatisfiedCustomers")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="pt-6">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-accent fill-current"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-gray-700 mb-6 text-center italic">
                    "{testimonial.comment}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">
                {t("trustedAndSecureShippingPartner")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
