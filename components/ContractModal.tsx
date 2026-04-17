"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  CheckCircle,
  FileText,
  Lock,
  Mail,
  Building2,
  PenLine,
  AlignLeft,
} from "lucide-react";
import { saveContractSignature } from "../lib/firebase";
import {
  generateContractPDFFromServerPage,
} from "../lib/buildContractPDF";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  profissao: string;
  naturalidade: string;
  nascimento: string;
}

const STORAGE_KEY = "protect_contract_form";

const PLANOS = {
  "3": {
    label: "3 anos",
    nomeContrato: "trienal",
    nomePrazo: "três",
    total: "R$ 3.600,00",
    totalRaw: 3600,
    parcela: "R$ 1.200,00",
    parcelaRaw: 1200,
    versao: "v2026.1-3anos",
    vigencia: "3 anos",
  },
  "5": {
    label: "5 anos",
    nomeContrato: "quinquenal",
    nomePrazo: "cinco",
    total: "R$ 6.000,00",
    totalRaw: 6000,
    parcela: "R$ 1.200,00",
    parcelaRaw: 1200,
    versao: "v2026.1-5anos",
    vigencia: "5 anos",
  },
} as const;

type PlanoKey = keyof typeof PLANOS;

function maskDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function validateDateInput(value: string): string | null {
  if (value.length < 10) return null;
  const [dd, mm, yyyy] = value.split("/").map(Number);
  if (mm < 1 || mm > 12) return "Mês inválido (01–12)";
  const daysInMonth = new Date(yyyy, mm, 0).getDate();
  if (dd < 1 || dd > daysInMonth) return `Dia inválido para ${mm}/${yyyy}`;
  if (yyyy < 1900 || yyyy > new Date().getFullYear()) return "Ano inválido";
  const date = new Date(yyyy, mm - 1, dd);
  if (date > new Date()) return "Data não pode ser futura";
  return null;
}

