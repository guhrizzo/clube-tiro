"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EntryGate({ onEnter }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-back",
    });
  }, []);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-[#0a1a2f] to-[#020b18] flex items-center justify-center z-50 px-4">
      <div
        data-aos="zoom-in"
        className="bg-white max-w-162 w-full rounded-2xl shadow-2xl p-10 text-center flex flex-col items-center space-y-8"
      >
        {/* Logo */}
        <div data-aos="fade-down">
          <img src="/LOGO1.png" alt="Grupo Protect" className="h-28 object-contain" />
        </div>

        {/* Título */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-5xl flex items-center gap-2 font-bold text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          Atenção
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.95.435c.58-.58 1.52-.580 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </h1>

        {/* Texto */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-600 leading-relaxed text-sm"
        >
          O <strong>Grupo Protect</strong> atua no ensino no setor de armamento,
          conforme a legislação brasileira. O conteúdo deste site é destinado
          exclusivamente a pessoas legalmente aptas.
        </p>

        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-gray-500 text-sm"
        >
          Ao continuar, você declara estar de acordo com estes termos.
        </p>

        {/* Container da Animação de Entrada (AOS) */}
        <div data-aos="zoom-in" data-aos-delay="400" className="w-full">
          {/* Botão focado apenas em interação (Tailwind) */}
          <button
            onClick={handleEnter}
            disabled={loading}
            className="w-full bg-[#ffc300ff] text-black/75 font-bold py-4 rounded-xl 
                       transition-all duration-200 ease-out cursor-pointer
                       hover:scale-[1.03] active:scale-95 
                       hover:bg-[#f7bd00] shadow-lg hover:shadow-xl
                       disabled:cursor-not-allowed disabled:opacity-80 
                       disabled:py-5.5
                       flex justify-center items-center gap-2"
          >
            {loading ? <Dots /> : "Entrar no site"}
          </button>
        </div>

        {/* Rodapé */}
        <p
          data-aos="fade"
          data-aos-delay="500"
          className="text-xs text-gray-400"
        >
          © {new Date().getFullYear()} Grupo Protect
        </p>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <div className="flex gap-1">
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce" />
    </div>
  );
}