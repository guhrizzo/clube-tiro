"use client";

import Navbar from "components/NavBar";
import { Clock, MapPin, AlertTriangle, Scale, ArrowRight } from "lucide-react";

export default function RajaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Navbar />
      
      {/* Header com Status */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          <AlertTriangle size={12} /> Unidade Raja: Comunicado Importante
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
          Funcionamento <br />
          <span className="text-gray-500 text-3xl md:text-5xl lg:text-7xl italic font-light"> Suspenso</span>
        </h1>
      </section>

      {/* Grid de Explicação Legislativa */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card: O Motivo Legista */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6 text-[#ffb703]">
              <Scale size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">Base Legal</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              O <strong>Decreto nº 11.615/2023</strong>, complementado pelas diretrizes de 2024 (Decreto nº 12.345/2024), impôs novas restrições severas às entidades de tiro desportivo.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              As normas focam na distância mínima de 1 km em relação a instituições de ensino, afetando diretamente o horário de operação de unidades urbanas.
            </p>
          </div>

          {/* Card: Impacto na Unidade */}
          <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock size={80} />
            </div>
            
            <div className="flex items-center gap-3 mb-6 text-red-500">
              <Clock size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">Impacto Operacional</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#ffb703] shrink-0" size={18} />
                <p className="text-xs text-gray-300">
                  <span className="font-bold text-white">LOCALIZAÇÃO:</span> Devido à proximidade (menos de 1 km) de escolas, o funcionamento torna-se restrito.
                </p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1">Status Atual:</p>
                <p className="text-white text-sm font-medium">
                  Atividades suspensas durante o horário comercial conforme diretriz federal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informação sobre horário permitido */}
        <div className="mt-12 text-center border-t border-zinc-800 pt-10">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">Regra para unidades próximas a escolas:</p>
            <div className="inline-block bg-white text-black px-6 py-3 font-black text-xl italic uppercase skew-x-[-10deg]">
                18h às 22h
            </div>
            <p className="text-gray-500 text-[10px] mt-6 max-w-2xl mx-auto leading-loose uppercase tracking-widest">
                Estamos adequando nossos processos para garantir que o atendimento ocorra rigorosamente dentro da legalidade e segurança exigida pelos novos decretos.
            </p>
        </div>

        {/* Redirecionamento */}
        
      </section>
    </main>
  );
}