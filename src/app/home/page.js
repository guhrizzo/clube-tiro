import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ServiceCarousel from "../../../components/ServiceCarousel";



export default function HomePage() {
  return (
    <div>
      <NavBar />
      {/* Conteúdo principal aqui */}
      <ServiceCarousel />
      
      <Footer />
    </div>
  );
}
