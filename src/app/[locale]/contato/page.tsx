"use client";

import {
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,

} from "react-icons/fa";
import { PhoneCall } from 'lucide-react';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "components/NavBar";
import ContactPremium from "components/Contact";

export default function ContactPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });

    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="min-h-screen font-sans bg-linear-to-b from-white to-slate-50 text-slate-950">
      <NavBar />

      {/* HERO / CONTACT */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-14 items-start"
          >
            
            <div className="space-y-10">
              <div>
                <h3 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase  tracking-[0.35em]">
                  <PhoneCall size={16}/> Contato Direto
                </h3>

                <h2 className="text-4xl md:text-5xl font-black text-slate-950 leading-tight">
                  Pronto para dar o próximo passo?
                </h2>

                <p className="text-slate-700 mt-6 max-w-md text-lg leading-relaxed">
                  Fale com nossos especialistas e receba um atendimento
                  personalizado para suas necessidades de segurança.
                </p>

                {/* TRUST BADGES */}
                <div className="flex flex-wrap gap-3 mt-7">
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    Atendimento Nacional
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    Resposta Rápida
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    Especialistas Certificados
                  </span>
                </div>
              </div>

              {/* QUICK CONTACT */}
              <div className="flex  gap-5">
                {/* WHATSAPP — PRIMARY CTA */}
                <a
                  href="https://wa.me/553133718600"
                  className="flex items-center gap-4 p-6
                  bg-[#ffc300] text-[#020b18]
                  border border-[#ffc300]
                  rounded-2xl
                  hover:-translate-y-1
                  hover:shadow-xl
                  active:scale-[0.98]
                  transition-all duration-300
                  group w-95"
                >
                  <div className="w-12 h-12 rounded-full bg-[#020b18]/10 flex items-center justify-center">
                    <FaWhatsapp size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-widest opacity-70">
                      WhatsApp
                    </p>
                    <p className="font-extrabold">Iniciar Conversa</p>
                  </div>
                </a>

                {/* PHONE */}
                <a
                  href="tel:+553133718600"
                  className="flex items-center gap-4 p-6
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  hover:-translate-y-1
                  hover:shadow-xl
                  active:scale-[0.98]
                  transition-all duration-300
                  group w-95"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#ffc300] group-hover:text-[#020b18] transition-colors">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">
                      Telefone
                    </p>
                    <p className="text-slate-900 font-bold">(31) 3371-8600</p>
                  </div>
                </a>
              </div>

              {/* EXTRA INFO */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4 text-slate-600">
                  <FaEnvelope className="text-[#ffc300]" />
                  <span>info@protectrastreamento.com</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <FaMapMarkerAlt className="text-[#ffc300]" />
                  <span>Belo Horizonte, MG - Atendimento Nacional</span>
                </div>
              </div>
            </div>

            
            
          </motion.div>
        </div>
        <ContactPremium />
      </section>

      {/* MODAL */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#020b18] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
              <h3 className="text-[#ffc300] font-black tracking-[0.2em] uppercase text-xs">
                Arma é Civilização
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-[#ffc300] hover:rotate-90 transition-all duration-300"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="px-10 py-10 text-white/70 text-[1rem] leading-relaxed space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <p className="font-bold uppercase tracking-[0.2em] text-[#ffc300] text-[10px] border-l-2 border-[#ffc300] pl-4">
                Por: Major L. Caudill
              </p>

              <div className="space-y-6 italic">
                <p>
                  As pessoas só possuem duas maneiras de lidar umas com as
                  outras: pela razão e pela força.
                </p>
                <p>
                  A força não tem lugar como método válido de interação social
                  e a única coisa que remove a força da equação é uma arma de
                  fogo.
                </p>
                <p className="text-white font-medium not-italic border-y border-white/5 py-4">
                  "A arma de fogo remove a disparidade de força física, tamanho
                  ou número entre atacantes em potencial e alguém se
                  defendendo."
                </p>
                <p>
                  Quem advoga pelo banimento das armas de fogo opta
                  automaticamente pelo governo do jovem, do forte e dos em
                  maior número.
                </p>
                <p>
                  A maior civilização é onde todos os cidadãos estão igualmente
                  armados e só podem ser persuadidos, nunca forçados.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
