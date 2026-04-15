
export const dynamic = "force-dynamic";

// ─── Helpers (copiados do ContractModal) ────────────────────────────────────

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

function isoToBR(iso: string): string {
  // Aceita "yyyy-mm-dd" → "dd/mm/yyyy"
  if (!iso || iso.length < 10) return iso ?? "";
  const [yyyy, mm, dd] = iso.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={imgAlt}
            className="max-h-20 max-w-full object-contain object-left"
          />
        )}
      </div>
      <div className="pt-2">
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

// ─── Página ──────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function ContratoPdfPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const formData = {
    nome: params.nome ?? "",
    email: params.email ?? "",
    cpf: params.cpf ?? "",
    rg: params.rg ?? "",
    profissao: params.profissao ?? "",
    naturalidade: params.naturalidade ?? "",
    // Aceita tanto ISO (yyyy-mm-dd) quanto BR (dd/mm/yyyy)
    nascimento: params.nascimento?.includes("-")
      ? isoToBR(params.nascimento)
      : (params.nascimento ?? ""),
  };

  const plano: PlanoKey =
    params.plano === "5" || params.plano === "5 anos" ? "5" : "3";
  const p = PLANOS[plano];

  // Helpers inline para o JSX do contrato
  const blank = (label: string, value: string, width = "min-w-[180px]") =>
    value ? (
      <span
        className={`inline-block px-1 font-semibold ${width}`}
      >
        {value}
      </span>
    ) : (
      <span
        className={`inline-block px-1 text-gray-300 ${width}`}
      >
        {label}
      </span>
    );

  const nascimentoDisplay =
    formData.nascimento.length === 10 ? formData.nascimento : "";

  const dataAssinatura = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    // Fundo branco puro, sem padding de viewport — Puppeteer captura a página inteira
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*
          Carrega Tailwind via CDN para garantir que os estilos estejam presentes
          quando o Puppeteer renderizar (o build do Next.js pode não incluir
          todas as classes nessa rota isolada).
          Em produção, se preferir, substitua pelo CSS gerado pelo build.
        */}
        <script src="https://cdn.tailwindcss.com" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
          
          * {
            border: none !important;
            border-top: none !important;
            border-bottom: none !important;
            border-left: none !important;
            border-right: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          
          body { 
            font-family: 'Libre Baskerville', Georgia, serif; 
            background: #fff;
            margin: 0;
            padding: 0;
          }
          
          html {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body className="bg-white">
        <div className="max-w-[170mm] mx-auto bg-white px-10 py-12 text-[13px] text-gray-800 leading-relaxed font-serif">

          {/* Cabeçalho */}
          <div className="text-center mb-8 pb-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
              Documento Legal
            </p>
            <h1 className="font-bold text-base uppercase leading-snug">
              Contrato de Adesão de Sócio Usuário (Colaborador)
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-widest text-gray-600">
              Cota {p.nomeContrato} — {p.vigencia}
            </div>
          </div>

          {/* Preâmbulo */}
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

          {/* 1. Preço */}
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

          {/* 2. Obrigações da Protect */}
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

          {/* 3. Direitos do Sócio */}
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

          {/* 4. Disposições Gerais */}
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

          {/* 5. Rescisão */}
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

          {/* 6. Termo de Responsabilidade */}
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

          {/* Assinaturas */}
          <div className="pt-8 mt-8 space-y-8 text-xs">
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
              Belo Horizonte/MG, {dataAssinatura}
            </p>
            <p className="text-center text-gray-400">
              Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG
              <br />
              clube@grupoprotect.com.br · grupoprotect.com.br · (31) 3371-8500
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}