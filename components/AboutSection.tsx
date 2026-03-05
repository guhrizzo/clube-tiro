"use client";

import { useState } from "react";
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  ArrowRight,
  X,
  ExternalLink,
  LocateFixed,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const lang = useLang();
  const t = dictionaries[lang].about;

  const values = [
    { key: "historia", icon: ShieldCheck },
    { key: "missao", icon: Target },
    { key: "social", icon: HeartHandshake },
  ] as const;

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <span className="inline-block text-[#001d3d] text-xs font-bold tracking-[0.35em] uppercase">
            {t.badge}
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            {t.title_main}{" "}
            <span className="text-[#ffb703]">{t.title_highlight}</span>
          </h2>

          <div className="mx-auto h-1 w-24 bg-[#ffb703] rounded-full" />
        </div>

        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-14 mb-24 items-center">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-semibold text-[#001d3d] leading-relaxed">
              {t.hero_text}
            </p>
          </div>

          <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
            <p>
              {t.pillars_label}{" "}
              <span className="font-bold text-[#1a1a1a]">
                {t.pillars_content}
              </span>
            </p>
            <p>{t.cta_text}</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {values.map((item, index) => {
            const cardData = t.cards[item.key];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group relative flex flex-col h-full p-8 rounded-3xl border border-gray-100 bg-white
                shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 border border-[#ffb703]/20">
                  <item.icon className="w-6 h-6 text-[#ffb703]" />
                </div>

                <h4 className="text-[#001d3d] font-bold text-xl mb-2">
                  {cardData.title}
                </h4>

                <p className="text-gray-500 leading-relaxed text-sm">
                  {cardData.description}
                </p>

                <button
                  onClick={() => setActiveModal(item.key)}
                  className="mt-auto pt-6 text-[#ffb703] font-semibold text-sm flex items-center cursor-pointer gap-2 group/btn"
                >
                  {t.learn_more}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rastreamento */}
          <Link
            href={`/${lang}/rastreamento`}
            className="group flex items-center justify-between p-7 bg-white border border-gray-200 rounded-2xl hover:border-[#ffb703]/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ffb703] rounded-xl text-[#001d3d] shadow-sm">
                <LocateFixed size={24} />
              </div>
              <div>
                <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                  {t.cta_tracking_label} {/* <--- DINÂMICO */}
                </span>
                <p className="text-[#001d3d] font-bold text-lg">
                  {t.cta_tracking_title} {/* <--- DINÂMICO */}
                </p>
              </div>
            </div>
            <ArrowRight className="text-[#001d3d] group-hover:translate-x-2 transition-transform duration-300" />
          </Link>

          {/* Clubes */}
          <Link
            href={`/${lang}/clube`}
            className="group flex items-center justify-between p-7 bg-white border border-gray-200 rounded-2xl hover:border-[#ffb703]/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ffb703] rounded-xl text-[#001d3d] shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                  {t.cta_clubs_label} {/* <--- DINÂMICO */}
                </span>
                <p className="text-[#001d3d] font-bold text-lg">
                  {t.cta_clubs_title} {/* <--- DINÂMICO */}
                </p>
              </div>
            </div>
            <ArrowRight className="text-[#001d3d] group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveModal(null)}
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 30 }}
              transition={{ duration: 0.22 }}
              className="relative bg-white max-w-2xl w-full rounded-3xl p-9 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-[#001d3d]">
                  {t.cards[activeModal as keyof typeof t.cards].title}
                </h4>

                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t.cards[activeModal as keyof typeof t.cards].content}
                </p>

                {activeModal === "social" && (
                  <a
                    href="https://guerreirosdobem.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 font-semibold text-[#ffb703] hover:text-black transition-colors"
                  >
                    {t.visit_ong}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}