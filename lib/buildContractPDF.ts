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

/**
 * Gera PDF renderizando a página /contrato-pdf em um iframe
 */
export async function generateContractPDFFromServerPage(
  contractData: ContractData
): Promise<string> {
  try {
    const domtoimage = (await import("dom-to-image-more")).default;
    const jsPDFModule = (await import("jspdf")).default;

    // Armazena dados sensíveis em sessionStorage (não expõe na URL)
    const sessionId = `contract_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      try {
        if (window.sessionStorage) {
          sessionStorage.setItem(sessionId, JSON.stringify({
            nome: contractData.nome || "",
            email: contractData.email || "",
            cpf: contractData.cpf || "",
            rg: contractData.rg || "",
            profissao: contractData.profissao || "",
            naturalidade: contractData.naturalidade || "",
            nascimento: contractData.nascimento || "",
            plano: contractData.plano?.includes("5") ? "5" : "3",
          }));
        }
      } catch (e) {
        console.warn("sessionStorage não disponível, dados serão passados via URL fallback");
      }
    }

    // Detecta o locale atual do pathname
    const currentPathname = typeof window !== "undefined" ? window.location.pathname : "/pt";
    const locale = currentPathname.split("/")[1] || "pt";
    const url = `/${locale}/contrato-pdf?sid=${sessionId}`;

    // Cria um iframe para carregar a página
    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position: fixed; top: -99999px; left: 0; width: 170mm; height: auto; border: none; background: white; z-index: -9999;";
    iframe.src = url;
    document.body.appendChild(iframe);

    // Aguarda o iframe carregar
    await new Promise<void>((resolve) => {
      const checkLoad = setInterval(() => {
        try {
          if (
            iframe.contentDocument &&
            iframe.contentDocument.readyState === "complete"
          ) {
            clearInterval(checkLoad);
            resolve();
          }
        } catch (e) {
          // Pode gerar erro de CORS, mas vamos tentar mesmo assim
        }
      }, 100);

      // Timeout após 5 segundos
      setTimeout(() => {
        clearInterval(checkLoad);
        resolve();
      }, 5000);
    });

    // Aguarda um pouco para as imagens carregarem
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Obtém o conteúdo renderizado do iframe
    let htmlContent: HTMLElement | null = null;
    try {
      htmlContent = iframe.contentDocument?.body;
    } catch (e) {
      console.warn("Não foi possível acessar iframe.contentDocument, usando fetch direto");
    }

    // Se não conseguir via iframe (CORS), tenta fetch direto
    if (!htmlContent) {
      const response = await fetch(url);
      const html = await response.text();

      // Cria um container temporário com o HTML
      const container = document.createElement("div");
      container.innerHTML = html;
      container.style.cssText =
        "position: fixed; top: -99999px; left: 0; width: 170mm; background: white; z-index: -9999;";

      // Injeta Tailwind via CDN para estilos
      const style = document.createElement("style");
      style.textContent = `
        @import url('https://cdn.tailwindcss.com');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        body { font-family: 'Libre Baskerville', Georgia, serif; background: #fff; }
        * { box-sizing: border-box; }
      `;
      container.appendChild(style);
      document.body.appendChild(container);
      htmlContent = container;
    }

    if (!htmlContent) {
      throw new Error("Não foi possível renderizar o contrato");
    }

    // Aguarda imagens carregarem
    const imgs = htmlContent.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );

    // Captura como imagem com escala 2×
    const scale = 2;
    const dataUrl = await domtoimage.toJpeg(htmlContent, {
      quality: 0.95,
      bgcolor: "#ffffff",
      width: htmlContent.offsetWidth * scale,
      height: htmlContent.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: htmlContent.offsetWidth + "px",
        height: htmlContent.offsetHeight + "px",
      },
    });

    // Remove elementos temporários
    if (iframe.parentNode) document.body.removeChild(iframe);
    const tempContainer = htmlContent.parentElement;
    if (tempContainer && tempContainer !== document.body && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }

    // Converte para imagem
    const capturedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });

    // Configuração A4
    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const marginMm = 10;
    const usableWidthMm = pageWidthMm - marginMm * 2;
    const usableHeightMm = pageHeightMm - marginMm * 2;

    const pxPerMm = capturedImg.width / usableWidthMm;
    const safePageHeightPx = (usableHeightMm - 8) * pxPerMm;

    const totalPages = Math.ceil(capturedImg.height / safePageHeightPx);

    const pdf = new jsPDFModule({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    // Adiciona páginas
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) pdf.addPage();

      const srcY = Math.round(pageIndex * safePageHeightPx);
      const srcH = Math.min(safePageHeightPx, capturedImg.height - srcY);

      const slice = document.createElement("canvas");
      slice.width = capturedImg.width;
      slice.height = Math.round(srcH);
      const ctx = slice.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(
        capturedImg,
        0,
        srcY,
        capturedImg.width,
        srcH,
        0,
        0,
        capturedImg.width,
        srcH
      );

      const sliceDataUrl = slice.toDataURL("image/jpeg", 0.92);
      const sliceHeightMm = srcH / pxPerMm;

      pdf.addImage(
        sliceDataUrl,
        "JPEG",
        marginMm,
        marginMm,
        usableWidthMm,
        sliceHeightMm
      );
    }

    return pdf.output("datauristring").split(",")[1];
  } catch (err) {
    console.error("Erro ao gerar PDF da página /contrato-pdf:", err);
    throw err;
  }
}

/**
 * Abre a página /contrato-pdf em nova janela para impressão
 */
export async function openContractForPrinting(
  contractData: ContractData
): Promise<void> {
  try {
    const domtoimage = (await import("dom-to-image-more")).default;
    const jsPDFModule = (await import("jspdf")).default;

    // Armazena dados sensíveis em sessionStorage (não expõe na URL)
    const sessionId = `contract_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      try {
        if (window.sessionStorage) {
          sessionStorage.setItem(sessionId, JSON.stringify({
            nome: contractData.nome || "",
            email: contractData.email || "",
            cpf: contractData.cpf || "",
            rg: contractData.rg || "",
            profissao: contractData.profissao || "",
            naturalidade: contractData.naturalidade || "",
            nascimento: contractData.nascimento || "",
            plano: contractData.plano?.includes("5") ? "5" : "3",
          }));
        }
      } catch (e) {
        console.warn("sessionStorage não disponível, dados serão passados via URL fallback");
      }
    }

    // Detecta o locale atual do pathname
    const currentPathname = typeof window !== "undefined" ? window.location.pathname : "/pt";
    const locale = currentPathname.split("/")[1] || "pt";
    const url = `/${locale}/contrato-pdf?sid=${sessionId}`;

    // Cria um iframe para carregar a página
    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position: fixed; top: -99999px; left: 0; width: 170mm; height: auto; border: none; background: white; z-index: -9999;";
    iframe.src = url;
    document.body.appendChild(iframe);

    // Aguarda o iframe carregar
    await new Promise<void>((resolve) => {
      const checkLoad = setInterval(() => {
        try {
          if (
            iframe.contentDocument &&
            iframe.contentDocument.readyState === "complete"
          ) {
            clearInterval(checkLoad);
            resolve();
          }
        } catch (e) {
          // Pode gerar erro de CORS
        }
      }, 100);

      // Timeout após 5 segundos
      setTimeout(() => {
        clearInterval(checkLoad);
        resolve();
      }, 5000);
    });

    // Aguarda um pouco para as imagens carregarem
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Obtém o conteúdo renderizado do iframe
    let htmlContent: HTMLElement | null = null;
    try {
      htmlContent = iframe.contentDocument?.body;
    } catch (e) {
      console.warn("Não foi possível acessar iframe.contentDocument, usando fetch direto");
    }

    // Se não conseguir via iframe (CORS), tenta fetch direto
    if (!htmlContent) {
      const response = await fetch(url);
      const html = await response.text();

      // Cria um container temporário com o HTML
      const container = document.createElement("div");
      container.innerHTML = html;
      container.style.cssText =
        "position: fixed; top: -99999px; left: 0; width: 170mm; background: white; z-index: -9999;";

      // Injeta Tailwind via CDN para estilos
      const style = document.createElement("style");
      style.textContent = `
        @import url('https://cdn.tailwindcss.com');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        body { font-family: 'Libre Baskerville', Georgia, serif; background: #fff; }
        * { box-sizing: border-box; }
      `;
      container.appendChild(style);
      document.body.appendChild(container);
      htmlContent = container;
    }

    if (!htmlContent) {
      throw new Error("Não foi possível renderizar o contrato");
    }

    // Aguarda imagens carregarem
    const imgs = htmlContent.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );

    // Captura como imagem com escala 2×
    const scale = 2;
    const dataUrl = await domtoimage.toJpeg(htmlContent, {
      quality: 0.95,
      bgcolor: "#ffffff",
      width: htmlContent.offsetWidth * scale,
      height: htmlContent.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: htmlContent.offsetWidth + "px",
        height: htmlContent.offsetHeight + "px",
      },
    });

    // Remove elementos temporários
    if (iframe.parentNode) document.body.removeChild(iframe);
    const tempContainer = htmlContent.parentElement;
    if (tempContainer && tempContainer !== document.body && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }

    // Converte para imagem
    const capturedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });

    // Configuração A4
    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const marginMm = 10;
    const usableWidthMm = pageWidthMm - marginMm * 2;
    const usableHeightMm = pageHeightMm - marginMm * 2;

    const pxPerMm = capturedImg.width / usableWidthMm;
    const safePageHeightPx = (usableHeightMm - 8) * pxPerMm;

    const totalPages = Math.ceil(capturedImg.height / safePageHeightPx);

    const pdf = new jsPDFModule({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    // Adiciona páginas
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) pdf.addPage();

      const srcY = Math.round(pageIndex * safePageHeightPx);
      const srcH = Math.min(safePageHeightPx, capturedImg.height - srcY);

      const slice = document.createElement("canvas");
      slice.width = capturedImg.width;
      slice.height = Math.round(srcH);
      const ctx = slice.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(
        capturedImg,
        0,
        srcY,
        capturedImg.width,
        srcH,
        0,
        0,
        capturedImg.width,
        srcH
      );

      const sliceDataUrl = slice.toDataURL("image/jpeg", 0.92);
      const sliceHeightMm = srcH / pxPerMm;

      pdf.addImage(
        sliceDataUrl,
        "JPEG",
        marginMm,
        marginMm,
        usableWidthMm,
        sliceHeightMm
      );
    }

    // Abre o PDF em nova janela para impressão
    const blobUrl = pdf.output("bloburi");
    const win = window.open(blobUrl, "_blank");
    if (!win) {
      console.error("Não foi possível abrir nova janela");
      throw new Error("Abrir nova janela bloqueado pelo navegador");
    }
  } catch (err) {
    console.error("Erro ao abrir contrato para impressão:", err);
    throw err;
  }
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
  try {
    const domtoimage = (await import("dom-to-image-more")).default;

    const contractDiv = document.createElement("div");
    contractDiv.style.cssText = `
      max-width: 670px;
      margin: 0 auto;
      background: white;
      border: none;
      padding: 48px 40px;
      font-size: 13px;
      color: #1f2937;
      line-height: 1.625;
      font-family: Georgia, serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
      box-shadow: none;
    `;

    contractDiv.innerHTML = getContractHTML(contract);

    contractDiv.style.position = "fixed";
    contractDiv.style.top = "-99999px";
    contractDiv.style.left = "0";
    contractDiv.style.zIndex = "-9999";
    document.body.appendChild(contractDiv);

    const imgs = contractDiv.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );

    const scale = 2;
    const dataUrl = await domtoimage.toJpeg(contractDiv, {
      quality: 0.95,
      bgcolor: "#ffffff",
      width: contractDiv.offsetWidth * scale,
      height: contractDiv.offsetHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: contractDiv.offsetWidth + "px",
        height: contractDiv.offsetHeight + "px",
      },
    });

    document.body.removeChild(contractDiv);

    const capturedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });

    const visualWidthPx = 670;
    const dpiToMm = 25.4 / 96;
    const visualWidthMm = visualWidthPx * dpiToMm;
    const pageWidthMm = visualWidthMm + 20;
    const marginMm = 10;
    const usableWidthMm = pageWidthMm - marginMm * 2;
    const pageHeightMm = 297;
    const usableHeightMm = pageHeightMm - marginMm * 2;

    const pxPerMm = capturedImg.width / usableWidthMm;
    // Margem de segurança de 8mm para evitar cortes
    const safePageHeightPx = (usableHeightMm - 8) * pxPerMm;

    const totalPages = Math.ceil(capturedImg.height / safePageHeightPx);

    const pdf = new jsPDF({
      unit: "mm",
      format: [pageWidthMm, pageHeightMm],
      orientation: "portrait",
      compress: true,
    });

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) pdf.addPage([pageWidthMm, pageHeightMm]);

      const srcY = Math.round(pageIndex * safePageHeightPx);
      const srcH = Math.min(safePageHeightPx, capturedImg.height - srcY);

      const slice = document.createElement("canvas");
      slice.width = capturedImg.width;
      slice.height = Math.round(srcH);
      const ctx = slice.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(capturedImg, 0, srcY, capturedImg.width, srcH, 0, 0, capturedImg.width, srcH);

      const sliceDataUrl = slice.toDataURL("image/jpeg", 0.92);
      const sliceHeightMm = srcH / pxPerMm;

      pdf.addImage(sliceDataUrl, "JPEG", marginMm, marginMm, usableWidthMm, sliceHeightMm);
    }

    return pdf.output("datauristring").split(",")[1];
  } catch (err) {
    console.error("Erro ao gerar PDF com dom-to-image, usando fallback:", err);
    const [s1, s2, s3] = await Promise.all([
      loadImageAsBase64("/assinatura1.png"),
      loadImageAsBase64("/assinatura2.png"),
      loadImageAsBase64("/assinatura3.png"),
    ]);
    const pdf = new jsPDF("p", "mm", "a4");
    buildPDFContent(pdf, contract, { s1, s2, s3 });
    return pdf.output("datauristring").split(",")[1];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX 1: remoção de bordas — processa o DOM após inserir o HTML, zerando todas
//         as bordas e restaurando apenas border-top das linhas de assinatura
//         (identificadas pela presença simultânea de padding-top no mesmo elemento).
// FIX 2: corte de texto — margem de segurança aumentada de 3 mm → 8 mm,
//         igualando o comportamento do desktop.
// ─────────────────────────────────────────────────────────────────────────────
export async function generateContractPDFMobile(contract: ContractData): Promise<string> {
  const domtoimage = (await import("dom-to-image-more")).default;
  const jsPDFModule = (await import("jspdf")).default;

  // Container sem NENHUMA borda ou sombra
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    top: -99999px;
    left: 0;
    width: 670px;
    background: white;
    padding: 48px 40px;
    margin: 0;
    border: none;
    box-shadow: none;
    outline: none;
    box-sizing: border-box;
    z-index: -9999;
    overflow: visible;
    font-family: Georgia, serif;
    font-size: 13px;
    color: #1f2937;
    line-height: 1.625;
  `;

  // Insere o HTML e só então remove bordas via DOM (mais confiável que regex)
  container.innerHTML = getContractHTML(contract);
  document.body.appendChild(container);

  // FIX 1 — remove bordas por DOM traversal
  // Preserva border-top APENAS quando há padding-top no mesmo elemento
  // (padrão exclusivo das linhas de assinatura no getContractHTML)
  const cleanBorders = (el: Element): void => {
    if (!(el instanceof HTMLElement)) return;

    const inlineBorderTop = el.style.borderTop;
    const inlinePaddingTop = el.style.paddingTop;

    // Zera tudo
    el.style.border       = "none";
    el.style.borderTop    = "none";
    el.style.borderBottom = "none";
    el.style.borderLeft   = "none";
    el.style.borderRight  = "none";
    el.style.borderRadius = "0";
    el.style.boxShadow    = "none";
    el.style.outline      = "none";

    // Restaura border-top apenas nas linhas de assinatura
    // (têm border-top E padding-top definidos inline)
    if (inlineBorderTop && inlineBorderTop !== "none" && inlinePaddingTop) {
      el.style.borderTop    = inlineBorderTop;
      el.style.paddingTop   = inlinePaddingTop;
    }

    Array.from(el.children).forEach(cleanBorders);
  };

  cleanBorders(container);

  // Aguarda as imagens carregarem
  const imgs = container.querySelectorAll("img");
  await Promise.all(
    Array.from(imgs).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) resolve();
          else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
    )
  );

  // Captura a imagem com escala 2×
  const scale = 2;
  const dataUrl = await domtoimage.toJpeg(container, {
    quality: 0.95,
    bgcolor: "#ffffff",
    width: container.offsetWidth * scale,
    height: container.offsetHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: container.offsetWidth + "px",
      height: container.offsetHeight + "px",
    },
  });

  document.body.removeChild(container);

  const capturedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });

  // Paginação A4
  const pageWidthMm   = 210;
  const pageHeightMm  = 297;
  const marginMm      = 10;
  const usableWidthMm = pageWidthMm  - marginMm * 2;
  const usableHeightMm = pageHeightMm - marginMm * 2;

  const pxPerMm = capturedImg.width / usableWidthMm;

  // FIX 2 — margem de segurança de 8 mm (era 3 mm) para evitar corte de texto
  const safePageHeightPx = (usableHeightMm - 8) * pxPerMm;

  const totalPages = Math.ceil(capturedImg.height / safePageHeightPx);

  const pdf = new jsPDFModule({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: true,
  });

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    if (pageIndex > 0) pdf.addPage();

    const srcY = Math.round(pageIndex * safePageHeightPx);
    const srcH = Math.min(safePageHeightPx, capturedImg.height - srcY);

    const slice = document.createElement("canvas");
    slice.width  = capturedImg.width;
    slice.height = Math.round(srcH);
    const ctx = slice.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(capturedImg, 0, srcY, capturedImg.width, srcH, 0, 0, capturedImg.width, srcH);

    const sliceDataUrl  = slice.toDataURL("image/jpeg", 0.92);
    const sliceHeightMm = srcH / pxPerMm;

    pdf.addImage(sliceDataUrl, "JPEG", marginMm, marginMm, usableWidthMm, sliceHeightMm);
  }

  return pdf.output("datauristring").split(",")[1];
}

export async function generateContractPDFBase64FromElement(element: HTMLElement): Promise<string> {
  const domtoimage = (await import("dom-to-image-more")).default;
  const jsPDFModule = (await import("jspdf")).default;

  const clone = element.cloneNode(true) as HTMLElement;

  const processNode = (orig: Element, cloned: Element) => {
    if (!(orig instanceof HTMLElement) || !(cloned instanceof HTMLElement)) return;
    const computed = window.getComputedStyle(orig);
    cloned.style.cssText = "";
    cloned.style.fontFamily = computed.fontFamily;
    cloned.style.fontSize = computed.fontSize;
    cloned.style.fontWeight = computed.fontWeight;
    cloned.style.fontStyle = computed.fontStyle;
    cloned.style.lineHeight = computed.lineHeight;
    cloned.style.textAlign = computed.textAlign;
    cloned.style.textDecoration = computed.textDecoration;
    cloned.style.letterSpacing = computed.letterSpacing;
    cloned.style.color = computed.color;
    cloned.style.backgroundColor = computed.backgroundColor;
    cloned.style.display = computed.display;
    cloned.style.flexDirection = computed.flexDirection;
    cloned.style.justifyContent = computed.justifyContent;
    cloned.style.alignItems = computed.alignItems;
    cloned.style.gap = computed.gap;
    cloned.style.padding = computed.padding;
    cloned.style.margin = computed.margin;
    cloned.style.width = computed.width;
    cloned.style.maxWidth = computed.maxWidth;
    cloned.style.height = computed.height;
    cloned.style.minHeight = computed.minHeight;
    cloned.style.gridTemplateColumns = computed.gridTemplateColumns;
    cloned.style.whiteSpace = computed.whiteSpace;
    cloned.style.overflow = "visible";

    const tag = orig.tagName.toLowerCase();
    const cls = orig.className || "";
    const isInlineSpan = tag === "span" && orig.children.length === 0;
    const hasBorderB = cls.includes("border-b");
    const isHr = tag === "hr";
    const isBorderT = cls.includes("border-t");

    if (isHr) {
      cloned.style.borderTop = "1px solid #d1d5db";
      cloned.style.borderBottom = "none";
      cloned.style.borderLeft = "none";
      cloned.style.borderRight = "none";
    } else if (isInlineSpan && hasBorderB) {
      const borderColor = cls.includes("border-gray-7") ? "#374151" : "#9ca3af";
      cloned.style.borderBottom = `1px solid ${borderColor}`;
      cloned.style.borderTop = "none";
      cloned.style.borderLeft = "none";
      cloned.style.borderRight = "none";
    } else if (isBorderT) {
      cloned.style.borderTop = "1px solid #9ca3af";
      cloned.style.borderBottom = "none";
      cloned.style.borderLeft = "none";
      cloned.style.borderRight = "none";
      cloned.style.paddingTop = computed.paddingTop;
    } else {
      cloned.style.border = "none";
      cloned.style.outline = "none";
      cloned.style.boxShadow = "none";
    }

    Array.from(orig.children).forEach((child, i) => {
      if (cloned.children[i]) processNode(child, cloned.children[i]);
    });
  };

  processNode(element, clone);

  const origImgs = Array.from(element.querySelectorAll("img"));
  const cloneImgs = Array.from(clone.querySelectorAll("img"));
  await Promise.all(
    origImgs.map((img, i) =>
      new Promise<void>((resolve) => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth || 200;
        c.height = img.naturalHeight || 80;
        const ctx = c.getContext("2d");
        if (!ctx) { resolve(); return; }
        const tmp = new Image();
        tmp.crossOrigin = "anonymous";
        tmp.onload = () => {
          ctx.drawImage(tmp, 0, 0);
          if (cloneImgs[i]) cloneImgs[i].src = c.toDataURL("image/png");
          resolve();
        };
        tmp.onerror = () => {
          if (cloneImgs[i]) cloneImgs[i].style.display = "none";
          resolve();
        };
        tmp.src = img.src;
      })
    )
  );

  clone.style.position = "fixed";
  clone.style.top = "-99999px";
  clone.style.left = "0";
  clone.style.width = element.offsetWidth + "px";
  clone.style.background = "#ffffff";
  clone.style.border = "none";
  clone.style.boxShadow = "none";
  document.body.appendChild(clone);

  const scale = 2;
  const dataUrl = await domtoimage.toJpeg(clone, {
    quality: 0.95,
    bgcolor: "#ffffff",
    width: clone.offsetWidth * scale,
    height: clone.offsetHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: clone.offsetWidth + "px",
      height: clone.offsetHeight + "px",
    },
  });

  document.body.removeChild(clone);

  const capturedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });

  const pageWidthMm   = 210;
  const pageHeightMm  = 297;
  const marginMm      = 10;
  const usableWidthMm = pageWidthMm  - marginMm * 2;
  const usableHeightMm = pageHeightMm - marginMm * 2;

  const pxPerMm = capturedImg.width / usableWidthMm;
  const safePageHeightPx = (usableHeightMm - 8) * pxPerMm;

  const totalPages = Math.ceil(capturedImg.height / safePageHeightPx);

  const pdf = new jsPDFModule({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: true,
  });

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    if (pageIndex > 0) pdf.addPage();

    const srcY = Math.round(pageIndex * safePageHeightPx);
    const srcH = Math.min(safePageHeightPx, capturedImg.height - srcY);

    const slice = document.createElement("canvas");
    slice.width  = capturedImg.width;
    slice.height = Math.round(srcH);
    const ctx = slice.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(capturedImg, 0, srcY, capturedImg.width, srcH, 0, 0, capturedImg.width, srcH);

    const sliceDataUrl  = slice.toDataURL("image/jpeg", 0.92);
    const sliceHeightMm = srcH / pxPerMm;

    pdf.addImage(sliceDataUrl, "JPEG", marginMm, marginMm, usableWidthMm, sliceHeightMm);
  }

  return pdf.output("datauristring").split(",")[1];
}

function getContractHTML(contract: ContractData): string {
  const nome = contract.nome?.toUpperCase() || "___________________________";
  const cpf = contract.cpf || "___________________________";
  const rg = contract.rg || "_______________";
  const profissao = contract.profissao || "_______________";
  const natural = contract.naturalidade || "_______________";
  const nasc = contract.nascimento
    ? contract.nascimento.split("-").reverse().join("/")
    : "__/__/____";

  const planoStr = contract.plano || "3 anos";
  const isPlano5 = planoStr.includes("5");
  const nomeContrato = isPlano5 ? "quinquenal" : "trienal";
  const nomePrazo = isPlano5 ? "cinco" : "três";
  const total = isPlano5 ? "R$ 6.000,00" : "R$ 3.600,00";
  const parcela = "R$ 1.200,00";
  const vigencia = isPlano5 ? "5 anos" : "3 anos";

  const dataAssinatura =
    contract.dataAssinatura?.toDate?.() ||
    new Date(contract.dataAssinaturaString || new Date());
  const dataAtual = dataAssinatura.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estilo de seção sem borda lateral — apenas border-top fino para separação visual
  const sectionStyle = `margin-top: 16px; margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;`;

  return `
    <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px;">
      <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: #9ca3af; margin-bottom: 12px;">
        Documento Legal
      </p>
      <h1 style="font-size: 16px; font-weight: bold; text-transform: uppercase; line-height: 1.375; margin: 0 0 8px;">
        Contrato de Adesão de Sócio Usuário (Colaborador)
      </h1>
      <p style="font-size: 12px; color: #9ca3af; margin: 8px 0 0;">
        Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52
      </p>
      <div style="margin-top: 16px; display: inline-block; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #4b5563;">
        Cota ${nomeContrato} — ${vigencia}
      </div>
    </div>
    </div>

    <p style="text-align: justify; margin-bottom: 16px;">
      Pelo presente instrumento particular de <strong>CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)</strong>, de um lado, <strong>Protect Clube Mineiro de Tiro</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº <strong>01.244.200/0001-52</strong>, com sede na Rua General Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por quem de direito, doravante simplesmente denominada <strong>PROTECT</strong>; e, de outro lado, o(a) Sr.(a) <strong>${nome}</strong>, profissão <strong>${profissao}</strong>, inscrito(a) no RG nº <strong>${rg}</strong>, portador(a) do CPF nº <strong>${cpf}</strong>, natural de <strong>${natural}</strong>, nascido(a) em <strong>${nasc}</strong>, doravante simplesmente denominado(a) SÓCIO USUÁRIO (COLABORADOR), têm entre si justo e contratado o direito de sócio usuário (colaborador) da PROTECT, tudo de acordo com as condições especificadas nesta contratação/adesão e na legislação vigente.
    </p>

    <p style="text-align: justify; margin-bottom: 8px; font-style: italic; color: #4b5563;">
      O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a eleição do foro da Comarca de Belo Horizonte/MG para dirimir quaisquer pendências relativas ao presente instrumento.
    </p>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">1. DO PREÇO E DA FORMA DE PAGAMENTO</h2>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA PRIMEIRA:</strong> O valor total do contrato, correspondente à cota ${nomeContrato} (vigente por ${nomePrazo} anos), é de ${total}, ficando isento o pagamento de taxa de contribuição social mensal.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO PRIMEIRO:</strong> Declara o sócio usuário (colaborador), neste ato, ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente, de três em três anos.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO SEGUNDO:</strong> O pagamento deverá ser efetuado no ato da assinatura deste contrato, no valor de ${parcela} (anuidade), correspondente à primeira parcela, salvo eventual desconto ou condição diferenciada. Em caso de parcelamento, o valor remanescente será reajustado ao final de cada ano pelo IGP-M ou índice substituto. Independentemente da data de ingresso, o pagamento será anual e válido até o último dia de dezembro. Este contrato também servirá como recibo, mediante comprovação de depósito via PIX CNPJ nº 01.244.200/0001-52 ou por link de cartão de crédito do clube.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO TERCEIRO:</strong> Caso a contratação seja realizada em mês diverso de janeiro, o contrato permanecerá vigente até o mesmo mês de janeiro, ${nomePrazo} anos após o ingresso, sendo que as parcelas remanescentes também vencerão até o dia 10 daquele mês, em cada um dos ${nomePrazo} anos subsequentes.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO QUARTO:</strong> Será considerado inadimplente o sócio usuário (colaborador) que atrasar qualquer pagamento por período superior a 30 (trinta) dias do vencimento, ficando expressamente suspensos os direitos previstos nas cláusulas sexta e sétima, independentemente de comunicação prévia, até a quitação do débito.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO QUINTO:</strong> Nos casos de parcelamento, a cobrança se dará mediante emissão de boleto bancário. O não recebimento do boleto não exime o sócio de realizar o pagamento na data acordada.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO SEXTO:</strong> Em caso de atraso superior a 60 (sessenta) dias, o sócio será notificado e terá 10 (dez) dias para liquidação. Persistindo a pendência, a PROTECT poderá encaminhar o nome ao SPC. O cancelamento ou rescisão implicará o vencimento antecipado das parcelas remanescentes, acrescidas de multa de 30% sobre o valor total da cota ${nomeContrato}, além de correção monetária. Cobrança administrativa: +10% de honorários; cobrança judicial: +20% de honorários.</p>
    </div>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">2. DAS OBRIGAÇÕES DA CONTRATADA PROTECT</h2>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA SEGUNDA:</strong> Permitir a frequência do sócio usuário (colaborador) às áreas comuns do Clube PROTECT dentro do horário de funcionamento, bem como a utilização dos estandes de tiro, ressalvada a hipótese de o local estar sendo utilizado por determinadas categorias profissionais ou para cursos e capacitação.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA TERCEIRA:</strong> Oferecer condições adequadas para a realização de cursos, testes de tiro e capacitação técnica, atividades sociais, culturais, recreativas e desportivas, bem como manter despachantes no clube para pleitos junto à Polícia Federal e ao Exército, ressalvando que os serviços documentais e de despachante serão cobrados separadamente.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA QUARTA:</strong> Manter as instalações limpas e em permanentes condições de uso; disponibilizar, a título oneroso, alvos e equipamentos obrigatórios para testes e cursos; e disponibilizar, a título gratuito e em caráter de empréstimo, óculos de proteção, abafadores de ouvido e armas do acervo do clube para atiradores com CR válido.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA QUINTA:</strong> Ofertar ao sócio usuário (colaborador), armas de fogo, munição, acessórios, equipamentos de proteção e defesa individual, armas de ar comprimido, airsoft e outros itens para compra ou aquisição. Disponibilizar, sempre que necessário, declaração de que o sócio é filiado à entidade e participa regularmente das atividades.</p>
    </div>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">3. DOS DIREITOS DO SÓCIO USUÁRIO (COLABORADOR)</h2>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA SEXTA:</strong> Frequentar, utilizar e participar de todas as opções recreativas, desportivas e culturais, desde que esteja em dia com o pagamento da anuidade. O sócio declara ter ciência de que cursos, testes de capacitação e tiro, bem como algumas opções recreativas, serão disponibilizados a título oneroso, a ser calculado evento a evento.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA SÉTIMA:</strong> Ter prioridade na tramitação de pleitos junto ao Exército e à Polícia Federal; na utilização de estandes; para realização de testes de tiro e capacitação técnica; nas vagas para participação em opções recreativas, desportivas e culturais; e para utilização de equipamentos de proteção individual e armas do acervo do clube.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA OITAVA:</strong> Caso a legislação vigente permita, fazer-se acompanhar de terceiros nas dependências do clube PROTECT, mediante preenchimento e assinatura de termo de compromisso, respondendo o sócio usuário (colaborador) por aqueles convidados que agirem com imperícia, imprudência ou negligência.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA NONA:</strong> Fazer requerimento para obtenção de CR de Colecionador, Atirador ou Caçador, observados os requisitos elencados pelo Estatuto do Desarmamento e portarias vigentes da Polícia Federal e do Exército, sendo necessário ter 25 anos. Antes disso, o interessado poderá obter autorização judicial.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA DÉCIMA:</strong> Zelar pelo patrimônio do clube, responsabilizando-se por si e por seus convidados, inclusive por danos ou despesas que venham a causar. É expressamente proibido que menores de 18 anos manuseiem, utilizem ou portem qualquer tipo de arma de fogo, à exceção daqueles com autorização judicial.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA ONZE:</strong> Pagar pontualmente as parcelas para quitação do título ${nomeContrato} de sócio usuário (colaborador), quando parcelado.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA DOZE:</strong> Obedecer às normas disciplinares e aos horários de frequência às dependências do clube, sendo proibida a ingestão de bebidas alcoólicas e/ou drogas ilícitas nas áreas de tiro.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA TREZE:</strong> O ingresso às áreas de tiro se fará mediante identificação facial e/ou apresentação da carteira social. A condição de sócio usuário (colaborador) não confere direito de propriedade sobre qualquer parcela do patrimônio do clube.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA QUATORZE:</strong> O teste de manuseio e capacitação técnica constitui espécie de curso com testes escritos e práticos, ministrados por instrutores credenciados pela Polícia Federal, dos quais o interessado deverá participar e ser aprovado para obtenção ou renovação de CR.</p>
    </div>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">4. DISPOSIÇÕES GERAIS E CONDIÇÕES ESPECÍFICAS</h2>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA DEZESSEIS:</strong> O sócio usuário (colaborador) que desejar adquirir uma arma para defesa no comércio deverá obter autorização da Polícia Federal ou do Exército e apresentar Prova de Aptidão e Manuseio de Armas e Teste Psicológico.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA DEZESSETE:</strong> O sócio declara ter ciência de que a legislação que controla os CACs é diferente daquela que rege as armas em mãos de cidadãos comuns. Essas normas constam no R-105, Decreto nº 3.665/2000 e Portaria COLOG nº 051/2015.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA DEZOITO:</strong> O sócio declara ter ciência de que CACs não possuem autorização para PORTE de arma, e sim, alguns deles, para POSSE e TRANSPORTE da arma, munições e acessórios de casa até os locais de competição, clubes de tiro, treinamentos e outros, autorizados pelas GUIAS DE TRÁFEGO.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA VINTE:</strong> É expressamente proibido ao sócio usuário (colaborador) utilizar armas de fogo sem registro, bem como utilizar os postos de tiro sem equipamentos de proteção auricular e visual.</p>
    </div>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">5. DA RESCISÃO DO CONTRATO</h2>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>CLÁUSULA VINTE E UM:</strong> A rescisão ou cancelamento do presente contrato poderá se dar, em qualquer momento, por qualquer uma das partes, mediante termo expresso.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO PRIMEIRO:</strong> Não será considerada motivação válida para rescisão contratual a não aprovação do sócio usuário (colaborador) nos testes de capacitação técnica e manuseio de armas de fogo e nos testes psicotécnicos pertinentes.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO SEGUNDO:</strong> Em caso de rescisão ou cancelamento deste contrato, a parte que der ensejo à rescisão deverá pagar à outra parte 30% (trinta por cento) do valor da cota ${nomeContrato} de sócio usuário (colaborador), independentemente da entrada e/ou das parcelas pagas, quantia que será liquidada no ato da rescisão ou do cancelamento.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO TERCEIRO:</strong> O presente contrato reveste-se e é aceito pelos contratantes com força de título executivo extrajudicial, constituindo dívida líquida, certa e exigível.</p>
      <p style="text-align: justify; margin-bottom: 12px;"><strong>PARÁGRAFO QUARTO:</strong> A contratada PROTECT não se responsabiliza por promessas ou acordos que não façam parte deste contrato.</p>
    </div>

    <div style="${sectionStyle}">
      <h2 style="font-size: 13px; font-weight: bold; margin: 0 0 12px;">6. TERMO DE RESPONSABILIDADE PARA USO DOS ESPAÇOS DE TIRO</h2>
      <p style="text-align: justify; margin-bottom: 12px;">É expressamente proibido o ingresso e a utilização de armas sem registro no SIGMA ou no SINARM. Qualquer sócio, monitor ou instrutor poderá solicitar aos sócios os documentos relativos às armas trazidas ao clube. É obrigatório transportar as armas desmuniciadas nas dependências do clube, sendo vedado o manejo das armas fora do estande de tiro. A prática de atividades de tiro por menores de 18 anos deverá ser autorizada judicialmente e acompanhada do responsável legal.</p>
      <p style="text-align: justify; margin-bottom: 12px;">Quando da prática da modalidade de tiro, deverão ser observadas as normas de conduta e segurança, bem como as orientações expedidas pelo Exército Brasileiro, sendo obrigatório o uso de óculos e protetores auriculares.</p>
      <p style="text-align: justify; margin-bottom: 12px; font-weight: bold;">É EXPRESSAMENTE PROIBIDO O INGRESSO E A UTILIZAÇÃO DE ARMAS E MUNIÇÕES SEM PROCEDÊNCIA LEGAL E JUSTIFICADA.</p>
      <p style="text-align: justify; margin-bottom: 12px;">Eu, que abaixo assino, declaro ter recebido instruções de segurança e ter tomado conhecimento das normas legais estabelecidas em legislação pertinente, assumindo o compromisso pela minha participação nas atividades e pela minha permanência nas dependências da PROTECT. Declaro, ainda, que não possuo registro de antecedentes criminais e que os dados constantes nesta ficha são verdadeiros. Declaro ter ciência da necessidade de cumprir a Lei nº 10.826/2003, Decreto nº 5.123/2004, R-105 do Exército Brasileiro e demais normas aplicáveis.</p>
    </div>

    <div style="margin-top: 32px;">
      <p style="text-align: center; margin-bottom: 24px;">
        E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença das testemunhas.
      </p>

      <div style="margin-top: 32px; display: flex; gap: 24px;">
        <div style="flex: 1; display: flex; flex-direction: column;">
          <div style="height: 60px; margin-bottom: 12px; display: flex; align-items: flex-end; justify-content: center;">
            <img src="/assinatura2.png" alt="PROTECT" style="height: 100%; max-width: 95%; object-fit: scale-down;" crossorigin="anonymous" />
          </div>
          <div style="border-top: 1px solid #4b5563; padding-top: 8px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px;">PROTECT CLUBE MINEIRO DE TIRO</p>
            <p style="margin: 4px 0; font-size: 11px; color: #6b7280;">CNPJ: 01.244.200/0001-52</p>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">ANTONIO C. COSTA JUNIOR</p>
          </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column;">
          <div style="height: 60px; margin-bottom: 12px;"></div>
          <div style="border-top: 1px solid #4b5563; padding-top: 8px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px;">${nome}</p>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">CPF: ${cpf}</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 32px; display: flex; gap: 24px;">
        <div style="flex: 1; display: flex; flex-direction: column;">
          <div style="height: 60px; margin-bottom: 12px; display: flex; align-items: flex-end; justify-content: center;">
            <img src="/assinatura1.png" alt="Testemunha 1" style="height: 100%; max-width: 95%; object-fit: scale-down;" crossorigin="anonymous" />
          </div>
          <div style="border-top: 1px solid #4b5563; padding-top: 8px;">
            <p style="margin: 0; font-size: 11px; color: #6b7280;">TESTEMUNHA 1</p>
            <p style="margin: 4px 0; font-weight: bold; font-size: 13px;">EMMERSON N. DO CARMO</p>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">CPF: 001.583.866-80</p>
          </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column;">
          <div style="height: 60px; margin-bottom: 12px; display: flex; align-items: flex-end; justify-content: center;">
            <img src="/assinatura3.png" alt="Testemunha 2" style="height: 100%; max-width: 95%; object-fit: scale-down;" crossorigin="anonymous" />
          </div>
          <div style="border-top: 1px solid #4b5563; padding-top: 8px;">
            <p style="margin: 0; font-size: 11px; color: #6b7280;">TESTEMUNHA 2</p>
            <p style="margin: 4px 0; font-weight: bold; font-size: 13px;">NEWTON C. BAPTISTON</p>
            <p style="margin: 0; font-size: 11px; color: #6b7280;">CPF: 584.978.896-49</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 32px; text-align: center; padding-top: 16px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #4b5563;">
          Belo Horizonte/MG, ${dataAtual}
        </p>
        <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af;">
          Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG
        </p>
        <p style="margin: 0; font-size: 11px; color: #9ca3af;">
          clube@grupoprotect.com.br  ·  grupoprotect.com.br  ·  (31) 3371-8500
        </p>
      </div>
    </div>
  `;
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
  const BOTTOM = H - 18;
  let y = 20;

  const nome = contract.nome?.toUpperCase() || "___________________________";
  const cpf = contract.cpf || "___________________________";
  const rg = contract.rg || "_______________";
  const profissao = contract.profissao || "_______________";
  const natural = contract.naturalidade || "_______________";
  const nasc = contract.nascimento
    ? contract.nascimento.split("-").reverse().join("/")
    : "__/__/____";

  const planoStr = contract.plano || "3 anos";
  const isPlano5 = planoStr.includes("5");
  const nomeContrato = isPlano5 ? "quinquenal" : "trienal";
  const nomePrazo = isPlano5 ? "cinco" : "três";
  const total = isPlano5 ? "R$ 6.000,00" : "R$ 3.600,00";
  const parcela = "R$ 1.200,00";
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

  const ptToMm = (size: number, spacing = 1.18) => size * 0.352778 * spacing;

  const newPageIfNeeded = (needed = 20) => {
    if (y + needed > BOTTOM) {
      pdf.addPage();
      y = 18;
    }
  };

  const text = (str: string, xPos: number, yPos: number, opts: any = {}) => {
    const { size = 9, bold = false, italic = false, align = "left", color = [20, 20, 20] } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(str, xPos, yPos, { align });
  };

  const para = (str: string, opts: any = {}) => {
    const { size = 9, bold = false, italic = false, color = [20, 20, 20], gap = 3 } = opts;
    pdf.setFontSize(size);
    pdf.setFont("times", bold && italic ? "bolditalic" : bold ? "bold" : italic ? "italic" : "normal");
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(str, TW) as string[];
    const lh = ptToMm(size);
    newPageIfNeeded(lines.length * lh + gap);
    pdf.text(lines, ML, y);
    y += lines.length * lh + gap;
  };

  const sectionTitle = (str: string) => {
    newPageIfNeeded(14);
    y += 4;
    text(str, ML, y, { size: 9, bold: true });
    y += 1.5;
    pdf.setDrawColor(120, 120, 120);
    pdf.setLineWidth(0.3);
    pdf.line(ML, y, ML + TW, y);
    y += 5;
  };

  const clause = (title: string, body: string, gap = 3) => {
    const size = 9;
    const lh = ptToMm(size);
    const full = title + " " + body;
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(full, TW) as string[];
    newPageIfNeeded(lines.length * lh + gap);

    lines.forEach((line, i) => {
      if (i === 0) {
        pdf.setFont("times", "bold");
        pdf.setTextColor(20, 20, 20);
        pdf.text(title + " ", ML, y);
        const titleW = pdf.getStringUnitWidth(title + " ") * (size / pdf.internal.scaleFactor);
        pdf.setFont("times", "normal");
        const bodyStart = line.substring(title.length + 1);
        if (bodyStart) pdf.text(bodyStart, ML + titleW, y);
      } else {
        pdf.setFont("times", "normal");
        pdf.setTextColor(20, 20, 20);
        pdf.text(line, ML, y);
      }
      y += lh;
    });
    y += gap;
  };

  text("CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR)", W / 2, y, { size: 11, bold: true, align: "center" });
  y += 5;
  text("Protect Clube Mineiro de Tiro — CNPJ 01.244.200/0001-52", W / 2, y, { size: 8, align: "center", color: [80, 80, 80] });
  y += 3;
  pdf.setDrawColor(180, 180, 180);
  pdf.setLineWidth(0.4);
  pdf.line(ML, y, ML + TW, y);
  y += 7;

  text(`Cota ${nomeContrato} — vigência ${vigencia} — Total: ${total}`, W / 2, y, { size: 8, align: "center", color: [60, 60, 60], italic: true });
  y += 6;

  para(`Pelo presente instrumento particular de CONTRATO DE ADESÃO DE SÓCIO USUÁRIO (COLABORADOR), de um lado, Protect Clube Mineiro de Tiro, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 01.244.200/0001-52, com sede na Rua General Andrade Neves, 622, Bairro Gutierrez, Belo Horizonte/MG, e posteriormente na Rua dos Radialistas, 38, Bairro Balneário Água Limpa, Nova Lima/MG, neste ato representada por quem de direito, doravante simplesmente denominada PROTECT; e, de outro lado, o(a) Sr.(a) ${nome}, profissão ${profissao}, inscrito(a) no RG nº ${rg}, portador(a) do CPF nº ${cpf}, natural de ${natural}, nascido(a) em ${nasc}, doravante simplesmente denominado(a) SÓCIO USUÁRIO (COLABORADOR), têm entre si justo e contratado o direito de sócio usuário (colaborador) da PROTECT, tudo de acordo com as condições especificadas nesta contratação/adesão e na legislação vigente.`, { size: 8.5 });
  para("O proponente declara aceitar as cláusulas deste contrato sem restrições, bem como a eleição do foro da Comarca de Belo Horizonte/MG para dirimir quaisquer pendências relativas ao presente instrumento.", { italic: true, color: [60, 60, 60], size: 8.5 });
  y += 2;

  sectionTitle("1. DO PREÇO E DA FORMA DE PAGAMENTO");
  clause("CLÁUSULA PRIMEIRA:", `O valor total do contrato, correspondente à cota ${nomeContrato} (vigente por ${nomePrazo} anos), é de ${total}, ficando isento o pagamento de taxa de contribuição social mensal.`);
  clause("PARÁGRAFO PRIMEIRO:", "Declara o sócio usuário (colaborador), neste ato, ter ciência de que a revalidação do CR (Certificado de Registro) é feita, atualmente, de três em três anos.");
  clause("PARÁGRAFO SEGUNDO:", `O pagamento deverá ser efetuado no ato da assinatura deste contrato, no valor de ${parcela} (anuidade), correspondente à primeira parcela, salvo eventual desconto ou condição diferenciada. Em caso de parcelamento, o valor remanescente será reajustado ao final de cada ano pelo IGP-M ou índice substituto. Independentemente da data de ingresso, o pagamento será anual e válido até o último dia de dezembro. Este contrato também servirá como recibo, mediante comprovação de depósito via PIX CNPJ nº 01.244.200/0001-52 ou por link de cartão de crédito do clube.`);
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

  newPageIfNeeded(90);
  y += 5;
  para("E, por estarem justas e contratadas, firmam o presente em 02 (duas) vias, na presença das testemunhas.");
  y += 6;

  const col = TW / 2 - 3;
  const sigH = 14;
  const sigW = 35;

  try { pdf.addImage(sigs.s2, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}
  y += sigH;

  pdf.setDrawColor(80, 80, 80);
  pdf.setLineWidth(0.3);
  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 6, y, ML + TW, y);
  y += 4;
  text("PROTECT CLUBE MINEIRO DE TIRO", ML, y, { size: 8, bold: true });
  text(nome, ML + col + 6, y, { size: 8, bold: true });
  y += 4;
  text("CNPJ: 01.244.200/0001-52", ML, y, { size: 7, color: [100, 100, 100] });
  text(`CPF: ${cpf}`, ML + col + 6, y, { size: 7, color: [100, 100, 100] });
  y += 3;
  text("ANTONIO C. COSTA JUNIOR", ML, y, { size: 7, color: [100, 100, 100] });
  y += 14;

  try { pdf.addImage(sigs.s1, "PNG", ML, y, sigW, sigH, undefined, "FAST"); } catch (_) {}
  try { pdf.addImage(sigs.s3, "PNG", ML + col + 6, y, sigW, sigH, undefined, "FAST"); } catch (_) {}
  y += sigH;

  pdf.line(ML, y, ML + col, y);
  pdf.line(ML + col + 6, y, ML + TW, y);
  y += 4;
  text("TESTEMUNHA 1", ML, y, { size: 7, color: [100, 100, 100] });
  text("TESTEMUNHA 2", ML + col + 6, y, { size: 7, color: [100, 100, 100] });
  y += 4;
  text("EMMERSON N. DO CARMO", ML, y, { size: 8 });
  text("NEWTON C. BAPTISTON", ML + col + 6, y, { size: 8 });
  y += 4;
  text("CPF: 001.583.866-80", ML, y, { size: 7, color: [100, 100, 100] });
  text("CPF: 584.978.896-49", ML + col + 6, y, { size: 7, color: [100, 100, 100] });
  y += 12;

  text(`Belo Horizonte/MG, ${dataAtual}`, W / 2, y, { size: 8, align: "center", color: [80, 80, 80] });
  y += 5;
  text("Rua General Andrade Neves, 622, Grajaú, CEP 30431-128 — Belo Horizonte/MG", W / 2, y, { size: 7, align: "center", color: [120, 120, 120] });
  y += 4;
  text("clube@grupoprotect.com.br  ·  grupoprotect.com.br  ·  (31) 3371-8500", W / 2, y, { size: 7, align: "center", color: [120, 120, 120] });

  const totalPages = (pdf.internal as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(160, 160, 160);
    pdf.text(`${i} / ${totalPages}`, W - MR - 2, H - 8, { align: "right" });
  }
}