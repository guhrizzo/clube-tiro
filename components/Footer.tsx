"use client";

import {
  FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    window.dispatchEvent(new CustomEvent("toast:show"));
    setTimeout(() => {
      setToast("");
      window.dispatchEvent(new CustomEvent("toast:hide"));
    }, 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copiado para a área de transferência!");
  };

  const isMobile = () =>
    typeof window !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <footer className="bg-[#0a1a2f] text-white/90 border-t border-white/10 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* CONTATO */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/20 pb-2">
            Grupo Protect Loja
          </h4>

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

          <button
            onClick={() => isMobile() ? window.location.href = "tel:3133718500" : handleCopy("(31) 3371-8500")}
            className="flex cursor-pointer items-center gap-3 text-sm hover:text-[#00b4d8] transition-all group text-left w-full"
          >
            <div className="bg-[#003566] p-2 rounded-full group-hover:bg-[#00b4d8] transition-colors">
              <FaPhoneAlt className="text-white" size={12} />
            </div>
            <span className="font-bold">(31) 3371-8500</span>
          </button>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/5531992118500?text=Olá%20Grupo%20Protect!%20Gostaria%20de%20mais%20informações%20sobre%20produtos%20e%20treinamentos.",
                "_blank"
              )
            }
            className="flex cursor-pointer items-center gap-3 text-sm hover:text-[#25D366] transition-all group text-left w-full"
          >
            <div className="bg-[#25D366] p-2 rounded-full">
              <FaWhatsapp className="text-white" size={14} />
            </div>
            <span className="font-bold">(31) 99211-8500</span>
          </button>
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

      {/* TOAST */}
      <div className="fixed top-8 right-1/2 translate-x-[50%] z-40 pointer-events-none">
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
          ${toast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
        >
          <div className="bg-white text-[#020b18] px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 relative overflow-hidden border border-[#020b18]/5 pointer-events-auto">
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/20">
              <FaCheckCircle className="text-white" size={20} />
            </div>

            <div className="min-w-37.5">
              <span className="text-[10px] font-black uppercase text-[#25D366] block leading-none mb-1 tracking-wider">
                Sucesso
              </span>
              <p className="text-sm font-bold text-[#020b18]">
                {toast || "Número copiado!"}
              </p>
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1 bg-[#25D366] transition-all
              ${toast ? "w-full animate-[shrink_3s_linear_forwards]" : "w-0"}`}
            />
          </div>
        </div>
      </div>

    </footer>
  );
}
