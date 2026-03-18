"use client";

import Navbar from "components/NavBar";
import { Clock, MapPin, AlertTriangle, Scale, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { dictionaries } from "dictionaries";
import { useLang } from "context/LangContext";
import Image from "next/image";

const galleryImages = Array.from({ length: 18 }, (_, i) => `/raja${i + 1}.jpeg`);

export default function RajaPage() {
  const params = useParams();
  const lang = useLang();
  const t = dictionaries[lang as "pt" | "en" | "es"].raja;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />

      {/* Header com Status */}
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

      {/* Grid de Explicação Legislativa */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Card: O Motivo Legista */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6 text-[#ffb703]">
              <Scale size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">{t.legal.title}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.legal.description}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{t.legal.impact}</p>
          </div>

          {/* Card: Impacto na Unidade */}
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

        {/* Informação sobre horário permitido */}
        <div className="mt-12 text-center border-t border-zinc-800 pt-10">
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">{t.schedule.rule_label}</p>
          <div className="inline-block bg-white text-black px-6 py-3 font-black text-xl italic uppercase skew-x-[-10deg]">
            {t.schedule.hours}
          </div>
          <p className="text-gray-500 text-[10px] mt-6 max-w-2xl mx-auto leading-loose uppercase tracking-widest">
            {t.schedule.notice}
          </p>
        </div>

        {/* ─── GALERIA DE FOTOS ─── */}
        <div className="mt-20 border-t border-zinc-800 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">
              — Galeria
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
                className="break-inside-avoid relative overflow-hidden group"
              >
                {/* Numbered overlay */}
                <span className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/30 tracking-widest select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Hover tint */}
                <div className="absolute inset-0 z-10 bg-[#ffb703]/0 group-hover:bg-[#ffb703]/10 transition-colors duration-300" />

                <Image
                  src={src}
                  alt={`Raja – foto ${i + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
        {/* ─── FIM DA GALERIA ─── */}

        {/* Redirecionamento */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">
            {t.redirect.text}{" "}
            <a href={`/${lang}/unidades/gutierrez`} className="text-[#ffb703] hover:underline font-bold">
              {t.redirect.link}
            </a>
          </p>
          <a
            href={`/${lang}/unidades/gutierrez`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffb703] text-black font-bold uppercase text-xs tracking-widest hover:bg-[#e6a502] transition-colors"
          >
            {t.redirect.link} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}