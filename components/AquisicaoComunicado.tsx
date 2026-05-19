"use client";

import {
  AlertTriangle, FileText, ShieldCheck, GraduationCap,
  Briefcase, Banknote, UserCheck, Camera, Info, Shield,
} from "lucide-react";
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

const ICONS = [UserCheck, FileText, ShieldCheck, Briefcase, GraduationCap, Banknote, FileText, Camera];

export default function AquisicaoComunicado() {
  const lang = useLang();
  const t = dictionaries[lang].comunicado;

  // Interpola {sinarm} e {law} com spans estilizados
  const introNodes = t.intro
    .split(/(\{sinarm\}|\{law\})/)
    .map((part, i) => {
      if (part === "{sinarm}") return <strong key={i} className="text-gray-900">{t.intro_sinarm}</strong>;
      if (part === "{law}")    return <strong key={i} className="text-gray-900">{t.intro_law}</strong>;
      return part;
    });

  const footerNodes = t.footer
    .split(/(\{group\})/)
    .map((part, i) =>
      part === "{group}"
        ? <span key={i} className="text-yellow-500">{t.group_name}</span>
        : part
    );

  return (
    <section className="py-12 bg-[#f7f7f7]">
      <div className="container mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden max-w-8xl mx-auto">

          {/* Header */}
          <div className="bg-gray-900 px-8 py-7 flex items-center gap-4">
            <div className="bg-yellow-500 rounded-xl p-3 flex-shrink-0">
              <AlertTriangle size={22} className="text-gray-900" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-yellow-500">
                {t.badge}
              </p>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {t.title}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              {introNodes}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {t.requisitos.map((req, idx) => {
                const Icon = ICONS[idx] ?? FileText;
                return (
                  <div
                    key={req.titulo}
                    className="flex gap-3 items-start bg-gray-50 border border-gray-200 rounded-xl p-4"
                  >
                    <Icon size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-900 mb-0.5">
                        {req.titulo}
                      </p>
                      <p className="text-[13px] text-gray-600 leading-snug">
                        {req.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CAC */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 items-start">
              <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-yellow-900 leading-relaxed">
                <strong>{t.cac_title}</strong>{" "}{t.cac_desc}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 border-t border-gray-200 px-8 py-4 flex items-center gap-2">
            <Shield size={16} className="text-gray-400 flex-shrink-0" />
            <p className="text-[13px] text-gray-500 font-semibold">
              {footerNodes}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}