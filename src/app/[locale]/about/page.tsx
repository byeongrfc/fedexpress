import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Users,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("about");

  const stats = [
    {
      value: t("yearsOfExcellenceNumber"),
      label: t("yearsOfExcellence"),
      icon: Award,
    },
    {
      value: t("countriesServedNumber"),
      label: t("countriesServed"),
      icon: Globe,
    },
    {
      value: t("packagesDeliveredNumber"),
      label: t("packagesDelivered"),
      icon: Package,
    },
    {
      value: t("onTimeDeliveryNumber"),
      label: t("onTimeDelivery"),
      icon: Clock,
    },
  ];

  const milestones = [
    {
      year: "1995",
      title: t("companyFounded"),
      description: t("startedWithAVision"),
    },
    {
      year: "2000",
      title: t("internationalExpansion"),
      description: t("extendedServices"),
    },
    {
      year: "2010",
      title: t("technologyInnovation"),
      description: t("launchedRealTimeTracking"),
    },
    {
      year: "2020",
      title: t("sustainableLogistics"),
      description: t("committedToCarbonNeutralDelivery"),
    },
    {
      year: "2024",
      title: t("AIPoweredDelivery"),
      description: t("integratedSmartRouting"),
    },
  ];

  const values = [
    {
      icon: Shield,
      title: t("securityFirst"),
      description: t("everyPackageHandledWithCare"),
    },
    {
      icon: Clock,
      title: t("timeCommitment"),
      description: t("weUnderstandTime"),
    },
    {
      icon: Heart,
      title: t("customerCare"),
      description: t("ourCustomersAreAtHeart"),
    },
    {
      icon: TrendingUp,
      title: t("continuousInnovation"),
      description: t("alwaysImprovingOurServices"),
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: t("chiefExecutiveOfficer"),
      experience: t("yearsInLogistics"),
    },
    {
      name: "Michael Chen",
      role: t("chiefTechnologyOfficer"),
      experience: t("yearsInTechInnovation"),
    },
    {
      name: "Elena Rodriguez",
      role: t("chiefOperationsOfficer"),
      experience: t("yearsInOperations"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header page="/about" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t.rich("weDeliverMoreThanJustPackages", {
                primary: (chunk) => (
                  <span className="text-primary block">{chunk}</span>
                ),
              })}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t("forOverYears")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("ourJourneyThroughTime")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("fromHumbleBeginnings")}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 lg:max-w-md">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-accent font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 lg:max-w-md hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("ourCoreValues")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("thesePrinciplesGuideEverything")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <value.icon className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("leadershipTeam")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("meetTheVisionaries")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((leader, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {leader.role}
                  </p>
                  <p className="text-gray-600 text-sm">{leader.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("readyToJoinOurMission")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("buildACareerWithUs")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4"
            >
              <Users className="h-5 w-5 mr-2" />
              {t("joinOurTeam")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4"
            >
              <Package className="h-5 w-5 mr-2" />
              {t("partnerWithUs")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
