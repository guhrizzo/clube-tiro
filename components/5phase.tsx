"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { PlayCircle, Shield, Truck, Video } from "lucide-react";


// 1. IMPORTAÇÃO DINÂMICA SEGURA
// Usamos 'as any' para ignorar o erro de tipagem que aparece no seu VS Code (image_406741.png)
const ReactPlayer = dynamic(() => import("react-player").then((mod) => mod.default), {
    ssr: false,
    loading: () => (
        <div className="aspect-video bg-neutral-900 animate-pulse rounded-[30px] flex items-center justify-center">
            <Truck className="text-white/10 animate-bounce" size={48} />
        </div>
    )
}) as any;

// 2. DADOS DO PROJETO (Movidos para fora do escopo de import para evitar o erro da image_40d41f.png)
const projectSteps = [
    { phase: "Fase 1", title: "O Projeto", desc: "Desenvolvimento técnico inicial." },
    { phase: "Fase 2", title: "Camuflado", desc: "Pintura tática personalizada." },
    { phase: "Fase 3", title: "Verde/Amarelo", desc: "Identidade visual nacional." },
    { phase: "Fase 4", title: "Preto", desc: "Acabamento Black Edition." },
];

export default function MetratonFinalPhase() {

    const videoUrl = "https://firebasestorage.googleapis.com/v0/b/meublog-da849.firebasestorage.app/o/videos%2Fvideo-metatron.mp4?alt=media&token=86094138-9f5d-41fe-bd16-3e7b94c4e23f";

    return (
        <main className="bg-[#0a0a0a] pb-20 text-white">
            

            <section className="text-center">
            </section>
            
            {/* SEÇÃO DO VÍDEO */}
            <section className="max-w-300 mx-auto px-6">
                {/* INFO BOX */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 ">
                    <div className="flex items-center gap-4">
                        <Shield className="text-[#ffb703]" size={32} />
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest">Fase 05 Finalizada</p>
                            <p className="text-[10px] text-gray-500 uppercase">Sistema de Defesa Metraton</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm italic max-w-md text-center md:text-right mb-12">
                        "A materialização da força bruta em um projeto sem precedentes."
                    </p>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-[#ffb703]/20 to-transparent blur-2xl opacity-50" />

                    <div className="relative aspect-video w-full rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/10 bg-black shadow-2xl">
                        <video src={videoUrl} controls className="w-full h-full object-cover" />
                    </div>
                </div>

                
            </section>
        </main>
    );
}