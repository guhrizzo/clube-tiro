"use client";

import NavBar from "components/NavBar";
import ScrollToTop from "components/BackTop";
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

/* ================= SERVICES ================= */

const services = [
{
title: "Aquisição e Registro de Armas",
description:
"Processo completo para aquisição de arma nova ou usada, incluindo SINARM, CRAF e calibres permitidos ou restritos.",
icon: ShieldCheck,
},
{
title: "CRAF e Regularizações",
description:
"Emissão de CRAF, 2ª via de registro, cancelamentos e renovações junto à Polícia Federal.",
icon: FileBadge,
},
{
title: "Porte de Arma",
description:
"Assessoria completa para obtenção e renovação de porte de arma conforme legislação vigente.",
icon: UserCheck,
},
{
title: "Transferências de Armas",
description:
"Transferência entre cidadãos e entre Polícia Federal e Exército Brasileiro.",
icon: ArrowRightLeft,
},
{
title: "CR – CAC (Exército)",
description:
"Processos de Certificado de Registro para atirador esportivo, caçador e colecionador.",
icon: ShieldCheck,
},
{
title: "Guias de Tráfego",
description:
"Emissão de guia de tráfego estadual e nacional para transporte de armamentos e munições.",
icon: Globe,
},
{
title: "Testes Obrigatórios",
description:
"Agendamento e acompanhamento de teste de tiro e avaliação psicológica.",
icon: Target,
},
{
title: "Empresas de Segurança",
description:
"Registro e autorização de funcionamento junto à Polícia Federal.",
icon: Lock,
},
{
title: "Cursos de Instrutor",
description:
"Formação e certificação de instrutores de armamento e tiro.",
icon: GraduationCap,
},
];

export default function DispatcherCards() {
return ( <main className="bg-[#f9fafb] min-h-screen"> <ScrollToTop /> <NavBar />

```
  {/* ================= HERO ================= */}
  <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="/pf.jpeg"
        alt="Polícia Federal"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#001d3d]/85 via-[#001d3d]/50 to-[#f9fafb]" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
        Despachante Especializado em
        <span className="text-[#ffb703]">
          {" "}
          Polícia Federal
        </span>
      </h1>

      <p className="mt-6 text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
        Assessoria completa em processos de armamento, registros, CR,
        porte, guia de tráfego e regularizações com total conformidade
        legal.
      </p>
    </div>
  </section>

  {/* ================= SELOS ================= */}
  <section className="relative z-20 -mt-12 px-6">
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
      {[
        "Atendimento especializado junto à Polícia Federal",
        "Processos conduzidos conforme legislação vigente",
        "Acompanhamento completo até o deferimento",
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-2xl p-5 text-sm text-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
        >
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001d3d]">
          Como Funciona o Processo
        </h2>
        <p className="text-gray-500 mt-3">
          Acompanhamento completo em todas as etapas
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            step: "01",
            title: "Análise Inicial",
            desc: "Verificação da documentação e viabilidade do processo.",
          },
          {
            step: "02",
            title: "Protocolos",
            desc: "Entrada dos processos junto à Polícia Federal ou Exército.",
          },
          {
            step: "03",
            title: "Acompanhamento",
            desc: "Monitoramento contínuo até a decisão do órgão competente.",
          },
          {
            step: "04",
            title: "Conclusão",
            desc: "Entrega da documentação final ao cliente.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-[#ffb703] font-black text-sm mb-3">
              {item.step}
            </div>

            <h4 className="font-bold text-[#001d3d] mb-2">
              {item.title}
            </h4>

            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-4 h-1 w-10 bg-[#ffb703]/30 rounded-full group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ================= SERVIÇOS ================= */}
  <section className="relative z-20 pb-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703] text-[#001d3d] text-xs font-bold uppercase tracking-widest">
            O que fazemos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#001d3d]">
            Nossas Soluções
          </h2>
        </div>

        <div className="h-1 flex-1 bg-gray-200 mb-2 hidden md:block mx-8 rounded-full opacity-50" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#ffb703]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center border border-[#ffb703]/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <item.icon className="w-6 h-6 text-[#ffb703]" />
              </div>

              <h4 className="text-[#001d3d] font-bold text-xl mb-2 group-hover:text-[#ffb703] transition-colors">
                {item.title}
              </h4>

              <p className="text-gray-500 leading-relaxed text-sm">
                {item.description}
              </p>

              <div className="mt-6 w-8 h-1 bg-[#ffb703]/20 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* ================= CTA ================= */}
      <div className="mt-24 relative overflow-hidden rounded-[40px] bg-[#001d3d] p-10 md:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffb703]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Precisa de assessoria especializada?
            </h3>
            <p className="text-gray-300 text-sm">
              Fale agora com nossa equipe e receba orientação para o seu
              caso.
            </p>
          </div>

          <a
            href="mailto:despachante@grupoprotect.com.br"
            className="bg-[#ffb703] text-[#001d3d] px-10 py-5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap"
          >
            Falar com Especialista
          </a>
        </div>
      </div>
    </div>
  </section>
</main> );
}