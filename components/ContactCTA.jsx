"use client";

import { useEffect } from "react";
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

  return (
    <section className="relative overflow-hidden bg-[#ffc300ff] py-20 px-5 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">

        {/* Conteúdo */}
        <div
          data-aos="fade-up"
          className="flex-1 text-center md:text-left space-y-5 max-w-2xl"
        >
          <h2 className="text-[28px] md:text-2xl font-extrabold text-white leading-tight drop-shadow-lg">
            Experiência e Desempenho <br className="hidden md:block" />
            Excepcional
          </h2>

          <p className="text-white/95 text-base md:text-sm leading-relaxed">
            Destacamo-nos a cada ano superando em atendimento e qualidade
            de serviços e produtos para você.
          </p>
        </div>

        {/* CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="w-full md:w-auto flex justify-center md:justify-end"
        >
          <button
            className="group relative w-full md:w-auto inline-flex items-center justify-center 
                       px-10 py-4 bg-white text-[#ffc300ff] font-bold text-base md:text-lg cursor-pointer
                       uppercase tracking-wider rounded-full overflow-hidden 
                       shadow-2xl transition-all duration-300
                       hover:scale-105 active:scale-95"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 bg-linear-to-r 
                             from-transparent via-white/40 to-transparent 
                             -translate-x-full group-hover:animate-[shimmer_1.4s_ease-in-out]" />

            <span className="relative z-10">Contate-nos</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      
    </section>
  );
}
