import FooterRastreamentoLight from "../../../components/footerRastreamento";
import CookieBanner from "../../../components/CookieBanner"; 
// Importe o Provider que criamos para gerenciar o estado do idioma
import { LangProvider } from "../../../context/LangContext";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Aguarda os parâmetros da URL (Next.js 15+ style)
  const { locale } = await params;
  
  // Tipagem segura para o idioma
  const currentLocale = (locale || "pt") as "pt" | "en" | "es";

  return (
    <LangProvider>
      {/* O LangProvider aqui garante que qualquer componente "use client" 
          dentro de {children} consiga usar o hook useLang() 
      */}
      
      <main>
        {children}
      </main>

      {/* Banner de Cookies (provavelmente um Client Component) */}
      <CookieBanner />
      
      {/* Footer recebendo o locale. 
          Se o Footer for um Client Component, ele também poderia usar useLang() internamente 
      */}
      <FooterRastreamentoLight />
    </LangProvider>
  );
}