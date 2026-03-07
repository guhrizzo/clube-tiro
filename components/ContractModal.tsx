"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  FileText, 
  Download, 
  Lock, 
  AlertCircle,
  Printer,
  Eye,
  EyeOff,
  ChevronRight,
  Calendar,
  User,
  CreditCard,
  MapPin
} from "lucide-react";
import { saveContractSignature } from "../lib/firebase";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  nascimento: string;
}

export default function ContractModal({ isOpen, onClose }: ContractModalProps) {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showSignaturePreview, setShowSignaturePreview] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    naturalidade: "",
    nascimento: "",
  });

  // Focus trap and accessibility
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      
      // Focus modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab") {
          trapFocus(e);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const trapFocus = (e: KeyboardEvent) => {
    if (!modalRef.current) return;
    
    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input[type="text"], input[type="email"], input[type="date"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Scroll progress tracking
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  if (!isOpen) return null;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert("Você precisa aceitar os termos.");
      return;
    }

    setLoading(true);
    try {
      await saveContractSignature({
        ...formData,
        dataAssinatura: new Date().toISOString(),
        versaoContrato: "v2026.1",
        ipAddress: "187.XX.XX.XX", // Simulated
        hash: generateHash(),
      });
      
      // Success animation
      setShowSignaturePreview(true);
      setTimeout(() => {
        alert("Contrato assinado e registrado com sucesso!");
        onClose();
      }, 1500);
    } catch (error) {
      alert("Erro ao salvar assinatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const generateHash = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatRG = (value: string) => {
    return value
      .replace(/\D/g, "")
     
  };

  const inputClass =
    "w-full p-3.5 bg-white border border-gray-200 rounded-xl outline-none text-sm transition-all duration-200 focus:border-[#ffb703] focus:ring-4 focus:ring-[#ffb703]/10 hover:border-gray-300 text-gray-900 placeholder:text-gray-400 shadow-sm";

  const labelClass = "text-[11px] font-bold uppercase text-gray-500 ml-1 mb-1.5 block tracking-wider";

  const contractSections = [
    { id: "intro", title: "Introdução" },
    { id: "preco", title: "1. Do Preço" },
    { id: "obrigacoes", title: "2. Obrigações" },
    { id: "direitos", title: "3. Direitos" },
    { id: "condicoes", title: "4. Condições" },
    { id: "rescisao", title: "5. Rescisão" },
  ];

  return (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white w-full max-w-7xl h-full md:h-[95vh] md:rounded-3xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-black/5"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 z-50">
          <div 
            className="h-full bg-[#ffb703] transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Header */}
        <header className="px-6 py-5 border-b bg-linear-to-r from-[#1a1a1a] to-[#2a2a2a] text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-[#ffb703] p-2.5 rounded-xl shadow-lg shadow-[#ffb703]/20">
              <ShieldCheck className="text-[#1a1a1a]" size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 id="contract-title" className="font-bold text-lg md:text-xl leading-tight uppercase tracking-tight">
                Assinatura de Contrato Digital
              </h2>
              <p className="text-xs text-[#ffb703] font-semibold tracking-widest uppercase mt-0.5">
                Protect Clube Mineiro de Tiro • CNPJ 01.244.200/0001-52
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="hover:bg-white/10 p-2.5 rounded-full transition-all hover:rotate-90 duration-300"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50/50">
          
          {/* Left Side: Contract Document */}
          <div className="flex-[1.6] overflow-hidden flex flex-col bg-gray-100 border-r border-gray-200">
            {/* Section Navigation */}
            <div className="bg-white border-b px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {contractSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    element?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeSection === section.id 
                      ? "bg-[#ffb703] text-black" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div 
              className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth" 
              ref={scrollRef}
            >
              <article className="max-w-[210mm] mx-auto bg-white p-8 md:p-[2cm] shadow-xl border border-gray-200 text-gray-800 font-serif text-[13px] leading-relaxed relative min-h-[297mm]">
                
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                  <ShieldCheck size={300} strokeWidth={1} />
                </div>

                {/* Document Header */}
                <header className="text-center mb-10 border-b-2 border-[#ffb703] pb-6">
                  <div className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    Documento Legal
                  </div>
                  <h1 className="font-bold text-2xl md:text-3xl mb-2 text-[#1a1a1a]">
                    CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)
                  </h1>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">
                    Protect Clube Mineiro de Tiro
                  </p>
                </header>

                {/* Introdução */}
                <section id="intro" className="mb-8 text-justify">
                  <p className="mb-4 first-letter:text-4xl first-letter:font-bold first-letter:text-[#ffb703] first-letter:mr-1 first-letter:float-left">
                    Pelo presente instrumento particular de <strong>CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)</strong>,
                    de um lado <strong>Protect Clube Mineiro de Tiro</strong>, pessoa jurídica de direito privado, inscrita no CNPJ
                    sob o número <strong>01.244.200/0001-52</strong>, com sede na <strong>RUA GENERAL ANDRADE NEVES, 622</strong>, Bairro Grajaú,
                    Belo Horizonte e posteriormente na <strong>Rua dos Radialistas, 38</strong>, Bairro Balneário Água Limpa,
                    Nova Lima – MG, neste ato representado por quem de direito, doravante simplesmente denominada <strong>PROTECT</strong>.
                  </p>

                  <p className="mb-4">
                    De outro lado o(a) Sr(a) 
                    <span className="inline-block border-b-2 border-[#ffb703] px-2 mx-1 min-w-50 text-center font-bold text-[#b38600] bg-[#ffb703]/10 rounded-t">
                      {formData.nome || "___________________________"}
                    </span>,
                    brasileiro(a), RG nº
                    <span className="inline-block border-b border-gray-400 px-2 mx-1 min-w-30 text-center font-semibold">
                      {formData.rg || "_______________"}
                    </span>,
                    portador do CPF nº
                    <span className="inline-block border-b border-gray-400 px-2 mx-1 min-w-35 text-center font-semibold">
                      {formData.cpf || "_______________"}
                    </span>,
                    natural de
                    <span className="inline-block border-b border-gray-400 px-2 mx-1 min-w-30 text-center font-semibold">
                      {formData.naturalidade || "_______________"}
                    </span>,
                    nascido em
                    <span className="inline-block border-b border-gray-400 px-2 mx-1 min-w-25 text-center font-semibold">
                      {formData.nascimento ? new Date(formData.nascimento).toLocaleDateString('pt-BR') : "__/__/____"}
                    </span>,
                    doravante denominado <strong>SÓCIO USUÁRIO (COLABORADOR)</strong>.
                  </p>

                  <p className="mb-4 italic text-gray-600 border-l-4 border-[#ffb703] pl-4 bg-gray-50 py-2">
                    Têm entre si justos e contratados o direito de sócio usuário (colaborador) da Protect, tudo de acordo com as condições especificadas nesta contratação/adesão e na legislação vigente que regulamenta a disposição, utilização, compra, venda, repasse e outros inerentes aos produtos controlados (armas, munições e acessórios) a este vinculado, como se dele transcrito fosse, pelo que o proponente declara aceitar as suas cláusulas sem restrições.
                  </p>
                  
                  <p className="text-sm font-semibold text-gray-700">
                    Assim como a eleição do foro da Comarca de Belo Horizonte/MG, para dirimir quaisquer pendências relativas ao presente contrato.
                  </p>
                </section>

                {/* Seção 1: Preço */}
                <section id="preco" className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1a1a1a] bg-gray-100 p-3 rounded-lg border-l-4 border-[#ffb703]">
                    <CreditCard size={20} className="text-[#ffb703]" />
                    1. DO PREÇO E DA FORMA DE PAGAMENTO
                  </h3>

                  <div className="space-y-4 pl-4">
                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA PRIMEIRA:</strong> O valor total do contrato, da cota trienal (que vigora por três anos) contratada, é de <strong className="text-lg text-green-700">R$ 3.600,00 (Três mil e seiscentos reais)</strong>, isento de pagamentos da taxa de contribuição social (mensalidades).
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-r-lg">
                      <p className="mb-2">
                        <strong>PARÁGRAFO PRIMEIRO:</strong> Declara o sócio usuário (colaborador), neste ato, ter ciência que a revalidação do <strong>CR (Certificado de Registro)</strong> é feita, atualmente, de três em três anos.
                      </p>
                    </div>

                    <p>
                      <strong>PARÁGRAFO SEGUNDO:</strong> O pagamento, pelo sócio usuário (colaborador), deverá ser feito no ato da assinatura deste contrato, no valor de <strong>R$ 1.200,00 (anuidade)</strong> da primeira parcela, salvo algum desconto ou condições de pagamentos diferenciadas, sendo que em caso de pagamento parcelado o valor remanescente será reajustado ao final de cada ano, pelo IGPM ou, em caso de extinção deste, de outro regulador monetário em vigência à época do reajuste.
                    </p>

                    <p className="text-gray-600 italic text-xs border-t pt-2 mt-2">
                      Independente da data de entrada o pagamento será anual e válido até o último dia de dezembro, dando início em janeiro a um novo ano e uma nova taxa a vencer no décimo dia deste mês.
                    </p>

                    <p>
                      <strong>PARÁGRAFO TERCEIRO:</strong> Caso a contratação seja realizada em mês diverso que o de janeiro o contratado restará findo no mesmo mês de janeiro, três anos depois de ingresso, sendo que as parcelas remanescentes de pagamento também vencerão até o dia 10 (dez) daquele mesmo mês, de cada um dos três anos subsequentes, caso seja renovado automaticamente.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                        <div>
                          <p className="font-bold text-red-800 text-sm mb-1">Inadimplência</p>
                          <p className="text-red-700 text-xs leading-relaxed">
                            <strong>PARÁGRAFO QUARTO:</strong> Será considerado inadimplente o sócio usuário (colaborador) que atrasar qualquer dos pagamentos por período maior que o de <strong>30 (trinta) dias</strong> do vencimento, ficando expressamente suspensos os direitos do sócio usuário (colaborador), cláusulas sexta e sétima deste contrato, independente de comunicação prévia, até que os valores em débito sejam quitados.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
                      <strong>PARÁGRAFO SEXTO:</strong> Em caso de atraso de pagamento por mais de 60 (sessenta) dias, o sócio usuário(colaborador) será notificado com prazo de 10 (dez) dias para liquidação do débito, findo o qual e perdurada a pendência, fica a Protect autorizada a encaminhar o nome do devedor para o SPC – Serviço de Proteção ao Crédito. O cancelamento/rescisão contratual implicará no vencimento antecipado e cobrança das parcelas remanescentes, acrescida de <strong>multa de 30%</strong> sobre o valor total da cota.
                    </p>
                  </div>
                </section>

                {/* Seção 2: Obrigações */}
                <section id="obrigacoes" className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1a1a1a] bg-gray-100 p-3 rounded-lg border-l-4 border-[#ffb703]">
                    <ShieldCheck size={20} className="text-[#ffb703]" />
                    2. DAS OBRIGAÇÕES DA CONTRATADA PROTECT E DAS CONDIÇÕES GERAIS
                  </h3>

                  <div className="space-y-4 pl-4">
                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA SEGUNDA:</strong> Permitir a frequência do sócio usuário (colaborador) às áreas comuns do Clube PROTECT dentro do horário de funcionamento; permitir a utilização dos estandes de tiro, ressalvando a hipótese de o local estar sendo utilizado por determinadas categorias profissionais, tais como Guardas Municipais, Policiais e outros, bem como nas hipóteses em que estes estiverem sendo utilizados para cursos, capacitação ou afins.
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA TERCEIRA:</strong> Oferecer condições adequadas para realização de cursos, teste de tiro e capacitação técnica, atividades sociais, culturais, recreativas e desportivas, bem como manter despachantes no clube para promoção de pleitos junto a Polícia Federal e Exército, <span className="bg-yellow-100 px-1">ressalvando que os serviços documentais e os de despachantes serão cobrados em separado</span>, mediante prévia autorização e contratação específica de serviços requeridos pelo interessado.
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA QUARTA:</strong> Manter as instalações limpas e em permanentes condições de uso; Disponibilizar, <strong>a título oneroso</strong>, alvos e equipamentos obrigatórios para teste de tiro, capacitação técnica, treinamentos, cursos e afins; disponibilizar, <strong>a título gratuito</strong>, na condição de empréstimo, óculos de proteção, abafadores de ouvido e as armas do acervo do clube (para atiradores com Certificado de Registro válidos).
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA QUINTA:</strong> Ofertar ao sócio usuário (colaborador), na condição de empresa de comércio, para compra/aquisição, armas de fogo, munição, acessórios, equipamentos de proteção e defesa individual, armas de ar comprimido, airsoft e outros.
                    </p>
                  </div>
                </section>

                {/* Seção 3: Direitos */}
                <section id="direitos" className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1a1a1a] bg-gray-100 p-3 rounded-lg border-l-4 border-[#ffb703]">
                    <User size={20} className="text-[#ffb703]" />
                    3. DOS DIREITOS DO SÓCIO USUÁRIO (COLABORADOR)
                  </h3>

                  <div className="space-y-4 pl-4">
                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA SEXTA:</strong> Frequentar, utilizar e participar de todas as opções recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da anuidade, ressalvando que o sócio usuário (colaborador) declara, neste ato, ter ciência que cursos, testes de capacitação e tiro, bem como algumas opções recreativas, desportivas e culturais serão disponibilizadas a título oneroso, sem valor previamente fixado, a ser calculado evento a evento.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="font-bold text-green-800 mb-2 text-sm">Prioridades do Sócio:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-green-700">
                        <li>Prioridade na tramitação de pleitos junto ao Exército e Polícia Federal</li>
                        <li>Prioridade na utilização de Estandes</li>
                        <li>Prioridade para realização de testes de tiro e capacitação técnica</li>
                        <li>Prioridade nas vagas para participação em opções recreativas, desportivas e culturais</li>
                        <li>Prioridade para utilização de equipamentos de proteção individual e armas do acervo</li>
                      </ul>
                    </div>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA OITAVA:</strong> Caso a legislação à época permita, fazer-se acompanhar de terceiros nas dependências do clube Protect, mediante preenchimento e assinatura em termo de compromisso/responsabilidade, respondendo o sócio usuário (colaborador) por aqueles convidados que agirem com imperícia, imprudência ou negligência.
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA NONA:</strong> Fazer requerimento para se obter um CR de Colecionador/Atirador/Caçador bastando, para isto, ser cidadão pleno (requisitos elencados pelo Estatuto do Desarmamento e portarias vigentes, Polícia Federal e Exército) e ter 25 anos; antes dos 18 anos ou menos, poderá receber autorização judicial.
                    </p>

                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                      <p className="text-amber-800 text-xs">
                        <strong>CLÁUSULA DÉCIMA:</strong> Zelar pelo patrimônio do clube, responsabilizando-se por si, seus convidados, por danos ou despesas que venham a causar, sendo <strong className="text-red-600">proibido que menores de 18 anos manuseiem, utilizem ou portem qualquer tipo de arma de fogo</strong>, à exceção daqueles com autorização judicial.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Seção 4: Condições */}
                <section id="condicoes" className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1a1a1a] bg-gray-100 p-3 rounded-lg border-l-4 border-[#ffb703]">
                    <FileText size={20} className="text-[#ffb703]" />
                    4. DISPOSIÇÕES GERAIS E CONDIÇÕES ESPECÍFICAS
                  </h3>

                  <div className="space-y-4 pl-4 text-xs leading-relaxed">
                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA TREZE:</strong> O ingresso a áreas de tiro se fará com identificação Facial e/ou outra como a apresentação da carteira social sempre que solicitada e, automaticamente, para que possa ter acesso ao clube.
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA QUATORZE:</strong> O teste de Manuseio e de Capacitação Técnica é uma espécie de curso, testes escritos e práticos, ministrado por instrutores devidamente credenciados pela Polícia Federal.
                    </p>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA DEZESSEIS:</strong> O sócio usuário (colaborador) e/ou qualquer cidadão que desejar adquirir uma arma nova, para defesa, no comércio, deverá obter autorização da Polícia Federal ou Exército e apresentar Prova de Aptidão e Manuseio de Armas e Teste Psicológico.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <p className="font-bold text-gray-700 mb-2">Legislação Aplicável:</p>
                      <p className="text-gray-600">
                        <strong>CLÁUSULA DEZESSETE:</strong> O sócio declara ter ciência que a legislação que controla os CACs é diferente daquela que rege as armas em mãos de cidadãos. Essas normas estão presentes no Regulamento para Fiscalização de Produtos Controlados (R-105), Decreto Nº 3.665/2000, Portaria COLOG Nº 051/2015.
                      </p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-bold text-xs mb-1">⚠️ IMPORTANTE - PORTE DE ARMA:</p>
                      <p className="text-red-700 text-xs">
                        <strong>CLÁUSULA DEZOITO:</strong> O sócio declara ter ciência que CACs ainda <strong>não possuem autorização para PORTE de arma</strong>, e sim, alguns deles, para POSSE e TRANSPORTE da arma, munições e acessórios de casa até os locais de competição, clubes de tiro, locais de realização de provas, competições, treinamentos e outros, autorizados pelas GUIAS DE TRÁFEGO.
                      </p>
                    </div>

                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA VINTE:</strong> É expressamente proibido ao sócio usuário (colaborador) utilizar armas de fogo sem registro, bem como utilizar os postos de tiro sem equipamentos de proteção auricular e visual.
                    </p>
                  </div>
                </section>

                {/* Seção 5: Rescisão */}
                <section id="rescisao" className="mb-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1a1a1a] bg-gray-100 p-3 rounded-lg border-l-4 border-[#ffb703]">
                    <X size={20} className="text-[#ffb703]" />
                    5. DA RESCISÃO DO CONTRATO
                  </h3>

                  <div className="space-y-4 pl-4">
                    <p>
                      <strong className="text-[#b38600]">CLÁUSULA VINTE E UM:</strong> A rescisão ou cancelamento do presente contrato poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.
                    </p>

                    <div className="bg-red-100 border-2 border-red-300 rounded-xl p-6 my-6 text-center">
                      <p className="text-red-800 font-bold text-lg mb-2">MULTA DE RESCISÃO</p>
                      <p className="text-red-700 text-sm mb-2">
                        <strong>PARÁGRAFO SEGUNDO:</strong> Em caso de rescisão ou cancelamento deste contrato a parte que der ensejo à rescisão ou cancelamento deverá pagar à outra parte
                      </p>
                      <p className="text-3xl font-bold text-red-600">30%</p>
                      <p className="text-red-700 text-xs mt-1">do valor da cota trienal de sócio usuário (colaborador)</p>
                      <p className="text-red-600 text-xs mt-2 italic">independente da entrada e/ou parcelas pagas</p>
                    </div>

                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded border-l-2 border-gray-400">
                      <strong>PARÁGRAFO PRIMEIRO:</strong> Não será considerada motivação válida para rescisão contratual a não aprovação do sócio usuário (colaborador) nos Testes de Capacitação Técnica e Manuseio de Armas de Fogo e nos Testes Psicotécnicos pertinentes.
                    </p>

                    <p className="text-xs">
                      <strong>PARÁGRAFO TERCEIRO:</strong> O presente contrato se reveste e é aceito pelos contratantes com força de <strong>título executivo extrajudicial</strong>, constituindo dívida líquida, certa e exigível.
                    </p>
                  </div>
                </section>

                {/* Footer do Documento */}
                <footer className="mt-12 pt-8 border-t-2 border-gray-300 text-center">
                  <p className="mb-8 text-sm">
                    E por justas e contratadas, firmam o presente, em 02 (duas) vias), na presença das testemunhas.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8 text-left">
                    <div className="border-t border-gray-400 pt-2">
                      <p className="font-bold text-sm">PROTECT CLUBE MINEIRO DE TIRO</p>
                      <p className="text-xs text-gray-500">CNPJ: 01.244.200/0001-52</p>
                    </div>
                    <div className="border-t border-gray-400 pt-2">
                      <p className="font-bold text-sm">{formData.nome || "SÓCIO USUÁRIO"}</p>
                      <p className="text-xs text-gray-500">CPF: {formData.cpf || "________________"}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1 border-t pt-4">
                    <p className="font-semibold">Belo Horizonte, MG, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>RUA GENERAL ANDRADE NEVES, 622, GRAJAÚ, CEP 30431-128, BELO HORIZONTE-MG</p>
                    <p>E-MAIL: CLUBE@GRUPOPROTECT.COM.BR | SITE: GRUPOPROTECT.COM.BR | WHATSAPP: (31) 3371-8500</p>
                  </div>
                </footer>
              </article>
            </div>
          </div>

          {/* Right Side: Form */}
          <aside className="flex-1 bg-white flex flex-col shadow-xl overflow-hidden max-w-md w-full md:max-w-none">
            <div className="p-6 border-b bg-linear-to-r from-gray-50 to-white sticky top-0 z-10">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                <div className="bg-[#ffb703] p-1.5 rounded-lg">
                  <FileText size={18} className="text-white" />
                </div>
                Dados do Assinante
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Preencha seus dados pessoais para validação do documento. Os campos serão automaticamente inseridos no contrato.
              </p>
            </div>

            <form onSubmit={handleConfirm} className="p-6 flex flex-col gap-5 overflow-y-auto flex-1">
              
              {/* Nome Completo */}
              <div className="space-y-1">
                <label className={labelClass}>
                  <User size={12} className="inline mr-1" />
                  Nome Completo
                </label>
                <input 
                  required 
                  type="text" 
                  placeholder="Como consta no RG" 
                  className={inputClass}
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value.toUpperCase() })} 
                />
              </div>

              {/* CPF e RG */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelClass}>CPF</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="000.000.000-00" 
                    className={inputClass}
                    value={formData.cpf}
                    maxLength={14}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })} 
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>RG</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="MG-00.000.000" 
                    className={inputClass}
                    value={formData.rg}
                    onChange={(e) => setFormData({ ...formData, rg: formatRG(e.target.value) })} 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className={labelClass}>E-mail</label>
                <input 
                  required 
                  type="email" 
                  placeholder="seu@email.com" 
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>

              {/* Naturalidade e Nascimento */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelClass}>
                    <MapPin size={12} className="inline mr-1" />
                    Naturalidade
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Cidade/UF" 
                    className={inputClass}
                    value={formData.naturalidade}
                    onChange={(e) => setFormData({ ...formData, naturalidade: e.target.value })} 
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>
                    <Calendar size={12} className="inline mr-1" />
                    Nascimento
                  </label>
                  <input 
                    required 
                    type="date" 
                    className={inputClass}
                    value={formData.nascimento}
                    onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })} 
                  />
                </div>
              </div>

              {/* Digital Signature Box */}
              <div className="mt-2 p-5 rounded-2xl border-2 border-dashed border-[#ffb703]/30 bg-linear-to-br from-[#ffb703]/5 to-white space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#b38600]">
                    <Lock size={16} className="text-[#ffb703]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Assinatura Digital Certificada</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowSignaturePreview(!showSignaturePreview)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    {showSignaturePreview ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-[#ffb703]/10 to-transparent rounded-bl-full" />
                  
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-wider">Visualização da Assinatura</p>
                  
                  {showSignaturePreview ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <p className="font-serif italic text-2xl text-gray-800 py-2 border-b-2 border-gray-100 truncate">
                        {formData.nome || "Assinatura Digital"}
                      </p>
                      <div className="mt-3 space-y-1">
                        <p className="text-[10px] text-gray-400 font-mono">IP: 187.XX.XX.XX</p>
                        <p className="text-[10px] text-gray-400 font-mono truncate">Hash: {generateHash()}</p>
                        <p className="text-[10px] text-gray-400">
                          {new Date().toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-16 flex items-center justify-center text-gray-300 text-sm italic">
                      Clique no olho para visualizar
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="accept-terms"
                    checked={accepted} 
                    onChange={() => setAccepted(!accepted)}
                    className="mt-0.5 w-5 h-5 accent-[#ffb703] rounded cursor-pointer" 
                  />
                  <label htmlFor="accept-terms" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                    Li e concordo integralmente com todos os termos e cláusulas do contrato acima, incluindo as condições de pagamento, rescisão e responsabilidades. Autorizo o registro da minha assinatura digital.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !accepted}
                className="w-full bg-[#1a1a1a] text-[#ffb703] font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-[#ffb703]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#ffb703] border-t-transparent" />
                    <span>Processando assinatura...</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle size={22} className="group-hover:scale-110 transition-transform" />
                    <span className="relative">FINALIZAR E ASSINAR AGORA</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 bg-gray-50 py-2 rounded-lg">
                <Lock size={10} className="text-green-600" />
                <span>Documento seguro conforme MP 2.200-2/2001 e Lei 14.063/2017</span>
              </div>

              {/* Contract Summary */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Resumo do Contrato</h4>
                <div className="space-y-2 text-[11px] text-gray-600">
                  <div className="flex justify-between">
                    <span>Valor Total:</span>
                    <span className="font-bold text-gray-900">R$ 3.600,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrada:</span>
                    <span className="font-bold text-gray-900">R$ 1.200,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vigência:</span>
                    <span className="font-bold text-gray-900">3 anos</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Multa Rescisão:</span>
                    <span className="font-bold">30%</span>
                  </div>
                </div>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}