"use client";

import React, { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  MessageSquare,
  Package,
  Clock,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";

const Support = () => {
  const t = useTranslations("support");

  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: "tracking",
      question: t("trackMyShipment"),
      answer: t("trackYourShipmentByEnteringYourTrackingNumber"),
      icon: Package,
    },
    {
      id: "delayed",
      question: t("myPackageIsDelayed"),
      answer: t("ifYourPackageIsDelayed"),
      icon: Clock,
    },
    {
      id: "refund",
      question: t("requestRefund"),
      answer: t("ToRequestARefund"),
      icon: RefreshCw,
    },
    {
      id: "pickup",
      question: t("scheduleAPickup"),
      answer: t("youCanScheduleAPickup"),
      icon: Package,
    },
    {
      id: "international",
      question: t("internationalShippingRestrictions"),
      answer: t("internationalShippingRestrictionsVary"),
      icon: HelpCircle,
    },
    {
      id: "insurance",
      question: t("shippingInsuranceWork"),
      answer: t("shippingInsuranceProtectsYourPackageValue"),
      icon: Package,
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header page="/support" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("needHelp")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("hereToAssist")}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder={t("searchForHelp")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("frequentlyAskedQuestions")}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => {
              const IconComponent = faq.icon;
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("noResultsFound", {
                  searchQuery,
                })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("stillNeedHelp")}</h2>
            <p className="text-muted-foreground">{t("readyToAssistYou")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Support */}
            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("emailSupport")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("getDetailedHelpViaEmail")}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="mailto:support@fedexpress.delivery">
                  <Mail className="h-4 w-4 mr-2" />
                  support@fedexpress.delivery
                </a>
              </Button>
            </div>

            {/* Phone Support */}
            <div className="bg-card p-8 rounded-lg border text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t("phoneSupport")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("speakDirectlyWithOurSupportTeam")}
              </p>
              <Button
                asChild
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                <a href="tel:1-800-333-3901">
                  <Phone className="h-4 w-4 mr-2" />
                  1-800-FEDEX-01
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="mt-12 bg-card p-8 rounded-lg border">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t("contactForm")}</h3>
              <p className="text-muted-foreground mb-6">
                {t("submitADetailedSupportRequest")}
              </p>
              <Button variant="outline">{t("unavailable")}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
