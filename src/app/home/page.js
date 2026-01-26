import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ServiceCarousel from "../../../components/ServiceCarousel";
import ScrollToTop from "../../../components/BackTop";
import ContactCTA from "../../../components/ContactCTA";
import WhyUs from "../../../components/WhyUs";



export default function HomePage() {
  return (
    <div>
      <NavBar />
      <ScrollToTop />
      {/* Conteúdo principal aqui */}
      <ServiceCarousel />
      <ContactCTA />
      <WhyUs />
      <Footer />
    </div>
  );
}
