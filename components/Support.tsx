"use client";

import { motion } from "framer-motion";
import { Mail, Headset } from "lucide-react";

export default function SupportCard() {
  return (
    <section className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-md px-10 py-12 overflow-hidden"
        >
         

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Texto */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffb703]/10 text-[#ffb703] border border-yellow-400/30 text-xs font-bold uppercase tracking-widest">
                <Headset size={14} />
                Suporte
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                Precisa falar com o suporte?
              </h3>

              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Nossa equipe está pronta para te ajudar com rapidez e eficiência.
              </p>
            </div>

            {/* CTA */}
            <div className="flex md:justify-end">
              <a
                href="mailto:suporte@protectrastreamento.com"
                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl 
                bg-[#ffb703] text-slate-900 font-extrabold shadow-lg 
                hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={18} />
                suporte@protectrastreamento.com
                <span className="absolute inset-0 rounded-xl ring-2 ring-[#ffb703]/0 group-hover:ring-[#ffb703]/40 transition" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
