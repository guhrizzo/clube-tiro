"use client";

import { useEffect, useState } from "react";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "components/NavBar";

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

const photos: PhotoItem[] = [
  { id: 1, url: "/gallery/foto1.jpg", title: "Treino de Precisão", category: "Treinamento" },
  { id: 2, url: "/gallery/foto2.jpg", title: "Copa Protect 2024", category: "Eventos" },
  { id: 3, url: "/gallery/foto3.jpg", title: "Nossa Estrutura", category: "Clube" },
  { id: 4, url: "/gallery/foto4.jpg", title: "Workshop Tático", category: "Treinamento" },
  { id: 5, url: "/gallery/foto5.jpg", title: "Premiação Anual", category: "Eventos" },
  { id: 6, url: "/gallery/foto6.jpg", title: "Linha de Tiro", category: "Clube" },
];

const categories = ["Todos", "Treinamento", "Eventos", "Clube"];

export default function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredPhotos = photos.filter(
    (p) => selectedCategory === "Todos" || p.category === selectedCategory
  );

  const openLightbox = (id: number) => {
    const index = photos.findIndex(p => p.id === id);
    setSelectedPhotoIndex(index);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      {/* Detalhes de fundo (Círculos amarelos suaves) */}
      <NavBar />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffb703]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <Camera size={14} className="text-[#ffb703]" />
              Momento Protect
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Galeria de <span className="text-[#ffb703]">Fotos</span>
            </h2>
          </div>

          {/* Filtros Estilizados */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1a1a1a] text-white shadow-lg"
                    : "bg-gray-100 text-gray-500 hover:bg-[#ffb703]/20 hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Fotos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              data-aos="fade-up"
              className="relative group break-inside-avoid rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              onClick={() => openLightbox(photo.id)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay com informações */}
              <div className="absolute inset-0 bg-linerar-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <span className="text-[#ffb703] text-xs font-bold uppercase tracking-widest mb-2">
                  {photo.category}
                </span>
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-bold text-xl">{photo.title}</h4>
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox (Visualizador em tela cheia) */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-110 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button 
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-[#ffb703] transition-colors z-120"
          >
            <X size={40} />
          </button>

          <button onClick={prevPhoto} className="absolute left-4 text-white hover:text-[#ffb703] p-2 transition-all">
            <ChevronLeft size={48} />
          </button>

          <div className="max-w-5xl max-h-[85vh] relative animate-in zoom-in-95 duration-300">
            <img 
              src={photos[selectedPhotoIndex].url} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg" 
              alt="Preview"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-2xl">{photos[selectedPhotoIndex].title}</h3>
              <p className="text-[#ffb703] font-medium">{photos[selectedPhotoIndex].category}</p>
            </div>
          </div>

          <button onClick={nextPhoto} className="absolute right-4 text-white hover:text-[#ffb703] p-2 transition-all">
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
}