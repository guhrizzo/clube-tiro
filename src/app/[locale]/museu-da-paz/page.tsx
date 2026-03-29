"use client";

import NavBar from "components/NavBar";
import {
  Shield,
  Globe,
  Landmark,
  ArrowRight,
  ScrollText,
  BadgeCheck,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { db } from "lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { fetchOrderedPhotos } from "lib/fetchPhotos";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-sm bg-zinc-800 animate-pulse aspect-4/3" />
      ))}
    </div>
  );
}

export default function MuseuDaPaz() {
  // ─── Estado da galeria ───
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState<string | null>(null);

  // ─── Lightbox ───
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const prev = useCallback(() => {
    setImgLoading(true);
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, [photos.length]);


  const next = useCallback(() => {
    setImgLoading(true);
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // ─── Busca fotos no Firestore ───
  useEffect(() => {
    async function load() {
      try {
        setLoadingPhotos(true);
        setErrorPhotos(null);
        const data = await fetchOrderedPhotos("paz");
        setPhotos(data);
      } catch {
        setErrorPhotos("Não foi possível carregar as fotos. Tente novamente mais tarde.");
      } finally {
        setLoadingPhotos(false);
      }
    }
    load();
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white pb-24 overflow-hidden">
      <NavBar />

      {/* ================= HERO ================= */}
      <section className="pt-32 px-6 text-center relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Museu da <span className="text-[#ffb703]">Paz</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-[0.2em]">
            Preservando a história para proteger o futuro
          </p>
        </motion.div>
      </section>

      {/* ================= FILOSOFIA ================= */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
      >
        <div className="group bg-zinc-900/60 border border-zinc-800 p-8 md:p-12 rounded-lg relative overflow-hidden transition-all duration-500 hover:border-[#ffb703]/40 hover:shadow-[0_0_40px_rgba(255,183,3,0.08)]">
          <div className="absolute inset-0 bg-linear-to-br from-[#ffb703]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <ScrollText className="absolute -right-6 -top-6 w-52 h-52 text-white/5 -rotate-12" />
          <div className="relative z-10">
            <h2 className="text-[#ffb703] font-serif italic text-2xl mb-2">
              "Si vis pacem, para bellum"
            </h2>
            <h2 className="text-[#ffb703]/40 font-serif italic text-xl mb-6">
              "Se queres Paz, prepare-se para a Guerra."
            </h2>
            <p className="text-gray-300 text-[15px] leading-relaxed italic">
              Este provérbio clássico, atribuído ao autor romano Flávio Vegécio Renatus, sugere que a melhor forma de garantir a paz e evitar ataques é manter uma postura de força e prontidão defensiva.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ================= MISSÃO E EDUCAÇÃO ================= */}
      <section className="max-w-6xl mx-auto mt-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="h-1 w-20 bg-[#ffb703]" />
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              O <span className="text-[#ffb703] font-bold">Museu da Paz</span> promove educação histórica e reflexão sobre os conflitos humanos ao longo do tempo, destacando a importância da{" "}
              <span className="italic">defesa responsável</span> e da preservação cultural.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity">
              <Shield size={120} />
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-green-500 bg-green-500/10 w-fit px-4 py-1.5 rounded-full border border-green-500/20">
                <BadgeCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Institucional</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                O projeto possui{" "}
                <strong className="text-white">
                  Certificado de Registro emitido pelo Exército Brasileiro
                </strong>
                , garantindo legalidade e segurança institucional em todas as suas atividades de preservação.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= TEXTO INSTITUCIONAL ================= */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={3}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-[#ffb703]" />
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">Nossa Proposta</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>
            No intuito de ajudar a educar a população com uma cultura de preservação ambiental e de conhecimento da história de conflitos humanos em busca de paz, estes serão os focos deste museu — com total legalidade e segurança para os clientes, alunos, professores e visitantes em geral.
          </p>
          <p>
            Vamos contar a história das adversidades da sociedade nacional e internacional, com a dissertação, exemplificação e exposição de meios de defesa utilizados em diversas épocas.
          </p>
          <p>
            Todo o processo será realizado com a utilização de <strong className="text-white">objetos historicamente colecionáveis</strong>, contempláveis, áudios visuais modernos e armamentos diversos — colocando diferencial e elevação de padrão ao único Museu da Paz.
          </p>
          <p>
            Serão também incluídos documentários, exposições e depoimentos de pessoas reconhecidas no cenário, além de vasta divulgação em meios físicos e digital.
          </p>

          <div className="mt-8 flex items-start gap-4 bg-zinc-900/60 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-colors">
            <Globe size={22} className="text-[#ffb703] shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-bold mb-1 uppercase tracking-wider">Parceria Institucional</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tudo isto com a colaboração da ONG{" "}
                <a href="https://www.guerreirosdobem.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffb703] hover:underline font-bold inline-flex items-center gap-1">
                  GUERREIROS DO BEM
                  <ExternalLink size={12} />
                </a>
                , que estará à frente da administração e divulgação para melhor aculturar a nossa sociedade.
              </p>
            </div>
          </div>

          <blockquote className="mt-8 border-l-2 border-[#ffb703] pl-6 italic text-gray-400 text-base md:text-lg">
            "Aqueles que não conseguem lembrar o passado estão condenados a repeti-lo."
          </blockquote>
        </div>
      </motion.section>

      {/* ================= GALERIA ================= */}
      <motion.section
        className="max-w-6xl mx-auto px-6 mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={4}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-[#ffb703]" />
          <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">Galeria</span>
          <div className="flex-1 h-px bg-zinc-800" />
          {!loadingPhotos && !errorPhotos && (
            <span className="text-zinc-600 text-[10px] uppercase tracking-widest">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                onClick={() => { setImgLoading(true); setLightbox(i); }}
                className="relative overflow-hidden rounded-sm group cursor-pointer aspect-4/3"
              >
                <span className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/40 tracking-widest select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-black uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-sm">
                    Ver
                  </span>
                </div>
                <Image
                  src={photo.url}
                  alt={photo.title || `Museu da Paz – foto ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* ================= ALERTA INAUGURAÇÃO ================= */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mt-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={5}
      >
        <div className="relative overflow-hidden border border-[#ffb703]/40 bg-[#ffb703]/5 p-8 md:p-12 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border border-[#ffb703]/10 animate-ping" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-pulse" />
              <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.5em]">Em breve</span>
              <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-pulse" />
            </div>
            <p className="text-[#ffb703] text-3xl md:text-5xl font-black uppercase tracking-tight italic">
              Inauguração em Breve
            </p>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mt-4 max-w-md mx-auto leading-loose">
              Acompanhe nossas redes sociais e fique por dentro de todas as novidades do Museu da Paz.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <section className="mt-24 text-center px-6 pb-10">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-[#ffb703] to-transparent mx-auto mb-8" />
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">
          Ambiente Seguro • Legalidade Total • Patrimônio Histórico
        </p>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={22} />
            </button>

            <span className="absolute top-5 left-5 z-20 text-white/40 text-xs font-black uppercase tracking-widest">
              {String(lightbox + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-16 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Spinner enquanto a imagem carrega */}
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#ffb703] animate-spin" />
                </div>
              )}

              <Image
                src={photos[lightbox].url}
                alt={photos[lightbox].title || `Museu da Paz – foto ${lightbox + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
                onLoadingComplete={() => setImgLoading(false)}
                // garante que sempre inicia como loading ao trocar foto
                onLoad={() => setImgLoading(false)}
              />

              {(photos[lightbox].title || photos[lightbox].description) && (
                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-linear-to-t from-black/80 to-transparent">
                  {photos[lightbox].title && (
                    <p className="text-white font-bold text-sm">{photos[lightbox].title}</p>
                  )}
                  {photos[lightbox].description && (
                    <p className="text-white/60 text-xs mt-1">{photos[lightbox].description}</p>
                  )}
                </div>
              )}
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[80vw] px-4 pb-1">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`relative shrink-0 w-12 h-8 overflow-hidden border-2 transition-all ${i === lightbox ? "border-[#ffb703] opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                    }`}
                >
                  <Image src={photo.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}