import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ServiceCarousel from "../../../components/ServiceCarousel";
import ScrollToTop from "../../../components/BackTop";



export default function HomePage() {
  return (
    <div>
      <NavBar />
      <ScrollToTop />
      {/* Conteúdo principal aqui */}
      <ServiceCarousel />
      
      <Footer />
    </div>
  );
}
