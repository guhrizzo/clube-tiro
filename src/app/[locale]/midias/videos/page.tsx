"use client";

import { useEffect, useState } from "react";
import { Play, Video, Filter, X } from "lucide-react";
import NavBar from "components/NavBar";

// Interface para os vídeos
interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string; // Link do YouTube ou arquivo local
}

const categories = ["Todos", "Treinamento", "Competição", "Dicas Técnicas"];

const videoData: VideoItem[] = [
  {
    id: "1",
    title: "Técnicas de Saque Rápido",
    category: "Treinamento",
    thumbnail: "/thumbnails/video-1.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Final do Campeonato Interno 2023",
    category: "Competição",
    thumbnail: "/thumbnails/video-2.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Manutenção Básica de Armamento",
    category: "Dicas Técnicas",
    thumbnail: "/thumbnails/video-3.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  // Adicione mais vídeos aqui...
];

export default function VideoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos = videoData.filter(
    (video) => selectedCategory === "Todos" || video.category === selectedCategory
  );

  return (
    <section className="relative w-full bg-[#f9fafb] py-24 min-h-screen">
      {/* Elementos decorativos idênticos ao do Clube de Tiro */}
      <NavBar />
      <div className="absolute -left-48 -bottom-48 w-130 h-130 rounded-full border-48 border-[#ffb703]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho da Página */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase tracking-widest">
            <Video size={14} />
            Galeria Protect
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Nossa Galeria de <span className="text-[#ffb703]">Vídeos</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossos treinamentos, competições e dicas exclusivas para aprimorar sua performance.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-delay="100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-[#ffb703] border-[#ffb703] text-[#1a1a1a]"
                  : "bg-white border-gray-200 text-gray-500 hover:border-[#ffb703]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Vídeos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#ffb703]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative h-52 overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-[#ffb703] p-4 rounded-full text-[#1a1a1a] scale-75 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {video.category}
                </span>
              </div>

              {/* Detalhes do Vídeo */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#ffb703] transition-colors">
                  {video.title}
                </h4>
                <button 
                  onClick={() => setActiveVideo(video)}
                  className="mt-4 flex items-center gap-2 text-[#ffb703] text-sm font-bold hover:gap-3 transition-all"
                >
                  Assistir agora <Play size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal do Player de Vídeo */}
      {activeVideo && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-8 right-8 text-white/50 cursor-pointer hover:text-[#ffb703] transition-colors"
          >
            <X size={40} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={activeVideo.videoUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}