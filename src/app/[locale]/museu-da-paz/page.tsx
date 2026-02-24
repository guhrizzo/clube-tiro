"use client";

import NavBar from "components/NavBar";
import {
  Shield,
  Globe,
  Landmark,
  ArrowRight,
  ScrollText,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function MuseuDaPaz() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white pb-24 overflow-hidden">
      <NavBar />

      {/* ================= HERO CINEMATOGRÁFICO ================= */}
      <section className="pt-32 px-6 text-center relative">

        <motion.div
          initial="hidden"
          animate="show"
          
          custom={0}
          className="relative z-10 max-w-4xl mx-auto"
        >
        </motion.div>
      </section>

      {/* ================= FILOSOFIA ================= */}
      <motion.section
        className="max-w-4xl mx-auto px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        
        custom={1}
      >
        <div className="group bg-zinc-900/60 border border-zinc-800 p-8 md:p-12 rounded-lg relative overflow-hidden transition-all duration-500 hover:border-[#ffb703]/40 hover:shadow-[0_0_40px_rgba(255,183,3,0.08)]">
          {/* gradiente hover */}
          <div className="absolute inset-0 bg-linear-to-br from-[#ffb703]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <ScrollText className="absolute -right-6 -top-6 w-52 h-52 text-white/5 -rotate-12" />

          <div className="relative z-10">
            <h2 className="text-[#ffb703] font-serif italic text-2xl mb-4">
              "Si vis pacem, para bellum"
            </h2>

            <p className="text-gray-300 text-[15px] leading-relaxed italic">
              Este provérbio clássico, atribuído ao autor romano Flávio Vegécio
              Renatus, sugere que a melhor forma de garantir a paz e evitar
              ataques é manter uma postura de força e prontidão defensiva.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ================= GRUPO PROTECT ================= */}
      <section className="max-w-6xl mx-auto mt-32 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            
            custom={2}
          >
            <div className="flex items-center gap-2 mb-6 text-[#ffb703]">
              <Shield size={20} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">
                O Legado
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black uppercase mb-6">
              Grupo Protect
            </h3>

            <div className="space-y-5 text-gray-300 text-[15px] leading-relaxed">
              <p>
                Com quase 4 décadas de atuação, o Grupo Protect é uma força
                consolidada no comércio e treinamento. Nossa trajetória é
                marcada pela qualificação de cidadãos e forças de segurança em
                diversos municípios como Belo Horizonte, Contagem e Ribeirão
                Preto, sempre com foco na excelência e legalidade.
              </p>

              <p>
                Hoje, expandimos nossa atuação para a preservação da memória,
                unindo nossa experiência técnica à educação histórica.
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#ffb703] mt-6
                text-xs font-bold uppercase tracking-widest
                group transition-all duration-300"
              >
                Link A.G.B
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </motion.div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: Landmark,
                title: "Foco Educativo",
                desc: "Educar a população sobre a preservação ambiental e a história dos conflitos humanos. Já possuímos o Certificado de Registro emitido pelo Exército.",
              },
              {
                icon: Globe,
                title: "Exposição Internacional",
                desc: "Uma dissertação viva das adversidades das sociedades nacionais e internacionais através dos meios de defesa utilizados em diversas épocas.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                
                custom={3 + i}
                className="group flex gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/40
                hover:border-[#ffb703]/40 hover:bg-zinc-900/70
                hover:shadow-[0_0_30px_rgba(255,183,3,0.08)]
                transition-all duration-300"
              >
                <div className="bg-[#ffb703] p-3 h-fit rounded-md group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-black" size={22} />
                </div>

                <div>
                  <h4 className="font-bold uppercase text-sm mb-2 italic">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER PREMIUM ================= */}
      <section className="mt-32 text-center px-6 pb-10">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-[#ffb703] to-transparent mx-auto mb-8"></div>

        <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">
          Ambiente Seguro • Legalidade Total • Patrimônio Histórico
        </p>
      </section>
    </main>
  );
}