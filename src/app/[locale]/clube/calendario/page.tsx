"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { db } from "lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Loader2, Clock, Search, ChevronRight, FileText, X, Tag, AlignLeft } from "lucide-react";
import NavBar from "components/NavBar";
import ProximosEventos from "components/ProximoEvento";
import "./calendar.css";

const categoriasLegenda = [
  { label: "Provas", bg: "bg-amber-400" },
  { label: "Cursos", bg: "bg-red-500" },
  { label: "Testes", bg: "bg-blue-500" },
  { label: "Eventos", bg: "bg-green-500" },
];

export default function AgendaClient() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialView, setInitialView] = useState("dayGridMonth");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    if (window.innerWidth < 768) setInitialView("listMonth");

    const q = query(collection(db, "agenda"), orderBy("start", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEventClick = (info: any) => {
    const data = info.event.extendedProps;
    setSelectedEvent({
      title: info.event.title,
      start: info.event.start,
      description: data.description,
      category: data.category,
      color: info.event.backgroundColor
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center mb-10">
          <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs italic">Programação Oficial</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 uppercase italic tracking-tighter">
            Agenda <span className="text-yellow-500">Protect</span>
          </h1>
        </div>

        {/* INFORMATIVO JURÍDICO - SEM ALTERAÇÕES */}
        <div className="mb-10 bg-white p-6 md:p-8 rounded-4xl border-l-4 border-yellow-500 shadow-sm border ">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-yellow-600" />
            <h2 className="text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Conformidade Regulatória (Portaria nº 150 - COLOG)
            </h2>
          </div>
          <p className="text-slate-600 text-[11px] md:text-[13px] leading-relaxed text-justify">
            O <strong>Project Clube Mineiro de Tiro e Caça</strong>, inscrito no CNPJ sob o n° 01.244.200/0001-52 e Certificado de Registro nº 63079, com sede matriz na Rua General Andrade Neve nº 622, bairro Gutierrez, Belo Horizonte - MG e filial unidade campestre inscrito no CNPJ sob o número 01.244.200/0002-33 e Certificado de Registro nº 36071, localizada à Rua Radialista n° 38, bairro Balneário Água Limpa, cidade de Novo Lima - MG, e sua filial inscrito no CNPJ sob o n° 01.244.200/0003-14 e Certificado de Registro nº 494133 localizado á Rua General Andrade Neve nº 622, bairro Gutierrez, Belo Horizonte - MG, informamos para fins de comprovação junto ao Comando da 4ª Região Militar do Exército Brasileiro e seus Setores de Fiscalização de Produtos controlados SFPC/4, e em atendimento da Portaria nº 150 - COLOG de 05 de dezembro de 2019 seu calendário de competições oficiais para o ano de 2026 conforme previsto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR COM LEGENDA */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Tag size={14} className="text-yellow-600" /> Legenda
              </h3>
              <div className="space-y-3">
                {categoriasLegenda.map((cat) => (
                  <div key={cat.label} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-md ${cat.bg} opacity-50`} />
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="space-y-6">
  <ProximosEventos />
  {/* Outros widgets da sidebar */}
</aside>
            <div className="bg-slate-900 p-6 rounded-4xl text-white">
               <p className="text-[10px] font-bold text-yellow-500 uppercase mb-2 italic">Aviso</p>
               <p className="text-xs text-slate-400">Clique no dia colorido para ver detalhes do evento ou curso.</p>
            </div>
          </div>

          {/* CALENDÁRIO */}
          <div className="lg:col-span-3 bg-white p-4 md:p-6 rounded-[2.5rem] border border-slate-100 shadow-2xl relative order-1 lg:order-2">
            {loading && (
              <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center rounded-[2.5rem]">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
              </div>
            )}

            <FullCalendar
              key={initialView}
              plugins={[dayGridPlugin, listPlugin]}
              initialView={initialView}
              locale="pt-br"
              events={events}
              height="auto"
              eventClick={handleEventClick}
              eventContent={(arg) => {
                if (arg.view.type === 'dayGridMonth') {
                  return { html: `<div class="calendar-custom-bg" style="background-color: ${arg.event.backgroundColor}"></div>` };
                }
                return true;
              }}
              eventDidMount={(info) => {
                if (info.view.type === 'dayGridMonth') {
                  const dayEl = info.el.closest('.fc-daygrid-day');
                  if (dayEl) dayEl.classList.add('has-event');
                }
              }}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,listMonth",
              }}
              buttonText={{ month: 'Mês', listMonth: 'Lista' }}
            />
          </div>
        </div>
      </main>

      {/* MODAL */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div style={{ backgroundColor: selectedEvent.color }} className="p-8 text-white relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 bg-black/10 p-2 rounded-full cursor-pointer"><X size={16} /></button>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{selectedEvent.title}</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Clock size={18} className="text-slate-600" /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">Data</p>
                  <p className="font-bold text-slate-800">{selectedEvent.start?.toLocaleDateString('pt-BR', { dateStyle: 'long' })}</p>
                </div>
              </div>
              {selectedEvent.description && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 text-sm italic leading-relaxed">{selectedEvent.description}</p>
                </div>
              )}
              <button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase text-[10px] cursor-pointer">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}