function dateToISO(ddmmyyyy: string): string {
  if (ddmmyyyy.length !== 10) return "";
  const [dd, mm, yyyy] = ddmmyyyy.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

function formatCPF(v: string): string {
  return v
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function SigBlock({
  imgSrc,
  imgAlt,
  label,
  lines,
  borderColor = "border-gray-400",
}: {
  imgSrc?: string;
  imgAlt?: string;
  label?: string;
  lines: string[];
  borderColor?: string;
}) {
  return (
    <div>
      <div className="h-16 flex -pb-4 justify-center">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            crossOrigin="anonymous"
            className="max-h-20 max-w-full object-contain object-left"
          />
        )}
      </div>
      <div className={`border-t ${borderColor} pt-2`}>
        {label && <p className="text-gray-500">{label}</p>}
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              i === 0 && !label ? "font-bold" : i > 0 ? "text-gray-500" : ""
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function SuccessModal({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gray-900 px-6 pt-8 pb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-white text-base font-semibold tracking-tight">
            Contrato assinado com sucesso!
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Seu cadastro foi registrado na PROTECT.
          </p>
        </div>
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-sm bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <Mail size={14} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Cópia enviada para você
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5 font-mono break-all">
                {email}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-sm bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 size={14} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Cópia enviada ao Clube PROTECT
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                clube@grupoprotect.com.br
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-700 transition-all rounded-sm cursor-pointer mt-1"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContractModal({ isOpen, onClose }: ContractModalProps) {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [plano, setPlano] = useState<PlanoKey>("3");
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileTab, setMobileTab] = useState<"contrato" | "dados">("dados");
  const [dateError, setDateError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const contractRefDesktop = useRef<HTMLDivElement>(null);
  const contractRefMobile = useRef<HTMLDivElement>(null);

  const getActiveContractRef = () =>
    window.innerWidth >= 768 ? contractRefDesktop : contractRefMobile;

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as FormData;
          if (
            parsed.nascimento &&
            /^\d{4}-\d{2}-\d{2}$/.test(parsed.nascimento)
          ) {
            const [yyyy, mm, dd] = parsed.nascimento.split("-");
            parsed.nascimento = `${dd}/${mm}/${yyyy}`;
          }
          return parsed;
        }
      } catch {
        /* ignore */
      }
    }
    return {
      nome: "",
      email: "",
      cpf: "",
      rg: "",
      profissao: "",
      naturalidade: "",
      nascimento: "",
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch {
        /* ignore */
      }
    }
  }, [formData]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const p = PLANOS[plano];

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) { alert("Você precisa aceitar os termos."); return; }
    const dateErr = validateDateInput(formData.nascimento);
    if (dateErr || formData.nascimento.length < 10) {
      setDateError(dateErr || "Data incompleta");
      return;
    }
    setLoading(true);
    try {
      const savedData = {
        ...formData,
        nascimento: dateToISO(formData.nascimento),
        plano: `${plano} anos`,
        planoKey: plano,
        valorTotal: p.totalRaw,
        valorParcela: p.parcelaRaw,
        dataAssinatura: new Date().toISOString(),
        versaoContrato: p.versao,
        hash: Math.random().toString(36).substring(2, 15),
      };

      await saveContractSignature(savedData);

      // ✅ Cria registro na coleção "assinaturas"
      await addDoc(collection(db, "assinaturas"), {
        nomeCliente: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        tipoContrato: `adesão_sócio - ${plano} anos`,
        status: "ativo",
        dataAssinatura: Timestamp.now(),
        dataAssinaturaString: new Date().toISOString().split("T")[0],
        descricao: `✓ Li e concordo integralmente com todos os termos e cláusulas do contrato de adesão ${p.nomeContrato} (${plano} anos), incluindo as condições de pagamento, rescisão e responsabilidades. Contrato assinado digitalmente em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}. Valor total: ${p.total} (${p.parcela}/ano). RG: ${formData.rg} | Profissão: ${formData.profissao} | Naturalidade: ${formData.naturalidade}.`,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

       try {
         let pdfBase64: string;
         let filename = `Contrato_PROTECT_${(formData.nome || "socio")
           .replace(/\s+/g, "_")
           .normalize("NFD")
           .replace(/[\u0300-\u036f]/g, "")}.pdf`;
         
          // Usa a página /contrato-pdf para gerar o PDF
          pdfBase64 = await generateContractPDFFromServerPage({
            ...savedData,
            plano: `${plano} anos`,
          });

          await fetch("/api/send-contract", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             nome: formData.nome,
             email: formData.email,
             cpf: formData.cpf,
             pdfBase64,
             cc: "clube@grupoprotect.com.br",
           }),
         });
       } catch (emailErr) {
         console.error("Erro ao enviar email (não crítico):", emailErr);
       }

      setShowSuccess(true);
    } catch {
      alert("Erro ao salvar assinatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => { 
    setShowSuccess(false); 
    onClose(); 
  };

  const handleDateChange = (raw: string) => {
    const masked = maskDate(raw);
    setFormData((prev) => ({ ...prev, nascimento: masked }));
    if (masked.length === 10) setDateError(validateDateInput(masked));
    else setDateError(null);
  };

  const nascimentoDisplay =
    formData.nascimento.length === 10 ? formData.nascimento : "";

  const field =
    "w-full px-2 py-1.5 border-b border-gray-300 bg-transparent text-sm outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300";
  const labelCls =
    "block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-medium";

  const blank = (label: string, value: string, width = "min-w-[180px]") =>
    value ? (
      <span className={`inline-block border-b border-gray-700 px-1 font-semibold ${width}`}>
        {value}
      </span>
    ) : (
      <span className={`inline-block border-b border-gray-400 px-1 text-gray-300 ${width}`}>
        {label}
      </span>
    );

  const contractContent = (
    <div className="max-w-170 mx-auto bg-white border border-gray-200 px-6 md:px-10 py-12 text-[13px] text-gray-800 leading-relaxed font-serif shadow-sm">
      <div className="text-center mb-8 pb-6 border-b border-gray-200">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
          Documento Legal
        </p>
        <h1 className="font-bold text-base uppercase leading-snug" id="contract-title">
          Contrato de Adesão de Sócio Usuário (Colaborador)
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52
        </p>
        <div className="mt-4 inline-flex items-center gap-2 border border-gray-300 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-600">
          Cota {p.nomeContrato} — {p.vigencia}
        </div>
      </div>

      <p className="mb-4 text-justify">
        Pelo presente instrumento particular de{" "}
        <strong>CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)</strong>, de um lado,{" "}
        <strong>Protect Clube Mineiro de Tiro</strong>, pessoa jurídica de direito privado,
        inscrita no CNPJ sob o nº <strong>01.244.200/0001-52</strong>, com sede na Rua General
        Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos
        Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por
        quem de direito, doravante simplesmente denominada <strong>PROTECT</strong>; e, de outro
        lado, o(a) Sr.(a) {blank("Nome completo", formData.nome, "min-w-[220px]")}, profissão{" "}
        {blank("Profissão", formData.profissao, "min-w-[140px]")}, inscrito(a) no RG nº{" "}
        {blank("RG", formData.rg, "min-w-[120px]")}, portador(a) do CPF nº{" "}
        {blank("CPF", formData.cpf, "min-w-[130px]")}, natural de{" "}
        {blank("Naturalidade", formData.naturalidade, "min-w-[120px]")}, nascido(a) em{" "}
        {blank("dd/mm/aaaa", nascimentoDisplay, "min-w-[90px]")}, doravante simplesmente
        denominado(a) <strong>SÓCIO USUÁRIO (COLABORADOR)</strong>, têm entre si justo e
        contratado o direito de sócio usuário (colaborador) da PROTECT, tudo de acordo com as
        condições especificadas nesta contratação/adesão e na legislação vigente.
      </p>
      <p className="mb-6 text-justify">
        O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a
        eleição do foro da Comarca de Belo Horizonte/MG para dirimir quaisquer pendências
        relativas ao presente instrumento.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        1. Do Preço e da Forma de Pagamento
      </h2>
      <p className="mb-3">
        <strong>CLÁUSULA PRIMEIRA:</strong> O valor total do contrato, correspondente à cota{" "}
        {p.nomeContrato} (vigente por {p.nomePrazo} anos), é de <strong>{p.total}</strong>,
        ficando isento o pagamento de taxa de contribuição social mensal.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO PRIMEIRO:</strong> Declara o sócio usuário (colaborador), neste ato,
        ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente,
        de três em três anos.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO SEGUNDO:</strong> O pagamento deverá ser efetuado no ato da
        assinatura deste contrato, no valor de {p.parcela} (anuidade), correspondente à
        primeira parcela, salvo eventual desconto ou condição diferenciada. Em caso de
        parcelamento, o valor remanescente será reajustado ao final de cada ano pelo IGP-M ou
        índice substituto. Independentemente da data de ingresso, o pagamento será anual e
        válido até o último dia de dezembro. Este contrato também servirá como recibo, mediante
        comprovação de depósito via PIX CNPJ nº 01.244.200/0001-52 ou por link de cartão de
        crédito do clube.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO TERCEIRO:</strong> Caso a contratação seja realizada em mês diverso
        de janeiro, o contrato permanecerá vigente até o mesmo mês de janeiro, {p.nomePrazo}{" "}
        anos após o ingresso, sendo que as parcelas remanescentes também vencerão até o dia 10
        daquele mês, em cada um dos {p.nomePrazo} anos subsequentes.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO QUARTO:</strong> Será considerado inadimplente o sócio usuário
        (colaborador) que atrasar qualquer pagamento por período superior a{" "}
        <strong>30 (trinta) dias</strong> do vencimento, ficando expressamente suspensos os
        direitos previstos nas cláusulas sexta e sétima, independentemente de comunicação
        prévia, até a quitação do débito.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO QUINTO:</strong> Nos casos de parcelamento, a cobrança se dará
        mediante emissão de boleto bancário. O não recebimento do boleto não exime o sócio de
        realizar o pagamento na data acordada.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO SEXTO:</strong> Em caso de atraso superior a 60 (sessenta) dias, o
        sócio será notificado e terá 10 (dez) dias para liquidação. Persistindo a pendência, a
        PROTECT poderá encaminhar o nome ao SPC. O cancelamento ou rescisão implicará o
        vencimento antecipado das parcelas remanescentes, acrescidas de{" "}
        <strong>multa de 30%</strong> sobre o valor total da cota {p.nomeContrato}, além de
        correção monetária. Cobrança administrativa: +10% de honorários; cobrança judicial:
        +20% de honorários.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        2. Das Obrigações da Contratada Protect
      </h2>
      <p className="mb-3">
        <strong>CLÁUSULA SEGUNDA:</strong> Permitir a frequência do sócio usuário (colaborador)
        às áreas comuns do Clube PROTECT dentro do horário de funcionamento, bem como a
        utilização dos estandes de tiro, ressalvada a hipótese de o local estar sendo utilizado
        por determinadas categorias profissionais ou para cursos e capacitação.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA TERCEIRA:</strong> Oferecer condições adequadas para a realização de
        cursos, testes de tiro e capacitação técnica, atividades sociais, culturais, recreativas
        e desportivas, bem como manter despachantes no clube para pleitos junto à Polícia
        Federal e ao Exército, ressalvando que os serviços documentais e de despachante serão
        cobrados separadamente.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA QUARTA:</strong> Manter as instalações limpas e em permanentes
        condições de uso; disponibilizar, a título oneroso, alvos e equipamentos obrigatórios
        para testes e cursos; e disponibilizar, a título gratuito e em caráter de empréstimo,
        óculos de proteção, abafadores de ouvido e armas do acervo do clube para atiradores
        com CR válido.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA QUINTA:</strong> Ofertar ao sócio usuário (colaborador), armas de
        fogo, munição, acessórios, equipamentos de proteção e defesa individual, armas de ar
        comprimido, airsoft e outros itens para compra ou aquisição. Disponibilizar, sempre que
        necessário, declaração de que o sócio é filiado à entidade e participa regularmente das
        atividades.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        3. Dos Direitos do Sócio Usuário (Colaborador)
      </h2>
      <p className="mb-3">
        <strong>CLÁUSULA SEXTA:</strong> Frequentar, utilizar e participar de todas as opções
        recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da
        anuidade. O sócio declara ter ciência de que cursos, testes de capacitação e tiro, bem
        como algumas opções recreativas, serão disponibilizados a título oneroso, a ser
        calculado evento a evento.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA SÉTIMA:</strong> Ter prioridade na tramitação de pleitos junto ao
        Exército e à Polícia Federal; na utilização de estandes; para realização de testes de
        tiro e capacitação técnica; nas vagas para participação em opções recreativas,
        desportivas e culturais; e para utilização de equipamentos de proteção individual e
        armas do acervo do clube.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA OITAVA:</strong> Caso a legislação vigente permita, fazer-se
        acompanhar de terceiros nas dependências do clube PROTECT, mediante preenchimento e
        assinatura de termo de compromisso, respondendo o sócio usuário (colaborador) por
        aqueles convidados que agirem com imperícia, imprudência ou negligência.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA NONA:</strong> Fazer requerimento para obtenção de CR de Colecionador,
        Atirador ou Caçador, observados os requisitos elencados pelo Estatuto do Desarmamento e
        portarias vigentes da Polícia Federal e do Exército, sendo necessário ter 25 anos.
        Antes disso, o interessado poderá obter autorização judicial.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA DÉCIMA:</strong> Zelar pelo patrimônio do clube, responsabilizando-se
        por si e por seus convidados, inclusive por danos ou despesas que venham a causar. É{" "}
        <strong>expressamente proibido que menores de 18 anos</strong> manuseiem, utilizem ou
        portem qualquer tipo de arma de fogo, à exceção daqueles com autorização judicial.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA ONZE:</strong> Pagar pontualmente as parcelas para quitação do título{" "}
        {p.nomeContrato} de sócio usuário (colaborador), quando parcelado.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA DOZE:</strong> Obedecer às normas disciplinares e aos horários de
        frequência às dependências do clube, sendo proibida a ingestão de bebidas alcoólicas
        e/ou drogas ilícitas nas áreas de tiro.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA TREZE:</strong> O ingresso às áreas de tiro se fará mediante
        identificação facial e/ou apresentação da carteira social. A condição de sócio usuário
        (colaborador) não confere direito de propriedade sobre qualquer parcela do patrimônio
        do clube.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA QUATORZE:</strong> O teste de manuseio e capacitação técnica constitui
        espécie de curso com testes escritos e práticos, ministrados por instrutores
        credenciados pela Polícia Federal, dos quais o interessado deverá participar e ser
        aprovado para obtenção ou renovação de CR.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        4. Disposições Gerais e Condições Específicas
      </h2>
      <p className="mb-3">
        <strong>CLÁUSULA DEZESSEIS:</strong> O sócio usuário (colaborador) que desejar adquirir
        uma arma para defesa no comércio deverá obter autorização da Polícia Federal ou do
        Exército e apresentar Prova de Aptidão e Manuseio de Armas e Teste Psicológico.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA DEZESSETE:</strong> O sócio declara ter ciência de que a legislação
        que controla os CACs é diferente daquela que rege as armas em mãos de cidadãos comuns.
        Essas normas constam no R-105, Decreto nº 3.665/2000 e Portaria COLOG nº 051/2015.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA DEZOITO:</strong> O sócio declara ter ciência de que CACs{" "}
        <strong>não possuem autorização para PORTE de arma</strong>, e sim, alguns deles, para
        POSSE e TRANSPORTE da arma, munições e acessórios de casa até os locais de competição,
        clubes de tiro, treinamentos e outros, autorizados pelas GUIAS DE TRÁFEGO.
      </p>
      <p className="mb-3">
        <strong>CLÁUSULA VINTE:</strong> É expressamente proibido ao sócio usuário
        (colaborador) utilizar armas de fogo sem registro, bem como utilizar os postos de tiro
        sem equipamentos de proteção auricular e visual.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        5. Da Rescisão do Contrato
      </h2>
      <p className="mb-3">
        <strong>CLÁUSULA VINTE E UM:</strong> A rescisão ou cancelamento do presente contrato
        poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO PRIMEIRO:</strong> Não será considerada motivação válida para
        rescisão contratual a não aprovação do sócio usuário (colaborador) nos testes de
        capacitação técnica e manuseio de armas de fogo e nos testes psicotécnicos pertinentes.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO SEGUNDO:</strong> Em caso de rescisão ou cancelamento deste contrato,
        a parte que der ensejo à rescisão deverá pagar à outra parte{" "}
        <strong>30% (trinta por cento)</strong> do valor da cota {p.nomeContrato} de sócio
        usuário (colaborador), independentemente da entrada e/ou das parcelas pagas, quantia
        que será liquidada no ato da rescisão ou do cancelamento.
      </p>
      <p className="mb-3">
        <strong>PARÁGRAFO TERCEIRO:</strong> O presente contrato reveste-se e é aceito pelos
        contratantes com força de <strong>título executivo extrajudicial</strong>, constituindo
        dívida líquida, certa e exigível.
      </p>
      <p className="mb-6">
        <strong>PARÁGRAFO QUARTO:</strong> A contratada PROTECT não se responsabiliza por
        promessas ou acordos que não façam parte deste contrato.
      </p>

      <h2 className="font-bold text-sm uppercase mb-3 mt-6">
        6. Termo de Responsabilidade para Uso dos Espaços de Tiro
      </h2>
      <p className="mb-3 text-justify">
        É expressamente proibido o ingresso e a utilização de armas sem registro no SIGMA ou no
        SINARM. Qualquer sócio, monitor ou instrutor poderá solicitar aos sócios os documentos
        relativos às armas trazidas ao clube. É obrigatório transportar as armas desmuniciadas
        nas dependências do clube, sendo vedado o manejo das armas fora do estande de tiro. A
        prática de atividades de tiro por menores de 18 anos deverá ser autorizada judicialmente
        e acompanhada do responsável legal.
      </p>
      <p className="mb-3 text-justify">
        Quando da prática da modalidade de tiro, deverão ser observadas as normas de conduta e
        segurança, bem como as orientações expedidas pelo Exército Brasileiro, sendo obrigatório
        o uso de óculos e protetores auriculares.
      </p>
      <p className="mb-6 text-justify font-semibold">
        É EXPRESSAMENTE PROIBIDO O INGRESSO E A UTILIZAÇÃO DE ARMAS E MUNIÇÕES SEM PROCEDÊNCIA
        LEGAL E JUSTIFICADA.
      </p>
      <p className="mb-8 text-justify">
        Eu, que abaixo assino, declaro ter recebido instruções de segurança e ter tomado
        conhecimento das normas legais estabelecidas em legislação pertinente, assumindo o
        compromisso pela minha participação nas atividades e pela minha permanência nas
        dependências da PROTECT. Declaro, ainda, que não possuo registro de antecedentes
        criminais e que os dados constantes nesta ficha são verdadeiros. Declaro ter ciência da
        necessidade de cumprir a Lei nº 10.826/2003, Decreto nº 5.123/2004, R-105 do Exército
        Brasileiro e demais normas aplicáveis.
      </p>

      <div className="border-t border-gray-200 pt-8 mt-8 space-y-8 text-xs">
        <p className="text-center">
          E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença
          das testemunhas.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <SigBlock
            imgSrc="/assinatura2.png"
            imgAlt="Assinatura Protect"
            lines={[
              "PROTECT CLUBE MINEIRO DE TIRO",
              "CNPJ: 01.244.200/0001-52",
              "ANTONIO C. COSTA JUNIOR",
            ]}
          />
          <SigBlock
            lines={[
              formData.nome || "SÓCIO USUÁRIO (COLABORADOR)",
              `CPF: ${formData.cpf || "___________________________"}`,
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <SigBlock
            imgSrc="/assinatura1.png"
            imgAlt="Assinatura Testemunha 1"
            label="TESTEMUNHA 1"
            lines={["EMMERSON N. DO CARMO", "CPF: 001.583.866-80"]}
          />
          <SigBlock
            imgSrc="/assinatura3.png"
            imgAlt="Assinatura Testemunha 2"
            label="TESTEMUNHA 2"
            lines={["NEWTON C. BAPTISTON", "CPF: 584.978.896-49"]}
          />
        </div>
        <p className="text-center text-gray-500">
          Belo Horizonte/MG,{" "}
          {new Date().toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-center text-gray-400">
          Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG
          <br />
          clube@grupoprotect.com.br · grupoprotect.com.br · (31) 3371-8500
        </p>
      </div>
    </div>
  );

  const renderDocumentPanel = (refProp: React.RefObject<HTMLDivElement>) => (
    <div className="flex-[1.6] flex flex-col overflow-hidden border-r border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText size={16} strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-widest font-medium">
            Contrato de Adesão — Protect
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-px h-4 bg-gray-200 mx-1 hidden md:block" />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition p-1 cursor-pointer hidden md:block"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 md:px-6 py-8" ref={scrollRef}>
        <div ref={refProp}>
          {contractContent}
        </div>
      </div>
    </div>
  );

  const renderFormPanel = () => (
    <div className="w-full md:w-85 shrink-0 flex flex-col bg-white border-t md:border-t-0 border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          Dados do Assinante
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Preencha para inserção no contrato.
        </p>
      </div>

      <form
        onSubmit={handleConfirm}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
      >
        <div>
          <p className={labelCls}>Plano de adesão</p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {(Object.keys(PLANOS) as PlanoKey[]).map((key) => {
              const op = PLANOS[key];
              const active = plano === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setPlano(key); setAccepted(false); }}
                  className={`flex flex-col items-start px-3 py-2.5 border text-left transition-all cursor-pointer rounded-sm ${active
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 hover:border-gray-400 text-gray-700"
                    }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {op.label}
                  </span>
                  <span className={`text-[11px] mt-0.5 ${active ? "text-gray-300" : "text-gray-400"}`}>
                    {op.parcela}/ano
                  </span>
                  <span className={`text-[10px] mt-1 font-semibold ${active ? "text-gray-200" : "text-gray-500"}`}>
                    Total: {op.total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-300 whitespace-nowrap">
            Identificação
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div>
          <label className={labelCls}>Nome completo</label>
          <input
            required
            type="text"
            placeholder="Como consta no RG"
            className={field}
            value={formData.nome}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, nome: e.target.value.toUpperCase() }))
            }
          />
        </div>

        <div>
          <label className={labelCls}>Profissão</label>
          <input
            required
            type="text"
            placeholder="Sua profissão"
            className={field}
            value={formData.profissao}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, profissao: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 min-w-0">
          <div className="min-w-0">
            <label className={labelCls}>RG</label>
            <input
              required
              type="text"
              placeholder="MG-00.000.000"
              className={field}
              value={formData.rg}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rg: e.target.value }))
              }
            />
          </div>
          <div className="min-w-0">
            <label className={labelCls}>CPF</label>
            <input
              required
              type="text"
              placeholder="000.000.000-00"
              className={field}
              maxLength={14}
              value={formData.cpf}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cpf: formatCPF(e.target.value) }))
              }
              onBlur={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                e.target.setCustomValidity(digits.length !== 11 ? "CPF inválido" : "");
                if (digits.length !== 11) e.target.reportValidity();
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 min-w-0">
          <div className="min-w-0">
            <label className={labelCls}>Naturalidade</label>
            <input
              required
              type="text"
              placeholder="Cidade/UF"
              className={field}
              value={formData.naturalidade}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, naturalidade: e.target.value }))
              }
            />
          </div>
          <div className="min-w-0">
            <label className={labelCls}>Nascimento — dd/mm/aaaa</label>
            <input
              required
              type="text"
              inputMode="numeric"
              placeholder="dd/mm/aaaa"
              maxLength={10}
              className={`${field} ${dateError ? "border-red-400 focus:border-red-500" : ""}`}
              value={formData.nascimento}
              onChange={(e) => handleDateChange(e.target.value)}
              onBlur={() => {
                if (formData.nascimento.length > 0 && formData.nascimento.length < 10)
                  setDateError("Data incompleta");
              }}
            />
            {dateError && (
              <p className="text-[10px] text-red-500 mt-1">{dateError}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-300 whitespace-nowrap">
            Contato
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div>
          <label className={labelCls}>E-mail</label>
          <input
            required
            type="email"
            placeholder="seu@email.com"
            className={field}
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div className="pt-2 space-y-4">
          <label className="flex items-start gap-2.5 cursor-pointer select-none p-3 border border-gray-100 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted((prev) => !prev)}
              className="mt-0.5 w-4 h-4 accent-gray-800 shrink-0 cursor-pointer"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              Li e concordo integralmente com todos os termos e cláusulas do contrato,
              incluindo as condições de pagamento, rescisão e responsabilidades.
              Ao assinar, seus dados serão registrados com segurança e protegidos
              de acordo com a LGPD (Lei nº 13.709/2018).
            </span>
          </label>
          <button
            type="submit"
            disabled={loading || !accepted || !!dateError}
            className="w-full py-3 bg-gray-900 text-white text-sm font-medium tracking-widest uppercase hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <CheckCircle size={15} />
                <span>Assinar Contrato</span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
            <Lock size={9} />
            <span>Documento seguro — MP 2.200-2/2001 · Lei 14.063/2017</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-2">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Resumo</p>
          <div className="bg-gray-50 border border-gray-100 rounded-sm px-3 py-2.5 space-y-1.5 text-xs text-gray-600">
            {(
              [
                ["Plano", `${plano} anos`],
                ["Valor total", p.total],
                ["1ª parcela", p.parcela],
                ["Vigência", p.vigencia],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-gray-400">{k}</span>
                <span className="font-semibold text-gray-800">{v}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
              Pagamento via PIX
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="border border-gray-200 p-2 bg-white shadow-sm">
                <img
                  src="/frame.png"
                  alt="QR Code PIX"
                  width={140}
                  height={140}
                  className="block"
                />
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-[11px] font-semibold text-gray-700">PIX CNPJ</p>
                <p className="text-[11px] text-gray-500 font-mono select-all cursor-copy">
                  01.244.200/0001-52
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Valor:{" "}
                  <span className="font-semibold text-gray-700">{p.parcela}</span>
                </p>
              </div>
              <div className="w-full border border-gray-100 bg-gray-50 rounded-sm px-3 py-2.5 space-y-1.5 text-[11px] text-gray-600">
                <p className="font-semibold text-gray-700 uppercase tracking-wide text-[10px] mb-2">
                  Dados Bancários
                </p>
                {(
                  [
                    ["Banco", "Bradesco"],
                    ["Agência", "2522-4 (Nova Suíça)"],
                    ["Conta", "118453-9"],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-200 pt-1.5 mt-0.5">
                  <span className="text-gray-400">PIX CNPJ</span>
                  <span className="font-medium font-mono select-all cursor-copy">
                    01.244.200/0001-52
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/5531992118500"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium tracking-wide transition-colors rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.532 5.854L.057 23.272a.75.75 0 0 0 .92.92l5.42-1.474A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-5.001-1.383l-.36-.214-3.733 1.015 1.016-3.733-.214-.36A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                Enviar comprovante — (31) 9 9211-8500
              </a>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </form>
    </div>
  );

  return (
    <>
      {showSuccess && (
        <SuccessModal
          email={formData.email}
          onClose={handleSuccessClose}
        />
      )}

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-0 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contract-title"
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className="bg-white w-full max-w-6xl h-full md:h-[95vh] flex flex-col shadow-2xl md:rounded overflow-hidden outline-none"
        >
          {/* MOBILE: tab bar */}
          <div className="md:hidden flex shrink-0 border-b border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setMobileTab("contrato")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${mobileTab === "contrato"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <AlignLeft size={14} /> Contrato
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("dados")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${mobileTab === "dados"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <PenLine size={14} /> Preencher
            </button>
            <button
              onClick={onClose}
              className="px-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          {/* MOBILE: painel ativo */}
          <div className="md:hidden flex-1 overflow-y-auto flex flex-col">
            {mobileTab === "contrato"
              ? renderDocumentPanel(contractRefMobile)
              : renderFormPanel()}
          </div>

          {/* DESKTOP: side-by-side */}
          <div className="hidden md:flex flex-1 overflow-hidden flex-row">
            {renderDocumentPanel(contractRefDesktop)}
            {renderFormPanel()}
          </div>
        </div>
      </div>
    </>
  );
}