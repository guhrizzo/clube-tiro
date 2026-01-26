"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  const languages = [
    { code: "pt", label: "Português", src: "https://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg" },
    { code: "en", label: "English", src: "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" },
    { code: "es", label: "Español", src: "https://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg" },
  ];

  const menuItems = [
    { name: "Início", href: "/" },
    { name: "Best Shot Truck", href: "/truck" },
    { name: "Cursos", href: "/cursos", submenu: ["Tiro básico com armas curtas", "Tiro básico esportivo", "Tiro avançado módulo I", "Tiro esportivo com armas longas", "Calibre .40"] },
    { name: "Produtos", href: "/produtos", submenu: ["Pistolas", "Revólveres", "Rifles e Carabinas", "Espingardas"] },
    { name: "Despachante", href: "/despachante", submenu: ["Exército", "Polícia Federal"] },
    { name: "Clube", href: "/clube", submenu: ["Campeonato", "Galeria", "Vídeos"] },
    { name: "Blog", href: "/blog" },
    { name: "Treinamento", href: "/treinamento", submenu: ["Guarda municipal BH", "Guarda municipal Contagem", "Guarda municipal Sete Lagoas"] },
    { name: "Associe-se", href: "/associe-se" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <nav className="bg-[#003566] p-4 relative z-50 w-full border-b border-white/10 shadow-md">
      <div className="container mx-auto flex justify-between items-center text-[14px]">
        <div className="text-white flex items-center gap-4">
          <Image src="/logo-horizontal-branco2-removebg-preview.png" alt="Logo" width={120} height={50} className="mr-2" />

          {/* Desktop */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group py-2">
                <a href={item.href} className="text-[#f2f2f2]/80 hover:text-[#f2f2f2] transition-all flex items-center gap-1">
                  {item.name}
                  {item.submenu && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="opacity-70 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  )}
                </a>

                {item.submenu && (
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-[#f2f2f2] min-w-50 shadow-2xl border-t-[3px] border-[#ffb703] animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.submenu.map((sub) => (
                      <li key={sub}>
                        <a href="#" className="block px-4 py-3 text-[#003566]/90 hover:text-white hover:bg-[#003566] border-b border-white/5 last:border-0 transition-colors">
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop right */}
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <IconFacebook />
              <IconInstagram />
              <IconTwitter />
              <IconYoutube />
            </div>

            <div className="w-px h-8 bg-gray-200/20 rounded-full mx-2"></div>

            <div className="flex gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="hover:scale-110 transition-transform"
                  aria-label={lang.label}
                >
                  <img src={lang.src} alt={lang.label} className="w-6 h-auto rounded-sm shadow-sm cursor-pointer" />
                </button>
              ))}
            </div>
          </div>

          {/* Botão mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-around w-8 h-6 bg-transparent border-none cursor-pointer p-0 z-50"
          >
            <div className={`w-8 h-1 bg-white rounded-lg transition-all duration-300 origin-[1px] ${open ? "rotate-45 -translate-y-2" : "rotate-0"}`} />
            <div className={`w-8 h-1 bg-white rounded-lg transition-all duration-300 origin-[1px] ${open ? "-rotate-45" : "rotate-0"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-500 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col rounded-2xl border-[#ffffff1c] border pt-4 bg-[#002855] shadow-xl">
          {/* TOPO MOBILE */}
          <div className="flex flex-col items-center gap-4 pb-4 border-b border-white/15">
            <div className="flex gap-6">
              <IconFacebook />
              <IconInstagram />
              <IconTwitter />
              <IconYoutube />
            </div>

            <div className="flex gap-5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="hover:scale-110 transition-transform"
                >
                  <img src={lang.src} alt={lang.label} className="w-7 rounded-sm shadow-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* MENU MOBILE */}
          <div className="pt-3">
            {menuItems.map((item) => (
              <div key={item.name} className="flex flex-col">
                <a href={item.href} className="block text-white px-4 py-3 hover:bg-[#003566] transition-colors">
                  {item.name}
                </a>

                {item.submenu && (
                  <div className="pl-8 bg-black/10 border-l border-white/5">
                    {item.submenu.map((sub) => (
                      <a key={sub} href="#" className="block py-2 text-white/70 text-[13px] hover:text-white transition-colors">
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Ícones
function IconFacebook() { return <a href="https://www.facebook.com/grupoprotectbhmg/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f2f2f2" className="opacity-85 transition-all hover:opacity-100 cursor-pointer" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" /></svg></a>; }
function IconInstagram() { return <a href="https://www.instagram.com/grupoprotect/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f2f2f2" className="opacity-85 transition-all hover:opacity-100 cursor-pointer" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" /></svg></a>; }
function IconTwitter() { return <a href="https://x.com/ClubeProtect" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f2f2f2" className="opacity-85 transition-all hover:opacity-100 cursor-pointer" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /></svg></a>; }
function IconYoutube() { return <a href="https://www.youtube.com/@Protecttiro/featured" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f2f2f2" className="opacity-85 transition-all hover:opacity-100 cursor-pointer" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" /></svg></a>; }
