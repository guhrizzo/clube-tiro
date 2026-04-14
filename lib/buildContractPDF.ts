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
  plano?: string;
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
  const ML = 15, MR = 15;
  const TW = W - ML - MR;
  const BOTTOM = H - 15;
  let y = 20;

  const nome = contract.nome?.toUpperCase() || "___________________________";
  const cpf = contract.cpf || "___________________________";
  const rg = contract.rg || "_______________";
  const profissao = contract.profissao || "_______________";
  const natural = contract.naturalidade || "_______________";
  const nasc = contract.nascimento
    ? contract.nascimento.split("-").reverse().join("/")
    : "__/__/____";

  // Parse do plano
  const planoStr = contract.plano || "3 anos";
  const isPlano5 = planoStr.includes("5");
  const nomeContrato = isPlano5 ? "quinquenal" : "trienal";
  const nomePrazo = isPlano5 ? "cinco" : "três";
  const total = isPlano5 ? "R$ 6.000,00" : "R$ 3.600,00";
  const vigencia = isPlano5 ? "5 anos" : "3 anos";

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

  const newPageIfNeeded = (needed = 15) => {
    if (y + needed > BOTTOM) { pdf.addPage(); y = 15; }
  };

  const text = (str: string, xPos: number, yPos: number, opts: any = {}) => {
    const { size = 9, bold = false, italic = false, align = "left", color = [20, 20, 20] } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(str, xPos, yPos, { align });
  };

  const para = (str: string, opts: any = {}) => {
    const { size = 9, bold = false, italic = false, color = [20, 20, 20] } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(str, TW) as string[];
    const lh = size * 0.4;
    newPageIfNeeded(lines.length * lh + 2);
    pdf.text(lines, ML, y);
    y += lines.length * lh + 2;
  };

  const sectionTitle = (str: string) => {
    newPageIfNeeded(10);
    y += 3;
    text(str, ML, y, { size: 9, bold: true });
    y += 1;
    pdf.setDrawColor(120, 120, 120);
    pdf.setLineWidth(0.3);
    pdf.line(ML, y, ML + TW, y);
    y += 4;
  };

  const clause = (title: string, body: string) => {
    pdf.setFontSize(9);
    const lines = pdf.splitTextToSize(title + " " + body, TW) as string[];
    const lh = 9 * 0.4;
    newPageIfNeeded(lines.length * lh + 3);
    lines.forEach((line, i) => {
      if (i === 0) {
        pdf.setFont("times", "bold"); pdf.setTextColor(20, 20, 20);
        pdf.text(title + " ", ML, y);
        const tw = pdf.getStringUnitWidth(title + " ") * (9 / pdf.internal.scaleFactor);
        pdf.setFont("times", "normal");
        pdf.text(line.substring(title.length + 1), ML + tw, y);
      } else {
        pdf.setFont("times", "normal"); pdf.text(line, ML, y);
      }
      y += lh;
    });
    y += 2;
  };

  // ── Cabeçalho ──────────────────────────────────────────────────────────────
  text("CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)", W / 2, y, { size: 11, bold: true, align: "center" });
  y += 5;
  text("Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52", W / 2, y, { size: 8, align: "center", color: [80, 80, 80] });
  y += 3;
  pdf.setDrawColor(180, 180, 180); pdf.setLineWidth(0.4);
  pdf.line(ML, y, ML + TW, y);
  y += 6;

  para(`Pelo presente instrumento particular de CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR), de um lado, Protect Clube Mineiro de Tiro, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 01.244.200/0001-52, com sede na Rua General Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por quem de direito, doravante simplesmente denominada PROTECT; e, de outro lado, o(a) Sr.(a) ${nome}, profissão ${profissao}, inscrito(a) no RG nº ${rg}, portador(a) do CPF nº ${cpf}, natural de ${natural}, nascido(a) em ${nasc}, doravante simplesmente denominado(a) SÓCIO USUÁRIO (COLABORADOR), têm entre si justo e contratado o direito de sócio usuário (colaborador) da PROTECT, tudo de acordo com as condições especificadas nesta contratação/adesão e na legislação vigente.`, { size: 8.5 });
  para("O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a eleição do foro da Comarca de Belo Horizonte/MG para dirimir quaisquer pendências relativas ao presente instrumento.", { italic: true, color: [60, 60, 60], size: 8.5 });
  y += 2;

  sectionTitle("1. DO PREÇO E DA FORMA DE PAGAMENTO");
  clause("CLÁUSULA PRIMEIRA:", `O valor total do contrato, correspondente à cota ${nomeContrato} (vigente por ${nomePrazo} anos), é de ${total}, ficando isento o pagamento de taxa de contribuição social mensal.`);
  clause("PARÁGRAFO PRIMEIRO:", "Declara o sócio usuário (colaborador), neste ato, ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente, de três em três anos.");
  clause("PARÁGRAFO SEGUNDO:", `O pagamento deverá ser efetuado no ato da assinatura deste contrato, no valor de R$ 1.200,00 (anuidade), correspondente à primeira parcela, salvo eventual desconto ou condição diferenciada. Em caso de parcelamento, o valor remanescente será reajustado ao final de cada ano pelo IGP-M ou índice substituto. Independentemente da data de ingresso, o pagamento será anual e válido até o último dia de dezembro. Este contrato também servirá como recibo, mediante comprovação de depósito via PIX CNPJ nº 01.244.200/0001-52 ou por link de cartão de crédito do clube.`);
  clause("PARÁGRAFO TERCEIRO:", `Caso a contratação seja realizada em mês diverso de janeiro, o contrato permanecerá vigente até o mesmo mês de janeiro, ${nomePrazo} anos após o ingresso, sendo que as parcelas remanescentes também vencerão até o dia 10 daquele mês, em cada um dos ${nomePrazo} anos subsequentes.`);
  clause("PARÁGRAFO QUARTO:", "Será considerado inadimplente o sócio usuário (colaborador) que atrasar qualquer pagamento por período superior a 30 (trinta) dias do vencimento, ficando expressamente suspensos os direitos previstos nas cláusulas sexta e sétima, independentemente de comunicação prévia, até a quitação do débito.");
  clause("PARÁGRAFO QUINTO:", "Nos casos de parcelamento, a cobrança se dará mediante emissão de boleto bancário. O não recebimento do boleto não exime o sócio de realizar o pagamento na data acordada.");
  clause("PARÁGRAFO SEXTO:", `Em caso de atraso superior a 60 (sessenta) dias, o sócio será notificado e terá 10 (dez) dias para liquidação. Persistindo a pendência, a PROTECT poderá encaminhar o nome ao SPC. O cancelamento ou rescisão implicará o vencimento antecipado das parcelas remanescentes, acrescidas de multa de 30% sobre o valor total da cota ${nomeContrato}, além de correção monetária. Cobrança administrativa: +10% de honorários; cobrança judicial: +20% de honorários.`);

  sectionTitle("2. DAS OBRIGAÇÕES DA CONTRATADA PROTECT");
  clause("CLÁUSULA SEGUNDA:", "Permitir a frequência do sócio usuário (colaborador) às áreas comuns do Clube PROTECT dentro do horário de funcionamento, bem como a utilização dos estandes de tiro, ressalvada a hipótese de o local estar sendo utilizado por determinadas categorias profissionais ou para cursos e capacitação.");
  clause("CLÁUSULA TERCEIRA:", "Oferecer condições adequadas para a realização de cursos, testes de tiro e capacitação técnica, atividades sociais, culturais, recreativas e desportivas, bem como manter despachantes no clube para pleitos junto à Polícia Federal e ao Exército, ressalvando que os serviços documentais e de despachante serão cobrados separadamente.");
  clause("CLÁUSULA QUARTA:", "Manter as instalações limpas e em permanentes condições de uso; disponibilizar, a título oneroso, alvos e equipamentos obrigatórios para testes e cursos; e disponibilizar, a título gratuito e em caráter de empréstimo, óculos de proteção, abafadores de ouvido e armas do acervo do clube para atiradores com CR válido.");
  clause("CLÁUSULA QUINTA:", "Ofertar ao sócio usuário (colaborador), armas de fogo, munição, acessórios, equipamentos de proteção e defesa individual, armas de ar comprimido, airsoft e outros itens para compra ou aquisição. Disponibilizar, sempre que necessário, declaração de que o sócio é filiado à entidade e participa regularmente das atividades.");

  sectionTitle("3. DOS DIREITOS DO SÓCIO USUÁRIO (COLABORADOR)");
  clause("CLÁUSULA SEXTA:", "Frequentar, utilizar e participar de todas as opções recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da anuidade. O sócio declara ter ciência de que cursos, testes de capacitação e tiro, bem como algumas opções recreativas, serão disponibilizados a título oneroso, a ser calculado evento a evento.");
  clause("CLÁUSULA SÉTIMA:", "Ter prioridade na tramitação de pleitos junto ao Exército e à Polícia Federal; na utilização de estandes; para realização de testes de tiro e capacitação técnica; nas vagas para participação em opções recreativas, desportivas e culturais; e para utilização de equipamentos de proteção individual e armas do acervo do clube.");
  clause("CLÁUSULA OITAVA:", "Caso a legislação vigente permita, fazer-se acompanhar de terceiros nas dependências do clube PROTECT, mediante preenchimento e assinatura de termo de compromisso, respondendo o sócio usuário (colaborador) por aqueles convidados que agirem com imperícia, imprudência ou negligência.");
  clause("CLÁUSULA NONA:", "Fazer requerimento para obtenção de CR de Colecionador, Atirador ou Caçador, observados os requisitos elencados pelo Estatuto do Desarmamento e portarias vigentes da Polícia Federal e do Exército, sendo necessário ter 25 anos. Antes disso, o interessado poderá obter autorização judicial.");
  clause("CLÁUSULA DÉCIMA:", "Zelar pelo patrimônio do clube, responsabilizando-se por si e por seus convidados, inclusive por danos ou despesas que venham a causar. É expressamente proibido que menores de 18 anos manuseiem, utilizem ou portem qualquer tipo de arma de fogo, à exceção daqueles com autorização judicial.");
  clause("CLÁUSULA ONZE:", `Pagar pontualmente as parcelas para quitação do título ${nomeContrato} de sócio usuário (colaborador), quando parcelado.`);
  clause("CLÁUSULA DOZE:", "Obedecer às normas disciplinares e aos horários de frequência às dependências do clube, sendo proibida a ingestão de bebidas alcoólicas e/ou drogas ilícitas nas áreas de tiro.");
  clause("CLÁUSULA TREZE:", "O ingresso às áreas de tiro se fará mediante identificação facial e/ou apresentação da carteira social. A condição de sócio usuário (colaborador) não confere direito de propriedade sobre qualquer parcela do patrimônio do clube.");
  clause("CLÁUSULA QUATORZE:", "O teste de manuseio e capacitação técnica constitui espécie de curso com testes escritos e práticos, ministrados por instrutores credenciados pela Polícia Federal, dos quais o interessado deverá participar e ser aprovado para obtenção ou renovação de CR.");

  sectionTitle("4. DISPOSIÇÕES GERAIS E CONDIÇÕES ESPECÍFICAS");
  clause("CLÁUSULA DEZESSEIS:", "O sócio usuário (colaborador) que desejar adquirir uma arma para defesa no comércio deverá obter autorização da Polícia Federal ou do Exército e apresentar Prova de Aptidão e Manuseio de Armas e Teste Psicológico.");
  clause("CLÁUSULA DEZESSETE:", "O sócio declara ter ciência de que a legislação que controla os CACs é diferente daquela que rege as armas em mãos de cidadãos comuns. Essas normas constam no R-105, Decreto nº 3.665/2000 e Portaria COLOG nº 051/2015.");
  clause("CLÁUSULA DEZOITO:", "O sócio declara ter ciência de que CACs não possuem autorização para PORTE de arma, e sim, alguns deles, para POSSE e TRANSPORTE da arma, munições e acessórios de casa até os locais de competição, clubes de tiro, treinamentos e outros, autorizados pelas GUIAS DE TRÁFEGO.");
  clause("CLÁUSULA VINTE:", "É expressamente proibido ao sócio usuário (colaborador) utilizar armas de fogo sem registro, bem como utilizar os postos de tiro sem equipamentos de proteção auricular e visual.");

  sectionTitle("5. DA RESCISÃO DO CONTRATO");
  clause("CLÁUSULA VINTE E UM:", "A rescisão ou cancelamento do presente contrato poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.");
  clause("PARÁGRAFO PRIMEIRO:", "Não será considerada motivação válida para rescisão contratual a não aprovação do sócio usuário (colaborador) nos testes de capacitação técnica e manuseio de armas de fogo e nos testes psicotécnicos pertinentes.");
  clause("PARÁGRAFO SEGUNDO:", `Em caso de rescisão ou cancelamento deste contrato, a parte que der ensejo à rescisão deverá pagar à outra parte 30% (trinta por cento) do valor da cota ${nomeContrato} de sócio usuário (colaborador), independentemente da entrada e/ou das parcelas pagas, quantia que será liquidada no ato da rescisão ou do cancelamento.`);
  clause("PARÁGRAFO TERCEIRO:", "O presente contrato reveste-se e é aceito pelos contratantes com força de título executivo extrajudicial, constituindo dívida líquida, certa e exigível.");
  clause("PARÁGRAFO QUARTO:", "A contratada PROTECT não se responsabiliza por promessas ou acordos que não façam parte deste contrato.");

  sectionTitle("6. TERMO DE RESPONSABILIDADE PARA USO DOS ESPAÇOS DE TIRO");
  para("É expressamente proibido o ingresso e a utilização de armas sem registro no SIGMA ou no SINARM. Qualquer sócio, monitor ou instrutor poderá solicitar aos sócios os documentos relativos às armas trazidas ao clube. É obrigatório transportar as armas desmuniciadas nas dependências do clube, sendo vedado o manejo das armas fora do estande de tiro. A prática de atividades de tiro por menores de 18 anos deverá ser autorizada judicialmente e acompanhada do responsável legal.", { size: 8.5 });
  para("Quando da prática da modalidade de tiro, deverão ser observadas as normas de conduta e segurança, bem como as orientações expedidas pelo Exército Brasileiro, sendo obrigatório o uso de óculos e protetores auriculares.", { size: 8.5 });
  para("É EXPRESSAMENTE PROIBIDO O INGRESSO E A UTILIZAÇÃO DE ARMAS E MUNIÇÕES SEM PROCEDÊNCIA LEGAL E JUSTIFICADA.", { bold: true, size: 8.5 });
  para("Eu, que abaixo assino, declaro ter recebido instruções de segurança e ter tomado conhecimento das normas legais estabelecidas em legislação pertinente, assumindo o compromisso pela minha participação nas atividades e pela minha permanência nas dependências da PROTECT. Declaro, ainda, que não possuo registro de antecedentes criminais e que os dados constantes nesta ficha são verdadeiros. Declaro ter ciência da necessidade de cumprir a Lei nº 10.826/2003, Decreto nº 5.123/2004, R-105 do Exército Brasileiro e demais normas aplicáveis.", { size: 8.5 });

  // ── Assinaturas ────────────────────────────────────────────────────────────
  newPageIfNeeded(80);
  y += 4;
  para("E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença das testemunhas.");
  y += 4;

  const col = TW / 2 - 3;
  const sigH = 14;
  const sigW = 35;

  try { pdf.addImage(sigs.s2, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}

  y += sigH;

  pdf.setDrawColor(80, 80, 80); pdf.setLineWidth(0.3);
  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 6, y, ML + TW, y);
  y += 3;
  text("PROTECT CLUBE MINEIRO DE TIRO", ML, y, { size: 8, bold: true });
  text(nome, ML + col + 6, y, { size: 8, bold: true });
  y += 3;
  text("CNPJ: 01.244.200/0001-52", ML, y, { size: 7, color: [100, 100, 100] });
  text(`CPF: ${cpf}`, ML + col + 6, y, { size: 7, color: [100, 100, 100] });

  y += 12;

  try { pdf.addImage(sigs.s1, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}
  try { pdf.addImage(sigs.s3, "PNG", ML + col + 6, y, sigW, sigH, undefined, "FAST"); } catch (_) {}

  y += sigH;

  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 6, y, ML + TW, y);
  y += 3;
  text("TESTEMUNHA 1", ML, y, { size: 7, color: [100, 100, 100] });
  text("TESTEMUNHA 2", ML + col + 6, y, { size: 7, color: [100, 100, 100] });
  y += 3;
  text("EMMERSON N. DO CARMO", ML, y, { size: 8 });
  text("NEWTON C. BAPTISTON", ML + col + 6, y, { size: 8 });
  y += 3;
  text("CPF: 001.583.866-80", ML, y, { size: 7, color: [100, 100, 100] });
  text("CPF: 584.978.896-49", ML + col + 6, y, { size: 7, color: [100, 100, 100] });
  y += 10;

  text(`Belo Horizonte/MG, ${dataAtual}`, W / 2, y, { size: 8, align: "center", color: [80, 80, 80] });
  y += 4;
  text("Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG", W / 2, y, { size: 7, align: "center", color: [120, 120, 120] });
  y += 3;
  text("clube@grupoprotect.com.br  ·  grupoprotect.com.br  ·  (31) 3371-8500", W / 2, y, { size: 7, align: "center", color: [120, 120, 120] });

  const totalPages = (pdf.internal as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7); pdf.setFont("helvetica", "normal"); pdf.setTextColor(160, 160, 160);
    pdf.text(`${i} / ${totalPages}`, W - MR - 2, H - 8, { align: "right" });
  }
}