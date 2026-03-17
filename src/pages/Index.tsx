import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AudienceSection from "@/components/AudienceSection";
import SpeakersSection from "@/components/SpeakersSection";
import ScheduleSection from "@/components/ScheduleSection";
import PricingSection from "@/components/PricingSection";
import VenueMapSection from "@/components/VenueMapSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="bg-background min-h-screen">
    <HeroSection />
    <AboutSection />
    <AudienceSection />
    <SpeakersSection />
    <ScheduleSection />
    <PricingSection />
    <VenueMapSection />
    <FAQSection />
    <FooterSection />
  </main>
);

export default Index;
