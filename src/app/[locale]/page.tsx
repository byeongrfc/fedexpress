import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TrackingSection from "@/components/TrackingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header page="/" />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TrackingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
