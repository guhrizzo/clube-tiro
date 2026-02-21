"use client";

import { useEffect, useState } from "react";
import { Truck, ChevronRight, Maximize2, X, PlayCircle } from "lucide-react";

import NavBar from "components/NavBar";
import MetratonFinalPhase from "components/5phase";

const projectSteps = [
  {
    phase: "Fase 1",
    title: "O Projeto",
    description: "Engenharia e rascunhos iniciais da estrutura Metraton.",
    images: ["/truck/pt-1.png", "/truck/pt-2.png", "/truck/pt-3.png","/truck/pt-4.png", "/truck/pt-5.png", "/truck/pt-6.png"], // Adicione várias fotos aqui
    accent: "#ffb703"
  },
  {
    phase: "Fase 2",
    title: "Camuflagem Tática",
    description: "Aplicação das camadas Preto, Marrom e Cinza.",
    images: ["/truck/c1.jpeg", "/truck/c2.jpeg", "/truck/c3.jpeg",],
    accent: "#ffb703" 
  },
  {
    phase: "Fase 3",
    title: "Cores Nacionais",
    description: "O contraste vibrante do Verde e Amarelo.",
    images: ["/truck/va1.jpeg", "/truck/va2.jpeg", "/truck/va3.jpeg", "/truck/va4.jpeg", "/truck/va5.jpeg", "/truck/va6.jpeg", "/truck/va7.jpeg",],
    accent: "#ffb703"
  },
  {
    phase: "Fase 4",
    title: "Black Edition",
    description: "Finalização estética em Preto Absoluto.",
    images: ["/truck/b1.jpeg", "/truck/b2.jpeg", "/truck/b3.jpeg", "/truck/b4.jpeg", "/truck/b5.jpeg", "/truck/b6.jpeg",],
    accent: "#ffb703"
  },
];

export default function MetratonGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white pb-20">
      <NavBar />
      {/* HEADER MINIMALISTA */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-block px-3 py-1 border border-[#ffb703] text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          Special Build
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
          METRA<span className="text-[#ffb703]">TON</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto uppercase text-xs tracking-widest leading-loose">
          A evolução da força bruta em cinco etapas de engenharia e arte.
        </p>
      </section>

      {/* ROLO DE FASES */}
      <div className="space-y-32">
        {projectSteps.map((step, sIdx) => (
          <section key={sIdx} className="max-w-400 mx-auto px-6">
            {/* Título da Fase */}
            <div className="flex items-end gap-4 mb-10" data-aos="fade-right">
              <span className="text-5xl md:text-7xl font-black opacity-40 leading-none">{step.phase.split(" ")[1]}</span>
              <div className="pb-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight">{step.title}</h2>
                <div className="h-1 w-12 mt-1" style={{ backgroundColor: step.accent }} />
              </div>
              
            </div>

            {/* Grid de Fotos Inteligente (UX Melhorada) */}
            <p className=" mb-6 text-gray-500 text-sm max-w-md italic">{step.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {step.images.map((img, iIdx) => (
                <div 
                  key={iIdx}
                  onClick={() => setSelectedImg(img)}
                  className={`relative overflow-hidden cursor-zoom-in group rounded-sm
                    ${iIdx === 0 ? "col-span-2 row-span-2 h-100 md:h-150" : "h-48 md:h-73"}
                  `}
                  data-aos="fade-up"
                  data-aos-delay={iIdx * 100}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    alt={step.title}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" size={32} />
                  </div>
                </div>
              ))}
            </div>
            
          </section>
        ))}
        {/* FASE 5 - O VÍDEO (IMPACTO TOTAL) */}
        <MetratonFinalPhase />
      </div>

      {/* LIGHTBOX PARA VER AS FOTOS GRANDES */}
      {selectedImg && (
        <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-10 right-10 text-white hover:text-[#ffb703]"><X size={40}/></button>
          <img src={selectedImg} className="max-w-full max-h-full object-contain shadow-2xl" />
        </div>
      )}
    </main>
  );
}