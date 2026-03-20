"use client";

import { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import {
  MapPin, ShieldCheck, Smartphone, Radio, Bell, History, ArrowRight,
  Tractor, HardHat, Baby, Dog, Bike, Ship, Anchor, Car, Box, Heart, Link2
} from "lucide-react";
import AppAboutSection from "./AppAboutSection";
import StatsSection from "./StatsSection";

// Contexto e Dicionário
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

export default function TrackingSection() {
  const lang = useLang();
  const t = dictionaries[lang].tracking;

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  const trackServices = useMemo(() => {
    const icons = [
      <MapPin size={26} />, <Smartphone size={26} />, <ShieldCheck size={26} />,
      <History size={26} />, <Bell size={26} />, <Radio size={26} />
    ];
    return t.services.map((service, i) => ({
      ...service,
      icon: icons[i]
    }));
  }, [t.services]);

  const categories = useMemo(() => [
    { icon: <Tractor size={32} />, label: t.categories_list.tractors },
    { icon: <HardHat size={32} />, label: t.categories_list.mining },
    { icon: <Heart size={32} />, label: t.categories_list.elderly },
    { icon: <Dog size={32} />, label: t.categories_list.pets },
    { icon: <Baby size={32} />, label: t.categories_list.kids },
    { icon: <Bike size={32} />, label: t.categories_list.bikes },
    { icon: <Ship size={32} />, label: t.categories_list.leisure },
    { icon: <Anchor size={32} />, label: t.categories_list.fishing },
    { icon: <Car size={32} />, label: t.categories_list.vehicles },
    { icon: <Box size={32} />, label: t.categories_list.cargo },
  ], [t.categories_list]);

  return (
    <section className="relative w-full overflow-hidden bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ================= HERO ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6" data-aos="fade-right">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 text-[#ffb703] text-xs font-bold uppercase tracking-[0.2em]">
              <Radio size={14} className="animate-pulse" />
              {t.hero.badge}
            </span>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              {t.hero.title_main}{" "}
              <span className="text-[#ffb703]">{t.hero.title_highlight}</span>
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://protectrastreamento.com.br/" target="_blank" rel="noopener noreferrer">
                <button className="group cursor-pointer bg-[#ffb703] text-[#1a1a1a] lg:px-8 px-18 py-4 rounded-xl font-bold flex items-center gap-2 hover:gap-3 hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#ffb703]/25">
                  <Link2 />
                  {t.hero.cta_main}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ffb703]" />
                {t.hero.trust_24h}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#ffb703]" />
                {t.hero.trust_gps}
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-[#ffb703]" />
                {t.hero.trust_app}
              </div>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative flex lg:ml-16 justify-center lg:justify-end items-center" data-aos="fade-left">
            <div className="relative w-full max-w-sm mx-auto mt-10">
              <div className="absolute inset-0 bg-[#ffb703] rounded-[2.5rem] rotate-[-4deg] shadow-xl lg:scale-135" />
              <div className="relative bg-white rounded-[2.2rem] overflow-hidden lg:scale-130 shadow-lg">
                <Image src="/TRACKING.jpg" alt="Tracking" width={500} height={350} className="object-cover w-full max-h-130" />
              </div>
            </div>

            <div className="lg:absolute fixed lg:-left-8 lg:bottom-12 -bottom-16 left-4 bg-white rounded-2xl p-4 shadow-xl w-44 z-20 animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#ffb703]/15 flex items-center justify-center text-[#ffb703]">
                  <MapPin size={16} />
                </div>
                <span className="text-xs font-bold text-gray-800">{t.hero.floating_card}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-3/4 bg-[#ffb703] rounded-full" />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">{t.hero.floating_update}</p>
            </div>
          </div>
        </div>

        {/* ================= VIDEO SECTION ================= */}
        <div
          className="mb-24"
          data-aos="fade-up"
        >
          <div className="relative w-full rounded-4xl overflow-hidden shadow-2xl shadow-black/10 border border-gray-100 bg-black">
            {/* Glow accent */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-[#ffb703]/20 blur-3xl rounded-full pointer-events-none z-10" />

            <video
              src="/rastreamentoVideo.mp4"
              controls
              playsInline
              className="w-full max-h-130"
            />
          </div>
        </div>

      </div>

      <AppAboutSection />
    </section>
  );
}