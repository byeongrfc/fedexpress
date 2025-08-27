import { MapPin, Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Lost Package Illustration */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Main package */}
            <div className="w-24 h-20 bg-orange/20 border-2 border-orange rounded-lg mx-auto flex items-center justify-center">
              <Package className="w-12 h-12 text-orange" strokeWidth={1.5} />
            </div>

            {/* Question marks floating around */}
            <div className="absolute -top-2 -left-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-float">
              <span className="text-primary text-lg font-bold">?</span>
            </div>
            <div className="absolute -top-4 right-2 w-6 h-6 bg-orange/20 rounded-full flex items-center justify-center animate-float-delayed">
              <span className="text-orange text-sm font-bold">?</span>
            </div>

            {/* Confused map pin */}
            <div className="absolute -bottom-2 -right-6 transform rotate-12">
              <MapPin className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive/20 rounded-full flex items-center justify-center">
                <span className="text-destructive text-xs">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* 404 Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("pageNotFound")}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("pageNotFoundOrMoved")}
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-4">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 text-base"
            size="lg"
          >
            <Link href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("backToHomepage")}
            </Link>
          </Button>
        </div>

        {/* FedExpress Branding */}
        <div className="pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            {t("reliableShippingSolutions")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
