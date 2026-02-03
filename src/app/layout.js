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
  title: "Grupo Protect",
  description: "Site oficial do Grupo Protect",
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
