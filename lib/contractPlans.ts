export const PLANOS = {
  "2": {
    label: "2 anos",
    nomeContrato: "bienal",
    nomePrazo: "dois",
    total: "R$ 2.400,00",
    totalRaw: 2400,
    parcela: "R$ 1.200,00",
    parcelaRaw: 1200,
    versao: "v2026.1-2anos",
    vigencia: "2 anos",
  },
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

export type PlanoKey = keyof typeof PLANOS;

export function getContractPlanKey(plano?: string): PlanoKey {
  if (plano?.includes("5")) return "5";
  if (/^2(?: anos)?$/.test(plano?.trim() ?? "")) return "2";
  return "3";
}
