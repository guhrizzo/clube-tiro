"use client";

import { 
  ShieldCheck, 
  Target, 
  ArrowRightLeft, 
  FileText, 
  Globe, 
  GraduationCap,
  Car,
  Map,
  RefreshCw,
  Stamp,
  BadgeCheck,
  Mail,
  Award,
  ClipboardList
} from "lucide-react";
import ScrollToTop from "components/BackTop";
import NavBar from "components/NavBar";

const servicesEB = [
  {
    title: "Certificado de Registro (C.R.)",
    description: "Processos completos de concessão, renovação e cancelamento de C.R. para pessoas físicas e empresas.",
    icon: FileText,
  },
  {
    title: "Aquisição e Importação",
    description: "Assessoria completa para compra e importação de armas, munições e produtos controlados.",
    icon: ShieldCheck,
  },
  {
    title: "CRAF",
    description: "Emissão e regularização do Certificado de Registro de Arma de Fogo junto ao Exército.",
    icon: Award,
  },
  {
    title: "Apostilamento",
    description: "Inclusão ou exclusão (desapostilamento) de armamentos em acervos CAC.",
    icon: Stamp,
  },
  {
    title: "Guia de Tráfego",
    description: "GT para transporte legal de armas e munições em todo território estadual e nacional.",
    icon: Globe,
  },
  {
    title: "Transferência de Armas",
    description: "Gestão completa de transferência de armamento entre CACs ou empresas.",
    icon: ArrowRightLeft,
  },
  {
    title: "Veículos Blindados",
    description: "Regularização de compra, venda e transferência de veículos com proteção balística.",
    icon: Car,
  },
  {
    title: "Mapa de Armas",
    description: "Organização e emissão do Mapa de Armas junto à DFPC.",
    icon: Map,
  },
  {
    title: "Paintball e Airgun",
    description: "Legalização de armas de pressão, airsoft, paintball, simulacros e afins.",
    icon: Target,
  },
  {
    title: "Autorizações e Manutenções",
    description: "Autorização de compra, atualização cadastral e manutenção completa no SIGMA.",
    icon: RefreshCw,
  },
  {
    title: "Testes e Laudos",
    description: "Encaminhamento para testes de tiro, psicotécnico e laudos exigidos pelo Exército.",
    icon: BadgeCheck,
  },
  {
    title: "Consultoria Especializada",
    description: "Análise documental estratégica para CACs, empresas e operadores do setor.",
    icon: ClipboardList,
  }
];

export default function ArmyDispatcherPage() {
  return (
    <main className="bg-[#0b0f14] min-h-screen">
      <ScrollToTop />
      <NavBar />

      {/* ================= HERO ELITE ================= */}
      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/eb.jpg" 
            alt="Exército Brasileiro" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/60 to-[#0b0f14]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="inline-block mb-6 px-5 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/40 text-[#ffb703] text-xs font-bold tracking-widest uppercase">
            Despachante Especializado
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Despachante do <span className="text-[#ffb703]">Exército</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Assessoria completa e estratégica para CACs, empresas e operadores
            de produtos controlados pelo Exército Brasileiro.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#ffb703] text-[#1a1a1a] px-8 py-4 rounded-2xl font-black cursor-pointer hover:scale-105 transition-all shadow-xl">
              Falar com Especialista
            </button>

            <button className="border border-white/20 text-white px-8 py-4 rounded-2xl font-bold cursor-pointer  hover:bg-white/10 transition-all">
              Ver Serviços
            </button>
          </div>
        </div>
      </section>

      {/* ================= SERVIÇOS ================= */}
      <section className="relative z-20 -mt-20 pb-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Soluções Completas
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Atuamos em todas as etapas do processo junto ao Exército,
              garantindo segurança jurídica e agilidade operacional.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesEB.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl border border-white/5 bg-linear-to-b from-white/5 to-white/2
                backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              >
                <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center
                  transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-[#ffb703]/30">
                  <item.icon className="w-6 h-6 text-[#ffb703]" />
                </div>

                <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#ffb703] transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>

                <div className="mt-6 w-8 h-1 bg-[#ffb703]/30 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* ================= CTA FINAL ================= */}
          <div className="mt-24 p-10 md:p-14 rounded-[40px] bg-linear-to-r from-[#ffb703] to-[#ffd166] text-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-2">
                Pronto para regularizar seu processo?
              </h3>
              <p className="text-sm font-medium opacity-80">
                Atendimento técnico especializado em todo o Brasil.
              </p>

              <div className="flex items-center gap-2 mt-4 font-bold">
                <Mail size={18} />
                despachante@grupoprotect.com.br
              </div>
            </div>

            <button className="bg-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black cursor-pointer  hover:scale-105 transition-all shadow-xl whitespace-nowrap">
              Solicitar Atendimento
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}