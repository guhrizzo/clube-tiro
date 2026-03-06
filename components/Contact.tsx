"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";

// FIREBASE
import { db } from "lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ---------------- DICTIONARY ---------------- */
const dictionaries = {
  pt: {
    badge: "Contato",
    title: "Faça uma cotação",
    service: "Central de atendimento:",
    email: "Email:",
    formHeader: "Preencha para iniciarmos",
    labelName: "Nome",
    labelEmail: "E-mail",
    labelPhone: "Telefone",
    labelPlan: "Tipo de Plano",
    labelMessage: "Deixe aqui sua mensagem",
    placeholderName: "Seu nome",
    placeholderEmail: "exemplo@email.com",
    placeholderPhone: "(31) 99999-9999",
    placeholderMessage: "Sua mensagem...",
    planIndividual: "Pessoa física",
    planBusiness: "Pessoa jurídica",
    btnSend: "ENVIAR AGORA",
    success: "Cotação enviada com sucesso!",
    error: "Ocorreu um erro. Por favor, tente pelo WhatsApp."
  },
  en: {
    badge: "Contact",
    title: "Request a Quote",
    service: "Customer Service:",
    email: "Email:",
    formHeader: "Fill in to get started",
    labelName: "Name",
    labelEmail: "E-mail",
    labelPhone: "Phone",
    labelPlan: "Plan Type",
    labelMessage: "Leave your message here",
    placeholderName: "Your name",
    placeholderEmail: "example@email.com",
    placeholderPhone: "+1 (000) 000-0000",
    placeholderMessage: "Your message...",
    planIndividual: "Individual",
    planBusiness: "Business",
    btnSend: "SEND NOW",
    success: "Quote sent successfully!",
    error: "An error occurred. Please try via WhatsApp."
  },
  es: {
    badge: "Contacto",
    title: "Solicite um presupuesto",
    service: "Centro de atención:",
    email: "Correo electrónico:",
    formHeader: "Complete para comenzar",
    labelName: "Nombre",
    labelEmail: "E-mail",
    labelPhone: "Teléfono",
    labelPlan: "Tipo de Plan",
    labelMessage: "Deje su mensaje aquí",
    placeholderName: "Su nombre",
    placeholderEmail: "ejemplo@email.com",
    placeholderPhone: "+34 000 000 000",
    placeholderMessage: "Su mensaje...",
    planIndividual: "Persona física",
    planBusiness: "Persona jurídica",
    btnSend: "ENVIAR AHORA",
    success: "¡Presupuesto enviado com éxito!",
    error: "Ocurrió un error. Por favor, intente por WhatsApp."
  }
};

type Lang = "pt" | "en" | "es";

export default function ContactPremium() {
  const pathname = usePathname();
  
  // Detectar idioma atual
  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return ["pt", "en", "es"].includes(seg) ? (seg as Lang) : "pt";
  }, [pathname]);

  const t = dictionaries[currentLang];

  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    plano: t.planIndividual, // Inicializa com a tradução correta
    mensagem: ""
  });

  // Atualiza o valor do plano se o idioma mudar enquanto a página está aberta
  useEffect(() => {
    setFormData(prev => ({ ...prev, plano: t.planIndividual }));
  }, [currentLang, t.planIndividual]);

  const [isSending, setIsSending] = useState(false);
  const [sentStatus, setSentStatus] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    try {
      await addDoc(collection(db, "comments"), {
        userName: formData.nome,
        userEmail: formData.email,
        userPhone: formData.telefone,
        planType: formData.plano,
        text: formData.mensagem,
        createdAt: serverTimestamp(),
        targetId: "Cotação Premium",
        status: "novo",
        lang: currentLang // Opcional: salva o idioma de origem no banco
      });

      setSentStatus(true);
      setFormData({ nome: "", email: "", telefone: "", plano: t.planIndividual, mensagem: "" });
      
      setTimeout(() => setSentStatus(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar cotação:", error);
      alert(t.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white rounded-4xl md:rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 p-6 md:p-12 lg:p-16">
            
            {/* LADO ESQUERDO (INFO) */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffb703]/15 text-[#ffb703] border border-yellow-400/30 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {t.badge}
              </div>

              <h2 className="text-2xl md:text-4xl xl:text-5xl font-black text-slate-900 leading-tight">
                {t.title}
              </h2>

              <div className="space-y-4 text-slate-600 text-sm md:text-base">
                <p>
                  <span className="font-bold text-slate-800 block md:inline">{t.service}</span>{" "}
                  +55 (31) 3371-8600
                </p>
                <p>
                  <span className="font-bold text-slate-800 block md:inline">{t.email}</span>{" "}
                  <span className="break-all">info@protectrastreamento.com</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[ 
                  { icon: <Phone size={20} />, href: "tel:+553133718600" },
                  { icon: <Mail size={20} />, href: "mailto:info@protectrastreamento.com" },
                  { icon: <MessageCircle size={20} />, href: "https://wa.me/553133718600" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex-1 md:flex-none h-14 w-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center
                    shadow-sm hover:shadow-lg hover:border-[#ffb703] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="text-[#ffb703]">{item.icon}</span>
                  </a>
                ))}
              </div>

              <div className="relative rounded-2xl md:rounded-4xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.050519342749!2d-43.9855512!3d-19.921272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6971279169a21%3A0x6b403932782e4e7e!2sProtect%20Rastreamento!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  className="w-full h-48 md:h-64"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="relative bg-slate-50/50 md:bg-white rounded-4xl md:rounded-[2.5rem] border border-slate-100 shadow-sm md:shadow-xl p-6 md:p-10">
              <div className="relative z-10 space-y-6">
                <div className="w-full text-center px-4 py-3 rounded-xl bg-[#ffb703] text-black text-[10px] md:text-xs font-extrabold uppercase tracking-widest shadow-sm">
                  {t.formHeader}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 ml-1">{t.labelName}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        placeholder={t.placeholderName} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#ffb703]/20 focus:border-[#ffb703]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 ml-1">{t.labelEmail}</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={t.placeholderEmail} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#ffb703]/20 focus:border-[#ffb703]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1">{t.labelPhone}</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder={t.placeholderPhone} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#ffb703]/20 focus:border-[#ffb703]" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1">{t.labelPlan}</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {[t.planIndividual, t.planBusiness].map((opt) => (
                        <label key={opt} className={`flex flex-1 items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-xs font-bold ${formData.plano === opt ? "border-[#ffb703] bg-[#ffb703]/5 text-slate-900" : "border-slate-200 bg-white text-slate-600"}`}>
                          <input 
                            type="radio" 
                            name="plano" 
                            checked={formData.plano === opt}
                            onChange={() => setFormData({...formData, plano: opt})}
                            className="accent-[#ffb703] w-4 h-4" 
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1">{t.labelMessage}</label>
                    <textarea 
                      required
                      rows={3} 
                      value={formData.mensagem}
                      onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                      placeholder={t.placeholderMessage} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#ffb703]/20 focus:border-[#ffb703] resize-none" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="group w-full mt-2 relative overflow-hidden bg-[#ffb703] text-black py-4 rounded-xl font-black shadow-lg hover:bg-[#ffb703]/90 hover:shadow-[#ffb703]/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center cursor-pointer justify-center gap-2">
                      {isSending ? <Loader2 className="animate-spin" size={20} /> : t.btnSend}
                    </span>
                  </button>

                  <AnimatePresence>
                    {sentStatus && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm mt-4 bg-emerald-50 py-3 rounded-xl border border-emerald-100"
                      >
                        <CheckCircle2 size={18} /> {t.success}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}