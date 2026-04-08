import jsPDF from "jspdf";

export interface ContractData {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  rg?: string;
  profissao?: string;
  naturalidade?: string;
  nascimento?: string;
  dataAssinaturaString?: string;
  dataAssinatura?: { toDate: () => Date } | any;
  versaoContrato?: string;
  status?: string;
  hash?: string;
  createdAt?: any;
}

const loadImageAsBase64 = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = src;
  });

export async function generateContractPDFBase64(contract: ContractData): Promise<string> {
  const [s1, s2, s3] = await Promise.all([
    loadImageAsBase64("/assinatura1.png"),
    loadImageAsBase64("/assinatura2.png"),
    loadImageAsBase64("/assinatura3.png"),
  ]);
  const pdf = new jsPDF("p", "mm", "a4");
  buildPDFContent(pdf, contract, { s1, s2, s3 });
  return pdf.output("datauristring").split(",")[1];
}

export function buildPDFContent(
  pdf: jsPDF,
  contract: ContractData,
  sigs: { s1: string; s2: string; s3: string }
) {
  const W = pdf.internal.pageSize.getWidth();
  const H = pdf.internal.pageSize.getHeight();
  const ML = 25, MR = 25;
  const TW = W - ML - MR;
  const BOTTOM = H - 20;
  let y = 25;

  const nome = contract.nome?.toUpperCase() || "___________________________";
  const cpf = contract.cpf || "___________________________";
  const rg = contract.rg || "_______________";
  const profissao = contract.profissao || "_______________";
  const natural = contract.naturalidade || "_______________";
  const nasc = contract.nascimento
    ? contract.nascimento.split("-").reverse().join("/")
    : "__/__/____";

  const getContractDate = (): Date => {
    if (contract.dataAssinatura?.toDate) return contract.dataAssinatura.toDate();
    if (contract.dataAssinaturaString) return new Date(contract.dataAssinaturaString);
    return new Date();
  };

  const dataAssinatura = getContractDate();
  const dataAtual = dataAssinatura.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const newPageIfNeeded = (needed = 18) => {
    if (y + needed > BOTTOM) { pdf.addPage(); y = 25; }
  };

  const text = (str: string, xPos: number, yPos: number, opts: any = {}) => {
    const { size = 10, bold = false, italic = false, align = "left", color = [20, 20, 20] } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(str, xPos, yPos, { align });
  };

  const para = (str: string, opts: any = {}) => {
    const { size = 10, bold = false, italic = false, color = [20, 20, 20] } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(str, TW) as string[];
    const lh = size * 0.45;
    newPageIfNeeded(lines.length * lh + 3);
    pdf.text(lines, ML, y);
    y += lines.length * lh + 3;
  };

  const sectionTitle = (str: string) => {
    newPageIfNeeded(12);
    y += 4;
    text(str, ML, y, { size: 10, bold: true });
    y += 1.5;
    pdf.setDrawColor(120, 120, 120);
    pdf.setLineWidth(0.3);
    pdf.line(ML, y, ML + TW, y);
    y += 5;
  };

  const clause = (title: string, body: string) => {
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(title + " " + body, TW) as string[];
    const lh = 10 * 0.45;
    newPageIfNeeded(lines.length * lh + 4);
    lines.forEach((line, i) => {
      if (i === 0) {
        pdf.setFont("times", "bold"); pdf.setTextColor(20, 20, 20);
        pdf.text(title + " ", ML, y);
        const tw = pdf.getStringUnitWidth(title + " ") * (10 / pdf.internal.scaleFactor);
        pdf.setFont("times", "normal");
        pdf.text(line.substring(title.length + 1), ML + tw, y);
      } else {
        pdf.setFont("times", "normal"); pdf.text(line, ML, y);
      }
      y += lh;
    });
    y += 3;
  };

  // ── Cabeçalho ──────────────────────────────────────────────────────────────
  text("CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)", W / 2, y, { size: 12, bold: true, align: "center" });
  y += 7;
  text("Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52", W / 2, y, { size: 9, align: "center", color: [80, 80, 80] });
  y += 3;
  pdf.setDrawColor(180, 180, 180); pdf.setLineWidth(0.5);
  pdf.line(ML, y, ML + TW, y);
  y += 8;

  para(`Pelo presente instrumento particular de CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR), de um lado, Protect Clube Mineiro de Tiro, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 01.244.200/0001-52, com sede na Rua General Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por quem de direito, doravante simplesmente denominada PROTECT; e, de outro lado, o(a) Sr.(a) ${nome}, profissão ${profissao}, inscrito(a) no RG nº ${rg}, portador(a) do CPF nº ${cpf}, natural de ${natural}, nascido(a) em ${nasc}, doravante simplesmente denominado(a) SÓCIO USUÁRIO (COLABORADOR).`);
  para("O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a eleição do foro da Comarca de Belo Horizonte/MG.", { italic: true, color: [60, 60, 60] });
  y += 3;

  sectionTitle("1. DO PREÇO E DA FORMA DE PAGAMENTO");
  clause("CLÁUSULA PRIMEIRA:", "O valor total do contrato, correspondente à cota trienal (vigente por três anos), é de R$ 3.600,00 (três mil e seiscentos reais), ficando isento o pagamento de taxa de contribuição social mensal.");
  clause("PARÁGRAFO PRIMEIRO:", "Declara o sócio usuário (colaborador), neste ato, ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente, de três em três anos.");
  clause("PARÁGRAFO SEGUNDO:", "O pagamento deverá ser efetuado no ato da assinatura deste contrato, no valor de R$ 1.200,00 (anuidade), correspondente à primeira parcela.");
  clause("PARÁGRAFO QUARTO:", "Será considerado inadimplente o sócio usuário (colaborador) que atrasar qualquer pagamento por período superior a 30 (trinta) dias do vencimento, ficando expressamente suspensos os direitos previstos nas cláusulas sexta e sétima deste contrato.");
  clause("PARÁGRAFO SEXTO:", "Em caso de atraso superior a 60 (sessenta) dias, o sócio será notificado. O cancelamento implicará multa de 30% sobre o valor total da cota trienal contratada.");

  sectionTitle("2. DAS OBRIGAÇÕES DA CONTRATADA PROTECT");
  clause("CLÁUSULA SEGUNDA:", "Permitir a frequência do sócio usuário (colaborador) às áreas comuns do Clube PROTECT dentro do horário de funcionamento, bem como a utilização dos estandes de tiro.");
  clause("CLÁUSULA TERCEIRA:", "Oferecer condições adequadas para a realização de cursos, testes de tiro e capacitação técnica, bem como manter despachantes no clube para pleitos junto à Polícia Federal e ao Exército.");
  clause("CLÁUSULA QUARTA:", "Manter as instalações em permanentes condições de uso; disponibilizar, a título gratuito e em caráter de empréstimo, óculos de proteção, abafadores e armas do acervo do clube para atiradores com CR válido.");

  sectionTitle("3. DOS DIREITOS DO SÓCIO USUÁRIO (COLABORADOR)");
  clause("CLÁUSULA SEXTA:", "Frequentar, utilizar e participar de todas as opções recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da anuidade.");
  clause("CLÁUSULA SÉTIMA:", "Ter prioridade na tramitação de pleitos junto ao Exército e à Polícia Federal; prioridade na utilização de estandes; prioridade para realização de testes de tiro e capacitação técnica.");
  clause("CLÁUSULA DÉCIMA:", "Zelar pelo patrimônio do clube. É expressamente proibido que menores de 18 anos manuseiem, utilizem ou portem qualquer tipo de arma de fogo, à exceção daqueles com autorização judicial.");

  sectionTitle("4. DISPOSIÇÕES GERAIS");
  clause("CLÁUSULA DEZOITO:", "O sócio declara ter ciência de que CACs não possuem autorização para PORTE de arma, e sim, alguns deles, para POSSE e TRANSPORTE da arma, munições e acessórios, autorizados pelas GUIAS DE TRÁFEGO.");

  sectionTitle("5. DA RESCISÃO DO CONTRATO");
  clause("CLÁUSULA VINTE E UM:", "A rescisão ou cancelamento do presente contrato poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.");
  clause("PARÁGRAFO SEGUNDO:", "Em caso de rescisão ou cancelamento deste contrato, a parte que der ensejo à rescisão deverá pagar à outra parte 30% (trinta por cento) do valor da cota trienal.");
  clause("PARÁGRAFO TERCEIRO:", "O presente contrato reveste-se da força de título executivo extrajudicial, constituindo dívida líquida, certa e exigível.");

  sectionTitle("6. TERMO DE RESPONSABILIDADE");
  para("É expressamente proibido o ingresso e a utilização de armas sem registro no SIGMA ou no SINARM. É obrigatório transportar as armas desmuniciadas e usar óculos e protetores auriculares.");
  para("É EXPRESSAMENTE PROIBIDO O INGRESSO E A UTILIZAÇÃO DE ARMAS E MUNIÇÕES SEM PROCEDÊNCIA LEGAL E JUSTIFICADA.", { bold: true });

  // ── Assinaturas ────────────────────────────────────────────────────────────
  newPageIfNeeded(90);
  y += 5;
  para("E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença das testemunhas.");
  y += 6;

  const col = TW / 2 - 5;
  const sigH = 18;
  const sigW = 45;

  try { pdf.addImage(sigs.s2, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}

  y += sigH + 1;

  pdf.setDrawColor(80, 80, 80); pdf.setLineWidth(0.4);
  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 10, y, ML + TW, y);
  y += 4;
  text("PROTECT CLUBE MINEIRO DE TIRO", ML, y, { size: 9, bold: true });
  text(nome, ML + col + 10, y, { size: 9, bold: true });
  y += 4;
  text("CNPJ: 01.244.200/0001-52", ML, y, { size: 8, color: [100, 100, 100] });
  text(`CPF: ${cpf}`, ML + col + 10, y, { size: 8, color: [100, 100, 100] });

  y += 16;

  try { pdf.addImage(sigs.s1, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}
  try { pdf.addImage(sigs.s3, "PNG", ML + col + 10, y, sigW, sigH, undefined, "FAST"); } catch (_) {}

  y += sigH + 1;

  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 10, y, ML + TW, y);
  y += 4;
  text("TESTEMUNHA 1", ML, y, { size: 8, color: [100, 100, 100] });
  text("TESTEMUNHA 2", ML + col + 10, y, { size: 8, color: [100, 100, 100] });
  y += 4;
  text("EMMERSON N. DO CARMO", ML, y, { size: 9 });
  text("NEWTON C. BAPTISTON", ML + col + 10, y, { size: 9 });
  y += 4;
  text("CPF: 001.583.866-80", ML, y, { size: 8, color: [100, 100, 100] });
  text("CPF: 584.978.896-49", ML + col + 10, y, { size: 8, color: [100, 100, 100] });
  y += 12;

  text(`Belo Horizonte/MG, ${dataAtual}`, W / 2, y, { size: 9, align: "center", color: [80, 80, 80] });
  y += 5;
  text("Rua General Andrade Neves, 622, Grajaú, CEP 30431-128, Belo Horizonte/MG", W / 2, y, { size: 7.5, align: "center", color: [120, 120, 120] });
  y += 4;
  text("clube@grupoprotect.com.br  ·  grupoprotect.com.br  ·  (31) 3371-8500", W / 2, y, { size: 7.5, align: "center", color: [120, 120, 120] });

  const totalPages = (pdf.internal as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8); pdf.setFont("helvetica", "normal"); pdf.setTextColor(160, 160, 160);
    pdf.text(`${i} / ${totalPages}`, W - MR, H - 10, { align: "right" });
  }
}