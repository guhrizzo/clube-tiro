"use client";

import { useState } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface WhatsAppInputProps {
  phoneNumber: string; // Ex: "553133718600"
  placeholder?: string;
}

export default function WhatsAppInput({ 
  phoneNumber, 
  placeholder = "Como podemos ajudar hoje?" 
}: WhatsAppInputProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Codifica a mensagem para o formato de URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abre em uma nova aba
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full max-w-2xl mt-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-[#ffc300] to-[#ffb703] rounded-2xl blur-sm opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={placeholder}
            className="flex-1 px-6 py-4 bg-transparent text-slate-900 dark:text-white focus:outline-hidden text-base"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`
              flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300
              ${message.trim() 
                ? "bg-[#ffc300] text-[#020b18] hover:bg-[#ffb703] cursor-pointer shadow-lg shadow-[#ffc300]/20" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"}
            `}
          >
            <FaWhatsapp size={20} />
            <span>Enviar via WhatsApp</span>
            <FaArrowRight size={14} className={message.trim() ? "translate-x-1 transition-transform" : ""} />
          </button>
        </div>
      </motion.div>
      <p className="mt-3 text-slate-400 text-xs px-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Especialistas online agora
      </p>
    </div>
  );
}