"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { db } from "lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Loader2, Clock, Search, ChevronRight, FileText, X } from "lucide-react";
import NavBar from "components/NavBar";

import "./calendar.css";

export default function AgendaClient() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialView, setInitialView] = useState("dayGridMonth");
  
  // Estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    // Ajusta visualização inicial baseada no dispositivo
    if (window.innerWidth < 768) {
      setInitialView("listMonth");
    }

    const q = query(collection(db, "agenda"));
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

  // Função para abrir modal ao clicar no evento
  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* CABEÇALHO */}
        <div className="text-center mb-10">
          <span className="text-yellow-600 font-bold uppercase tracking-widest text-[10px] md:text-sm italic">Programação Oficial</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 uppercase italic tracking-tighter">
            Agenda <span className="text-yellow-500">Protect</span>
          </h1>
        </div>

        {/* INFORMATIVO JURÍDICO */}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="bg-slate-900 p-6 rounded-4xl text-white shadow-xl shadow-slate-200 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <Search className="text-yellow-500 mb-0 lg:mb-4 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-base md:text-lg leading-tight uppercase italic">Busca Rápida</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-relaxed">
                  Toque nos pontos ou alterne para lista para ver detalhes.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Clock size={14} className="text-yellow-600" /> Próximos
              </h3>
              <div className="space-y-3">
                {events.slice(0, 3).map(event => (
                  <div 
                    key={event.id} 
                    onClick={() => { setSelectedEvent({ title: event.title, start: new Date(event.start) }); setIsModalOpen(true); }}
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <div className="border-l-2 border-yellow-500 pl-3">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">
                        {new Date(event.start).toLocaleDateString('pt-BR')}
                      </p>
                      <h4 className="font-bold text-slate-800 text-xs leading-tight">{event.title}</h4>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALENDÁRIO */}
          <div className="lg:col-span-3 bg-white p-4 md:p-6 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative order-1 lg:order-2">
            {loading && (
              <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-[2.5rem]">
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
              stickyHeaderDates={true}
              eventClick={handleEventClick}
              eventContent={(arg) => {
                if (arg.view.type === 'dayGridMonth') {
                  return { html: `<div class="calendar-custom-dot"></div>` };
                }
                return true;
              }}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,listMonth",
              }}
              buttonText={{
                month: 'Mês',
                listMonth: 'Lista',
              }}
            />
          </div>
        </div>
      </main>

      {/* MODAL DE DETALHES */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-yellow-500 p-6 text-slate-900">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2 rounded-xl mb-3">
                   <Clock size={20} />
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors cursor-pointer active:scale-95"
                >
                  <X size={16} />
                </button>
              </div>
              <h3 className="text-xl font-black uppercase italic leading-tight">
                {selectedEvent.title}
              </h3>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-slate-600">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Data Confirmada</p>
                  <p className="font-bold text-slate-800">
                    {selectedEvent.start?.toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}