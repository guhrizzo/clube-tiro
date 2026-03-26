"use client";

import Navbar from "components/NavBar";
import { Clock, MapPin, AlertTriangle, Scale, ArrowRight, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { dictionaries } from "dictionaries";
import { useLang } from "context/LangContext";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { db } from "lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { fetchOrderedPhotos } from "lib/fetchPhotos";

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm bg-zinc-800 animate-pulse aspect-4/3"
        />
      ))}
    </div>
  );
}

const narrative = [
  {
    label: "A ambição",
    text: "No intuito de continuar a levar o melhor da qualidade aos seus clientes e à sociedade, o GRUPO PROTECT empreendeu em um local único e diferencial em uma das mais nobres localizações de Belo Horizonte — Avenida Raja Gabaglia — em um Shopping Center, sendo o primeiro clube de tiro neste formato em todo o Brasil.",
  },
  {
    label: "A pandemia",
    text: "Quando estávamos agendando a inauguração, fomos surpreendidos com uma notificação de PANDEMIA GLOBAL, o que nos impossibilitou de sequer funcionar e manteve vários custos administrativos sem a menor receita econômica. Fomos afetados por uma inconsequente administração municipal que nos lacrou e impediu de funcionar por quase dois anos, conseguindo ainda aumentar de forma absurda os impostos das várias unidades que estávamos alugando.",
  },
  {
    label: "O decreto",
    text: "Não bastasse isso, a administração Federal, logo em sua posse, em cumprimento a uma das poucas promessas de campanha, direcionou que clubes de tiro somente poderiam funcionar após as 18h através do Decreto 12.345/2024 — sendo que o shopping encerrava suas atividades no máximo às 18h30.",
  },
  {
    label: "Nossa postura",
    text: "Cumprimos a determinação legal e arcamos com TODOS os prejuízos e custas necessários. Lamentavelmente em prejuízo à maioria e agradando a muito poucos.",
  },
];

export default function RajaPage() {
  const params = useParams();
  const lang = useLang();
  const t = dictionaries[lang as "pt" | "en" | "es"].raja;

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState<string | null>(null);

  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
  }, [photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  useEffect(() => {
  async function load() {
    try {
      setLoadingPhotos(true);
      setErrorPhotos(null);
      const data = await fetchOrderedPhotos("raja");
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
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />

      {/* ─── Header ─── */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          <AlertTriangle size={12} /> {t.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
          {t.title_main} <br />
          <span className="text-gray-500 text-3xl md:text-5xl lg:text-7xl italic font-light">
            {t.title_highlight}
          </span>
        </h1>
      </section>

      {/* ─── Conteúdo principal ─── */}
      <section className="max-w-5xl mx-auto mt-20 px-6">

        {/* Cards legislativos */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6 text-[#ffb703]">
              <Scale size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">{t.legal.title}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.legal.description}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{t.legal.impact}</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Clock size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6 text-red-500">
              <Clock size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">{t.operational.title}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#ffb703] shrink-0" size={18} />
                <p className="text-xs text-gray-300">
                  <span className="font-bold text-white">{t.operational.location_label}</span>{" "}
                  {t.operational.location_text}
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                  {t.operational.status_label}
                </p>
                <p className="text-white text-sm font-medium">{t.operational.status_text}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horário */}
        <div className="mt-12 text-center border-t border-zinc-800 pt-10">
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">{t.schedule.rule_label}</p>
          <div className="inline-block bg-white text-black px-6 py-3 font-black text-xl italic uppercase skew-x-[-10deg]">
            {t.schedule.hours}
          </div>
          <p className="text-gray-500 text-[10px] mt-6 max-w-2xl mx-auto leading-loose uppercase tracking-widest">
            {t.schedule.notice}
          </p>
        </div>

        {/* ─── Nossa História ─── */}
        <div className="mt-20 border-t border-zinc-800 pt-14">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Nossa História</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="relative mb-10">
            <Quote size={64} className="text-zinc-800 absolute -top-2 -left-2" />
            <p className="text-2xl md:text-3xl font-black italic text-white leading-snug pl-10 pt-4 max-w-3xl">
              O primeiro clube de tiro em Shopping Center de todo o Brasil.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />
            <div className="space-y-6">
              {narrative.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="md:pl-14 relative"
                >
                  <div className="absolute left-0 top-5 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hidden md:flex items-center justify-center">
                    <span className="text-[9px] font-black text-[#ffb703]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-sm hover:border-zinc-600 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ffb703] block mb-3">
                      {item.label}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 border border-zinc-700 bg-zinc-900 p-8 text-center"
          >
            <p className="text-white font-black text-lg italic uppercase tracking-wide">
              "Cumprimos a lei. Arcamos com os custos. Seguimos em frente."
            </p>
            <p className="text-zinc-500 text-xs mt-3 uppercase tracking-widest">— Grupo Protect</p>
          </motion.div>
        </div>
        {/* ─── Fim Nossa História ─── */}

        {/* ─── Galeria Dinâmica ─── */}
        <div className="mt-20 border-t border-zinc-800 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Galeria</span>
            <div className="flex-1 h-px bg-zinc-800" />
            {!loadingPhotos && !errorPhotos && (
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest">
                {photos.length} {photos.length === 1 ? "foto" : "fotos"}
              </span>
            )}
          </div>

          {loadingPhotos && <GallerySkeleton />}

          {errorPhotos && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-zinc-500 text-sm">{errorPhotos}</p>
            </div>
          )}

          {!loadingPhotos && !errorPhotos && photos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-zinc-500 text-sm">Nenhuma foto disponível no momento.</p>
            </div>
          )}

          {!loadingPhotos && !errorPhotos && photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
                  onClick={() => openLightbox(i)}
                  className="relative overflow-hidden group aspect-4/3 cursor-pointer rounded-sm"
                >
                  <span className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/30 tracking-widest select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      Ver
                    </span>
                  </div>
                  <Image
                    src={photo.url}
                    alt={photo.title || `Raja – foto ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {/* ─── Fim Galeria ─── */}

        {/* ─── Redirecionamento ─── */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">
            {t.redirect.text}{" "}
            <a href={`/${lang}/clube/gutierrez`} className="text-[#ffb703] hover:underline font-bold">
              {t.redirect.link}
            </a>
          </p>
          
          <a
            href={`/${lang}/clube/gutierrez`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffb703] text-black font-bold uppercase text-xs tracking-widest hover:bg-[#e6a502] transition-colors"
          >
            {t.redirect.link} <ArrowRight size={16} />
          </a>
        </div>

      </section>
      {/* ─── Fim seção principal ─── */}

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={22} />
            </button>

            <span className="absolute top-5 left-5 z-20 text-white/50 text-xs font-bold uppercase tracking-widest">
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
              className="relative max-w-5xl max-h-[85vh] w-full mx-16 rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox].url}
                alt={photos[lightbox].title || `Raja – foto ${lightbox + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
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
                  className={`relative shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                    i === lightbox
                      ? "border-[#ffb703] opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image src={photo.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ─── Fim Lightbox ─── */}

    </main>
  );
}