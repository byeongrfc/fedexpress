"use client";

import {
  Package,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">
                Fed<span className="text-orange-400">Express</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("deliveringExcellenceWorldwide")}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t("services")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("expressDelivery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("internationalShipping")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("packageTracking")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("freightServices")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {t("sameDayDelivery")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t("support")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  {t("shippingCalculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  {t("serviceStatus")}
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  {t("claims")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              {t("contactInfo")}
            </h3>
            <div className="space-y-4">
              <a
                href="tel:1-800-333-3901"
                className="flex items-center space-x-3"
              >
                <Phone className="shrink-0 h-5 w-5 text-orange-400" />
                <span>1-800-FEDEX-01</span>
              </a>
              <a
                href="mailto:support@fedexpress.delivery"
                className="flex items-center space-x-3"
              >
                <Mail className="shrink-0 h-5 w-5 text-orange-400" />
                <span>support@fedexpress.delivery</span>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="shrink-0 h-5 w-5 text-orange-400 mt-1" />
                <address className="not-italic">
                  97261 Annabel Stream Apt. 386 East Ramirobury, CO 82240-6057,
                  USA
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t("copyright", {
                year,
              })}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/legal"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/legal"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("termsOfService")}
              </Link>
              <Link
                href="/legal"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
