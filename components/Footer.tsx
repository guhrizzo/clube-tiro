"use client";

import { 
  FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle 
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copiado para a área de transferência!");
  };

  const isMobile = () =>
    typeof window !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <footer className="bg-[#0a1a2f] text-white/90 mt-24 border-t border-white/10 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* CONTATO */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
            Grupo Protect Loja
          </h4>

          {/* Endereço */}
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

          {/* Telefone */}
          <button
            onClick={() => isMobile() ? window.location.href = "tel:3133718500" : handleCopy("(31) 3371-8500")}
            className="flex cursor-pointer items-center gap-3 text-sm hover:text-[#00b4d8] transition-all group text-left w-full"
          >
            <div className="bg-[#003566] p-2 rounded-full group-hover:bg-[#00b4d8] transition-colors">
              <FaPhoneAlt className="text-white" size={12} />
            </div>
            <span className="font-bold">(31) 3371-8500</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => isMobile()
              ? window.open("https://wa.me/5531992118500?text=Olá%20Grupo%20Protect!%20Gostaria%20de%20mais%20informações%20sobre%20produtos%20e%20treinamentos.", "_blank")
              : handleCopy("(31) 99211-8500")
            }
            className="flex cursor-pointer items-center gap-3 text-sm hover:text-[#25D366] transition-all group text-left w-full"
          >
            <div className="bg-[#25D366] p-2 rounded-full">
              <FaWhatsapp className="text-white" size={14} />
            </div>
            <span className="font-bold">(31) 99211-8500</span>
          </button>

          {/* Emails */}
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

        {/* HORÁRIOS */}
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

        {/* EMAILS */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
            Departamentos
          </h4>
          <div className="space-y-3">
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
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#020b18] py-6 px-6 text-center text-[11px] text-white/40 tracking-widest">
        © {new Date().getFullYear()} GRUPO PROTECT — TODOS OS DIREITOS RESERVADOS.
      </div>

      {/* TOAST PREMIUM */}
      <div className={`fixed bottom-8 right-8 z-[9999] transition-all duration-500 transform ${toast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white text-[#020b18] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 relative overflow-hidden border border-white/10">
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/20">
            <FaCheckCircle className="text-white" size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-[#25D366] block leading-none mb-1">Sucesso</span>
            <p className="text-sm font-bold text-[#020b18]">{toast}</p>
          </div>

          {toast && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-[#25D366]" 
              style={{ animation: 'shrink 3s linear forwards' }} 
            />
          )}
        </div>
      </div>
    </footer>
  );
}
