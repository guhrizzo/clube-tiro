"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck, Lock, Info } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* BANNER COMPACTO */}
      {showBanner && !showModal && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-200 animate-in fade-in slide-in-from-right-10 duration-500">
          <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 pr-2 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm border border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-xl text-slate-900 shrink-0">
                <Cookie size={18} />
              </div>
              <p className="text-[12px] leading-tight text-slate-200">
                Usamos cookies para melhorar sua experiência. 
                <button 
                  onClick={() => setShowModal(true)}
                  className="underline ml-1 hover:text-yellow-500 transition-colors cursor-pointer"
                >
                  Saiba mais
                </button>
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={acceptCookies}
                className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-xl text-[11px] font-black uppercase hover:bg-yellow-400 transition-all active:scale-95 cursor-pointer"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL "SAIBA MAIS" */}
      {showModal && (
        <div className="fixed inset-0 z-210 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-32 overflow-hidden shadow-2xl border border-slate-200">
            {/* Header do Modal */}
            <div className="bg-slate-900 p-8 text-white relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
              <div className="bg-yellow-500 w-12 h-12 rounded-2xl flex items-center justify-center text-slate-900 mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-black">Política de Cookies</h3>
              <p className="text-slate-400 text-sm mt-1 text-balance">Sua segurança e privacidade são nossa prioridade.</p>
            </div>

            {/* Conteúdo */}
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="text-yellow-600 shrink-0"><Lock size={20} /></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Segurança da Sessão</h5>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">Utilizamos cookies do Firebase para manter sua conexão segura enquanto você gerencia o painel administrativo.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-yellow-600 shrink-0"><Info size={20} /></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Preferências do Usuário</h5>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">Lembramos suas escolhas de idioma e visualização para que você não precise configurar o site toda vez que voltar.</p>
                </div>
              </div>

              <button 
                onClick={acceptCookies}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-yellow-500 hover:text-slate-900 transition-all active:scale-95 cursor-pointer shadow-lg shadow-slate-200"
              >
                Entendi e Aceito
              </button>
              
              <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                Grupo Protect 
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}