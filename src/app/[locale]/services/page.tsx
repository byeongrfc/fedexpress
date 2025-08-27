import { Truck, Globe, Search, Package, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("services");

  const services = [
    {
      icon: Truck,
      title: t("expressDelivery"),
      description: t("fastReliableLocalShipping"),
    },
    {
      icon: Globe,
      title: t("internationalShipping"),
      description: t("globalDeliveryWithCustomsClearance"),
    },
    {
      icon: Search,
      title: t("packageTracking"),
      description: t("realTimeStatusUpdates"),
    },
    {
      icon: Package,
      title: t("freightServices"),
      description: t("largeVolumeCargoSolutions"),
    },
    {
      icon: Clock,
      title: t("sameDayDelivery"),
      description: t("instantPickUpAndDelivery"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header page="/services" />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("whatWeDeliver")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("fromLocalPackagesToInternationalFreight")}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t("readyToShip")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("getStarted")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3"
              >
                <Link href="/dashboard">
                  {t("startShipping")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
              >
                <Link href="/dashboard">{t("getAQuote")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
