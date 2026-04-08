"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "../../../../../components/NavBar";
import { dictionaries } from "../../../../../dictionaries";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Shield, Users, Award, ChevronRight, ChevronLeft, X } from "lucide-react";

import { fetchOrderedPhotos } from "../../../../../lib/fetchPhotos";

const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

// ─── Tipo ───
interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

// ─── Skeleton ───
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-sm bg-zinc-800 animate-pulse aspect-square" />
      ))}
    </div>
  );
}

const stats = [
  { value: "4", unit: "décadas", label: "de experiência" },
  { value: "3.000+", unit: "policiais", label: "treinados" },
  { value: "10+", unit: "cidades", label: "atendidas" },
  { value: "100%", unit: "excelência", label: "em cada serviço" },
];

const clientGroups = [
  "Guardas Municipais de BH, Nova Lima, Contagem e Sete Lagoas",
  "Policiais Civis, Militares e Federais",
  "Juízes, Magistrados e Promotores",
  "Atiradores Esportivos e CAC",
];

export default function CapacitacaoPage() {
  const pathname = usePathname();

  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : "pt";
  }, [pathname]);

  const t = (dictionaries as any)[currentLang].guardTraining;

  // ─── Estado da galeria ───
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState<string | null>(null);

  // ─── Lightbox ───
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() =>
    setLightboxIndex((p) => (p === null ? null : (p - 1 + photos.length) % photos.length)),
  [photos.length]);

  const goNext = useCallback(() =>
    setLightboxIndex((p) => (p === null ? null : (p + 1) % photos.length)),
  [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goPrev, goNext]);

  // ─── Busca fotos no Firestore ───
