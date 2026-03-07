"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Scale, 
  ArrowRight 
} from "lucide-react";
import NavBar from "components/NavBar";
import { dictionaries } from "dictionaries";
import { useLang } from "context/LangContext";

export default function RajaPage() {
  const pathname = usePathname();

  const currentLang = useMemo(() => {
    const seg = pathname?.split("/").filter(Boolean)[0];
    return ["pt", "en", "es"].includes(seg as any) ? (seg as "pt" | "en" | "es") : "pt";
  }, [pathname]);

  const t = (dictionaries as any)[currentLang].raja;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <NavBar />
      
      {/* Header com Status */}
      <section className="pt-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          <AlertTriangle size={12} /> {t.badge}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
          {t.title_main} <br />
          <span className="text-gray-500 text-3xl md:text-5xl lg:text-7xl italic font-light"> {t.title_highlight}</span>
        </h1>
      </section>

      {/* Grid de Explicação Legislativa */}
      <section className="max-w-5xl mx-auto mt-20 px-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card: O Motivo Legista */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6 text-[#ffb703]">
              <Scale size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">{t.legal.title}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t.legal.description}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.legal.impact}
            </p>
          </div>

          {/* Card: Impacto na Unidade */}
          <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock size={80} />
            </div>
            
            <div className="flex items-center gap-3 mb-6 text-red-500">
              <Clock size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm text-white">{t.operational.title}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#ffb703] shrink-0" size={18} />
                <p className="text-xs text-gray-300">
                  <span className="font-bold text-white">{t.operational.location_label}</span> {t.operational.location_text}
                </p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1">{t.operational.status_label}</p>
                <p className="text-white text-sm font-medium">
                  {t.operational.status_text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informação sobre horário permitido */}
        <div className="mt-12 text-center border-t border-zinc-800 pt-10">
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">{t.schedule.rule_label}</p>
            <div className="inline-block bg-white text-black px-6 py-3 font-black text-xl italic uppercase skew-x-[-10deg]">
                {t.schedule.hours}
            </div>
            <p className="text-gray-500 text-[10px] mt-6 max-w-2xl mx-auto leading-loose uppercase tracking-widest">
                {t.schedule.notice}
            </p>
        </div>

        {/* Redirecionamento */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">
            {t.redirect.text}{" "}
            <a href={`/${currentLang}/unidades/gutierrez`} className="text-[#ffb703] hover:underline font-bold">
              {t.redirect.link}
            </a>
          </p>
          <a 
            href={`/${currentLang}/unidades/gutierrez`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ffb703] text-black font-bold uppercase text-xs tracking-widest hover:bg-[#e6a502] transition-colors"
          >
            {t.redirect.link} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}