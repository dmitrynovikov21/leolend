import HeroLanding from "@/components/sections/hero-landing"
import AudienceSection from "@/components/sections/audience-section"
import { ChatDemo } from "@/components/sections/chat-demo";
import HowItWorks from "@/components/sections/how-it-works";
import UseCasesSection from "@/components/sections/use-cases-section";
import PlatformFeatures from "@/components/sections/platform-features"
import BentoGrid from "@/components/sections/bento-grid"
import AdvancedSettings from "@/components/sections/advanced-settings"
import ReferralSection from "@/components/sections/referral-section"
import PartnersSection from "@/components/sections/partners-section"
import PricingSection from "@/components/sections/pricing-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import AboutUs from "@/components/sections/about-us"
import FAQSection from "@/components/sections/faq-section"
import FooterSection from "@/components/sections/footer-section"

export default function IndexPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroLanding />

      {/* 2. Кому подходит (6 cards) */}
      <AudienceSection />

      {/* 3. Как это работает */}
      <HowItWorks />

      {/* 4. Как работает в отделах (8 cards) */}
      <UseCasesSection />

      {/* 5. Что умеет платформа (6 cards) */}
      <PlatformFeatures />

      {/* 6. Отзывы (Infinite Loop) */}
      <TestimonialsSection />

      {/* 7. Больше чем чат-бот (Bento) */}
      <BentoGrid />

      {/* 8. Продвинутые настройки */}
      <AdvancedSettings />

      {/* 11. Partners (New) */}
      <PartnersSection />

      {/* 12. CTA (Станьте первыми) */}
      <ReferralSection />

      {/* 9. Цены (Revived) */}
      <PricingSection />

      {/* 10. О Нас + Офис */}
      <AboutUs />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Footer */}
      <FooterSection />
    </>
  )
}
