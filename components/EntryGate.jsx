"use client";

import { useState } from "react";

export default function EntryGate({ onEnter }) {
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-[#0a1a2f] to-[#020b18] flex items-center justify-center z-50 px-4">
      <div className="bg-white max-w-162 w-full rounded-2xl shadow-2xl p-10 text-center flex flex-col items-center space-y-8 animate-fade-in">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Grupo Protect"
            className="h-48 object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-5xl flex items-center gap-2 font-bold text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-exclamation-diamond" viewBox="0 0 16 16">
            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          Atenção
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-exclamation-diamond" viewBox="0 0 16 16">
            <path d="M6.95.435c.58-.58 1.52-.580 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </h1>

        {/* Texto */}
        <p className="text-gray-600 leading-relaxed text-sm">
          O <strong>Grupo Protect</strong> atua no ensino no setor de armamento,
          conforme a legislação brasileira. O conteúdo deste site é destinado
          exclusivamente a pessoas legalmente aptas.
        </p>

        <p className="text-gray-500 text-sm">
          Ao continuar, você declara estar de acordo com estes termos.
        </p>

        {/* Botão */}
        <button
          onClick={handleEnter}
          disabled={loading}
          className="w-full bg-[#ffc300ff] text-black/75 font-semibold py-3 rounded-xl transition duration-300 ease-in-out cursor-pointer transform hover:translate-y-[-2.5px] hover:bg-[#f7bd00] shadow-md disabled:cursor-not-allowed disabled:opacity-90 disabled:py-5 flex justify-center items-center gap-2"
        >
          {loading ? <Dots /> : "Entrar no site"}
        </button>

        {/* Rodapé */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Grupo Protect
        </p>
      </div>
    </div>
  );
}

/* Loader bolinhas */
function Dots() {
  return (
    <div className="flex gap-1">
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2.5 h-2.5 bg-black/80 rounded-full animate-bounce" />
    </div>
  );
}
