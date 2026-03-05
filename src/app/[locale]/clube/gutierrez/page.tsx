"use client";

import Navbar from "components/NavBar";
import { Timer, Hammer, BellRing } from "lucide-react";

export default function EmBrevePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* Ícone Animado */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#ffb703]/20 blur-3xl rounded-full" />
          <Hammer size={80} className="text-[#ffb703] relative animate-bounce" />
        </div>

        {/* Texto Principal */}
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic">
          Em <span className="text-[#ffb703]">Breve</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-10">
          Estamos preparando uma experiência exclusiva para você. 
          Nossa equipe está trabalhando nos ajustes finais desta seção.
        </p>

        {/* Badge de Status */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-12">
          <Timer size={20} className="text-[#ffb703] animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-widest">Lançamento em Breve</span>
        </div>

        {/* Botão de Ação / Notificação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-md border border-white/20 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Voltar
          </button>

        </div>
      </section>

      {/* Footer Decorativo */}
      <footer className="py-10 text-center opacity-20">
        <p className="text-[10px] uppercase tracking-[0.5em]">Grupo Protect • Segurança e Precisão</p>
      </footer>
    </main>
  );
}