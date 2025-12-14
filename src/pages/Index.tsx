import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingCalculator from "@/components/PricingCalculator";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PricingCalculator />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <AIChatbot />
    </main>
  );
};

export default Index;
