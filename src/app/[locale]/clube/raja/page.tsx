"use client";

import Navbar from "components/NavBar";
import { Clock, MapPin, AlertTriangle, Scale, ArrowRight, Quote } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { dictionaries } from "dictionaries";
import { useLang } from "context/LangContext";
import Image from "next/image";

const galleryImages = Array.from({ length: 13 }, (_, i) => `/raja${i + 1}.jpeg`);

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

        {/* ─── NOSSA HISTÓRIA ─── */}
        <div className="mt-20 border-t border-zinc-800 pt-14">

          {/* Header da seção */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">— Nossa História</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Aspas decorativas */}
          <div className="relative mb-10">
            <Quote size={64} className="text-zinc-800 absolute -top-2 -left-2" />
            <p className="text-2xl md:text-3xl font-black italic text-white leading-snug pl-10 pt-4 max-w-3xl">
              O primeiro clube de tiro em Shopping Center de todo o Brasil.
            </p>
          </div>

          {/* Timeline de cards */}
          <div className="relative">
            {/* Linha vertical */}
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
                  {/* Dot na timeline */}
                  <div className="absolute left-0 top-5 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hidden md:flex items-center justify-center">
                    <span className="text-[9px] font-black text-[#ffb703]">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-sm hover:border-zinc-600 transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ffb703] block mb-3">
                      {item.label}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Frase de encerramento */}
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
        {/* ─── FIM NOSSA HISTÓRIA ─── */}

        {/* ─── GALERIA DE FOTOS ─── */}
        <div className="mt-20 border-t border-zinc-800 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em]">
              — Galeria
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Grid ordenado da esquerda para a direita */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
                className="relative overflow-hidden group aspect-[4/3]"
              >
                <span className="absolute top-2 left-2 z-10 text-[9px] font-black text-white/30 tracking-widest select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 z-10 bg-[#ffb703]/0 group-hover:bg-[#ffb703]/10 transition-colors duration-300" />
                <Image
                  src={src}
                  alt={`Raja – foto ${i + 1}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
    </main>
  );
}