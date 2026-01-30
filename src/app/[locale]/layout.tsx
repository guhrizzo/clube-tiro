import Footer from "../../../components/Footer";

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
      <Footer locale={locale as "pt" | "en" | "es"} />
    </>
  );
}
