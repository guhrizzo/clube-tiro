"use client";

import Navbar from "components/NavBar";
import { MapPin, Clock, Phone, Navigation, ExternalLink, Shield, Target, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function UnidadeBHPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 " />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-[#ffb703]" />
              <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em]">Nossa Unidade</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black uppercase italic mb-6 leading-none">
              BH <span className="text-[#ffb703]">•</span> Gutierrez/Grajaú
            </h1>
            
            <p className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed">
              Rua General Andrade Neves, 622 — Belo Horizonte/MG
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#fafafa] to-transparent" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-14 h-14 bg-[#ffb703]/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={28} className="text-[#ffb703]" />
              </div>
              
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3">Endereço</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Rua General Andrade Neves, 622<br />
                <span className="text-slate-400">Bairro Gutierrez/Grajaú</span><br />
                <span className="text-slate-900 font-semibold">Belo Horizonte • MG</span>
              </p>
              
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Rua+General+Andrade+Neves,622,Belo+Horizonte,MG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ffb703] hover:text-[#e6a502] font-bold text-sm uppercase tracking-wider transition-colors group"
              >
                <Navigation size={16} />
                Como Chegar
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock size={28} className="text-emerald-600" />
              </div>
              
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Horário de Funcionamento</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Segunda a Sexta</span>
                  <span className="text-slate-900 font-bold">15h às 21h</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-600 font-medium">Sábado</span>
                  <span className="text-slate-900 font-bold">09h às 17h</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-emerald-800 text-sm font-medium text-center">
                  Domingo: Fechado
                </p>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb703]/20 rounded-bl-full" />
              
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 relative">
                <Phone size={28} className="text-[#ffb703]" />
              </div>
              
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3 relative">Contato</h3>
              <p className="text-slate-400 text-sm mb-4 relative">
                Entre em contato conosco para mais informações sobre nossos serviços.
              </p>
              
              <a 
                href="tel:+5531992118500"
                className="block text-2xl font-black text-[#ffb703] hover:text-white transition-colors mb-2 relative"
              >
                (31) 99211-8500
              </a>
              
              <a 
                href="https://wa.me/5531992118500"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#ffb703] text-slate-900 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#e6a502] transition-colors relative"
              >
                WhatsApp
                <ExternalLink size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 h-full min-h-125">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.7803644146746!2d-43.96344968508564!3d-19.93842898659868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6970b0d3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sR.%20Gen.%20Andrade%20Neves%2C%20622%20-%20Gutierrez%2C%20Belo%20Horizonte%20-%20MG%2C%2030840-340!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-20 hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Map Overlay Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Aberto Agora</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        
      </section>
    </main>
  );
}