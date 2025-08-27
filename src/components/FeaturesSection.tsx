import { Clock, MapPin, Headphones, Shield, Globe, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

const FeaturesSection = () => {
  const t = useTranslations("home");

  const features = [
    {
      icon: Zap,
      title: t("lightningFast"),
      description: t("expressDeliveryWorldwide"),
      color: "text-accent",
    },
    {
      icon: MapPin,
      title: t("realTimeTracking"),
      description: t("trackYourPackageLive"),
      color: "text-primary",
    },
    {
      icon: Headphones,
      title: t("alwaysSupport"),
      description: t("getExpertHelpAnytime"),
      color: "text-accent",
    },
    {
      icon: Shield,
      title: t("secureAndInsured"),
      description: t("fullInsuranceCoverage"),
      color: "text-primary",
    },
    {
      icon: Globe,
      title: t("globalNetwork"),
      description: t("deliverToCountries"),
      color: "text-accent",
    },
    {
      icon: Clock,
      title: t("onTimeGuarantee"),
      description: t("onTimeDeliveryRate"),
      color: "text-primary",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.rich("whyChooseFedExpress", {
              primary: (chunk) => <span className="text-primary">{chunk}</span>,
              accent: (chunk) => <span className="text-accent">{chunk}</span>,
            })}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("weDeliverMoreThanPackages")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200 hover:border-primary/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 w-fit">
                  <feature.icon
                    className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
