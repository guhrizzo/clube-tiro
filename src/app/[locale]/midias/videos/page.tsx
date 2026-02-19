"use client";

import { useEffect, useState } from "react";
import { Play, Video, X, MonitorPlay } from "lucide-react";
import NavBar from "components/NavBar";
// Importe a configuração do seu firebase
import { db } from "../../../../../lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

const categories = ["Todos", "Treinamento", "Competição", "Dicas Técnicas"];

export default function VideoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // BUSCA EM TEMPO REAL NO FIREBASE
  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as VideoItem[];
      
      setVideos(videosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredVideos = videos.filter(
    (video) => selectedCategory === "Todos" || video.category === selectedCategory
  );

  return (
    <section className="relative w-full bg-[#f9fafb] py-24 min-h-screen">
      <NavBar />
      <div className="absolute -left-48 -bottom-48 w-130 h-130 rounded-full border-48 border-[#ffb703]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase tracking-widest">
            <Video size={14} />
            Galeria Protect
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Nossa Galeria de <span className="text-[#ffb703]">Vídeos</span>
          </h2>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-medium">Carregando vídeos...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#ffb703]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Thumbnail Container */}
                <div
                  className="relative h-52 overflow-hidden cursor-pointer bg-slate-200"
                  onClick={() => setActiveVideo(video)}
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 italic text-sm">
                      <MonitorPlay size={48} className="mb-2 opacity-20" />
                      <span>Vídeo Local</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#ffb703] p-4 rounded-full text-[#1a1a1a] scale-75 group-hover:scale-100 transition-transform">
                      <Play fill="currentColor" size={24} />
                    </div>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#ffb703] transition-colors line-clamp-1">
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
        )}
      </div>

      {/* Modal do Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <button 
            onClick={() => setActiveVideo(null)} 
            className="absolute top-6 right-6 text-white/70 hover:text-[#ffb703] transition-colors cursor-pointer"
          >
            <X size={42} />
          </button>

          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
            {activeVideo.videoUrl.includes('youtube.com') || activeVideo.videoUrl.includes('youtu.be') ? (
              <iframe 
                className="w-full h-full" 
                src={activeVideo.videoUrl} 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
              />
            ) : (
              <video
                controls
                autoPlay
                className="w-full h-full outline-none"
                controlsList="nodownload"
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            )}
          </div>
        </div>
      )}
    </section>
  );
}