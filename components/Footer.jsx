import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0a1a2f] text-white/90 mt-24 border-t border-white/10">

            {/* Conteúdo principal */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Coluna 1 — Contato */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Grupo Protect Loja
                    </h4>

                    {/* Endereço clicável → Google Maps */}
                    <a
                        href="https://www.google.com/maps?q=R.+General+Andrade+Neves,+622,+Gutierrez,+Belo+Horizonte,+MG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm leading-relaxed hover:text-[#ffc300ff] transition-colors block"
                    >
                        Rua General Andrade Neves 622 <br />
                        Bairro Gutierrez — Belo Horizonte/MG
                    </a>

                    <p className="text-sm">(31) 3371-8500</p>

                    {/* WhatsApp com ícone */}
                    <a
                        href="https://wa.me/5531992118500?text=Olá%20Grupo%20Protect!%20Gostaria%20de%20mais%20informações%20sobre%20produtos%20e%20treinamentos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-[#25D366] transition-colors"
                    >
                        <FaWhatsapp className="text-green-500" size={16} />
                        (31) 99211-8500
                    </a>

                    <p className="text-sm">loja@grupoprotect.com.br</p>
                    <p className="text-sm">vendas@grupoprotect.com.br</p>
                </div>

                {/* Coluna 2 — Horários */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Horário de Trabalho
                    </h4>
                    <ul className="text-sm space-y-2">
                        <li>Seg–Sex: <span className="text-white">09:00 – 22:00</span></li>
                        <li>Sáb: <span className="text-white">10:00 – 18:00</span></li>
                        <li>Dom: <span className="text-white">Fechado</span></li>
                    </ul>
                </div>

                {/* Coluna 3 — Últimos Produtos */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Últimos Produtos
                    </h4>

                    <div className="space-y-3 text-sm">
                        {[
                            "Espingarda Hatsan semi-automática calibre 12",
                            "Espingarda CBC Pump calibre 12",
                            "Espingarda Boito Pump calibre 12",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-3 items-start group cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-xs text-white/50">
                                    IMG
                                </div>
                                <p className="leading-snug group-hover:text-[#ffc300ff] transition-colors">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="bg-[#020b18] py-4 px-6 text-center text-xs text-white/60">
                © {new Date().getFullYear()} Grupo Protect — Todos os direitos reservados.
            </div>
        </footer>
    );
}
