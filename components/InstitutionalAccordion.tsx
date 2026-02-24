"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function InstitutionalAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      title: "Missão",
      content: (
        <>
          <p>
            Nossa missão é promover segurança por meio de treinamentos,
            capacitações especializadas e da comercialização de materiais de
            proteção pessoal, patrimonial e institucional, sempre com excelência
            técnica e prática, responsabilidade social e visão de longo prazo.
          </p>

          <p>
            Entendemos que segurança não é custo — é investimento em estabilidade,
            desenvolvimento e continuidade. Por isso, atuamos com ética,
            transparência e compromisso genuíno com o bem-estar coletivo.
          </p>

          <p>
            Buscamos gerar impacto positivo na sociedade, promovendo harmonia
            social e fortalecendo ambientes onde empresas crescem, famílias
            prosperam e comunidades se desenvolvem.
          </p>

          <p className="font-semibold text-[#001d3d]">
            Nosso propósito vai além do lucro: construir a segurança como base
            da confiança e da prosperidade sustentável.
          </p>
        </>
      ),
    },
    {
      title: "Investimento Social",
      content: (
        <>
          <p>
            Nosso compromisso com a transformação social se materializa na
            criação da{" "}
            <span className="font-bold text-[#1a1a1a]">
              ONG Guerreiros do Bem
            </span>
            , iniciativa do Grupo Protect que traduz nossos valores em ação
            concreta.
          </p>

          <p>
            Por meio dela, apoiamos pessoas em situação de vulnerabilidade,
            promovendo desenvolvimento pessoal, capacitação e fortalecimento
            comunitário.
          </p>

          <p>
            Acreditamos que segurança também se constrói com oportunidade,
            educação e inclusão. Investir no social é fortalecer a base de uma
            sociedade mais justa, resiliente e preparada para o futuro.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="mt-24 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => setOpen(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left group"
            >
              <span className="font-bold text-[#001d3d] text-lg">
                {item.title}
              </span>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#ffb703]" : "text-gray-400"
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-500 ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 space-y-4 text-gray-600 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}