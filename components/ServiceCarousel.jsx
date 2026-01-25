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
    AOS.init({ duration: 1000 });
  }, []);

  const toggleAutoplay = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-12 bg-[#020b18] text-white overflow-hidden relative">
      <div data-aos="zoom-in" data-aos-delay="400" className="w-full">
        
        {/* Botão Play/Pause Customizado */}
        <div className="absolute top-4 right-8 z-30">
          <button 
            onClick={toggleAutoplay}
            className="bg-white/10 hover:bg-[#ffc300ff] hover:text-black transition-all p-3 rounded-full backdrop-blur-md border border-white/20 cursor-pointer"
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
          </button>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides={true}
          slidesPerView={1.2} 
          loop={false}
          speed={1000} // Transição mais suave de 1 segundo
          coverflowEffect={{
            rotate: 0, 
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true, 
          }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true // Para ao passar o mouse
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            1024: { slidesPerView: 1.5 }
          }}
          className="pb-20 overflow-visible"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="relative h-[60dvh] md:h-125 w-full bg-[#0a1a2f] rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#ffc300ff]/50 transition duration-500">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020b18] via-[#020b18]/10 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-[#ffc300ff]">
                    {slide.title}
                  </h3>
                  <p className="text-white/90 text-lg mb-6 max-w-2xl leading-relaxed">
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