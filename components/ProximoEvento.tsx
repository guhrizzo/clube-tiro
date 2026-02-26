"use client";

import React, { useState, useEffect } from "react";
import { db } from "lib/firebase";
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { Calendar, Clock, ChevronRight, Loader2, Tag } from "lucide-react";
import Link from "next/link";

export default function ProximosEventos() {
  const [proximos, setProximos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pega a data de hoje no formato ISO para comparar com a string do Firebase
    const hoje = new Date().toISOString().split('T')[0];

    // Consulta: eventos onde a data de início é maior ou igual a hoje
    const q = query(
      collection(db, "agenda"),
      where("start", ">=", hoje),
      orderBy("start", "asc"),
      limit(4) // Mostra apenas os 4 mais próximos
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProximos(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-yellow-500" />
      </div>
    );
  }

  if (proximos.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Sem eventos próximos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
          <Calendar size={14} className="text-yellow-500" /> Próximas Atividades
        </h3>
      </div>

      <div className="grid gap-3">
        {proximos.map((evento) => {
          // Formatação da data para exibição amigável
          const dataEvento = new Date(evento.start);
          const dia = dataEvento.getDate().toString().padStart(2, '0');
          const mes = dataEvento.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
          const hora = evento.allDay ? "Dia Todo" : evento.start.split('T')[1]?.substring(0, 5) || "00:00";

          return (
            <div 
              key={evento.id}
              className="group bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-4 cursor-default"
            >
              {/* Box da Data */}
              <div className="flex flex-col items-center justify-center min-w-13.75 h-13.75 bg-slate-900 rounded-xl text-white">
                <span className="text-lg font-black leading-none">{dia}</span>
                <span className="text-[9px] uppercase font-bold text-yellow-500">{mes}</span>
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                   <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: evento.backgroundColor || '#eab308' }} 
                   />
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 truncate">
                     {evento.category || 'Geral'}
                   </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">
                  {evento.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  
                </div>
              </div>

              
            </div>
          );
        })}
      </div>
    </div>
  );
}