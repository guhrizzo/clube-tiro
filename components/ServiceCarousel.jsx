"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import AOS from "aos";
import { FaPlay, FaPause } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const slides = [
  { img: "/carousel/img-carousel-1.jpg", title: "Treinamento Especializado", desc: "Excelência em instrução de armamento e tiro." },
  { img: "/carousel/img-carousel-2.jpg", title: "Consultoria Técnica", desc: "Suporte completo para regularização e aquisição." },
  { img: "/carousel/img-carousel-3.jpg", title: "Segurança Avançada", desc: "Soluções táticas para proteção pessoal e patrimonial." },
];

export default function ServiceCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.autoplay) return;

    if (isPlaying) swiper.autoplay.stop();
    else swiper.autoplay.start();

    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="py-12 bg-[#020b18] text-white overflow-hidden relative">
      <div data-aos="zoom-in" data-aos-delay="400" className="w-full relative">

        {/* Botão Play/Pause */}
        <div className="absolute top-4 right-6 z-30">
          <button
            onClick={toggleAutoplay}
            aria-label="Play/Pause carousel"
            className="bg-white/10 hover:bg-[#ffc300ff] hover:text-black transition-all p-3 rounded-full backdrop-blur-md border border-white/20 cursor-pointer shadow-lg"
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
          </button>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.15}
          loop
          speed={1000}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: { slidesPerView: 1.25 },
            1024: { slidesPerView: 1.5 },
          }}
          className="pb-20 overflow-visible"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="relative h-[55vh] md:h-[65vh] w-full bg-[#0a1a2f] rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#ffc300ff]/50 transition duration-500">
                <img
                  src={slide.img}
                  alt={slide.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-[#020b18]/20 to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-3 text-[#ffc300ff]">
                    {slide.title}
                  </h3>
                  <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
