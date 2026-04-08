"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NavBar from "../../../../../components/NavBar";
import ScrollToTop from "../../../../../components/BackTop";
import {
  ShieldCheck,
  Target,
  UserCheck,
  ArrowRightLeft,
  Lock,
  Globe,
  GraduationCap,
  Scale,
  FileBadge,
} from "lucide-react";

/* ================= DICTIONARIES ================= */

const dictionaries = {
  pt: {
    dispatcher: {
      heroTitle: "Despachante Especializado em",
      heroOrg: "Polícia Federal",
      heroSubtitle: "Assessoria completa em processos de armamento, registros, CR, porte, guia de tráfego e regularizações com total conformidade legal.",
      badges: [
        "Atendimento especializado junto à Polícia Federal",
        "Processos conduzidos conforme legislação vigente",
        "Acompanhamento completo até o deferimento",
      ],
      howItWorks: "Como Funciona o Processo",
      howItWorksSub: "Acompanhamento completo em todas as etapas",
      steps: [
        { title: "Análise Inicial", desc: "Verificação da documentação e viabilidade do processo." },
        { title: "Protocolos", desc: "Entrada dos processos junto à Polícia Federal ou Exército." },
        { title: "Acompanhamento", desc: "Monitoramento contínuo até a decisão do órgão competente." },
        { title: "Conclusão", desc: "Entrega da documentação final ao cliente." },
      ],
      solutionsBadge: "O que fazemos",
      solutionsTitle: "Nossas Soluções",
      ctaTitle: "Precisa de assessoria especializada?",
      ctaSub: "Fale agora com nossa equipe e receba orientação para o seu caso.",
      ctaBtn: "Falar com Especialista",
      services: [
        { title: "Aquisição e Registro de Armas", description: "Processo completo para aquisição de arma nova ou usada, incluindo SINARM e CRAF." },
        { title: "CRAF e Regularizações", description: "Emissão de CRAF, 2ª via de registro e renovações junto à Polícia Federal." },
        { title: "Porte de Arma", description: "Assessoria completa para obtenção e renovação de porte de arma conforme a lei." },
        { title: "Transferências de Armas", description: "Transferência entre cidadãos e entre Polícia Federal e Exército Brasileiro." },
        { title: "CR – CAC (Polícia Federal)", description: "Processos de Certificado de Registro para atirador, caçador e colecionador." },
        { title: "Guias de Tráfego", description: "Emissão de guia de tráfego para transporte de armamentos e munições." },
        { title: "Testes Obrigatórios", description: "Agendamento de teste de tiro e avaliação psicológica." },
        { title: "Empresas de Segurança", description: "Registro e autorização de funcionamento junto ao Exército e a Polícia Federal." },
        { title: "Cursos de Instrutor", description: "Formação e certificação de instrutores de armamento e tiro." },
      ]
    }
  },
  en: {
    dispatcher: {
      heroTitle: "Specialized Consultant in",
      heroOrg: "Federal Police",
      heroSubtitle: "Full assistance in weaponry processes, registrations, CR, carry permits, traffic guides, and legal compliance.",
      badges: [
        "Specialized service for the Federal Police",
        "Processes conducted under current legislation",
        "Full monitoring until approval",
      ],
      howItWorks: "How the Process Works",
      howItWorksSub: "Complete tracking through all stages",
      steps: [
        { title: "Initial Analysis", desc: "Verification of documentation and process feasibility." },
        { title: "Protocols", desc: "Filing processes with the Federal Police or Army." },
        { title: "Monitoring", desc: "Continuous tracking until the agency's decision." },
        { title: "Conclusion", desc: "Delivery of final documentation to the client." },
      ],
      solutionsBadge: "What we do",
      solutionsTitle: "Our Solutions",
      ctaTitle: "Need specialized advice?",
      ctaSub: "Talk to our team now and get guidance for your case.",
      ctaBtn: "Talk to Specialist",
      services: [
        { title: "Weapon Acquisition & Registration", description: "Complete process for new or used weapons, including SINARM and CRAF." },
        { title: "CRAF & Regularizations", description: "CRAF issuance, registration copies, and renewals with the Federal Police." },
        { title: "Gun Permit (Carry)", description: "Full consultancy for obtaining and renewing carry permits under the law." },
        { title: "Weapon Transfers", description: "Transfers between citizens and between Federal Police and Army." },
        { title: "CR – CAC (Army)", description: "Registration processes for sport shooters, hunters, and collectors." },
        { title: "Traffic Guides", description: "Issuance of traffic guides for transporting weapons and ammunition." },
        { title: "Mandatory Testing", description: "Scheduling shooting tests and psychological evaluations." },
        { title: "Security Companies", description: "Registration and operational authorization with the Federal Police." },
        { title: "Instructor Courses", description: "Training and certification for firearm and shooting instructors." },
      ]
    }
  },
  es: {
    dispatcher: {
      heroTitle: "Gestoría Especializada en",
      heroOrg: "Policía Federal",
      heroSubtitle: "Asesoría completa en procesos de armamento, registros, CR, porte, guía de tránsito y regularizaciones legales.",
      badges: [
        "Atención especializada ante la Policía Federal",
        "Procesos realizados según la legislación vigente",
        "Seguimiento completo hasta la aprobación",
      ],
      howItWorks: "Cómo Funciona el Proceso",
      howItWorksSub: "Seguimiento integral en todas las etapas",
      steps: [
        { title: "Análisis Inicial", desc: "Verificación de la documentación y viabilidad del proceso." },
        { title: "Protocolos", desc: "Ingreso de los procesos ante la Policía Federal o el Ejército." },
        { title: "Seguimiento", desc: "Monitoreo continuo hasta la decisión del órgano competente." },
        { title: "Conclusión", desc: "Entrega de la documentación final al cliente." },
      ],
      solutionsBadge: "Lo que hacemos",
      solutionsTitle: "Nuestras Soluciones",
      ctaTitle: "¿Necesita asesoría especializada?",
      ctaSub: "Hable ahora con nuestro equipo y reciba orientación para su caso.",
      ctaBtn: "Hablar con Especialista",
      services: [
        { title: "Adquisición y Registro", description: "Proceso completo para armas nuevas o usadas, incluyendo SINARM y CRAF." },
        { title: "CRAF y Regularizaciones", description: "Emisión de CRAF, copias de registro y renovaciones ante la Policía." },
        { title: "Porte de Armas", description: "Asesoría completa para obtener y renovar el porte según la ley." },
        { title: "Transferencia de Armas", description: "Trámites entre ciudadanos y entre Policía Federal y Ejército." },
        { title: "CR – CAC (Ejército)", description: "Certificado de Registro para tiradores, cazadores y coleccionistas." },
        { title: "Guías de Tránsito", description: "Emisión de guías para el transporte de armamento y municiones." },
        { title: "Pruebas Obligatorias", description: "Programación de pruebas de tiro y evaluaciones psicológicas." },
        { title: "Empresas de Seguridad", description: "Registro y autorización de funcionamiento ante la Policía Federal." },
        { title: "Cursos de Instructor", description: "Formación y certificación de instructores de armamento y tiro." },
      ]
    }
  }
};

