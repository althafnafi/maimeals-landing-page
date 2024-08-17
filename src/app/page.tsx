import { MainHero } from "./_components/main-hero";
import { CalorieCalculator } from "./_components/calorie-calculator";
import { UspSection } from "./_components/usp-section";
import { ConsultationSection } from "./_components/consultation-section";
import { OurProductSection } from "./_components/our-product-section";
import { SocialMediaSection } from "./_components/social-media-section";
import { FloatingContactBtn } from "./_components/floating-contact-btn";
import { Footer } from "./_components/footer/footer";

export default async function Home() {
  return (
    <div>
      <MainHero />
      <CalorieCalculator />
      <UspSection />
      <OurProductSection />
      <ConsultationSection />
      <SocialMediaSection />
      <Footer />
      <FloatingContactBtn />
    </div>
  );
}
