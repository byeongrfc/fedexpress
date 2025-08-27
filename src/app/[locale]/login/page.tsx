import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "./Form";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations("login");

  return (
    <div className="min-h-screen bg-background">
      <Header page="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("logInToYourAccount")}
            </h1>
            <p className="text-muted-foreground">{t("accessYourShipments")}</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {t("welcomeBack")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("enterYourCredentials")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">{t("secureLogin")}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
