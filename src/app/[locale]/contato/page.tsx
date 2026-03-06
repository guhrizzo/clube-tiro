"use client";

import {
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { PhoneCall } from 'lucide-react';
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "components/NavBar";
import ContactPremium from "components/Contact";

/* ---------------- DICTIONARY ---------------- */
const dictionaries = {
  pt: {
    contactPage: {
      badge: "Contato Direto",
      title: "Pronto para dar o próximo passo?",
      description: "Escreva sua dúvida abaixo e fale diretamente com nossos especialistas via WhatsApp.",
      placeholder: "Como podemos ajudar você hoje?",
      send: "Enviar",
      responseStatus: "Resposta imediata via WhatsApp",
      national: "Atendimento Nacional",
      fast: "Resposta Rápida",
      certified: "Especialistas Certificados",
      callAction: "Ligar Agora",
      location: "Belo Horizonte, MG"
    }
  },
  en: {
    contactPage: {
      badge: "Direct Contact",
      title: "Ready to take the next step?",
      description: "Write your question below and speak directly with our specialists via WhatsApp.",
      placeholder: "How can we help you today?",
      send: "Send",
      responseStatus: "Immediate response via WhatsApp",
      national: "National Service",
      fast: "Fast Response",
      certified: "Certified Specialists",
      callAction: "Call Now",
      location: "Belo Horizonte, MG, Brazil"
    }
  },
  es: {
    contactPage: {
      badge: "Contacto Directo",
      title: "¿Listo para dar el siguiente paso?",
      description: "Escriba su duda a continuación y hable directamente con nuestros especialistas por WhatsApp.",
      placeholder: "¿Cómo podemos ayudarle hoy?",
      send: "Enviar",
      responseStatus: "Respuesta inmediata por WhatsApp",
      national: "Atención Nacional",
      fast: "Respuesta Rápida",
      certified: "Especialistas Certificados",
      callAction: "Llamar Ahora",
      location: "Belo Horizonte, MG, Brasil"
    }
  }
};

type Lang = "pt" | "en" | "es";

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const phoneNumber = "553133718600";

  // Detectar idioma atual
  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return ["pt", "en", "es"].includes(seg) ? (seg as Lang) : "pt";
  }, [pathname]);

  // Atalho para as traduções
  const ct = (dictionaries as any)[currentLang].contactPage;

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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans bg-linear-to-b from-white to-slate-50 text-slate-950">
      <NavBar />

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
                <h3 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/20 text-[#ffb703] text-xs font-bold uppercase tracking-[0.35em]">
                  <PhoneCall size={16} /> {ct.badge}
                </h3>

                <h2 className="text-4xl md:text-5xl font-black text-slate-950 leading-tight mt-4">
                  {ct.title}
                </h2>

                <p className="text-slate-700 mt-6 max-w-md text-lg leading-relaxed">
                  {ct.description}
                </p>

                {/* INPUT DINÂMICO PARA WHATSAPP */}
                <div className="w-full max-w-2xl mt-8">
                  <div className="relative group">
                    <div className="absolute rounded-2xl blur-sm opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative flex flex-col md:flex-row gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-[#ffc300] transition-colors">
                      <textarea
                        rows={1}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder={ct.placeholder}
                        className="flex-1 px-4 py-4 bg-transparent text-slate-900 focus:outline-none text-base resize-none min-h-14 max-h-auto overflow-y-auto custom-scrollbar"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold lg:w-fit w-full transition-all duration-300 self-end md:self-center ${
                          message.trim()
                            ? "bg-[#ffc300] text-[#020b18] hover:bg-[#ffb703] cursor-pointer"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <FaWhatsapp size={20} />
                        <span>{ct.send}</span>
                        <FaArrowRight size={14} className={message.trim() ? "translate-x-1" : ""} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-slate-400 text-[10px] uppercase tracking-widest px-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {ct.responseStatus}
                  </p>
                </div>

                {/* TRUST BADGES */}
                <div className="flex flex-wrap gap-3 mt-10">
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {ct.national}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {ct.fast}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {ct.certified}
                  </span>
                </div>
              </div>

              {/* OUTROS MEIOS DE CONTATO */}
              <div className="flex flex-col md:flex-row gap-6">
                <a
                  href="tel:+553133718600"
                  className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#ffc300] transition-colors">
                    <FaPhoneAlt size={16} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{ct.callAction}</p>
                    <p className="text-slate-900 font-bold text-sm">(31) 3371-8600</p>
                  </div>
                </a>

                <div className="flex flex-col justify-center space-y-2">
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <FaEnvelope className="text-[#ffc300]" />
                    <span>info@protectrastreamento.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <FaMapMarkerAlt className="text-[#ffc300]" />
                    <span>{ct.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <ContactPremium />
      </section>
    </div>
  );
}