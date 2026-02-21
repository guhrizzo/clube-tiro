"use client";

import { useEffect } from "react";
import { 
  ShieldCheck, 
  Target, 
  UserCheck, 
  ArrowRightLeft, 
  Lock, 
  Globe, 
  GraduationCap,
  Scale,
  FileBadge
} from "lucide-react";
import NavBar from "components/NavBar";
import ScrollToTop from "components/BackTop";

const services = [
  {
    title: "Aquisição e Registro",
    description: "Processo completo para aquisição de arma nova ou usada, incluindo todos os registros necessários.",
    icon: ShieldCheck,
  },
  {
    title: "Testes e Avaliações",
    description: "Realizamos o agendamento e acompanhamento de testes de tiro e avaliações psicológicas obrigatórias.",
    icon: Target,
  },
  {
    title: "Renovação e Porte",
    description: "Renovação de registros vencidos e assessoria completa para obtenção de porte de arma (SINARM).",
  },
  {
    title: "Transferências",
    description: "Transferência de posse de arma entre cidadãos ou entre instituições (Exército para PF e vice-versa).",
    icon: ArrowRightLeft,
  },
  {
    title: "Empresas de Segurança",
    description: "Registro e autorização de funcionamento para empresas de segurança privada junto à PF.",
    icon: Lock,
  },
  {
    title: "Serviços Documentais",
    description: "Emissão de guia de tráfego, passaporte, 2ª via de registro e devolução voluntária de armas.",
    icon: Globe,
  },
  {
    title: "Curso de Instrutores",
    description: "Capacitação técnica para formação de instrutores de armamento e tiro com certificação.",
    icon: GraduationCap,
  }
];

export default function DispatcherCards() {

  return (
    <main className="bg-[#f9fafb] min-h-screen">
      <ScrollToTop />
      <NavBar />

      {/* ================= SEÇÃO HERO (FOTO NO TOPO) ================= */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo com Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/pf.jpeg" 
            alt="Polícia Federal" 
            className="w-full h-full object-cover"
          />
          {/* Overlay de degradê para legibilidade e suavização com a próxima seção */}
          <div className="absolute inset-0 bg-linear-to-b from-[#001d3d]/80 via-[#001d3d]/40 to-[#f9fafb]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            Despachante da 
 <span className="text-[#ffb703]"> Polícia Federal</span>
          </h1>
          <p className="mt-6 text-shadow-2xs text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Assessoria técnica e documental para processos junto à Polícia Federal com máxima agilidade.
          </p>
        </div>
      </section>

      {/* ================= GRID DE SERVIÇOS ================= */}
      <section className="relative z-20 -mt-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Cabeçalho Secundário */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703] border border-[#ffb703] text-[#001d3d] text-xs font-bold uppercase tracking-widest z-9999">O que fazemos</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#001d3d]">Nossas Soluções</h2>
            </div>
            <div className="h-1 flex-1 bg-gray-200 mb-2 hidden md:block mx-8 rounded-full opacity-50" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group cursor-text relative p-8 rounded-3xl border border-gray-100 bg-white 
                shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40"
              >
                <div
                  className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center
                  transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 border border-[#ffb703]/20"
                >
                  {item.icon ? (
                    <item.icon className="w-6 h-6 text-[#ffb703]" />
                  ) : (
                    <FileBadge className="w-6 h-6 text-[#ffb703]" />
                  )}
                </div>

                <h4 className="text-[#001d3d] font-bold text-xl mb-2 group-hover:text-[#ffb703] transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.description}
                </p>

                <div className="mt-6 w-8 h-1 bg-[#ffb703]/20 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Rodapé de Contato */}
          <div className="mt-20 p-8 md:p-12 rounded-[40px] bg-[#001d3d] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl" data-aos="flip-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb703]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Ainda tem dúvidas sobre o processo?</h3>
              <p className="text-gray-400 text-sm">Consultoria técnica personalizada para o seu caso específico.</p>
            </div>

            <button className="relative z-10 bg-[#ffb703] text-[#001d3d] px-10 py-5 cursor-pointer rounded-2xl font-black hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap">
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}