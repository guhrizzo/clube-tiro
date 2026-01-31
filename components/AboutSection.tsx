import { ShieldCheck, Target, HeartHandshake } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      title: "Nossa História",
      description:
        "Referência em segurança patrimonial e pública há quase quatro décadas, unindo tecnologia de ponta a um atendimento humanizado.",
      icon: ShieldCheck,
    },
    {
      title: "Missão",
      description:
        "Criar impacto positivo na sociedade, priorizando o bem-estar e a harmonia social acima de ganhos financeiros.",
      icon: Target,
    },
    {
      title: "Investimento Social",
      description:
        "Compromisso real através da ONG Guerreiros do Bem, apoiando pessoas em situação de vulnerabilidade com ações transformadoras.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-[#001d3d] text-sm font-bold tracking-[0.25em] uppercase">
            Sobre o Grupo Protect
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            Transformando clientes em{" "}
            <span className="text-[#ffb703]">verdadeiros amigos</span>
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nossa trajetória é marcada pela busca contínua pelas melhores
            tecnologias e por um propósito que vai além da segurança.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item, index) => (
            <div
              key={index}
              className="group cursor-text relative p-8 rounded-3xl border border-gray-100 bg-white 
              shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[#ffb703]/40"
            >
              <div
                className="mb-5 w-12 h-12 rounded-xl bg-[#ffb703]/10 flex items-center justify-center
                transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 border border-[#ffb703]/20"
              >
                <item.icon className="w-6 h-6 text-[#ffb703] " />
              </div>

              <h4 className="text-[#001d3d] font-bold text-xl mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
