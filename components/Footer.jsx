import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#0a1a2f] text-white/90 mt-24 border-t border-white/10">

            {/* Conteúdo principal */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Coluna 1 — Contato */}
                <div className="space-y-5">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Grupo Protect Loja
                    </h4>

                    {/* Endereço clicável → Google Maps */}
                    <a
                        href="https://maps.google.com/?q=Rua+General+Andrade+Neves+622+Gutierrez+Belo+Horizonte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-sm leading-relaxed hover:text-[#ffc300ff] transition-colors group"
                    >
                        <FaMapMarkerAlt className="text-[#ffc300ff] mt-1 shrink-0" size={16} />
                        <span>
                            Rua General Andrade Neves 622 <br />
                            Bairro Gutierrez — Belo Horizonte/MG
                        </span>
                    </a>

                    {/* Telefone Fixo com ícone Azul */}
                    <a
                        href="tel:3133718500"
                        className="flex items-center gap-3 text-sm hover:text-[#00b4d8] transition-colors group"
                    >
                        <div className="bg-[#003566] p-2 rounded-full group-hover:bg-[#00b4d8] transition-colors">
                            <FaPhoneAlt className="text-white" size={12} />
                        </div>
                        <span className="font-bold">(31) 3371-8500</span>
                    </a>

                    {/* WhatsApp com ícone */}
                    <a
                        href="https://wa.me/5531992118500?text=Olá%20Grupo%20Protect!%20Gostaria%20de%20mais%20informações%20sobre%20produtos%20e%20treinamentos."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm hover:text-[#25D366] transition-colors group"
                    >
                        <div className="bg-[#25D366] p-2 rounded-full">
                            <FaWhatsapp className="text-white" size={14} />
                        </div>
                        <span className="font-bold">(31) 99211-8500</span>
                    </a>

                    {/* E-mails */}
                    <div className="space-y-2 pt-2">
                        <a href="mailto:loja@grupoprotect.com.br" className="flex items-center gap-3 text-sm hover:text-[#ffc300ff] transition-colors">
                            <FaEnvelope className="text-white/40" size={14} />
                            loja@grupoprotect.com.br
                        </a>
                        <a href="mailto:vendas@grupoprotect.com.br" className="flex items-center gap-3 text-sm hover:text-[#ffc300ff] transition-colors">
                            <FaEnvelope className="text-white/40" size={14} />
                            vendas@grupoprotect.com.br
                        </a>
                    </div>
                </div>

                {/* Coluna 2 — Horários */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Horário de Trabalho
                    </h4>
                    <ul className="text-sm space-y-3">
                        <li className="flex justify-between border-b border-white/5 pb-1">
                            <span>Seg–Sex:</span> 
                            <span className="text-white font-medium">09:00 – 22:00</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-1">
                            <span>Sáb:</span> 
                            <span className="text-white font-medium">10:00 – 18:00</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Dom:</span> 
                            <span className="text-[#ff4d4d] font-medium">Fechado</span>
                        </li>
                    </ul>
                </div>

                {/* Coluna 3 — Últimos Produtos */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
                        Últimos Produtos
                    </h4>

                    <div className="space-y-4 text-sm">
                        {[
                            "Espingarda Hatsan semi-automática calibre 12",
                            "Espingarda CBC Pump calibre 12",
                            "Espingarda Boito Pump calibre 12",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-3 items-center group cursor-pointer border-b border-white/5 pb-2 last:border-0"
                            >
                                <div className="w-12 h-10 rounded bg-white/5 flex items-center justify-center text-[10px] text-white/30 border border-white/10 group-hover:border-[#ffc300ff] transition-colors">
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
            <div className="bg-[#020b18] py-6 px-6 text-center text-[11px] text-white/40 tracking-widest">
                © {new Date().getFullYear()} GRUPO PROTECT — TODOS OS DIREITOS RESERVADOS.
            </div>
        </footer>
    );
}