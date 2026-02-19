import Footer from "../../../components/Footer";
import FooterRastreamentoLight from "../../../components/footerRastreamento";
// 1. Importe o componente que criamos
import CookieBanner from "../../../components/CookieBanner"; 

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {children}
      {/* 2. Adicione o banner aqui */}
      <CookieBanner />
      
      <FooterRastreamentoLight locale={locale as "pt" | "en" | "es"} />
    </>
  );
}