"use client";

import { useEffect, useState } from "react";
import { Truck, ChevronRight, Maximize2, X, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

import NavBar from "components/NavBar";
import MetratonFinalPhase from "components/5phase";
import ScrollToTop from "components/BackTop";

const projectSteps = [
  {
    phase: "Fase 1",
    title: "O Projeto",
    description: "Engenharia e rascunhos iniciais da estrutura Metraton.",
    images: ["/truck/pt-1.png", "/truck/pt-2.png", "/truck/pt-3.png", "/truck/pt-5.png", "/truck/pt-6.png"],
    accent: "#ffb703"
  },
  {
    phase: "Fase 2",
    title: "Camuflagem Tática",
    description: "Aplicação das camadas Preto, Marrom e Cinza.",
    images: ["/truck/c3.jpeg", "/truck/c6.jpeg", "/truck/c4.jpeg","/truck/c1.jpeg", "/truck/c2.jpeg",],
    accent: "#ffb703"
  },
  {
    phase: "Fase 3",
    title: "Cores Nacionais",
    description: "O contraste vibrante do Verde e Amarelo.",
    images: ["/truck/va1.jpeg", "/truck/va2.jpeg", "/truck/va3.jpeg", "/truck/va4.jpeg", "/truck/va5.jpeg", "/truck/va6.jpeg", "/truck/va7.jpeg", "/truck/va8.jpeg", "/truck/va9.jpeg",],
    accent: "#ffb703"
  },
  {
    phase: "Fase 4",
    title: "Black Edition",
    description: "Finalização estética em Preto Absoluto.",
    images: ["/truck/b1.jpeg", "/truck/b2.jpeg", "/truck/b3.jpeg", "/truck/b5.jpeg", "/truck/b6.jpeg"],
    accent: "#ffb703"
  },
];

const useCases = [
  {
    emoji: "🎤",
    number: "01",
    title: "Palco Móvel para Eventos e Shows",
    description: "Aluguel para prefeituras, casas de show ou produtores de eventos que precisam de estrutura rápida em praças, feiras e festivais. Inclui som, iluminação e espaço elevado para DJ ou banda. Pode cobrar por diária ou pacote de final de semana com tudo incluso.",
    tags: ["Shows", "Festivais", "Feiras"],
  },
  {
    emoji: "🍻",
    number: "02",
    title: "Bar Itinerante / Open Bar Premium",
    description: `Aluguel para festas particulares, aniversários, casamentos e eventos corporativos, com o Metatron como bar móvel com choperia, drinks e DJ no teto. Estilo "Sunset Truck" para eventos ao ar livre ou Rooftop.`,
    tags: ["Casamentos", "Corporativo", "Open Bar"],
  },
  {
    emoji: "🎯",
    number: "03",
    title: "Clube de Tiro Simulado / Dry Fire Experience",
    description: "Experiência interativa de simulador de tiro com óculos VR ou laser. Ideal para eventos de aventura, exposições ou feiras armamentistas. Com material de segurança, instrutores e ambientação temática.",
    tags: ["VR", "Simulador", "Feiras"],
  },
  {
    emoji: "🍔",
    number: "04",
    title: "Gourmet Truck + Música",
    description: `Em parceria com chefs, o caminhão vira uma experiência gastronômica com trilha sonora ao vivo. "Metatron Burger & Beats" — eventos temáticos com hambúrguer artesanal, Tex-Mex, churrasco e mais.`,
    tags: ["Gastronomia", "Live Music", "Food Truck"],
  },
  {
    emoji: "🏆",
    number: "05",
    title: "Truck para Torcidas e Transmissões Esportivas",
    description: "Telão para transmissões ao vivo de Copa do Mundo, UFC, Fórmula 1 e mais. Com estrutura de bar, som e decoração temática para torcedores. Perfeito para estacionar em frente a bares parceiros.",
    tags: ["Esportes", "Transmissão", "Torcida"],
  },
  {
    emoji: "🏍️",
    number: "06",
    title: "Ponto de Encontro para Motoclubes e Off-Road",
    description: "O Metatron como QG móvel para eventos de motoclubes, com bar, som e espaço de socialização no topo. Com venda de produtos personalizados e acessórios para o público entusiasta.",
    tags: ["Motoclubes", "Off-Road", "Encontros"],
  },
  {
    emoji: "📣",
    number: "07",
    title: "Campanhas Promocionais e Lançamentos de Marca",
    description: `Aluguel para ações de marketing de rua, ativação de marca e divulgação de produtos com equipe, música e distribuição de brindes. "Metatron Experience" como mídia alternativa itinerante.`,
    tags: ["Marketing", "Ativação", "Branding"],
  },
  {
    emoji: "👨‍🏫",
    number: "08",
    title: "Caminhão Escola / Workshop Móvel",
    description: "Para instituições de ensino, escolas técnicas ou empresas que queiram realizar oficinas, palestras ou cursos em campo. Pode ser Estúdio de Podcast Móvel, espaço maker ou miniauditório.",
    tags: ["Educação", "Workshops", "Podcast"],
  },
  {
    emoji: "🎥",
    number: "09",
    title: "Cine Truck / Live Streaming ao Vivo",
    description: "Telão e projetor para cinema de rua ou transmissões ao vivo de eventos religiosos, shows ou palestras. Pode ser usado por igrejas, ONGs ou marcas que queiram alcançar o público nas ruas.",
    tags: ["Cinema", "Streaming", "ONGs"],
  },
  {
    emoji: "💡",
    number: "10",
    title: "Ponto Instagramável / Estúdio Criativo",
    description: "Cenário fotográfico exclusivo ou rooftop com visual impactante para influenciadores e marcas. Ideal para casamentos alternativos, ensaios fotográficos ou ativações pop-up.",
    tags: ["Fotografia", "Influencers", "Pop-up"],
  },
];

export default function MetratonGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <ScrollToTop />
      <NavBar />

      {/* HEADER */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-block px-3 py-1 border border-[#ffb703] text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          Special Build
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
          META<span className="text-[#ffb703]">TRON</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto uppercase text-xs tracking-widest leading-loose">
          A evolução da força bruta em cinco etapas de engenharia e arte.
        </p>
      </section>

      {/* ─── 10 OPÇÕES DE PROJETOS ─── */}
      <section className="max-w-7xl mx-auto px-6 mt-28">

        

        {/* Grid de cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.07 }}
              className="group relative bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-sm p-6 transition-all duration-300 hover:bg-zinc-900 overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors leading-none select-none">
                {item.number}
              </span>

              {/* Emoji + título */}
              <div className="mb-4 relative">
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <h3 className="font-black uppercase text-sm tracking-wide text-white leading-tight pr-10">
                  {item.title}
                </h3>
                <div className="h-px w-8 bg-[#ffb703] mt-3" />
              </div>

              {/* Descrição */}
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-zinc-700 text-zinc-400 group-hover:border-[#ffb703]/40 group-hover:text-[#ffb703]/80 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ffb703] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>
      {/* ─── FIM 10 OPÇÕES ─── */}

      {/* ROLO DE FASES */}
      <div className="space-y-32 mt-32">
        {projectSteps.map((step, sIdx) => (
          <section key={sIdx} className="max-w-400 mx-auto px-6">
            <div className="flex items-end gap-4 mb-10">
              <span className="text-5xl md:text-7xl font-black opacity-40 leading-none">{step.phase.split(" ")[1]}</span>
              <div className="pb-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight">{step.title}</h2>
                <div className="h-1 w-12 mt-1" style={{ backgroundColor: step.accent }} />
              </div>
            </div>

            <p className="mb-6 text-gray-500 text-sm max-w-md italic">{step.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {step.images.map((img, iIdx) => (
                <div
                  key={iIdx}
                  onClick={() => setSelectedImg(img)}
                  className={`relative overflow-hidden cursor-zoom-in group rounded-sm
                    ${iIdx === 0 ? "col-span-2 row-span-2 h-100 md:h-150" : "h-48 md:h-73"}
                  `}
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

        {/* FASE 5 - O VÍDEO */}
        <MetratonFinalPhase />
      </div>

      {/* LIGHTBOX */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-[#ffb703]">
            <X size={40} />
          </button>
          <img src={selectedImg} className="max-w-full max-h-full object-contain shadow-2xl" />
        </div>
      )}
    </main>
  );
}