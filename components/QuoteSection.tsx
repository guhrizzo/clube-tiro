"use client";

import { FaQuoteLeft, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function QuoteSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });

    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // BLOQUEIO DE SCROLL DO FUNDO
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup ao desmontar o componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* SECTION PRINCIPAL */}
      <section className="relative overflow-hidden bg-[#020b18] py-28 px-6 border-t border-white/5">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#ffc300]/10 blur-[160px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="zoom-in">
            <FaQuoteLeft className="text-[#ffc300]/20 text-7xl mx-auto mb-10" />
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white text-[1.35rem] md:text-[2.1rem] font-light leading-relaxed italic mb-12 tracking-wide"
          >
            “A arma de fogo é o único instrumento que remove a disparidade de força física,
            tamanho ou número entre atacantes e alguém se defendendo.
            <span className="text-[#ffc300] font-bold not-italic"> Por isso, portar uma arma é um ato civilizado.</span>”
          </h2>

          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
            <div className="w-14 h-0.5 bg-[#ffc300] mb-4 rounded-full" />
            <span className="text-white font-black tracking-[0.25em] uppercase text-sm">
              Major L. Caudill
            </span>
            <span className="text-white/40 text-xs uppercase tracking-[0.35em] mt-2">
              Corpo de Fuzileiros Navais dos EUA
            </span>
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-14">
            <button
              onClick={() => setOpen(true)}
              className="group relative overflow-hidden text-[#ffc300] cursor-pointer text-xs font-bold uppercase tracking-[0.3em] border border-[#ffc300]/40 px-10 py-3.5 rounded-full transition-all duration-300 hover:text-[#020b18] hover:shadow-[0_0_25px_rgba(255,195,0,0.25)]"
            >
              <span className="relative z-10">Ler Manifesto Completo</span>
              <span className="absolute inset-0 bg-[#ffc300] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL COM SCROLL INTERNO E BLOQUEIO EXTERNO */}
      <div
        className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#020b18] border border-white/10 rounded-[2.5rem] w-[92%] max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out ${
            open ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
        >
          {/* Header do Modal */}
          <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-white/1">
            <h3 className="text-white font-black tracking-[0.2em] uppercase text-xs">
              Arma é Civilização
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white/20 cursor-pointer hover:text-[#ffc300] transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Conteúdo com Scrollbar Invisível via Tailwind Puro */}
          <div className="px-10 py-10 text-white/70 text-[0.95rem] leading-relaxed space-y-6 overflow-y-auto max-h-[60vh] 
                          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none">
            
            <p className="font-bold uppercase tracking-[0.2em] text-[#ffc300] text-[10px] mb-8 border-l-2 border-[#ffc300] pl-4">
              Por: Major L. Caudill — Fuzileiros Navais EUA
            </p>

            <div className="space-y-6 italic opacity-90">
              <p>As pessoas só possuem duas maneiras de lidar umas com as outras: pela razão e pela força.</p>
              
              <p>A força não tem lugar como método válido de interação social e a única coisa que remove a força da equação é uma arma de fogo.</p>
              
              <p className="text-white font-medium not-italic border-y border-white/5 py-4">
                "A arma de fogo remove a disparidade de força física, tamanho ou número entre atacantes em potencial e alguém se defendendo."
              </p>

              <p>Quem advoga pelo banimento das armas de fogo opta automaticamente pelo governo do jovem, do forte e dos em maior número.</p>

              <p>A arma de fogo é o único instrumento que é igualmente letal nas mãos de um octogenário quanto de um halterofilista.</p>

              <p>A maior civilização é onde todos os cidadãos estão igualmente armados e só podem ser persuadidos, nunca forçados.</p>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </div>
    </>
  );
}