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

  // Mapeamento de Serviços com Ícones Fixos e Textos Traduzidos
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

  // Mapeamento de Categorias
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

          {/* IMAGE SIDE COM FLOATING CARD TRADUZIDO */}
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

        {/* --- SEÇÃO: CONTRATAR --- <section className="relative border-t border-gray-100 w-full py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/15 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em]">
              {t.hire.badge}
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
              {t.hire.title_main} <span className="text-[#ffb703]">{t.hire.title_highlight}</span> {t.hire.title_suffix}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {t.hire.description}
            </p>
            <div className="pt-4">
              <a href="/contratar" className="inline-block group">
                <button className="relative overflow-hidden bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <span className="relative z-10">{t.hire.cta}</span>
                </button>
              </a>
            </div>
          </div>
        </section>*/}
        

        {/* --- SEÇÃO: TÉCNICO --- <section className="relative border-t border-gray-100 w-full py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/15 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em]">
              {t.partner.badge}
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
              {t.partner.title_main} <span className="text-[#ffb703]">{t.partner.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {t.partner.description_prefix} <strong className="text-gray-900">{t.partner.country}</strong>{t.partner.description_suffix}
            </p>
            <div className="pt-4">
              <a href="/cadastro" className="inline-block group">
                <button className="relative overflow-hidden bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <span className="relative z-10">{t.partner.cta}</span>
                </button>
              </a>
            </div>
          </div>
        </section>*/}
        

        {/* --- SEÇÃO: COMPATIBILIDADE --- <section className="relative border-t border-gray-100 w-full py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/15 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em]">
              {t.compatibility.badge}
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
              {t.compatibility.title_main} <span className="text-[#ffb703]">{t.compatibility.title_highlight}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {t.compatibility.description_prefix} <strong className="text-gray-900">{t.compatibility.description_highlight}</strong>{t.compatibility.description_suffix}
            </p>
          </div>
        </section> <StatsSection />
*/}
        

        
        {/* ================= FEATURES GRID ================= <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {trackServices.map((service, index) => (
            <div key={index} className="group cursor-text relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all hover:border-[#ffb703]/40">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-[#ffb703]/10 flex items-center justify-center text-[#ffb703] group-hover:rotate-6 group-hover:scale-115 border border-[#ffb703]/20 duration-500 transition-all ease-in-out">
                {service.icon}
              </div>
              <h4 className="text-gray-900 font-bold text-xl mb-2">{service.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>*/}
        

        {/* ================= CATEGORIES =================<div className="mb-24" data-aos="fade-up">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">{t.categories_title}</h3>
            <div className="w-12 h-1 bg-[#ffb703] mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, index) => (
              <div key={index} className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#ffb703]/30 hover:shadow-md transition-all duration-300 cursor-auto">
                <div className="mb-3 text-gray-400 group-hover:text-[#ffb703] transition-colors duration-300">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}
        

        {/* ================= CTA BANNER =================<div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-gray-900 via-gray-900 to-black p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10" data-aos="fade-up">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#ffb703]/10 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-xl">
            <h5 className="text-white text-2xl md:text-3xl font-extrabold mb-3">{t.cta_banner.title}</h5>
            <p className="text-gray-400">{t.cta_banner.desc}</p>
          </div>
          <a href="#" className="relative z-10 group inline-flex items-center gap-2 text-[#ffb703] font-bold text-lg hover:gap-4 transition-all duration-300">
            {t.cta_banner.button}
            <ArrowRight size={20} />
          </a>
        </div>
       */
        }
       </div> 

      <AppAboutSection />
    </section>
  );
}