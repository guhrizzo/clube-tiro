"use client";

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className={`mb-3 overflow-hidden rounded-xl border transition-all cursor-pointer duration-300 ${isOpen ? 'border-yellow-500 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white'}`}>
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between p-5 text-left transition-colors cursor-pointer"
    >
      <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
        {question}
      </span>
      <div className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-yellow-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
        <ChevronDown size={16} strokeWidth={3} />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white"
        >
          <div className="px-5 pb-5 text-sm leading-relaxed text-slate-500 border-t border-slate-100 pt-4">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const lang = useLang();
  const t = dictionaries[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleWhatsAppClick = () => {
    const phone = "553133718600";
    const message = encodeURIComponent(t.footer.button === "Talk to a Specialist" 
      ? "Hello! I would like to speak with a specialist about Protect Group's tracking solutions." 
      : "Olá! Gostaria de falar com um especialista sobre as soluções de rastreamento do Grupo Protect.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-slate-50 py-20 px-4 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-700 mb-4">
            {t.badge}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {t.title_main} <span className="text-yellow-500">{t.title_highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            {t.description}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {t.questions.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-8 md:p-12 shadow-sm text-center">
            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-yellow-200 rounded-2xl bg-yellow-50 text-yellow-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">{t.footer.title}</h3>
              <p className="mx-auto mb-8 max-w-md text-slate-500">{t.footer.desc}</p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto rounded-xl bg-yellow-500 px-8 py-4 font-bold text-slate-900 cursor-pointer transition-all hover:bg-yellow-400 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.131c1.53.911 3.243 1.391 4.993 1.392h.005c5.344 0 9.691-4.347 9.693-9.693 0-2.592-1.009-5.028-2.841-6.861-1.832-1.832-4.269-2.841-6.861-2.841-5.346 0-9.693 4.347-9.695 9.693-.001 1.868.531 3.692 1.538 5.258l-1.018 3.719 3.805-.998z" />
                </svg>
                {t.footer.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}