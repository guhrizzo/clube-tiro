import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";

import ScrollToTop from "../../../../components/BackTop";
import ContactCTA from "../../../../components/ContactCTA";
import WhyUs from "../../../../components/WhyUs";
import QuoteSection from "../../../../components/QuoteSection";
import FAQSection from "../../../../components/FAQsection";
import AboutSection from "../../../../components/AboutSection";
import ProductCatalog from "../../../../components/ProductCatalog";
import ShootingClubDivider from "../../../../components/ShottingClub";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <ScrollToTop />
      <AboutSection />

      <ShootingClubDivider />
     
      <ProductCatalog/>
      <FAQSection/>
      
      
      
    </div>
  );
}
