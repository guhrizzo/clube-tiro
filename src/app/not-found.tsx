"use client";

import Link from "next/link";
import { Target, MoveLeft, ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotFound() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] overflow-hidden -mt-14">
      {/* Elementos Decorativos de Fundo (Padrão do seu Site) */}
      <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full border-32 border-[#ffb703]/10 pointer-events-none" />
      <div className="absolute -right-48 -bottom-48 w-130 h-130 rounded-full border-48 border-[#ffb703]/20 pointer-events-none" />

      <div className="relative z-10 text-center space-y-8" data-aos="zoom-in">
        
        {/* Ícone de Alvo/Alerta */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ffb703]/20 blur-3xl rounded-full" />
          <div className="relative bg-white border border-gray-200 p-6 rounded-3xl shadow-xl">
            <Target size={64} className="text-[#ffb703] animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
            <ShieldAlert size={20} />
          </div>
        </div>

        {/* Texto de Erro */}
        <div className="space-y-3">
          <h1 className="text-8xl md:text-9xl font-black text-gray-900 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Alvo não <span className="text-[#ffb703]">encontrado!</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
            Parece que você saiu da linha de tiro. A página que você procura não existe ou foi movida para um novo setor.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-[#ffb703] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[#ffb703]/30 active:scale-95"
          >
            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao Início
          </Link>
          
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            Reportar problema
          </Link>
        </div>
      </div>

      {/* Grid decorativo de fundo (opcional para dar textura) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </main>
  );
}