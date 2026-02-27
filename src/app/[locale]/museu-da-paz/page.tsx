"use client";

import NavBar from "components/NavBar";
import {
  Shield,
  Globe,
  Landmark,
  ArrowRight,
  ScrollText,
  BadgeCheck,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// Correção da tipagem para evitar o erro de 'Variants'
const fadeUp: Variants = {
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
          variants={fadeUp}
          custom={0}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Museu da <span className="text-[#ffb703]">Paz</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-[0.2em]">
            Preservando a história para proteger o futuro
          </p>
        </motion.div>
      </section>

      {/* ================= FILOSOFIA ================= */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
      >
        <div className="group bg-zinc-900/60 border border-zinc-800 p-8 md:p-12 rounded-lg relative overflow-hidden transition-all duration-500 hover:border-[#ffb703]/40 hover:shadow-[0_0_40px_rgba(255,183,3,0.08)]">
          <div className="absolute inset-0 bg-linear-to-br from-[#ffb703]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <ScrollText className="absolute -right-6 -top-6 w-52 h-52 text-white/5 -rotate-12" />

          <div className="relative z-10">
            <h2 className="text-[#ffb703] font-serif italic text-2xl mb-2">
              "Si vis pacem, para bellum"
            </h2>
            <h2 className="text-[#ffb703]/40 font-serif italic text-xl mb-6">
              "Se queres Paz, prepare-se para a Guerra."
            </h2>

            <p className="text-gray-300 text-[15px] leading-relaxed italic">
              Este provérbio clássico, atribuído ao autor romano Flávio Vegécio
              Renatus, sugere que a melhor forma de garantir a paz e evitar
              ataques é manter uma postura de força e prontidão defensiva.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ================= MISSÃO E EDUCAÇÃO ================= */}
      <section className="max-w-6xl mx-auto mt-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="h-1 w-20 bg-[#ffb703]" />
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              O <span className="text-[#ffb703] font-bold">Museu da Paz</span> promove educação histórica e reflexão sobre os conflitos humanos ao longo do tempo, destacando a importância da <span className="italic">defesa responsável</span> e da preservação cultural.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5   transition-opacity">
              <Shield size={120} />
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-green-500 bg-green-500/10 w-fit px-4 py-1.5 rounded-full border border-green-500/20">
                <BadgeCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Institucional</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                O projeto possui <strong className="text-white">Certificado de Registro emitido pelo Exército Brasileiro</strong>, garantindo legalidade e segurança institucional em todas as suas atividades de preservação.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      
      {/* ================= FOOTER ================= */}
      <section className="mt-32 text-center px-6 pb-10">
        <div className="h-px w-24 bg-linear-to-r from-transparent via-[#ffb703] to-transparent mx-auto mb-8"></div>
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">
          Ambiente Seguro • Legalidade Total • Patrimônio Histórico
        </p>
      </section>
    </main>
  );
}