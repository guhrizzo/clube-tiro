"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, CheckCircle, FileText, Lock, AlertCircle } from "lucide-react";
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
  profissao: string;
  naturalidade: string;
  nascimento: string;
}

export default function ContractModal({ isOpen, onClose }: ContractModalProps) {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpf: "",
    rg: "",
    profissao: "",
    naturalidade: "",
    nascimento: "",
  });

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
        hash: Math.random().toString(36).substring(2, 15),
      });
      alert("Contrato assinado e registrado com sucesso!");
      onClose();
    } catch {
      alert("Erro ao salvar assinatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (v: string) =>
    v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const field = "w-full px-2 py-1.5 border-b border-gray-400 bg-transparent text-sm outline-none focus:border-gray-800 transition-colors placeholder:text-gray-400";
  const label = "block text-[11px] uppercase tracking-widest text-gray-500 mb-1";

  const blank = (label: string, value: string, width = "min-w-[180px]") =>
    value ? (
      <span className={`inline-block border-b border-gray-700 px-1 font-semibold ${width}`}>{value}</span>
    ) : (
      <span className={`inline-block border-b border-gray-400 px-1 text-gray-300 ${width}`}>{label}</span>
    );

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white w-full max-w-6xl h-full md:h-[95vh] flex flex-col md:flex-row shadow-2xl md:rounded overflow-hidden outline-none"
      >
        {/* LEFT: Contract Document */}
        <div className="flex-[1.6] flex flex-col overflow-hidden border-r border-gray-200">
          {/* Doc header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-gray-700">
              <FileText size={16} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-widest font-medium">Contrato de Adesão — Protect</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition p-1" aria-label="Fechar">
              <X size={18} />
            </button>
          </div>

          {/* Scrollable doc */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8" ref={scrollRef}>
            <div className="max-w-170 mx-auto bg-white border border-gray-200 px-10 py-12 text-[13px] text-gray-800 leading-relaxed font-serif shadow-sm">

              {/* Title */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">Documento Legal</p>
                <h1 className="font-bold text-base uppercase leading-snug" id="contract-title">
                  Contrato de Adesão de Sócio Usuário (Colaborador)
                </h1>
                <p className="text-xs text-gray-500 mt-2">Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52</p>
              </div>

              {/* Intro */}
              <p className="mb-4 text-justify">
                Pelo presente instrumento particular de <strong>CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)</strong>, de um lado, <strong>Protect Clube Mineiro de Tiro</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <strong>01.244.200/0001-52</strong>, com sede na Rua General Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por quem de direito, doravante simplesmente denominada <strong>PROTECT</strong>; e, de outro lado, o(a) Sr.(a) {blank("Nome completo", formData.nome, "min-w-[220px]")}, profissão {blank("Profissão", formData.profissao, "min-w-[140px]")}, inscrito(a) no RG nº {blank("RG", formData.rg, "min-w-[120px]")}, portador(a) do CPF nº {blank("CPF", formData.cpf, "min-w-[130px]")}, natural de {blank("Naturalidade", formData.naturalidade, "min-w-[120px]")}, nascido(a) em {blank("__/__/____", formData.nascimento ? new Date(formData.nascimento).toLocaleDateString("pt-BR") : "", "min-w-[90px]")}, doravante simplesmente denominado(a) <strong>SÓCIO USUÁRIO (COLABORADOR)</strong>, têm entre si justo e contratado o direito de sócio usuário (colaborador) da PROTECT, tudo de acordo com as condições especificadas nesta contratação/adesão e na legislação vigente.
              </p>
              <p className="mb-6 text-justify">
                O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a eleição do foro da Comarca de Belo Horizonte/MG para dirimir quaisquer pendências relativas ao presente instrumento.
              </p>

              {/* Section 1 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">1. Do Preço e da Forma de Pagamento</h2>

              <p className="mb-3"><strong>CLÁUSULA PRIMEIRA:</strong> O valor total do contrato, correspondente à cota trienal (vigente por três anos), é de <strong>R$ 3.600,00 (três mil e seiscentos reais)</strong>, ficando isento o pagamento de taxa de contribuição social mensal.</p>

              <p className="mb-3"><strong>PARÁGRAFO PRIMEIRO:</strong> Declara o sócio usuário (colaborador), neste ato, ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente, de três em três anos.</p>

              <p className="mb-3"><strong>PARÁGRAFO SEGUNDO:</strong> O pagamento deverá ser efetuado no ato da assinatura deste contrato, no valor de R$ 1.200,00 (anuidade), correspondente à primeira parcela, salvo eventual desconto ou condição diferenciada. Em caso de parcelamento, o valor remanescente será reajustado ao final de cada ano pelo IGP-M ou índice substituto. Independentemente da data de ingresso, o pagamento será anual e válido até o último dia de dezembro. Este contrato também servirá como recibo, mediante comprovação de depósito via PIX CNPJ nº 01.244.200/0001-52 ou por link de cartão de crédito do clube.</p>

              <p className="mb-3"><strong>PARÁGRAFO TERCEIRO:</strong> Caso a contratação seja realizada em mês diverso de janeiro, o contrato permanecerá vigente até o mesmo mês de janeiro, três anos após o ingresso, sendo que as parcelas remanescentes também vencerão até o dia 10 daquele mês, em cada um dos três anos subsequentes.</p>

              <p className="mb-3"><strong>PARÁGRAFO QUARTO:</strong> Será considerado inadimplente o sócio usuário (colaborador) que atrasar qualquer pagamento por período superior a <strong>30 (trinta) dias</strong> do vencimento, ficando expressamente suspensos os direitos previstos nas cláusulas sexta e sétima, independentemente de comunicação prévia, até a quitação do débito.</p>

              <p className="mb-3"><strong>PARÁGRAFO QUINTO:</strong> Nos casos de parcelamento, a cobrança se dará mediante emissão de boleto bancário. O não recebimento do boleto não exime o sócio de realizar o pagamento na data acordada.</p>

              <div className="border-l-2 border-gray-300 pl-4 my-4 py-1">
                <p className="mb-0 text-xs text-gray-700">
                  <strong>PARÁGRAFO SEXTO:</strong> Em caso de atraso superior a 60 (sessenta) dias, o sócio será notificado e terá 10 (dez) dias para liquidação. Persistindo a pendência, a PROTECT poderá encaminhar o nome ao SPC. O cancelamento ou rescisão implicará o vencimento antecipado das parcelas remanescentes, acrescidas de <strong>multa de 30%</strong> sobre o valor total da cota trienal, além de correção monetária. Cobrança administrativa: +10% de honorários; cobrança judicial: +20% de honorários.
                </p>
              </div>

              {/* Section 2 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">2. Das Obrigações da Contratada Protect</h2>

              <p className="mb-3"><strong>CLÁUSULA SEGUNDA:</strong> Permitir a frequência do sócio usuário (colaborador) às áreas comuns do Clube PROTECT dentro do horário de funcionamento, bem como a utilização dos estandes de tiro, ressalvada a hipótese de o local estar sendo utilizado por determinadas categorias profissionais ou para cursos e capacitação.</p>

              <p className="mb-3"><strong>CLÁUSULA TERCEIRA:</strong> Oferecer condições adequadas para a realização de cursos, testes de tiro e capacitação técnica, atividades sociais, culturais, recreativas e desportivas, bem como manter despachantes no clube para pleitos junto à Polícia Federal e ao Exército, ressalvando que os serviços documentais e de despachante serão cobrados separadamente.</p>

              <p className="mb-3"><strong>CLÁUSULA QUARTA:</strong> Manter as instalações limpas e em permanentes condições de uso; disponibilizar, a título oneroso, alvos e equipamentos obrigatórios para testes e cursos; e disponibilizar, a título gratuito e em caráter de empréstimo, óculos de proteção, abafadores de ouvido e armas do acervo do clube para atiradores com CR válido.</p>

              <p className="mb-3"><strong>CLÁUSULA QUINTA:</strong> Ofertar ao sócio usuário (colaborador), armas de fogo, munição, acessórios, equipamentos de proteção e defesa individual, armas de ar comprimido, airsoft e outros itens para compra ou aquisição. Disponibilizar, sempre que necessário, declaração de que o sócio é filiado à entidade e participa regularmente das atividades.</p>

              {/* Section 3 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">3. Dos Direitos do Sócio Usuário (Colaborador)</h2>

              <p className="mb-3"><strong>CLÁUSULA SEXTA:</strong> Frequentar, utilizar e participar de todas as opções recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da anuidade. O sócio declara ter ciência de que cursos, testes de capacitação e tiro, bem como algumas opções recreativas, serão disponibilizados a título oneroso, a ser calculado evento a evento.</p>

              <p className="mb-3"><strong>CLÁUSULA SÉTIMA:</strong> Ter prioridade na tramitação de pleitos junto ao Exército e à Polícia Federal; na utilização de estandes; para realização de testes de tiro e capacitação técnica; nas vagas para participação em opções recreativas, desportivas e culturais; e para utilização de equipamentos de proteção individual e armas do acervo do clube.</p>

              <p className="mb-3"><strong>CLÁUSULA OITAVA:</strong> Caso a legislação vigente permita, fazer-se acompanhar de terceiros nas dependências do clube PROTECT, mediante preenchimento e assinatura de termo de compromisso, respondendo o sócio usuário (colaborador) por aqueles convidados que agirem com imperícia, imprudência ou negligência.</p>

              <p className="mb-3"><strong>CLÁUSULA NONA:</strong> Fazer requerimento para obtenção de CR de Colecionador, Atirador ou Caçador, observados os requisitos elencados pelo Estatuto do Desarmamento e portarias vigentes da Polícia Federal e do Exército, sendo necessário ter 25 anos. Antes disso, o interessado poderá obter autorização judicial.</p>

              <p className="mb-3"><strong>CLÁUSULA DÉCIMA:</strong> Zelar pelo patrimônio do clube, responsabilizando-se por si e por seus convidados, inclusive por danos ou despesas que venham a causar. É <strong>expressamente proibido que menores de 18 anos</strong> manuseiem, utilizem ou portem qualquer tipo de arma de fogo, à exceção daqueles com autorização judicial.</p>

              <p className="mb-3"><strong>CLÁUSULA ONZE:</strong> Pagar pontualmente as parcelas para quitação do título trienal de sócio usuário (colaborador), quando parcelado.</p>

              <p className="mb-3"><strong>CLÁUSULA DOZE:</strong> Obedecer às normas disciplinares e aos horários de frequência às dependências do clube, sendo proibida a ingestão de bebidas alcoólicas e/ou drogas ilícitas nas áreas de tiro.</p>

              <p className="mb-3"><strong>CLÁUSULA TREZE:</strong> O ingresso às áreas de tiro se fará mediante identificação facial e/ou apresentação da carteira social. A condição de sócio usuário (colaborador) não confere direito de propriedade sobre qualquer parcela do patrimônio do clube.</p>

              <p className="mb-3"><strong>CLÁUSULA QUATORZE:</strong> O teste de manuseio e capacitação técnica constitui espécie de curso com testes escritos e práticos, ministrados por instrutores credenciados pela Polícia Federal, dos quais o interessado deverá participar e ser aprovado para obtenção ou renovação de CR.</p>

              {/* Section 4 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">4. Disposições Gerais e Condições Específicas</h2>

              <p className="mb-3"><strong>CLÁUSULA DEZESSEIS:</strong> O sócio usuário (colaborador) que desejar adquirir uma arma para defesa no comércio deverá obter autorização da Polícia Federal ou do Exército e apresentar Prova de Aptidão e Manuseio de Armas e Teste Psicológico.</p>

              <p className="mb-3"><strong>CLÁUSULA DEZESSETE:</strong> O sócio declara ter ciência de que a legislação que controla os CACs é diferente daquela que rege as armas em mãos de cidadãos comuns. Essas normas constam no R-105, Decreto nº 3.665/2000 e Portaria COLOG nº 051/2015.</p>

              <div className="border border-gray-300 p-4 my-4 text-xs text-gray-700">
                <p className="font-bold mb-1 uppercase tracking-wide text-gray-800">⚠ Porte de Arma — Atenção</p>
                <p><strong>CLÁUSULA DEZOITO:</strong> O sócio declara ter ciência de que CACs <strong>não possuem autorização para PORTE de arma</strong>, e sim, alguns deles, para POSSE e TRANSPORTE da arma, munições e acessórios de casa até os locais de competição, clubes de tiro, treinamentos e outros, autorizados pelas GUIAS DE TRÁFEGO.</p>
              </div>

              <p className="mb-3"><strong>CLÁUSULA VINTE:</strong> É expressamente proibido ao sócio usuário (colaborador) utilizar armas de fogo sem registro, bem como utilizar os postos de tiro sem equipamentos de proteção auricular e visual.</p>

              {/* Section 5 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">5. Da Rescisão do Contrato</h2>

              <p className="mb-3"><strong>CLÁUSULA VINTE E UM:</strong> A rescisão ou cancelamento do presente contrato poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.</p>

              <p className="mb-3"><strong>PARÁGRAFO PRIMEIRO:</strong> Não será considerada motivação válida para rescisão contratual a não aprovação do sócio usuário (colaborador) nos testes de capacitação técnica e manuseio de armas de fogo e nos testes psicotécnicos pertinentes.</p>

              <p className="mb-3"><strong>PARÁGRAFO SEGUNDO:</strong> Em caso de rescisão ou cancelamento deste contrato, a parte que der ensejo à rescisão deverá pagar à outra parte <strong>30% (trinta por cento)</strong> do valor da cota trienal de sócio usuário (colaborador), independentemente da entrada e/ou das parcelas pagas, quantia que será liquidada no ato da rescisão ou do cancelamento.</p>

              <p className="mb-3"><strong>PARÁGRAFO TERCEIRO:</strong> O presente contrato reveste-se e é aceito pelos contratantes com força de <strong>título executivo extrajudicial</strong>, constituindo dívida líquida, certa e exigível.</p>

              <p className="mb-6"><strong>PARÁGRAFO QUARTO:</strong> A contratada PROTECT não se responsabiliza por promessas ou acordos que não façam parte deste contrato.</p>

              {/* Section 6 */}
              <h2 className="font-bold text-sm uppercase mb-3 mt-6">6. Termo de Responsabilidade para Uso dos Espaços de Tiro</h2>

              <p className="mb-3 text-justify">É expressamente proibido o ingresso e a utilização de armas sem registro no SIGMA ou no SINARM. Qualquer sócio, monitor ou instrutor poderá solicitar aos sócios os documentos relativos às armas trazidas ao clube. É obrigatório transportar as armas desmuniciadas nas dependências do clube, sendo vedado o manejo das armas fora do estande de tiro. A prática de atividades de tiro por menores de 18 anos deverá ser autorizada judicialmente e acompanhada do responsável legal.</p>

              <p className="mb-3 text-justify">Quando da prática da modalidade de tiro, deverão ser observadas as normas de conduta e segurança, bem como as orientações expedidas pelo Exército Brasileiro, sendo obrigatório o uso de óculos e protetores auriculares.</p>

              <p className="mb-6 text-justify font-semibold">É EXPRESSAMENTE PROIBIDO O INGRESSO E A UTILIZAÇÃO DE ARMAS E MUNIÇÕES SEM PROCEDÊNCIA LEGAL E JUSTIFICADA.</p>

              <p className="mb-8 text-justify">Eu, que abaixo assino, declaro ter recebido instruções de segurança e ter tomado conhecimento das normas legais estabelecidas em legislação pertinente, assumindo o compromisso pela minha participação nas atividades e pela minha permanência nas dependências da PROTECT. Declaro, ainda, que não possuo registro de antecedentes criminais e que os dados constantes nesta ficha são verdadeiros. Declaro ter ciência da necessidade de cumprir a Lei nº 10.826/2003, Decreto nº 5.123/2004, R-105 do Exército Brasileiro e demais normas aplicáveis.</p>

              {/* Signature block */}
              <div className="border-t border-gray-200 pt-8 mt-8 space-y-8 text-xs">
                <p className="text-center">E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença das testemunhas.</p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="border-t border-gray-500 pt-2">
                      <p className="font-bold">PROTECT CLUBE MINEIRO DE TIRO</p>
                      <p className="text-gray-500">CNPJ: 01.244.200/0001-52</p>
                      <p className="text-gray-500 mt-1">ANTONIO C. COSTA JUNIOR</p>
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-gray-500 pt-2">
                      <p className="font-bold">{formData.nome || "SÓCIO USUÁRIO (COLABORADOR)"}</p>
                      <p className="text-gray-500">CPF: {formData.cpf || "___________________________"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="border-t border-gray-400 pt-2">
                      <p className="text-gray-500">TESTEMUNHA 1</p>
                      <p>EMMERSON N. DO CARMO</p>
                      <p className="text-gray-500">CPF: 001.583.866-80</p>
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-gray-400 pt-2">
                      <p className="text-gray-500">TESTEMUNHA 2</p>
                      <p>NEWTON C. BAPTISTON</p>
                      <p className="text-gray-500">CPF: 584.978.896-49</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-500">
                  Belo Horizonte/MG, {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="text-center text-gray-400">Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG<br />clube@grupoprotect.com.br · grupoprotect.com.br · (31) 3371-8500</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="w-full md:w-85 shrink-0 flex flex-col bg-white border-t md:border-t-0 border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">Dados do Assinante</h3>
            <p className="text-xs text-gray-500 mt-0.5">Preencha seus dados para inserção no contrato.</p>
          </div>

          <form onSubmit={handleConfirm} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

            <div>
              <label className={label}>Nome completo</label>
              <input required type="text" placeholder="Como consta no RG" className={field}
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value.toUpperCase() })} />
            </div>

            <div>
              <label className={label}>Profissão</label>
              <input required type="text" placeholder="Sua profissão" className={field}
                value={formData.profissao}
                onChange={(e) => setFormData({ ...formData, profissao: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>RG</label>
                <input required type="text" placeholder="MG-00.000.000" className={field}
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })} />
              </div>
              <div>
                <label className={label}>CPF</label>
                <input required type="text" placeholder="000.000.000-00" className={field} maxLength={14}
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })} />
              </div>
              
            </div>

            <div>
              <label className={label}>E-mail</label>
              <input required type="email" placeholder="seu@email.com" className={field}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Naturalidade</label>
                <input required type="text" placeholder="Cidade/UF" className={field}
                  value={formData.naturalidade}
                  onChange={(e) => setFormData({ ...formData, naturalidade: e.target.value })} />
              </div>
              <div>
                <label className={label}>Nascimento</label>
                <input required type="date" className={field}
                  value={formData.nascimento}
                  onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })} />
              </div>
            </div>

            {/* Accept + Submit */}
            <div className="pt-2 space-y-4">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)}
                  className="mt-0.5 w-4 h-4 accent-gray-800 shrink-0" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Li e concordo integralmente com todos os termos e cláusulas do contrato acima, incluindo as condições de pagamento, rescisão e responsabilidades.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || !accepted}
                className="w-full py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Processando...</span></>
                ) : (
                  <><CheckCircle size={15} /><span>Assinar Contrato</span></>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <Lock size={9} />
                <span>Documento seguro — MP 2.200-2/2001 · Lei 14.063/2017</span>
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Resumo</p>
              <div className="space-y-1 text-xs text-gray-600">
                {[
                  ["Valor total", "R$ 3.600,00"],
                  ["1ª parcela", "R$ 1.200,00"],
                  ["Vigência", "3 anos"],
                  ["Multa rescisão", "30%"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400">{k}</span>
                    <span className="font-medium text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}