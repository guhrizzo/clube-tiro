"use client";

import Image from "next/image";
import NavBar from "../../../../components/NavBar";
import StatsAndCompatibility from "../../../../components/Support";
import ContactPremium from "../../../../components/Contact";

const clients = [
    { name: "Taurus", logo: "/logos/Taurus-Logo.jpg" },
    { name: "CBC", logo: "/logos/logo-CBC.jpg" },
    { name: "Glock", logo: "/logos/lock-logor.jpg" },
    { name: "Tambasa", logo: "/logos/tambasa-logo.png" },
    { name: "Mercedes-Benz", logo: "/logos/Mercedes-Benz-logo.png" },
    { name: "Shell", logo: "/logos/shell-logo-5.png" },
    { name: "Souza Cruz", logo: "/logos/logo_souza_cruz.jpg" },
    { name: "Cervejaria Ambev", logo: "/logos/logo-ambev.png" },
    { name: "Supermercados BH", logo: "/logos/supermercados-bh-logo.png" },
    { name: "ANTT", logo: "/logos/antt.jpg" },
    { name: "Monitrip", logo: "/logos/monitrip(2).png" },
    { name: "Amobitec", logo: "/logos/amobitec.png" },
];

export default function ClientsPage() {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <NavBar />
            

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4 border border-yellow-300">
                        Clientes
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Empresas que confiam no nosso <span className="text-yellow-500">
                            trabalho  </span>
                    </h2>
                    <p className="mt-4 text-slate-500 text-lg">
                        Marcas líderes em seus segmentos que utilizam nossas soluções todos os dias.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {clients.map((client, i) => (
                        <div
                            key={i}
                            className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out 
              flex items-center justify-center p-10"
                        >
                            {/* Highlight amarelo no hover */}
                            <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-yellow-400/40 transition" />

                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={160}
                                height={160}
                                className="object-contain max-h-24 grayscale group-hover:grayscale-0 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <StatsAndCompatibility />
            <ContactPremium />
        </section>
    );
}
