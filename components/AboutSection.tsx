"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";

export default function AboutSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const values = [
    {
      title: "Nossa História",
      description:
        "Referência em segurança patrimonial e pública há quase quatro décadas.",
      icon: ShieldCheck,
      key: "historia",
    },
    {
      title: "Missão",
      description:
        "Promovemos segurança com treinamentos especializados e excelência técnica.",
      icon: Target,
      key: "missao",
    },
    {
      title: "Investimento Social",
      description:
        "Através da ONG Guerreiros do Bem apoiamos pessoas em vulnerabilidade.",
      icon: HeartHandshake,
      key: "social",
    },
  ];

  const modalContent: Record<string, React.ReactNode> = {
    missao: (
      <>
        <p>
          Nossa missão é promover segurança por meio de treinamentos,
          capacitações especializadas e da comercialização de materiais de
          proteção pessoal, patrimonial e institucional, sempre com excelência
          técnica e prática, responsabilidade social e visão de longo prazo.
        </p>

        <p>
          Entendemos que segurança não é custo — é investimento em estabilidade,
          desenvolvimento e continuidade. Atuamos com ética, transparência e
          compromisso genuíno com o bem-estar coletivo.
        </p>

        <p>
          Buscamos gerar impacto positivo na sociedade, promovendo harmonia
          social e fortalecendo ambientes onde empresas crescem, famílias
          prosperam e comunidades se desenvolvem.
        </p>

        <p className="font-semibold text-[#001d3d]">
          Nosso propósito vai além do lucro: construir a segurança como base da
          confiança e da prosperidade sustentável.
        </p>
      </>
    ),

    social: (
      <>
        <p>
          Nosso compromisso com a transformação social se materializa na criação
          da <span className="font-bold">ONG Guerreiros do Bem</span>, iniciativa
          do Grupo Protect que traduz nossos valores em ação concreta.
        </p>

        <p>
          Por meio dela, apoiamos pessoas em situação de vulnerabilidade,
          promovendo desenvolvimento pessoal, capacitação e fortalecimento
          comunitário.
        </p>

        <p>
          Acreditamos que segurança também se constrói com oportunidade,
          educação e inclusão. Investir no social é fortalecer a base de uma
          sociedade mais justa e resiliente.
        </p>

        {/* 🔥 LINK ADICIONADO */}
        <a
          href="https://guerreirosdobem.com.br"
          target="_blank"
          className="inline-flex items-center gap-2 mt-4 font-semibold text-[#ffb703] hover:text-black transition-colors"
        >
          Visitar Guerreiros do Bem
          <ExternalLink className="w-4 h-4" />
        </a>
      </>
    ),

    historia: (
      <>
        <p>
          O Grupo Protect consolidou-se como referência em segurança patrimonial,
          privada e pública ao longo de quase quatro décadas de atuação sólida,
          ética e orientada a resultados.
        </p>

        <p>
          Nossa trajetória é sustentada por três pilares fundamentais:
          tecnologia de ponta, inteligência operacional e relações de confiança
          duradouras.
        </p>

        <p>
          Mais do que prestar serviços, construímos parcerias estratégicas e
          evoluímos continuamente para entregar proteção, previsibilidade e
          tranquilidade aos nossos clientes.
        </p>
      </>
    ),
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[#001d3d] text-sm font-bold tracking-[0.25em] uppercase">
            Sobre o Grupo Protect
          </h2>

          <h3 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            Transformando clientes em{" "}
            <span className="text-[#ffb703]">verdadeiros amigos</span>
          </h3>
        </div>

        {/* Texto topo */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <p className="text-xl font-semibold text-[#001d3d] leading-relaxed">
              O Grupo Protect é referência em segurança patrimonial, privada e
              pública, com quase quatro décadas de atuação sólida.
            </p>
            <div className="h-1 w-20 bg-[#ffb703] rounded-full" />
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Nossa trajetória é construída sobre três pilares inegociáveis:
              <span className="font-bold text-[#1a1a1a]">
                {" "}
                tecnologia de ponta, inteligência operacional e relações de
                confiança duradouras.
              </span>
            </p>

            <p>
              Mais do que prestar serviços, construímos parcerias estratégicas
              para entregar proteção e tranquilidade.
            </p>
          </div>
        </div>

        {/* 🔥 CARDS MELHORADOS */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col h-full relative p-8 rounded-3xl border border-gray-100 bg-white
              shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-[#ffb703]/40"
            >
              <div className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 border border-[#ffb703]/20">
                <item.icon className="w-6 h-6 text-[#ffb703]" />
              </div>

              <h4 className="text-[#001d3d] font-bold text-xl mb-2">
                {item.title}
              </h4>

              <p className="text-gray-500 leading-relaxed text-sm">
                {item.description}
              </p>

              {/* 🔥 BOTÃO ALINHADO */}
              <button
                onClick={() => setActiveModal(item.key)}
                className="mt-auto pt-6 text-[#ffb703] font-semibold text-sm flex items-center cursor-pointer gap-2 group"
              >
                Saiba mais
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL PREMIUM MELHORADO */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          />

          <div className="relative bg-white max-w-2xl w-full rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* header */}
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-[#001d3d]">
                {values.find((v) => v.key === activeModal)?.title}
              </h4>

              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-black cursor-pointer transition-colors"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              {modalContent[activeModal]}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}