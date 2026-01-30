import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";
import ServiceCarousel from "../../../../components/ServiceCarousel";
import ScrollToTop from "../../../../components/BackTop";
import ContactCTA from "../../../../components/ContactCTA";
import WhyUs from "../../../../components/WhyUs";
import QuoteSection from "../../../../components/QuoteSection";
import FAQSection from "../../../../components/FAQsection";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <ScrollToTop />
      <ServiceCarousel />
      <ContactCTA />
      <WhyUs />
      <QuoteSection />
    </div>
  );
}