const icons = [ShieldCheck, FileBadge, UserCheck, ArrowRightLeft, ShieldCheck, Globe, Target, Lock, GraduationCap];

export default function DispatcherCards() {
  const pathname = usePathname();

  const currentLang = useMemo(() => {
    const seg = pathname?.split("/").filter(Boolean)[0];
    return ["pt", "en", "es"].includes(seg as any) ? (seg as "pt" | "en" | "es") : "pt";
  }, [pathname]);

  const d = dictionaries[currentLang].dispatcher;

  return (
    <main className="bg-[#f9fafb] min-h-screen">
      <ScrollToTop />
      <NavBar />

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/pf.jpeg" alt="Polícia Federal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-[#001d3d]/85 via-[#001d3d]/50 to-[#f9fafb]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            {d.heroTitle} <span className="text-[#ffb703]">{d.heroOrg}</span>
          </h1>
          <p className="mt-6 text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {d.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ================= SELOS ================= */}
      <section className="relative z-20 -mt-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {d.badges.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 text-sm text-gray-600 shadow-sm hover:shadow-md transition-all duration-300">
              <Scale className="w-5 h-5 text-[#ffb703] mb-2" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="py-24 px-6 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#001d3d] uppercase italic">
              {d.howItWorks}
            </h2>
            <p className="text-gray-500 mt-3">{d.howItWorksSub}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {d.steps.map((item, i) => (
              <div key={i} className="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="text-[#ffb703] font-black text-sm mb-3">0{i + 1}</div>
                <h4 className="font-bold text-[#001d3d] mb-2 uppercase">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-1 w-10 bg-[#ffb703]/30 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVIÇOS ================= */}
      <section className="relative z-20 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703] text-[#001d3d] text-xs font-bold uppercase tracking-widest">
                {d.solutionsBadge}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#001d3d] uppercase italic">
                {d.solutionsTitle}
              </h2>
            </div>
            <div className="h-1 flex-1 bg-gray-200 mb-2 hidden md:block mx-8 rounded-full opacity-50" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {d.services.map((service, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="group relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-[#ffb703]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center border border-[#ffb703]/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-6 h-6 text-[#ffb703]" />
                    </div>
                    <h4 className="text-[#001d3d] font-bold text-xl mb-2 group-hover:text-[#ffb703] transition-colors uppercase">
                      {service.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <div className="mt-6 w-8 h-1 bg-[#ffb703]/20 rounded-full group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-24 relative overflow-hidden rounded-[40px] bg-[#001d3d] p-10 md:p-14 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffb703]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 uppercase italic">{d.ctaTitle}</h3>
                <p className="text-gray-300 text-sm">{d.ctaSub}</p>
              </div>
              <a href="mailto:despachante@grupoprotect.com.br" className="bg-[#ffb703] text-[#001d3d] px-10 py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap uppercase tracking-tighter">
                {d.ctaBtn}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}