import { ArrowRight, MapPin, Zap, ShieldCheck } from "lucide-react";

export default function AboutAppSection() {
  return (
    <section className="relative w-full pt-28 bg-white overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* HEADER */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-3 text-[#ffb703] font-semibold text-xs tracking-[0.25em] uppercase">
            <div className="w-10 h-px bg-[#ffb703]" />
            Tecnologia de Monitoramento
            <div className="w-10 h-px bg-[#ffb703]" />
          </div>

          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
            Controle total com o aplicativo{" "}
            <span className="text-[#ffb703]">PROTECT</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            O <strong>PROTECT</strong> é uma plataforma avançada de rastreamento em
            tempo real para veículos, pessoas, animais e ativos. Desenvolvido
            para operações de pequeno a grande porte, oferece controle absoluto,
            segurança reforçada e uma experiência simples e intuitiva.
          </p>
        </div>

        {/* BENEFÍCIOS */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <MapPin size={18} />,
              text: "Localização precisa em tempo real com histórico completo.",
            },
            {
              icon: <Zap size={18} />,
              text: "Atualizações instantâneas com alta performance.",
            },
            {
              icon: <ShieldCheck size={18} />,
              text: "Geocercas, alertas inteligentes e máxima segurança.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 bg-gray-50
                         hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ffb703]/10 text-[#ffb703] flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-sm text-gray-700 font-medium text-center leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button className="group cursor-pointer bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold flex items-center gap-3
            hover:brightness-110 hover:gap-4 transition-all duration-300 shadow-xl shadow-[#ffb703]/30">
            Conhecer funcionalidades
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
