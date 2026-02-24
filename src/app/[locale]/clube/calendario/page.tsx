"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { db } from "lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Loader2, Clock, Search, ChevronRight } from "lucide-react";
import NavBar from "components/NavBar";

import "./calendar.css";

export default function AgendaClient() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialView, setInitialView] = useState("dayGridMonth");

  useEffect(() => {
    // Detecta se é mobile para mudar a visão inicial
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

  return (
    <div className="min-h-screen bg-slate-50/50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-yellow-600 font-bold uppercase tracking-widest text-[10px] md:text-sm italic">Programação Oficial</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 uppercase italic tracking-tighter">
            Agenda <span className="text-yellow-500">Protect</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Sidebar - Escondida ou ajustada no Mobile */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="bg-slate-900 p-6 rounded-4xl text-white shadow-xl shadow-slate-200 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <Search className="text-yellow-500 mb-0 lg:mb-4 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-base md:text-lg leading-tight uppercase italic">Busca Rápida</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1 leading-relaxed">
                  Toque nos botões para alternar entre calendário e lista.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Clock size={14} className="text-yellow-600" /> Próximos
              </h3>
              <div className="space-y-3">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all cursor-default">
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

          {/* Calendário Principal */}
          <div className="lg:col-span-3 bg-white p-4 md:p-6 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative order-1 lg:order-2">
            {loading && (
              <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-[2.5rem]">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
              </div>
            )}

            <FullCalendar
              key={initialView} // Força re-render ao mudar o device
              plugins={[dayGridPlugin, listPlugin]}
              initialView={initialView}
              locale="pt-br"
              events={events}
              height="auto"
              stickyHeaderDates={true}
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
    </div>
  );
}