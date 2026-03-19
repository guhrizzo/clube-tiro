"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircle, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";

// FIREBASE
import { db } from "lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ---------------- EMAILS POR DEPARTAMENTO ---------------- */
const EMAILS = [
  { dept: "Administrativo", address: "Adm@grupoprotect.com.br", color: "#ffb703" },
  { dept: "Clube",          address: "clube@grupoprotect.com.br", color: "#3b82f6" },
  { dept: "Vendas",         address: "vendas@grupoprotect.com.br", color: "#10b981" },
  { dept: "Despachante",    address: "despachante@grupoprotect.com.br", color: "#f43f5e" },
];

/* ---------------- DICTIONARY ---------------- */
const dictionaries = {
  pt: {
    badge: "Contato",
    title: "Fale com a gente",
    subtitle: "Escolha o canal ideal para você.",
    phone: "Central de atendimento:",
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
    error: "Ocorreu um erro. Por favor, tente pelo WhatsApp.",
    copyTip: "Copiar",
    copied: "Copiado!",
    emailsTitle: "E-mails por departamento",
  },
  en: {
    badge: "Contact",
    title: "Get in touch",
    subtitle: "Choose the best channel for you.",
    phone: "Customer Service:",
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
    error: "An error occurred. Please try via WhatsApp.",
    copyTip: "Copy",
    copied: "Copied!",
    emailsTitle: "Emails by department",
  },
  es: {
    badge: "Contacto",
    title: "Contáctanos",
    subtitle: "Elige el canal ideal para ti.",
    phone: "Centro de atención:",
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
    success: "¡Presupuesto enviado con éxito!",
    error: "Ocurrió un error. Por favor, intente por WhatsApp.",
    copyTip: "Copiar",
    copied: "¡Copiado!",
    emailsTitle: "Correos por departamento",
  },
};

type Lang = "pt" | "en" | "es";

/* ---------------- EMAIL CARD COMPONENT ---------------- */
function EmailCard({ dept, address, color }: { dept: string; address: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Dot */}
      <div
        className="shrink-0 w-2 h-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
      />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>
          {dept}
        </p>
        <a
          href={`mailto:${address}`}
          className="text-sm font-semibold text-slate-800 hover:text-slate-600 transition-colors truncate block"
        >
          {address}
        </a>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
        title="Copiar"
      >
        {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
      </button>
    </motion.div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function ContactPremium() {
  const pathname = usePathname();

  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return ["pt", "en", "es"].includes(seg) ? (seg as Lang) : "pt";
  }, [pathname]);

  const t = dictionaries[currentLang];

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    plano: t.planIndividual,
    mensagem: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, plano: t.planIndividual }));
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
        lang: currentLang,
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

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#ffb703]/25 focus:border-[#ffb703] placeholder:text-slate-400";

  return (
    <section className="py-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#ffb703]/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-blue-500/4 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0">

            {/* ─── LADO ESQUERDO ─── */}
            <div className="p-8 md:p-12 lg:p-14 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-100">

              {/* Badge + Título */}
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffb703]/12 text-[#ffb703] border border-yellow-400/25 text-[10px] font-black uppercase tracking-[0.3em] mb-5">
                  {t.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
                  {t.title}
                </h2>
                <p className="text-slate-400 text-sm">{t.subtitle}</p>
              </div>

              {/* Telefone */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-[#ffb703] flex items-center justify-center shrink-0 shadow-sm">
                  <Phone size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                    {t.phone}
                  </p>
                  <a
                    href="tel:+553133718600"
                    className="text-slate-900 font-bold text-sm hover:text-[#ffb703] transition-colors"
                  >
                    +55 (31) 3371-8600
                  </a>
                </div>
              </div>

              {/* Ícones de ação rápida */}
              <div className="flex gap-3">
                {[
                  { icon: <Phone size={18} />, href: "tel:+553133718600", label: "Ligar" },
                  { icon: <MessageCircle size={18} />, href: "https://wa.me/553133718600", label: "WhatsApp" },
                  { icon: <Mail size={18} />, href: `mailto:${EMAILS[0].address}`, label: "E-mail" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    title={item.label}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 flex-1 py-3 rounded-2xl border border-slate-200 bg-white text-slate-500 hover:border-[#ffb703] hover:text-[#ffb703] hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {item.icon}
                    <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* ─── EMAILS POR DEPARTAMENTO ─── */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                  {t.emailsTitle}
                </p>
                <div className="space-y-2.5">
                  {EMAILS.map((e) => (
                    <EmailCard key={e.address} {...e} />
                  ))}
                </div>
              </div>

              {/* Mapa */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.050519342749!2d-43.9855512!3d-19.921272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6971279169a21%3A0x6b403932782e4e7e!2sProtect%20Rastreamento!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  className="w-full h-44"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* ─── FORMULÁRIO ─── */}
            <div className="p-8 md:p-12 lg:p-14">
              <div className="mb-8">
                <div className="w-full text-center px-4 py-3 rounded-xl bg-[#ffb703] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                  {t.formHeader}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 ml-1 uppercase tracking-wider">
                      {t.labelName}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder={t.placeholderName}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 ml-1 uppercase tracking-wider">
                      {t.labelEmail}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.placeholderEmail}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 ml-1 uppercase tracking-wider">
                    {t.labelPhone}
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder={t.placeholderPhone}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-600 ml-1 uppercase tracking-wider">
                    {t.labelPlan}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {[t.planIndividual, t.planBusiness].map((opt) => (
                      <label
                        key={opt}
                        className={`flex flex-1 items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-xs font-bold ${
                          formData.plano === opt
                            ? "border-[#ffb703] bg-[#ffb703]/5 text-slate-900"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plano"
                          checked={formData.plano === opt}
                          onChange={() => setFormData({ ...formData, plano: opt })}
                          className="accent-[#ffb703] w-4 h-4"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 ml-1 uppercase tracking-wider">
                    {t.labelMessage}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder={t.placeholderMessage}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full mt-2 py-4 rounded-xl bg-[#ffb703] text-black font-black text-sm uppercase tracking-widest shadow-lg hover:bg-[#e6a502] hover:shadow-[#ffb703]/30 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSending ? <Loader2 className="animate-spin" size={18} /> : t.btnSend}
                  </span>
                </button>

                <AnimatePresence>
                  {sentStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 py-3 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 size={16} /> {t.success}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}