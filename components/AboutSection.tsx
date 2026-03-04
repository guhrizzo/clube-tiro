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
} from "lucide-react";

export default function AboutSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const lang = useLang();
  
  // Atalho para as traduções desta seção
  const t = dictionaries[lang].about;

  // Definição dos cards vinculando o Ícone à Chave do dicionário
  const values = [
    { key: "historia", icon: ShieldCheck },
    { key: "missao", icon: Target },
    { key: "social", icon: HeartHandshake },
  ] as const;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[#001d3d] text-sm font-bold tracking-[0.25em] uppercase">
            {t.badge}
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            {t.title_main} <span className="text-[#ffb703]">{t.title_highlight}</span>
          </h3>
        </div>

        {/* Texto de Introdução */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <p className="text-xl font-semibold text-[#001d3d] leading-relaxed">
              {t.hero_text}
            </p>
            <div className="h-1 w-20 bg-[#ffb703] rounded-full" />
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {t.pillars_label}{" "}
              <span className="font-bold text-[#1a1a1a]">
                {t.pillars_content}
              </span>
            </p>
            <p>{t.cta_text}</p>
          </div>
        </div>

        {/* Cards de Valores */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => {
            const cardData = t.cards[item.key];
            return (
              <div
                key={item.key}
                className="group flex flex-col h-full relative p-8 rounded-3xl border border-gray-100 bg-white
                shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40"
              >
                <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-[#ffb703]/20">
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
                  className="mt-auto pt-6 text-[#ffb703] font-semibold text-sm flex items-center cursor-pointer gap-2 group"
                >
                  {t.learn_more}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dinâmico */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative bg-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-[#001d3d]">
                {t.cards[activeModal as keyof typeof t.cards].title}
              </h4>

              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-black cursor-pointer transition-colors"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t.cards[activeModal as keyof typeof t.cards].content}</p>

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
          </div>
        </div>
      )}
    </section>
  );
}