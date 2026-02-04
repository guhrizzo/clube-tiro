"use client";

import {
  MapPin,
  ShieldCheck,
  Smartphone,
  Radio,
  Bell,
  History,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Tractor, HardHat, Baby, Dog, Bike, Ship, Anchor, Car, Box, Heart
} from "lucide-react";
import AppAboutSection from "./AppAboutSection";
import { Stats } from "node:fs";
import StatsSection from "./StatsSection";

const trackServices = [
  {
    icon: <MapPin size={26} />,
    title: "Localização em Tempo Real",
    desc: "Acompanhe seu veículo ou frota com precisão em tempo real via GPS.",
  },
  {
    icon: <Smartphone size={26} />,
    title: "Controle pelo App",
    desc: "Bloqueio remoto, relatórios e alertas direto no celular Android ou iOS.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Cerca Eletrônica",
    desc: "Receba alertas automáticos se o veículo sair do perímetro definido.",
  },
  {
    icon: <History size={26} />,
    title: "Histórico Completo",
    desc: "Veja trajetos, paradas e velocidades com relatórios detalhados.",
  },
  {
    icon: <Bell size={26} />,
    title: "Alertas de Ignição",
    desc: "Notificações instantâneas sempre que o veículo for ligado.",
  },
  {
    icon: <Radio size={26} />,
    title: "Pronta Resposta 24h",
    desc: "Central de monitoramento pronta para agir em emergências.",
  },
];

const categories = [
  { icon: <Tractor size={32} />, label: "Tratores Agro" },
  { icon: <HardHat size={32} />, label: "Mineração" },
  { icon: <Heart size={32} />, label: "Idosos" },
  { icon: <Dog size={32} />, label: "Pets" },
  { icon: <Baby size={32} />, label: "Crianças" },
  { icon: <Bike size={32} />, label: "Bicicletas" },
  { icon: <Ship size={32} />, label: "Lazer" },
  { icon: <Anchor size={32} />, label: "Pesca" },
  { icon: <Car size={32} />, label: "Veículos" },
  { icon: <Box size={32} />, label: "Cargas" },
];

export default function TrackingSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-28">
      {/* BACKGROUND DECOR */}
      <div className="absolute -right-60 -top-60 w-152 h-152 rounded-full bg-[#ffb703]/5 blur-3xl" />
      <div className="absolute left-0 top-1/3 w-[24rem] h-96 rounded-full bg-gray-100 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ================= HERO ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* TEXT SIDE */}
          <div className="space-y-6" data-aos="fade-right">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 text-[#ffb703] text-xs font-bold uppercase tracking-[0.2em]">
              <Radio size={14} className="animate-pulse" />
              Monitoramento Inteligente
            </span>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              Proteção total com{" "}
              <span className="text-[#ffb703]">rastreamento inteligente</span>
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              Tecnologia de ponta para segurança veicular, gestão de frotas e
              controle em tempo real, com máxima confiabilidade e usabilidade.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group cursor-pointer bg-[#ffb703] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:gap-3 hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#ffb703]/25">
                Solicitar Orçamento
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button className="cursor-pointer px-8 py-4 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:border-[#ffb703] hover:text-[#ffb703] transition-all">
                Ver como funciona
              </button>
            </div>

            {/* MICRO TRUST */}
            <div className="pt-6 flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ffb703]" />
                Monitoramento 24h
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#ffb703]" />
                Precisão por GPS
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-[#ffb703]" />
                App Android & iOS
              </div>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div
            className="relative flex justify-center lg:justify-end"
            data-aos="fade-left"
          >
            {/* BACK SHAPE */}
            <div className="absolute -right-12 -top-12 w-88 h-88 bg-[#ffb703] rounded-[2.5rem] rotate-6 shadow-xl" />
            <div className="absolute -right-16 -top-16 w-88 h-88 border-2 border-[#ffb703]/40 rounded-[2.5rem] rotate-3" />

            {/* MAIN IMAGE */}
            <div className="relative z-10 w-[18rem] md:w-[20rem] lg:w-4xl rounded-4xl overflow-hidden shadow-2xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=900&auto=format&fit=crop"
                alt="Rastreamento veicular"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING MAP CARD */}
            <div className="absolute -left-8 bottom-12 bg-white rounded-2xl p-4 shadow-xl w-44 z-20 animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#ffb703]/15 flex items-center justify-center text-[#ffb703]">
                  <MapPin size={16} />
                </div>
                <span className="text-xs font-bold text-gray-800">
                  Veículo Localizado
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-3/4 bg-[#ffb703] rounded-full" />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Atualização em tempo real
              </p>
            </div>
          </div>
        </div>
        <StatsSection />
        {/* ================= FEATURES GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {trackServices.map((service, index) => (
            <div
              key={index}
              data-aos=""
              data-aos-delay={index * 80}
              className="group cursor-text relative p-8 rounded-3xl border border-gray-100 bg-white 
              shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all  hover:border-[#ffb703]/40"
            >
              <div
                className="mb-6 w-14 h-14 rounded-2xl bg-[#ffb703]/10 flex items-center scale-100 justify-center rotate-0
                           text-[#ffb703]  group-hover:rotate-6 group-hover:scale-115 border border-[#ffb703]/20 duration-500
                           transition-all ease-in-out"
              >
                {service.icon}
              </div>

              <h4 className="text-gray-900 font-bold text-xl mb-2">
                {service.title}
              </h4>

              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>

              {/* subtle arrow */}

            </div>
          ))}
        </div>
        <div className="mb-24" data-aos="fade-up">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Oferecemos rastreamento de:</h3>
            <div className="w-12 h-1 bg-[#ffb703] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#ffb703]/30 hover:shadow-md transition-all duration-300 cursor-auto"
              >
                <div className="mb-3 text-gray-400 group-hover:text-[#ffb703] transition-colors duration-300">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* ================= CTA BANNER ================= */}
        <div
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-gray-900 via-gray-900 to-black p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
          data-aos="fade-up"
        >
          {/* Glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#ffb703]/10 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-xl">
            <h5 className="text-white text-2xl md:text-3xl font-extrabold mb-3">
              Soluções corporativas e frotas
            </h5>
            <p className="text-gray-400">
              Planos personalizados para transportadoras, empresas de segurança
              e operações logísticas.
            </p>
          </div>

          <a
            href="#"
            className="relative z-10 group inline-flex items-center gap-2 text-[#ffb703] font-bold text-lg hover:gap-4 transition-all duration-300"
          >
            Falar com especialista
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
       <AppAboutSection />     
      {/* FLOAT ANIMATION */}
      
    </section>
  );
}
