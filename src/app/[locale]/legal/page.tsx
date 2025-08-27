import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Legal = () => {
  const t = useTranslations("legal");

  return (
    <div className="min-h-screen bg-background">
      <Header page="/legal" />

      <main className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("legalInformation")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("reviewOurTerms")}
          </p>
        </div>

        {/* Jump Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <a href="#terms" className="inline-flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                {t("termsOfService")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#privacy" className="inline-flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {t("privacyPolicy")}
              </a>
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Terms of Service Section */}
          <Card id="terms" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <FileText className="w-8 h-8 mr-3 text-primary" />
                {t("termsOfService")}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("userResponsibilities")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("provideAccurateShippingInformation")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("maintainConfidentialityAccountCredentials")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("serviceLimitations")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("shippingAndLogisticsServicesLimitations")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("liabilityForLostOrDamagedPackages")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("paymentTerms")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("paymentIsDueAtTheTimeOfService")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("pricesAreSubjectToChange")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("liabilityAndDisputeResolution")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("liabilityIsLimitedToTheMaximumExtent")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("theseTermsAreGoverned")}
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Section */}
          <Card id="privacy" className="scroll-mt-8">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center">
                <Shield className="w-8 h-8 mr-3 text-primary" />
                {t("privacyPolicy")}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("whatDataWeCollect")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("weCollectInformationNecessary")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("informationCollected")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("howWeUseYourData")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("yourInformationIsUsed")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("weMaySendServiceRelatedCommunications")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("yourRights")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("youHaveTheRight")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("weWillRespondToYourRequests")}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {t("thirdPartyServicesAndCookies")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("weUseCookies")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("weMayShareData")}
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16 pt-8 border-t">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {t("questionsAboutOurLegalPolicies")}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t("ifYouhaveQuestions")}
          </p>
          <Button asChild>
            <Link href="/support">{t("contactSupport")}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
