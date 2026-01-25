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

      <style jsx global>{`
        /* Efeito de destaque no central */
        .swiper-slide {
          transition: transform 0.8s ease, opacity 0.8s ease;
          transform: scale(0.85);
          opacity: 0.4;
        }
        .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }

        /* Paginação - Apenas uma bolinha destacada */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease;
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          background: #ffc300ff !important;
          transform: scale(1.4); /* Aumenta levemente a bolinha ativa */
          box-shadow: 0 0 10px rgba(255, 195, 0, 0.5);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #ffc300ff !important;
          background: rgba(0,0,0,0.4);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
        }
      `}</style>
    </section>
  );
}