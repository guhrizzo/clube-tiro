import Footer from "../../../components/Footer";
import FooterRastreamentoLight from "../../../components/footerRastreamento";

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
      <FooterRastreamentoLight locale={locale as "pt" | "en" | "es"} />
    </>
  );
}
