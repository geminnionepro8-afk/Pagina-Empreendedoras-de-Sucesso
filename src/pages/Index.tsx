import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import EventInfoSection from "@/components/EventInfoSection";
import AboutSection from "@/components/AboutSection";
import AudienceSection from "@/components/AudienceSection";
import InstitutionalSection from "@/components/InstitutionalSection";
import SpeakersSection from "@/components/SpeakersSection";
import ScheduleSection from "@/components/ScheduleSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="bg-background min-h-screen">
    <HeroSection />
    <CountdownTimer />
    <EventInfoSection />
    <AboutSection />
    <AudienceSection />
    <SpeakersSection />
    <ScheduleSection />
    <PricingSection />
    <InstitutionalSection />
    <FAQSection />
    <TeamSection />
    <FooterSection />
  </main>
);

export default Index;
