"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, Award, Users, Clock, ThumbsUp, Headset } from "lucide-react";

export default function WhyUs() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const items = [
    {
      title: "Produtos Premium",
      desc: "Trabalhamos com equipamentos selecionados que unem qualidade, segurança e preço justo.",
      icon: ShieldCheck,
    },
    {
      title: "Certificação Reconhecida",
      desc: "Receba certificado válido após a conclusão dos nossos cursos especializados.",
      icon: Award,
    },
    {
      title: "Clientes 100% Satisfeitos",
      desc: "Nossa reputação é construída com base em resultados reais e confiança.",
      icon: ThumbsUp,
    },
    {
      title: "Comunidade Forte",
      desc: "No Grupo Protect você constrói conexões e evolui com outros profissionais.",
      icon: Users,
    },
    {
      title: "Mais de 30 Anos de Experiência",
      desc: "Décadas formando profissionais e entregando excelência no setor.",
      icon: Clock,
    },
    {
      title: "Suporte Humanizado",
      desc: "Atendimento rápido, direto e preparado para te ajudar sempre.",
      icon: Headset,
    },
  ];

  return (
    <section className="relative bg-linear-to-br from-[#020b18] via-[#071a2f] to-[#020b18] py-28 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-100 h-100 bg-[#ffc300]/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-[#ffc300]/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="text-[#ffc300] uppercase tracking-[0.25em] text-xs mb-3">
            Diferencial Grupo Protect
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Por que escolher a Protect?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            Não entregamos apenas produtos e cursos — entregamos segurança, excelência e confiança.
          </p>
        </div>

        <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 
              hover:border-[#ffc300]/40 hover:shadow-[0_0_40px_rgba(255,195,0,0.12)] 
              transition-all duration-500"
            >
              {/* Ícone */}
              <div className="w-14 h-14 rounded-xl bg-[#ffc300]/10 flex items-center justify-center mb-6 
              transition-transform duration-500 
              group-hover:scale-110 group-hover:rotate-6">
                <item.icon className="text-[#ffc300]" size={26} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.desc}
              </p>

              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#ffc300]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