useEffect(() => {
  async function load() {
    try {
      setLoadingPhotos(true);
      setErrorPhotos(null);
      const data = await fetchOrderedPhotos("guardas");
      setPhotos(data);
    } catch {
      setErrorPhotos("Não foi possível carregar as fotos. Tente novamente mais tarde.");
    } finally {
      setLoadingPhotos(false);
    }
  }
  load();
}, []);
  const openWhatsApp = (message: string) => {
    const phone = "5531992118500";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const coursesList = [
    { key: "sportiveShooting", cta: t.courses.sportiveShooting.cta },
    { key: "responsibleHunting", cta: t.courses.responsibleHunting.cta },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <NavBar />

      {/* ─── HERO ─── */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ffb703] text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em] mb-6">
          <Shield size={12} /> Capacitação & Treinamento
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-4">
          {t.title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
          {t.description}
        </p>
      </section>

      {/* ─── NOSSA HISTÓRIA ─── */}
      <section className="max-w-5xl mx-auto mt-24 px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Nossa Trajetória</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="relative mb-14">
          <Quote size={72} className="text-zinc-800 absolute -top-4 -left-3 select-none" />
          <p className="text-xl md:text-2xl font-black italic text-white leading-snug pl-12 pt-4 max-w-4xl">
            Quase 4 décadas preparando cidadãos para o manuseio de armamentos e munições com excelência.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-10 rounded-sm mb-8">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
            O <span className="text-white font-bold">GRUPO PROTECT</span>, há mais de 32 anos atuando na área
            de treinamento, qualificação e capacitação, prepara o cidadão para o manuseio de armamentos e munições tanto
            para a <span className="text-[#ffb703] font-semibold">prática esportiva</span>,{" "}
            <span className="text-[#ffb703] font-semibold">profissional</span> e{" "}
            <span className="text-[#ffb703] font-semibold">segurança pessoal</span>. Possui sede própria e já prestou
            treinamento para os guardas dos municípios de Belo Horizonte, Contagem, Nova Lima, Sete Lagoas, dentre
            outras — obtendo aprovação em alto nível em todas as suas prestações de serviço.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Ao longo dos anos mantendo a <span className="text-white font-bold">liderança no mercado</span>,
            sofisticando e aprimorando para melhor servir a comunidade nacional, sempre com grande experiência e
            desempenho excepcional — destacando-se a cada ano e superando em atendimento, qualidade, serviços e
            venda de produtos.
          </p>
        </div>

        {/* Cartas de Capacidade Técnica */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Cartas de Capacidade Técnica</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="grid gap-3">
            {[
              { org: "Magistrados e Servidores da Justiça do Trabalho de MG", service: "Curso teórico e prático de tiro" },
              { org: "Fundação Guimarães Rosa", service: "Ministrada a disciplina uso legal e progressivo da força, emprego de equipamentos letais e treinamento prático de manuseio de arma de fogo" },
              { org: "Banco Central do Brasil", service: "Avaliação técnica no emprego de armamento e tiro para porte" },
              { org: "Guarda Municipal de Belo Horizonte – MG", service: "Treinamento, capacitação e avaliação teóricos e práticos de manuseio de arma de fogo e uso progressivo da força" },
              { org: "Guarda Municipal de Contagem – MG", service: "Treinamento, capacitação e avaliação teóricos e práticos de manuseio de arma de fogo e uso progressivo da força" },
              { org: "Guarda Municipal de Sete Lagoas – MG", service: "Treinamento, capacitação e avaliação teóricos e práticos de manuseio de arma de fogo e uso progressivo da força" },
              { org: "Município de Mariana – MG", service: "Fornecimento de coletes balísticos" },
              { org: "Guarda Municipal de Nova Lima – MG", service: "Treinamento, capacitação e avaliação teóricos e práticos de manuseio de arma de fogo e uso progressivo da força" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex gap-4 border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-600 transition-colors"
              >
                <div className="shrink-0 w-6 h-6 flex items-center justify-center border border-[#ffb703]/40 mt-0.5">
                  <span className="text-[9px] font-black text-[#ffb703]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wide leading-tight mb-1">{item.org}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{item.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-zinc-900 border border-zinc-800 p-6 text-center hover:border-[#ffb703]/40 transition-colors"
            >
              <p className="text-3xl font-black text-[#ffb703] leading-none">{s.value}</p>
              <p className="text-white text-xs font-bold uppercase tracking-widest mt-1">{s.unit}</p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Público atendido */}
        <div className="border border-zinc-800 bg-zinc-900/40 p-8 rounded-sm mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Users size={18} className="text-[#ffb703]" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Quem já treinamos</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {clientGroups.map((group, i) => (
              <div key={i} className="flex items-start gap-3">
                <ChevronRight size={14} className="text-[#ffb703] shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{group}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERIA ─── */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Galeria</span>
          <div className="flex-1 h-px bg-zinc-800" />
          {!loadingPhotos && !errorPhotos && (
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest">
              {photos.length} {photos.length === 1 ? "foto" : "fotos"}
            </span>
          )}
        </div>

        {/* Estado: carregando */}
        {loadingPhotos && <GallerySkeleton />}

        {/* Estado: erro */}
        {errorPhotos && (
          <div className="flex items-center justify-center py-20">
            <p className="text-zinc-500 text-sm">{errorPhotos}</p>
          </div>
        )}

        {/* Estado: vazio */}
        {!loadingPhotos && !errorPhotos && photos.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-zinc-500 text-sm">Nenhuma foto disponível no momento.</p>
          </div>
        )}

        {/* Estado: fotos carregadas */}
        {!loadingPhotos && !errorPhotos && photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden group aspect-square cursor-zoom-in"
              >
                <span className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/30 tracking-widest select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 z-10 bg-[#ffb703]/0 group-hover:bg-[#ffb703]/10 transition-colors duration-300" />
                <Image
                  src={photo.url}
                  alt={photo.title || `Capacitação – foto ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ─── VÍDEO ─── */}
      <section className="max-w-5xl mx-auto mt-10 px-6">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Vídeo</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative w-full overflow-hidden border border-zinc-800 bg-zinc-900"
        >
          <video
            src="/guardasVideo.mp4"
            controls
            playsInline
            className="w-full h-auto block"
            poster="/guardas-poster.jpg"
          />
        </motion.div>
      </section>

      {/* ─── CURSOS ─── */}
      <section className="max-w-5xl mx-auto mt-24 px-6">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Nossos Cursos</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {coursesList.map((course) => (
            <div
              key={course.key}
              className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-sm hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-[#ffb703]" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ffb703]">Curso</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                {t.courses[course.key].title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t.courses[course.key].description}
              </p>
              <button
                onClick={() => openWhatsApp(course.cta)}
                className="inline-flex items-center gap-2 bg-[#ffb703] text-black px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#e6a502] transition-colors cursor-pointer"
              >
                {t.buttons.learnMore} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-zinc-700 bg-zinc-900 p-10 text-center"
        >
          <p className="text-white font-black text-lg italic uppercase tracking-wide mb-2">
            "Quase 4 décadas formando profissionais com excelência."
          </p>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8">— Grupo Protect</p>
          <a href="https://wa.me/5531992118500"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ffb703] text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#e6a502] transition-colors">
            Falar no WhatsApp <ChevronRight size={16} />
          </a>
        </motion.div>
      </section>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] font-black text-white/30 tracking-widest uppercase select-none">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-[#ffb703] transition-colors"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].title || `Capacitação – foto ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-[#ffb703] transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}