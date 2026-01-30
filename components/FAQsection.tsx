"use client";

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const handleWhatsAppClick = () => {
  const phone = "553133718600";
  const message = encodeURIComponent("Olá! Gostaria de falar com um especialista sobre as soluções de rastreamento do Grupo Protect.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappUrl, '_blank');
};

const faqData: FAQItem[] = [
  {
    question: "O que é um rastreamento veicular conhecido pelo aplicativo do Grupo Protect Rastreamento?",
    answer: "O rastreamento veicular é um serviço do Grupo Protect Rastreamento que ajuda no gerenciamento de motoristas, análise de condução, localização de veículos em tempo real e alertas instantâneos que permitem uma condução preventiva."
  },
  {
    question: "Por que adquirir o Grupo Protect Rastreamento?",
    answer: "Você pode acompanhar melhor a sua frota, antecipando problemas que possam impactar a gestão dos veículos, além de promover mais eficiência, por meio da redução de veículos e manutenção da capacidade a partir da organização de trajetos."
  },
  {
    question: "É possível reduzir a utilização fora do período de expediente e uso particular?",
    answer: "A solução permite controlar em tempo real os veículos e como estão sendo utilizados. Por meio de alertas automáticos, o cliente pode solicitar o bloqueio remoto assistido para assegurar o uso da frota de forma adequada. Com isso, evita-se aumento das despesas e possíveis problemas trabalhistas."
  },
  {
    question: "Há risco do motorista retirar o dispositivo ou adulterar a solução?",
    answer: "Não. O serviço é ativado de forma a impedir interferências externas e fraudes. Entretanto, vale reforçar que, caso haja qualquer tipo de dano ao dispositivo, o gestor da frota irá receber uma notificação em sua plataforma de gestão."
  },
  {
    question: "O que mais preciso contratar para utilizar o serviço?",
    answer: "Nada. O Grupo Protect Rastreamento é uma solução completa: equipamento, plataforma de gestão, acesso via aplicativo 24×7."
  },
  {
    question: "Como acompanhar a prestação do serviço em tempo real?",
    answer: "O Grupo Protect Rastreamento permite acompanhamento em tempo real da frota por meio de dashboards e relatórios que oferecem informações do trajeto do veículo, assim como dados de excesso de velocidade por via, histórico de posições, rotas com histórico de paradas, odômetro, manutenção preventiva, etc. Mediante pacote de serviços contratado."
  },
  {
    question: "É possível se antecipar a eventuais problemas no caminho?",
    answer: "Sim. Durante a rota, caso alguma situação tenha ocorrido no trajeto ao destino, a ferramenta recalcula a melhor rota e oferece a opção para o motorista."
  },
  {
    question: "Consigo verificar caso a rota tenha sido alterada?",
    answer: "Sim. Todo o trajeto é acompanhado por meio de relatórios pelo gestor, nas opções web ou app."
  },
  {
    question: "É possível obter informações para manutenção preventiva?",
    answer: "A solução também gera indicadores de manutenção preventiva para que as paradas sejam sempre programadas com antecedência e não haja prejuízos para a operação com veículos parados mediante pacote de serviços contratado."
  },
  {
    question: "É necessário adquirir algum adaptador para o aplicativo?",
    answer: "Não. A solução se integra a qualquer dispositivo e veículos."
  },
  {
    question: "Se precisar bloquear o veículo, é possível?",
    answer: "Sim. O bloqueio poderá ser feito pelo aplicativo, 24 horas por dia e 7 dias na semana, a partir do pacote rastreamento contratado."
  },
  {
    question: "É possível receber notificações em caso de ações suspeitas?",
    answer: "Sim. Qualquer atividade suspeita no veículo gera uma notificação ao gestor/equipe responsável pela frota."
  },
  {
    question: "Consigo adaptar a solução para outros tipos de veículos (galpões)?",
    answer: "Sim. Para isso, realizamos um pacote exclusivo para seu negócio, atendendo às suas necessidades."
  },
  {
    question: "Proteção de dados alinhada ao LGPD é garantida?",
    answer: "Sim. Todos os dados são tratados dentro das normativas para cumprimento das leis de proteção de dados pessoais."
  },
  {
    question: "O serviço funciona em todas as regiões do Brasil?",
    answer: "Sim, o serviço funciona em todas as regiões onde existe cobertura de sinal de celular. Caso o veículo transite por algum lugar sem sinal, o equipamento armazenará os dados em sua memória e atualizará as informações logo que obtiver sinal."
  }
];

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem, isOpen: boolean, onClick: () => void }) => (
  <div className={`mb-3 overflow-hidden rounded-xl border transition-all cursor-pointer duration-300 ${isOpen ? 'border-yellow-500 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white cursor-pointer'}`}>
    <button
      onClick={onClick}
      className="flex w-full items-center cursor-pointer justify-between p-5 text-left transition-colors"
    >
      <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
        {item.question}
      </span>
      <div className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-yellow-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
        <ChevronDown size={16} strokeWidth={3} />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white"
        >
          <div className="px-5 pb-5 text-sm leading-relaxed text-slate-500 border-t border-slate-100 pt-4">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-20 px-4 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header da Seção */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-700 mb-4">
            Suporte e Dúvidas
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Tire suas dúvidas sobre <span className="text-yellow-500">rastreamento</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Encontre respostas rápidas sobre nossa tecnologia de proteção e gestão de frotas.
          </p>
        </div>

        {/* FAQ Grid/List */}
        <div className="space-y-4 ">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}

            />
          ))}
        </div>

        {/* Footer de Ajuda */}
        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-8 md:p-12 shadow-sm text-center">


            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-yellow-200 rounded-2xl bg-yellow-50 text-yellow-600">
                <ShieldCheck size={32} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Ainda ficou com alguma dúvida?
              </h3>

              <p className="mx-auto mb-8 max-w-md text-slate-500">
                Nossos especialistas estão prontos para desenhar um projeto de rastreamento exclusivo para sua necessidade.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto rounded-xl bg-yellow-500 px-8 py-4 font-bold text-slate-900 cursor-pointer transition-all hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {/* Ícone opcional do Zap para reforçar o canal */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.131c1.53.911 3.243 1.391 4.993 1.392h.005c5.344 0 9.691-4.347 9.693-9.693 0-2.592-1.009-5.028-2.841-6.861-1.832-1.832-4.269-2.841-6.861-2.841-5.346 0-9.693 4.347-9.695 9.693-.001 1.868.531 3.692 1.538 5.258l-1.018 3.719 3.805-.998z" />
                  </svg>
                  Falar com Especialista
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}