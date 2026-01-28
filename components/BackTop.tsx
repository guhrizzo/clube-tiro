"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Scroll detection
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Toast detection
  useEffect(() => {
    const handler = (e: any) => setToastVisible(e.detail);
    window.addEventListener("toast-visibility", handler);
    return () => window.removeEventListener("toast-visibility", handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-30">
      <button
        onClick={scrollToTop}
        className={`
          relative flex items-center justify-center w-12 h-12 rounded-full shadow-2xl
          bg-[#ffc300ff] text-[#020b18] cursor-pointer
          transition-all duration-300 ease-in-out transform
          hover:scale-110 active:scale-95 hover:bg-[#f7bd00]
          ${
            isVisible && !toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }
        `}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp className="text-xl relative z-10" />
        <span className="absolute inset-0 rounded-full bg-[#ffc300ff] animate-ping opacity-20" />
      </button>
    </div>
  );
}
