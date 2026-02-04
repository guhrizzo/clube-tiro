"use client";

import { ArrowRight, Handshake, ShieldCheck, Globe, Cpu } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "../../../../components/NavBar";

const partners = [
    { name: "Jmak", logo: "/partners/jmak.webp" },
    { name: "Install Tracker Store", logo: "/partners/install.webp" },
    { name: "Jimi IoT", logo: "/partners/jimi lot.png.webp" },
    { name: "Teltonika", logo: "/partners/teltonika.webp" },
    { name: "SinoTrack", logo: "/partners/sinotrack.webp" },
    { name: "Globalstar", logo: "/partners/global4.webp" },
    { name: "STG Rastreadores", logo: "/partners/stg.webp" },
    { name: "Suntech", logo: "/partners/sun.png.webp" },

    { name: "Global Position", logo: "/partners/global.png.webp" },
    { name: "Maxtrack", logo: "/partners/max.png.webp" },
    { name: "Positron", logo: "/partners/posi.webp" },
    { name: "Queclink", logo: "/partners/que.png.webp" },
    { name: "BWS", logo: "/partners/cals.png.webp" },
    { name: "Cal/Amp", logo: "/partners/10.png.webp" },
    { name: "XB Tech", logo: "/partners/xb.png.webp" },
    { name: "Coban", logo: "/partners/coban.png.webp" },
    { name: "Concix", logo: "/partners/concix.png.webp" },
];

export default function PartnersPage() {
    useEffect(() => {
        AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
    }, []);

    return (
        <main className="bg-white overflow-hidden">
            <NavBar />

            {/* ================= HERO ================= */}
            <section className="relative py-28 bg-white overflow-hidden">
                <div className="absolute -top-40 -left-40 w-xl h-xl bg-[#ffb703]/10 blur-[160px] rounded-full" />
                <div className="absolute -bottom-40 -right-40 w-xl h-xl bg-[#ffb703]/5 blur-[160px] rounded-full" />

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em]">
                        <Handshake size={14} />
                        Parceiros Estratégicos
                    </div>

                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                        Conectados às melhores{" "}
                        <span className="text-[#ffb703]">tecnologias do mundo</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Trabalhamos com fabricantes e plataformas líderes globais para
                        garantir máxima confiabilidade, performance e segurança em nossas
                        soluções de rastreamento.
                    </p>
                </div>
            </section>

            {/* ================= GRID DE PARCEIROS ================= */}
            <section className="py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {partners.map((partner, i) => (
                            <div
                                key={i}
                                
                              
                                className="group relative rounded-3xl p-[1.5px] bg-linear-to-br from-[#ffb703]/40 via-[#ffb703]/10 to-transparent
  hover:scale-[1.03] transition-all duration-300"
                            >
                                <div
                                    className="relative h-full w-full rounded-[22px] bg-white/90 backdrop-blur-xl
    flex items-center justify-center p-10
    shadow-[0_12px_40px_-15px_rgba(0,0,0,0.25)]
    hover:shadow-[0_18px_55px_-15px_rgba(255,183,3,0.45)]
    transition-all duration-300"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-50 object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>

            {/* ================= BENEFÍCIOS ================= */}
            <section className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12 text-center">
                        {[
                            {
                                icon: <Cpu size={28} />,
                                title: "Tecnologia Certificada",
                                desc: "Integração com dispositivos homologados e plataformas líderes globais.",
                            },
                            {
                                icon: <Globe size={28} />,
                                title: "Cobertura Nacional",
                                desc: "Operação em todo o Brasil com suporte técnico especializado.",
                            },
                            {
                                icon: <ShieldCheck size={28} />,
                                title: "Alta Confiabilidade",
                                desc: "Infraestrutura robusta, segura e preparada para operações críticas.",
                            },
                        ].map((item, i) => (
                            <div key={i} data-aos="fade-up" data-aos-delay={i * 120}>
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#ffb703]/10 text-[#ffb703] flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-28 bg-gray-50 relative overflow-hidden">
                <div className="absolute -right-32 -top-32 w-md h-112 bg-[#ffb703]/10 blur-[140px] rounded-full" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Quer se tornar um parceiro PROTECT?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Faça parte do nosso ecossistema e leve soluções de rastreamento de
                        alto nível para seus clientes.
                    </p>

                    <a
                        href="/fale-conosco"
                        className="inline-flex items-center gap-3 bg-[#ffb703] text-black px-10 py-4 rounded-full font-bold
            hover:gap-4 hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#ffb703]/30"
                    >
                        Seja um parceiro
                        <ArrowRight size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
}
