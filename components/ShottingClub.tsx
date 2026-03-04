"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Trophy, Users, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import { FaPlay, FaPause } from "react-icons/fa";

// Contexto e Dicionário
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";
import Link from "next/link";

export default function ShootingClubSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const lang = useLang(); // 'pt', 'en', etc.
  const t = dictionaries[lang].shootingClub;

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const toggleAutoplay = () => {
    if (!swiperRef.current?.autoplay) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  const slideImages = [
    "/carousel/img-carousel-1.jpg",
    "/carousel/img-carousel-2.jpg",
    "/carousel/img-carousel-3.jpg",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#f9fafb] py-28">
      {/* Círculos decorativos */}
      <div className="absolute -right-48 -top-48 w-130 h-130 rounded-full border-48 border-[#ffb703]/20 pointer-events-none" />
      <div className="absolute -right-24 -top-24 w-90 h-90 rounded-full border-36 border-[#ffb703]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">

        {/* ================= TEXTO + CARDS INICIAIS ================= */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-7" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase tracking-widest">
              <Trophy size={14} />
              {t.badge}
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {t.title_main} <span className="text-[#ffb703]">{t.title_highlight}</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="cursor-pointer inline-flex items-center gap-2 bg-[#ffb703] text-[#1a1a1a] lg:px-27.5 py-4 rounded-xl font-bold hover:brightness-110 px-23 transition-all shadow-md shadow-[#ffb703]/20">
                {t.button}
              </button>
              
              {/* CORREÇÃO: Link com idioma dinâmico */}
              <Link href={`/${lang}/clube/calendario`}>
                <button className="cursor-pointer inline-flex items-center gap-2 bg-white border text-sm lg:text-[16px] border-gray-200 text-gray-800 px-8 lg:px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  <Calendar size={20} className="text-[#ffb703]" />
                  Venha conhecer nosso calendário
                </button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6" data-aos="fade-left">
            <div className="p-8 bg-white cursor-text border border-gray-200 rounded-3xl hover:border-[#ffb703]/40 hover:shadow-xl transition-all duration-300">
              <Target className="text-[#ffb703] mb-4" size={30} />
              <h4 className="text-gray-900 font-bold text-lg mb-2">{t.cards.precision.title}</h4>
              <p className="text-gray-500 text-sm">{t.cards.precision.desc}</p>
            </div>

            <div className="p-8 bg-white cursor-text border border-gray-200 rounded-3xl hover:border-[#ffb703]/40 hover:shadow-xl transition-all duration-300">
              <Users className="text-[#ffb703] mb-4" size={30} />
              <h4 className="text-gray-900 font-bold text-lg mb-2">{t.cards.community.title}</h4>
              <p className="text-gray-500 text-sm">{t.cards.community.desc}</p>
            </div>
          </div>
        </div>

        {/* ================= SEÇÃO DE UNIDADES ================= */}
        <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up">
          <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-1 hover:border-[#ffb703]/50 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden">
                 <img src="/thumbnail.jpeg" alt="Gutierrez" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.2em]">Unidade Belo Horizonte</span>
                <h4 className="text-xl font-extrabold text-gray-900 mt-1">Clube de Tiro Gutierrez - BH</h4>
                <Link href={`/${lang}/clube/gutierrez`} className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-gray-500 hover:text-[#ffb703] transition-colors">
                  Ver Unidade <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-1 hover:border-[#ffb703]/50 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-full md:w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden">
                <img src="/thumbnail1.jpeg" alt="Alphaville" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#ffb703] text-[10px] font-black uppercase tracking-[0.2em]">Unidade Nova Lima</span>
                <h4 className="text-xl font-extrabold text-gray-900 mt-1">Clube de Tiro Nova Lima - Alphaville</h4>
                <Link href={`/${lang}/clube/alphaville`} className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-gray-500 hover:text-[#ffb703] transition-colors">
                  Ver Unidade <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ... restante do código (carousel) ... */}
        {/* Lembre-se de fechar a seção e as divs corretamente aqui */}
        
        {/* ================= CAROUSEL ================= */}
        <div className="relative" data-aos="fade-up">
          {/* O restante do carousel permanece igual ao seu código original */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[#ffb703] font-bold tracking-[0.25em] uppercase text-xs mb-2">
                {t.solutions.badge}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {t.solutions.title_main} <span className="text-[#ffb703]">{t.solutions.title_highlight}</span>
              </h3>
            </div>

            <button
              onClick={toggleAutoplay}
              className="cursor-pointer bg-white border border-gray-200 rounded-full p-3 text-gray-400 hover:text-[#ffb703] hover:border-[#ffb703]/40 shadow-sm transition-all"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>
          </div>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={28}
            loop
            speed={700}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-14"
          >
            {t.solutions.slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="h-full cursor-grab rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-[#ffb703]/40 transition-all duration-300">
                  <div className="relative h-90 overflow-hidden">
                    <img
                      src={slideImages[index]}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {slide.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}