"use client";

import { useEffect, useRef, useMemo } from "react";
import { useInView, animate } from "framer-motion";
import { useLang } from "../context/LangContext";
import { dictionaries } from "../dictionaries";

function Counter({ value, divisor, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const node = ref.current;
      const controls = animate(0, value / divisor, {
        duration: 1.5, // Aumentei um pouco para ficar mais fluido
        ease: "easeOut",
        onUpdate: (latest) => {
          if (node) {
            node.textContent = Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, divisor, suffix]);

  return <span ref={ref} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter" />;
}

export default function StatsSection() {
  const lang = useLang();
  const t = dictionaries[lang].tracking.stats_section;

  // Combinamos os dados fixos com os labels traduzidos
  const statsData = useMemo(() => [
    { value: 300000, suffix: "k", divisor: 1000, label: t.labels[0] },
    { value: 1400, suffix: "", divisor: 1, label: t.labels[1] },
    { value: 80, suffix: "", divisor: 1, label: t.labels[2] },
    { value: 2000, suffix: "", divisor: 1, label: t.labels[3] },
    { value: 33, suffix: "", divisor: 1, label: t.labels[4] },
  ], [t.labels]);

  return (
    <section className="py-24 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* TEXTO DE APOIO */}
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-1.5 bg-[#ffb703] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              {t.title}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* GRID DE NÚMEROS */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-4">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className="relative group flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="flex items-baseline gap-1 text-[#ffb703]">
                  <span className="text-2xl font-bold">+</span>
                  <Counter value={stat.value} divisor={stat.divisor} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-xs md:text-[13px] font-semibold text-slate-400 leading-tight uppercase tracking-wider">
                  {stat.label}
                </p>
                
                {/* Divisor Visual apenas para Desktop (opcional: adicione borda se quiser) */}
                {index !== statsData.length - 1 && (
                  <div className="hidden xl:block absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}