"use client";

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactCTA() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const whatsappUrl = "https://wa.me/5531992118500?text=Olá%20Grupo%20Protect!%20Gostaria%20de%20mais%20informações%20sobre%20produtos%20e%20treinamentos.";

  return (
    <section className="relative overflow-hidden bg-[#ffb703] py-16 px-6 md:py-20">
      {/* Elementos Decorativos de Fundo para UX Visual */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Lado Esquerdo: Conteúdo */}
        <div
          data-aos="fade-right"
          className="flex-1 text-center md:text-left space-y-4 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tight drop-shadow-sm">
            Experiência e Desempenho <br className="hidden md:block" />
            Excepcional
          </h2>

          <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl">
            Destacamo-nos a cada ano superando em atendimento e qualidade
            de serviços e produtos para você.
          </p>
        </div>

        {/* Lado Direito: Botão WhatsApp */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="w-full md:w-auto flex justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-[#ffb703] font-extrabold text-lg uppercase tracking-widest rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95"
          >
            <FaWhatsapp size={24} className="text-[#ffb703]" />
            <span>Contate-nos</span>
            <HiOutlineArrowNarrowRight 
              className="transition-transform duration-300 group-hover:translate-x-2" 
              size={22} 
            />
          </a>
        </div>
      </div>
    </section>
  );
}