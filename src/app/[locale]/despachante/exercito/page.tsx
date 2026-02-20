"use client";

import { useEffect } from "react";
import { 
  ShieldCheck, 
  Target, 
  ArrowRightLeft, 
  FileText, 
  Globe, 
  GraduationCap,
  Car,
  Map,
  Trash2,
  RefreshCw,
  Stamp,
  BadgeCheck
} from "lucide-react";

import NavBar from "components/NavBar";

const servicesEB = [
  {
    title: "Certificado de Registro (C.R.)",
    description: "Processos completos para concessão de C.R. para Atirador Esportivo, Caçador e Colecionador (CAC).",
    icon: FileText,
  },
  {
    title: "Aquisição de Armas",
    description: "Compra e registro de armas novas ou usadas, inclusive calibres restritos e autorizações de compra.",
    icon: ShieldCheck,
  },
  {
    title: "Apostilamento",
    description: "Inclusão ou exclusão (desapostilamento) de armamento no seu acervo junto ao Exército.",
    icon: Stamp,
  },
  {
    title: "Guia de Tráfego",
    description: "Emissão de GT para transporte legal de armas e munições em todo território estadual e nacional.",
    icon: Globe,
  },
  {
    title: "Veículos Blindados",
    description: "Regularização de compra e transferência de veículos com proteção balística.",
    icon: Car,
  },
  {
    title: "Manutenção de C.R.",
    description: "Renovação, cancelamento e atualização de dados cadastrais no sistema SIGMA.",
    icon: RefreshCw,
  },
  {
    title: "Paintball e Airgun",
    description: "Registro e legalização de armas de pressão, airsoft, paintball e simulacros.",
    icon: Target,
  },
  {
    title: "Mapa de Armas",
    description: "Organização e emissão do Mapa de Armas junto à Diretoria de Fiscalização de Produtos Controlados.",
    icon: Map,
  },
  {
    title: "Filiações e Cursos",
    description: "Assessoria para filiação a Federações/Confederações e encaminhamento para cursos especializados.",
    icon: GraduationCap,
  }
];

export default function ArmyDispatcherPage() {

  return (
    <main className="bg-[#f9fafb] min-h-screen">
      <NavBar />

      {/* ================= SEÇÃO HERO (EB TOPO) ================= */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/eb.jpg" 
            alt="Exército Brasileiro" 
            className="w-full h-full object-cover object-top"
          />
          {/* Overlay com tom levemente mais "militar/oliva" ou neutro escuro */}
          <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-[#f9fafb]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center" data-aos="zoom-out">
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            
Despachante do <span className="text-[#ffb703]">Exército</span>
          </h1>
          <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Suporte especializado para Atiradores, Caçadores e Colecionadores junto ao Comando do Exército.
          </p>
        </div>
      </section>

      {/* ================= GRID DE SERVIÇOS ================= */}
      <section className="relative z-20 -mt-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6" data-aos="fade-up">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703] border border-[#ffb703] text-[#001d3d] text-xs font-bold uppercase tracking-widest z-9999">O que fazemos</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">Nossas Soluções</h2>
            </div>
            <div className="h-1 flex-1 bg-gray-200 mb-2 hidden md:block mx-8 rounded-full opacity-50" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesEB.map((item, index) => (
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
                  <item.icon className="w-6 h-6 text-[#ffb703]" />
                </div>

                <h4 className="text-[#1a1a1a] font-bold text-xl mb-2 group-hover:text-[#ffb703] transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.description}
                </p>

                <div className="mt-6 w-8 h-1 bg-[#ffb703]/20 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Seção Extra: Testes e Transferências Rápidas */}
          <div className="mt-12 grid md:grid-cols-2 gap-6" data-aos="fade-up">
            <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
               <div className="bg-gray-100 p-4 rounded-2xl text-[#1a1a1a]">
                  <BadgeCheck size={32} />
               </div>
               <div>
                  <h5 className="font-bold text-lg">Testes de Tiro e Psicotécnicos</h5>
                  <p className="text-gray-500 text-sm">Encaminhamento para laudos e avaliações homologadas.</p>
               </div>
            </div>
            <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
               <div className="bg-gray-100 p-4 rounded-2xl text-[#1a1a1a]">
                  <ArrowRightLeft size={32} />
               </div>
               <div>
                  <h5 className="font-bold text-lg">Transferência de Armas</h5>
                  <p className="text-gray-500 text-sm">Gestão completa de mudança de acervo entre CACs.</p>
               </div>
            </div>
          </div>

          {/* Rodapé de Contato */}
          <div className="mt-20 p-8 md:p-12 rounded-[40px] bg-[#1a1a1a] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl" data-aos="flip-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb703]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Dúvidas sobre o seu CR?</h3>
              <p className="text-gray-400 text-sm">Nossa equipe técnica analisa sua situação documental agora mesmo.</p>
            </div>

            <button className="relative z-10 bg-[#ffb703] text-[#1a1a1a] px-10 py-5 cursor-pointer rounded-2xl font-black hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap">
              Consultar Especialista
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}