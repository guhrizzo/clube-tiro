"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão apenas quando o usuário rolar 300px para baixo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-60">
      <button
        onClick={scrollToTop}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full shadow-2xl
          bg-[#ffc300ff] text-[#020b18] cursor-pointer
          transition-all duration-300 ease-in-out transform
          hover:scale-110 active:scale-95 hover:bg-[#f7bd00]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        `}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp className="text-xl" />
        
        {/* Efeito de anel pulsante para chamar atenção sutilmente */}
        <span className="absolute inset-0 rounded-full bg-[#ffc300ff] animate-ping opacity-20" />
      </button>
    </div>
  );
}