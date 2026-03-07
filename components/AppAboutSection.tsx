"use client";

import { ArrowRight, MapPin, Zap, ShieldCheck, ChevronDown, Smartphone, Apple } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

export default function AboutAppSection() {
  const lang = useLang();
  const t = dictionaries[lang].tracking.app_section;
  const [showStores, setShowStores] = useState(false);

  // Mapeamos os ícones para os textos que vêm do dicionário
  const benefitsData = [
    { icon: <MapPin size={18} />, text: t.benefits[0] },
    { icon: <Zap size={18} />, text: t.benefits[1] },
    { icon: <ShieldCheck size={18} />, text: t.benefits[2] },
  ];

  // Links das lojas
  const appStoreLink = "https://apps.apple.com/br/app/grupo-protect-rastreamento/id6738363845";
  const playStoreLink = "https://play.google.com/store/apps/details?id=com.softruck.protectrast";

  // Detectar dispositivo e redirecionar automaticamente
  const handleDownload = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      window.open(appStoreLink, "_blank");
    } else if (isAndroid) {
      window.open(playStoreLink, "_blank");
    } else {
      // Desktop: mostrar opções
      setShowStores(!showStores);
    }
  };

  return (
    <section className="relative w-full pt-28 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* HEADER */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-3 text-[#ffb703] font-semibold text-xs tracking-[0.25em] uppercase">
            <div className="w-10 h-px bg-[#ffb703]" />
            {t.badge}
            <div className="w-10 h-px bg-[#ffb703]" />
          </div>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
            {t.title_main}{" "}
            <span className="text-[#ffb703]">PROTECT</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* BENEFÍCIOS */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {benefitsData.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 bg-gray-50
                         hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ffb703]/10 text-[#ffb703] flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-sm text-gray-700 font-medium text-center leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* BOTÕES DIRETOS (ALTERNATIVA VISUAL) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
          <a
            href={appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-900 text-white px-12 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Apple size={20} />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider opacity-70">App Store</p>
              <p className="text-sm font-bold">iOS</p>
            </div>
          </a>

          <a
            href={playStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-900 text-white px-12 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Smartphone size={20} />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Google Play</p>
              <p className="text-sm font-bold">Android</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}