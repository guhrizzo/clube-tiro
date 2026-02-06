"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactPremium() {
  return (
    <section className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-[3rem] shadow-md border border-slate-100 overflow-hidden"
        >
          {/* Glow decorativo */}
         

          <div className="relative z-10 grid lg:grid-cols-2 gap-14 p-10 md:p-16">
            {/* ================= LADO ESQUERDO ================= */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-5 py-1.5 rounded-full bg-[#ffb703]/15 text-[#ffb703]  border border-yellow-400/30 text-xs font-bold uppercase tracking-widest">
                Contato
              </div>

              <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-slate-900 leading-tight">
                Faça uma cotação
              </h2>

              <div className="space-y-3 text-slate-600 text-sm md:text-base">
                <p>
                  <span className="font-bold text-slate-800">
                    Central de atendimento e vendas:
                  </span>{" "}
                  <br />
                  +55 (31) 3371-8600
                </p>
                <p>
                  <span className="font-bold text-slate-800">Email:</span>{" "}
                  info@protectrastreamento.com
                </p>
              </div>

              {/* Botões de contato */}
              <div className="flex gap-3">
                {[ 
                  { icon: <Phone size={18} />, href: "tel:+553133718600" },
                  { icon: <Mail size={18} />, href: "mailto:info@protectrastreamento.com" },
                  { icon: <MessageCircle size={18} />, href: "https://wa.me/553133718600" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="group w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center
                    shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="text-[#ffb703] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                  </a>
                ))}
              </div>

              {/* Mapa */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <iframe
                  src="https://www.google.com/maps?q=R.%20Gen.%20Andrade%20Neves,%20622%20-%20Gutierrez,%20Belo%20Horizonte%20-%20MG&output=embed"
                  className="w-full h-65"
                  loading="lazy"
                />
              </div>
            </div>

            {/* ================= FORMULÁRIO ================= */}
            <div className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 md:p-10">
              

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#ffb703] text-black text-xs font-bold uppercase tracking-widest shadow">
                  Preencha o formulário para entrar em contato
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-[#ffb703]/40 focus:border-[#ffb703]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-[#ffb703]/40 focus:border-[#ffb703]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-[#ffb703]/40 focus:border-[#ffb703]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Qual plano você precisa?
                    </label>
                    <div className="flex gap-6 mt-2">
                      {["Pessoa física", "Pessoa jurídica"].map((opt, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <input type="checkbox" className="accent-[#ffb703]" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Marca e modelo do veículo
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50
                      focus:outline-none focus:ring-2 focus:ring-[#ffb703]/40 focus:border-[#ffb703]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full mt-4 relative overflow-hidden bg-[#ffb703] text-black py-4 rounded-xl font-black
                    shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                  >
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_60%)]
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Enviar</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
