"use client";

import Navbar from "components/NavBar";
import {
  MapPin, Clock, Phone, Navigation, ExternalLink,
  ChevronLeft, ChevronRight, X,
  Target, Hotel, Utensils, Trees, BookOpen, Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const galleryImages = Array.from({ length: 19 }, (_, i) => `/lima${i + 1}.jpeg`);

const features = [
  { icon: Target,   label: "Clube de Tiro", desc: "Campos de tiro com infraestrutura de alto nível para desportistas" },
  { icon: Hotel,    label: "Pousada",        desc: "Hospedagem exclusiva integrada ao complexo" },
  { icon: Utensils, label: "Restaurante",    desc: "Gastronomia regional em ambiente campestre" },
  { icon: Trees,    label: "Condomínio",     desc: "Área residencial em local nobre ao lado do Alphaville" },
  { icon: BookOpen, label: "Museu",          desc: "Acervo histórico do Grupo PROTECT ao longo de quase 4 décadas" },
  { icon: Award,    label: "Treinamentos",   desc: "Centro de cursos, capacitações e certificações" },
];

export default function UnidadeNovaLimaPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  }, []);

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

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-[#ffb703]" />
              <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em]">Nossa Unidade</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-6 leading-none">
              Nova Lima <span className="text-[#ffb703]">•</span> Alphaville
            </h1>

            <p className="text-slate-400 text-sm md:text-2xl font-light leading-relaxed">
              Rua dos Radialistas, 38 — Nova Lima/MG
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#fafafa] to-transparent" />
      </section>

      {/* ── Info + Map ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Info Cards */}
          <div className="lg:col-span-1 space-y-6">

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-14 h-14 bg-[#ffb703]/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={28} className="text-[#ffb703]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3">Endereço</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Rua dos Radialistas, 38<br />
                <span className="text-slate-400">Bairro Água Limpa</span><br />
                <span className="text-slate-900 font-semibold">Nova Lima • MG</span>
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Rua+dos+Radialistas,38,Nova+Lima,MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ffb703] hover:text-[#e6a502] font-bold text-sm uppercase tracking-wider transition-colors group"
              >
                <Navigation size={16} />
                Como Chegar
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Horário de Funcionamento</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Terça a Domingo</span>
                  <span className="text-slate-900 font-bold">09h às 18h</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-red-800 text-sm font-medium text-center">Segunda-feira: Fechado</p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb703]/20 rounded-bl-full" />
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 relative">
                <Phone size={28} className="text-[#ffb703]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3 relative">Contato</h3>
              <p className="text-slate-400 text-sm mb-4 relative">
                Entre em contato conosco para mais informações sobre nossos serviços.
              </p>
              <a
                href="tel:+5531971078500"
                className="block text-2xl font-black text-[#ffb703] hover:text-white transition-colors mb-2 relative"
              >
                (31) 97107-8500
              </a>
              <a
                href="https://wa.me/5531971078500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#ffb703] text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#e6a502] transition-colors relative"
              >
                WhatsApp
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 h-full min-h-125">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.1234567890123!2d-43.98765432109876!3d-19.87654321098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20dos%20Radialistas%2C%2038%20-%20Agua%20Limpa%2C%20Nova%20Lima%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-20 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Aberto Agora</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Sobre a Unidade ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-slate-200 pt-12"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12 bg-[#ffb703]" />
            <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em]">Sobre a Unidade</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Texto + Stats */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black uppercase italic leading-tight text-slate-900">
                Quase <span className="text-[#ffb703]">4 décadas</span> de referência
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Referência em segurança patrimonial e pública há quase quatro décadas, o{" "}
                <strong className="text-slate-900">Grupo PROTECT</strong> iniciou, há cerca de 30 anos, um
                empreendimento com a compra de uma grande área em local nobre,{" "}
                <strong className="text-slate-900">ao lado do Alphaville Nova Lima</strong>.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                O clube campestre de tiro, após o encerramento das atividades de sua sede em Shopping
                Center, recebe uma nova e ampla reforma com o objetivo de atualizar e melhor qualificar
                seus atiradores desportistas.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                O projeto contempla áreas de pousada, restaurante, condomínio, museu e muitos outros
                entretenimentos qualificados, tornando-se uma das{" "}
                <strong className="text-slate-900">
                  maiores estruturas de treinamentos, capacitações e cursos
                </strong>{" "}
                do estado.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "~40", label: "Anos de atuação" },
                  { value: "30+", label: "Anos no local" },
                  { value: "1ª",  label: "Grande área MG"  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature list */}
            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-[#ffb703]/10 flex items-center justify-center mt-0.5">
                    <f.icon size={18} className="text-[#ffb703]" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-bold uppercase tracking-wide">{f.label}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Galeria ── */}
        <div className="mt-20 border-t border-slate-200 pt-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12 bg-[#ffb703]" />
            <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em]">Galeria</span>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-[10px] uppercase tracking-widest">{galleryImages.length} fotos</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                onClick={() => openLightbox(i)}
                className="rounded-xl group cursor-pointer shadow-sm overflow-hidden"
                style={{ position: "relative", paddingBottom: "75%", height: 0 }}
              >
                <span
                  className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/60 tracking-widest select-none drop-shadow"
                  style={{ zIndex: 10 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    Ver
                  </span>
                </div>
                <Image
                  src={src}
                  alt={`Nova Lima – foto ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
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
              {String(lightbox + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
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
              className="relative max-w-5xl max-h-[85vh] w-full mx-16 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox]}
                alt={`Nova Lima – foto ${lightbox + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-20 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[80vw] px-4 pb-1">
              {galleryImages.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`relative shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                    i === lightbox
                      ? "border-[#ffb703] opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}