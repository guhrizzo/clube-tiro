"use client";
import Image from "next/image";
import { Target } from "lucide-react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { footerDict } from "../i18n/footer";

export default function FooterRastreamentoLight({ locale = "pt" }: { locale?: "pt" | "en" | "es" }) {
  const t = footerDict[locale];
  return (
    <footer className="relative bg-white text-[#0a0f1c] border-t border-black/10 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* LOGO + BRAND */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div>
              {/* NOME ATUALIZADO: GRUPO PROTECT */}
              <Image src={"/LOGO1.png"} width={200} height={200} alt="Logo Grupo Protect"/>
              <p className="text-black/60 text-sm">
                Tecnologia em segurança veicular
              </p>
            </div>
          </div>

          <p className="text-black/60 text-sm leading-relaxed max-w-sm">
            Monitoramento inteligente para proteger seu patrimônio com rapidez,
            precisão e suporte humano 24 horas.
          </p>
        </div>

        {/* CONTATO */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b]">
            Fale Conosco
          </h4>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <FaPhoneAlt className="text-[#ffc300] mt-1 shrink-0" />
              <div>
                <p className="font-semibold">Central de Atendimento</p>
                <a
                  href="tel:+553133718600"
                  className="text-black/60 hover:text-[#b8860b] transition"
                >
                  +55 (31) 3371-8600
                </a>
              </div>
            </li>

            <li className="flex gap-3 items-start">
              <FaEnvelope className="text-[#ffc300] mt-1 shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <a
                  href="mailto:info@protectrastreamento.com"
                  className="text-black/60 hover:text-[#b8860b] transition"
                >
                  info@protectrastreamento.com
                </a>
              </div>
            </li>

            <li className="flex gap-3 items-start">
              <FaMapMarkerAlt className="text-[#ffc300] mt-1 shrink-0" />
              <div className="text-black/60 leading-relaxed">
                Rua General Andrade Neves, 622 — Grajaú<br />
                Belo Horizonte / MG — 30430-128
              </div>
            </li>
          </ul>
        </div>

        {/* APP + SOCIAL */}
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b] mb-4">
              Baixe o App
            </h4>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/br/app/grupo-protect-rastreamento/id6738363845"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-all border border-black/10"
              >
                <FaApple className="text-xl" />
                <div className="text-xs leading-tight">
                  <span className="block text-black/50">Disponível na</span>
                  <span className="font-semibold">App Store</span>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.softruck.protectrast"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-all border border-black/10"
              >
                <FaGooglePlay className="text-xl" />
                <div className="text-xs leading-tight">
                  <span className="block text-black/50">Disponível no</span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b] mb-4">
              Redes Sociais
            </h4>

            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61567757725049" },
                { icon: FaInstagram, href: "https://www.instagram.com/protect.rastreamento/" },
                { icon: FaWhatsapp, href: "https://wa.me/553133718600" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/protect-rastreamento-a97106350" },
                { icon: FaYoutube, href: "https://www.youtube.com/@ProtectRastreamento" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-black/5 hover:bg-[#ffc300] hover:text-black transition-all shadow-sm"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT + CREDITS */}
      <div className="relative border-t border-black/10 py-8 text-center space-y-2">
        <div className="text-[10px] md:text-xs text-black/50 tracking-[0.2em] uppercase font-medium">
          © {new Date().getFullYear()} GRUPO PROTECT — TODOS OS DIREITOS RESERVADOS
        </div>
        
        {/* CRÉDITO XF FAMILY */}
        <div className="text-[10px] md:text-xs text-black/40 tracking-widest">
          Desenvolvido por{" "}
          <a 
            href="https://www.instagram.com/xfamilyassessoria/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-[#b8860b] transition-colors"
          >
            XF FAMILY
          </a>
        </div>
      </div>

    </footer>
  );
}