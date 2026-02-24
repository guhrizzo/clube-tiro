import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import React from "react";
import { Montserrat } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // O que aparece na aba do navegador
  title: {
    default: "Grupo Protect | Segurança e Treinamento de Elite",
    template: "%s | Grupo Protect"
  },
  description: "Especialistas em segurança armada, treinamentos táticos e soluções de proteção. O Grupo Protect oferece cursos de tiro e consultoria de elite.",
  
  // Palavras-chave para SEO (ajuda o Google a entender do que se trata o site)
  keywords: ["segurança privada", "curso de tiro", "treinamento tático", "Grupo Protect", "proteção executiva"],

  // Configuração para Redes Sociais (Open Graph)
  openGraph: {
    title: "Grupo Protect | Segurança e Treinamento de Elite",
    description: "Treinamentos táticos e segurança profissional. Conheça nossa agenda de cursos.",
    url: "https://www.grupoprotect.com.br", // domínio aqui
    siteName: "Grupo Protect",
    images: [
      {
        url: "/og-image.jpg", // Criar uma imagem de 1200x630px e coloque na pasta /public
        width: 1200,
        height: 630,
        alt: "Grupo Protect Treinamentos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  // Configuração para Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Grupo Protect",
    description: "Segurança e Treinamento de Elite",
    images: ["/og-image.jpg"],
  },

  // Ícones (Favicon)
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Imagem para quando salvarem o site no iPhone
  },

  // Robots (instruções para o Google)
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased lg:pt-16 pt-0`}>
        {children}
      </body>

    </html>
  );
}
