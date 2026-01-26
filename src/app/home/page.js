import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ContactCTA from "../../../components/ContactCTA";

import ServiceCarousel from "../../../components/ServiceCarousel";
import BackToTop from "../../../components/BackTop";
import ScrollToTop from "../../../components/BackTop";


export default function HomePage() {
  return (
    <div>
      <NavBar />
      {/* Conteúdo principal aqui */}
      
      <ScrollToTop />
      <ContactCTA />
      <Footer />
    </div>
  );
}
