"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
  FaClock,
} from "react-icons/fa";
import { dictionaries } from "dictionaries";
import { useLang } from "context/LangContext";

const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function FooterRastreamentoLight() {
  const pathname = usePathname();
  const [openWhatsModal, setOpenWhatsModal] = useState(false);

  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : "pt";
  }, [pathname]);

  const t = dictionaries[currentLang];

  const emails = [
    "Adm@grupoprotect.com.br",
    "clube@grupoprotect.com.br",
    "vendas@grupoprotect.com.br",
    "despachante@grupoprotect.com.br",
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61567757725049" },
    { icon: FaInstagram, href: "https://www.instagram.com/protect.rastreamento/" },
    { icon: FaWhatsapp, action: () => setOpenWhatsModal(true) },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/protect-rastreamento-a97106350" },
    { icon: FaYoutube, href: "https://www.youtube.com/@ProtectRastreamento" },
  ];

  return (
    <footer className="relative bg-white text-[#0a0f1c] border-t border-black/10 overflow-hidden">
      {/* CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* COLUNA 1 */}
        <div className="space-y-6">
          <Image
            src={"/LOGO1.png"}
            width={170}
            height={170}
            alt="Logo Grupo Protect"
            className="hover:scale-[1.02] transition-transform"
          />

          <p className="text-black/60 text-sm leading-relaxed max-w-xs">
            {t.company.description}
          </p>

          <div className="pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#b8860b] mb-2">
              {t.company.callCenter}
            </p>

            <a
              href="tel:+553133718500"
              className="text-xl font-bold hover:text-[#b8860b] transition-colors flex items-center gap-2"
            >
              <FaPhoneAlt className="text-sm" />
              (31) 3371-8500
            </a>
          </div>
        </div>

        {/* UNIDADE BH */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b]">
            {t.units.bh.title}
          </h4>

          <ul className="space-y-3 text-xs">
            <li className="flex gap-3 items-start text-black/60">
              <FaMapMarkerAlt className="text-[#ffc300] shrink-0 mt-0.5" />
              <span>
                {t.units.bh.address}
                <br />
                {t.units.bh.city}
              </span>
            </li>

            <li className="flex gap-3 items-center text-black/60">
              <FaClock className="text-[#ffc300] shrink-0" />
              <span>{t.units.bh.hours}</span>
            </li>

            <li className="flex gap-3 items-center">
              <FaWhatsapp className="text-[#25d366] shrink-0" />
              <button
                onClick={() => setOpenWhatsModal(true)}
                className="font-semibold hover:text-[#25d366] transition-colors"
              >
                (31) 99211-8500
              </button>
            </li>
          </ul>
        </div>

        {/* UNIDADE NOVA LIMA */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b]">
            {t.units.novaLima.title}
          </h4>

          <ul className="space-y-3 text-xs">
            <li className="flex gap-3 items-start text-black/60">
              <FaMapMarkerAlt className="text-[#ffc300] shrink-0 mt-0.5" />
              <span>
                {t.units.novaLima.address}
                <br />
                {t.units.novaLima.neighborhood}
              </span>
            </li>

            <li className="flex gap-3 items-center text-black/60">
              <FaClock className="text-[#ffc300] shrink-0" />
              <span>{t.units.novaLima.hours}</span>
            </li>

            <li className="flex gap-3 items-center">
              <FaWhatsapp className="text-[#25d366] shrink-0" />
              <button
                onClick={() => setOpenWhatsModal(true)}
                className="font-semibold hover:text-[#25d366] transition-colors"
              >
                (31) 97107-8500
              </button>
            </li>
          </ul>
        </div>

        {/* EMAILS + APPS */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#b8860b] mb-3">
              {t.emails.title}
            </h4>

            <div className="flex flex-col gap-2 text-xs">
              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-black/60 hover:text-black transition-colors flex items-center gap-2"
                >
                  <FaEnvelope className="text-[10px]" />
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* APP BUTTONS */}
          <div className="flex flex-col gap-3">
            <a
              href="https://apps.apple.com/br/app/grupo-protect-rastreamento/id6738363845"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white hover:bg-black/90 transition-all shadow-sm hover:shadow-md"
            >
              <FaApple className="text-xl" />
              <div className="leading-tight">
                <p className="text-[9px] uppercase opacity-70">{t.apps.appStore}</p>
                <p className="text-xs font-semibold">App Store</p>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.softruck.protectrast"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white hover:bg-black/90 transition-all shadow-sm hover:shadow-md"
            >
              <FaGooglePlay className="text-xl" />
              <div className="leading-tight">
                <p className="text-[9px] uppercase opacity-70">{t.apps.googlePlay}</p>
                <p className="text-xs font-semibold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* SOCIAL BAR */}
      <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-black/5 pt-8">
        <div className="flex gap-4">
          {socialLinks.map((item, i) =>
            item.href ? (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-[#ffc300] hover:scale-110 transition-all duration-300"
              >
                <item.icon size={16} />
              </a>
            ) : (
              <button
                key={i}
                onClick={item.action}
                className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer bg-black/5 hover:bg-[#ffc300] hover:scale-110 transition-all duration-300"
              >
                <item.icon size={16} />
              </button>
            )
          )}
        </div>

        <p className="text-[10px] text-black/40 tracking-[0.3em] uppercase text-center md:text-right">
          {t.social.tagline}
        </p>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-black/5 py-6 text-center space-y-1">
        <div className="text-[10px] text-black/50 tracking-[0.2em] uppercase font-medium">
          © {new Date().getFullYear()} {t.social.copyright}
        </div>

        <div className="text-[10px] text-black/30 tracking-widest">
          {t.social.developedBy}{" "}
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

      {/* WHATSAPP MODAL */}
      {openWhatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{t.modal.title}</h3>
              <button
                onClick={() => setOpenWhatsModal(false)}
                className="text-black/40 hover:text-black cursor-pointer text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-black/60 mb-6">
              {t.modal.description}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5531992118500"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-black/10 p-4 hover:border-[#25d366] hover:bg-[#25d366]/5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <FaWhatsapp className="text-[#25d366] text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-sm">(31) 99211-8500</p>
                    <p className="text-xs text-black/60">{t.modal.bhLabel}</p>
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/5531971078500"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-black/10 p-4 hover:border-[#25d366] hover:bg-[#25d366]/5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <FaWhatsapp className="text-[#25d366] text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-sm">(31) 97107-8500</p>
                    <p className="text-xs text-black/60">{t.modal.novaLimaLabel}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}