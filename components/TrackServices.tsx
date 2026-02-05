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
import Image from "next/image";
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
        <div className="grid lg:grid-cols-2 gap-16 items-center  mb-24">
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
            className="relative flex ml-16 justify-center lg:justify-end"
            data-aos="fade-left"
          >
            <div className="relative w-full max-w-sm mx-auto mt-10">
              {/* Shape amarelo inclinado */}
              <div className="absolute inset-0 bg-[#ffb703] rounded-[2.5rem] rotate-[-4deg] shadow-xl lg:scale-135" />

              {/* Card imagem */}
              <div className="relative bg-white rounded-[2.2rem] overflow-hidden lg:scale-130 shadow-lg">
                <Image
                  src="/TRACKING.jpg" // troque pela sua imagem
                  alt="Rastreamento"
                  width={500}
                  height={350}
                  className="object-cover  w-full max-h-130"
                />

               
                
              </div>
            </div>


            

            {/* FLOATING MAP CARD */}
            <div className="lg:absolute fixed lg:-left-8 lg:bottom-12 -bottom-16 left-4 bg-white rounded-2xl p-4 shadow-xl w-44 z-20 animate-float">
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
        <section className="relative py-12 ">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative rounded-[3rem] bg-white px-10 py-16 text-center
      shadow-[0_25px_70px_-35px_rgba(0,0,0,0.1)] overflow-hidden">

              {/* Glow decorativo */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ffb703]/10 blur-[160px] rounded-full" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ffb703]/5 blur-[160px] rounded-full" />

              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  Rastreamento veicular:{" "}
                  <span className="text-[#ffb703]">proteção completa</span> do seu veículo 24 horas por dia
                </h2>

                <p className="text-gray-600 text-lg">
                  Custa bem menos do que você imagina!
                </p>

                <a href="/contratar" className="inline-block group">
                  <button
                    className="relative overflow-hidden bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold
            shadow-lg transition-all duration-300
            hover:-translate-y-1 cursor-pointer hover:shadow-xl hover:shadow-[#ffb703]/40 active:scale-95"
                  >
                    {/* Ripple radial */}
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Glow ring */}
                    <span className="absolute inset-0 rounded-full ring-2 ring-[#ffb703]/40 opacity-0
              group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="relative z-10">CONTRATE AGORA</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div
              className="relative rounded-[3rem] bg-white px-10 py-16 text-center
      shadow-[0_25px_70px_-35px_rgba(0,0,0,0.1)] overflow-hidden"
              style={{
                backgroundImage: "url('/images/instalador-rastreador.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay claro */}
              <div className="absolute inset-0 bg-white/85" />

              {/* Glow decorativo */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ffb703]/5 blur-[160px] rounded-full" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ffb703]/10 blur-[160px] rounded-full" />

              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  Você é técnico em{" "}
                  <span className="text-[#ffb703]">instalação de rastreador</span> veicular?
                </h2>

                <p className="text-gray-600 text-lg">
                  Cadastre-se gratuitamente e receba serviços disponíveis em todo o
                  <strong> Brasil</strong>.
                </p>

                <a href="/cadastro" className="inline-block group">
                  <button
                    className="relative overflow-hidden bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold
            shadow-lg transition-all duration-300
            hover:-translate-y-1 cursor-pointer hover:shadow-xl hover:shadow-[#ffb703]/40 active:scale-95"
                  >
                    {/* Ripple radial */}
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Glow ring */}
                    <span className="absolute inset-0 rounded-full ring-2 ring-[#ffb703]/40 opacity-0
            group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="relative z-10">CADASTRE-SE</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-gray-100 w-full py-28 overflow-hidden">
          {/* Glow decorativo sutil */}
          <div className="absolute -top-32 -left-32 w-96 h-96  rounded-full" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/15 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em]">
              Compatibilidade Total
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
              Compatível com os principais dispositivos{" "}
              <span className="text-[#ffb703]">de rastreamento do mercado</span>
            </h2>

            {/* Linha decorativa */}
            <div className="w-24 h-0.75 bg-[#ffb703] mx-auto rounded-full" />

            {/* Subtítulo */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Mais de <strong className="text-gray-900">1.400 dispositivos homologados</strong>.
              Instale um rastreador GPS no seu veículo e acompanhe tudo em tempo real no seu
              smartphone, de forma simples, rápida e segura.
            </p>

          </div>
        </section>

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
