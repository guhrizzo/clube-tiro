"use client";

import { MapPin, ShieldCheck, Smartphone, Radio, Bell, History } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const trackServices = [
  {
    icon: <MapPin size={28} />,
    title: "Localização em Tempo Real",
    desc: "Acompanhe a posição exata do seu veículo ou frota via satélite com precisão de metros.",
  },
  {
    icon: <Smartphone size={28} />,
    title: "Controle via App",
    desc: "Bloqueio remoto e monitoramento completo diretamente pelo seu celular Android ou iOS.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Cerca Eletrônica",
    desc: "Defina perímetros seguros e receba alertas imediatos se o veículo sair da rota definida.",
  },
  {
    icon: <History size={28} />,
    title: "Histórico de Rotas",
    desc: "Acesse o relatório completo de trajetos, paradas e velocidades dos últimos meses.",
  },
  {
    icon: <Bell size={28} />,
    title: "Alertas de Ignição",
    desc: "Notificações instantâneas toda vez que o motor for ligado ou desligado.",
  },
  {
    icon: <Radio size={28} />,
    title: "Pronta Resposta",
    desc: "Central de emergência disponível 24h para auxílio em casos de roubo ou furto.",
  },
];

export default function TrackingSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Aumentado para um deslize mais elegante
      once: true,
      easing: "ease-out-cubic", // Curva de animação mais suave
      offset: 100,
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f9fafb] py-28">
      {/* Círculos decorativos */}
      <div className="absolute -right-48 -top-48 w-130 h-130 rounded-full border-48 border-[#ffb703]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-5" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase tracking-[0.2em]">
              <Radio size={14} className="animate-pulse" />
              Monitoramento Ativo
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Rastreamento <span className="text-[#ffb703]">Inteligente</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              Tecnologia de ponta para proteção patrimonial e gestão de frotas com 
              visibilidade total em tempo real.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <button className="cursor-pointer bg-[#ffb703] text-[#1a1a1a] px-10 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#ffb703]/20">
              Solicitar Orçamento
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trackServices.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group cursor-text relative p-8 rounded-4xl border border-gray-100 bg-white
                          cubic-bezier(0.4, 0, 0.2, 1)
                         shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
                         hover:shadow-[0_20px_40px_-12px_rgba(255,183,3,0.15)] 
                         group-hover:-translate-y-2 hover:border-[#ffb703]/30 transition-all duration-300"
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center
                            text-[#ffb703] transition-all duration-500 
                            group-hover:bg-[#ffb703] group-hover:text-white group-hover:rotate-10">
                {service.icon}
              </div>
              
              <h4 className="text-gray-900 font-bold text-xl mb-3 transition-colors duration-300 group-hover:text-[#ffb703]">
                {service.title}
              </h4>
              
              <p className="text-gray-500 text-sm leading-relaxed transition-colors duration-300">
                {service.desc}
              </p>
              
              {/* Detalhe visual sutil no hover */}
              <div className="absolute bottom-6 right-8 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                <div className="w-8 h-0.5 bg-[#ffb703]/30 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= FOOTER CTA ================= */}
        <div 
          className="mt-20 p-10 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group"
          data-aos="fade-up"
        >
          {/* Brilho decorativo interno */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb703]/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-700 group-hover:bg-[#ffb703]/10" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h5 className="text-white text-2xl font-bold mb-2">Soluções Corporativas</h5>
              <p className="text-gray-400">
                Planos especiais para frotas logísticas e empresas de segurança.
              </p>
            </div>
            <a href="#" className="flex items-center gap-2 text-[#ffb703] font-bold text-lg hover:gap-4 transition-all duration-300">
              Fale com um consultor <span className="text-2xl">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}