"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
 
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  X,
  User,
  FileText,
  BadgeCheck,
  Printer,
  LayoutDashboard,
  Menu,
  Target,
} from "lucide-react";

/* ---------------- MOCK DICT ---------------- */
const dictionaries = {
  pt: {
    navbar: {
      home: "Início",
      truck: "Quem Somos",
      courses: "Cursos",
      products: "Produtos",
      dispatcher: "Parceiros",
      club: "Clientes",
      blog: "Blog",
      training: "Treinamento",
      join: "Associe-se",
      contact: "Fale Conosco",
    },
  },
  en: {
    navbar: {
      home: "Home",
      truck: "About Us",
      courses: "Courses",
      products: "Products",
      dispatcher: "Partners",
      club: "Clients",
      blog: "Blog",
      training: "Training",
      join: "Join Us",
      contact: "Contact",
    },
  },
  es: {
    navbar: {
      home: "Inicio",
      truck: "Quiénes Somos",
      courses: "Cursos",
      products: "Productos",
      dispatcher: "Socios",
      club: "Clientes",
      blog: "Blog",
      training: "Entrenamiento",
      join: "Únete",
      contact: "Contacto",
    },
  },
};


const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = useMemo<Lang>(() => {
    if (!pathname) return "pt";
    const seg = pathname.split("/").filter(Boolean)[0];
    return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : "pt";
  }, [pathname]);

  const t = (dictionaries as any)[currentLang].navbar;
  const withLang = (path?: string) => {
    if (!path) return "#";
    return path.startsWith(`/${currentLang}`)
      ? path
      : `/${currentLang}${path}`;
  };





  const menuItems = [
    { key: "home", label: "Apresentação", href: "/apresentacao" },

    {
      key: "loja",
      label: "Loja",
      children: [
        { label: "Pistolas", href: "/loja/pistolas" },
        { label: "Revólveres", href: "/loja/revolveres" },
        { label: "Espingardas", href: "/loja/espingardas" },
        { label: "Rifles", href: "/loja/rifles" },
        { label: "Defesa Pessoal", href: "/loja/defesa-pessoal" },
        { label: "Outros", href: "/loja/outros" },
      ],
    },

    {
      key: "clube",
      label: "Clube",
      children: [
        { label: "BH - Gutierrez", href: "/clube/gutierrez" },
        { label: "BH - Raja", href: "/clube/raja" },
        { label: "Nova Lima - Alphaville", href: "/clube/alphaville" },
        { label: "Calendário", href: "/clube/calendario" },
        { label: "Mídias", href: "/clube/midias" },
      ],
    },

    {
      key: "rastreamento",
      label: "Rastreamento",
      href: "/rastreamento",
    },

    {
      key: "cursos",
      label: "Cursos",
      children: [
        { label: "Capacitação de Guardas e Agentes", href: "/cursos/capacitacao" },
        { label: "Defensivo", href: "/cursos/defensivo" },
        { label: "Desportivo", href: "/cursos/desportivo" },
        { label: "Outros", href: "/cursos/outros" },
      ],
    },

    {
      key: "despachante",
      label: "Despachante",
      children: [
        { label: "Polícia Federal", href: "/despachante/pf" },
        { label: "Exército Brasileiro", href: "/despachante/exercito" },
      ],
    },

    {
      key: "midias",
      label: "Mídias",
      children: [
        { label: "Galeria", href: "/midias/galeria" },
        { label: "Vídeos", href: "/midias/videos" },
      ],
    },

    {
      key: "museu",
      label: "Museu da Paz",
      href: "/museu-da-paz",
    },

    {
      key: "bigtruck",
      label: "Big Truck METATRON",
      href: "/big-truck-metatron",
    },

    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contato" },
  ];



  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white"
          }`}
      >
        <div className="w-full flex flex-col items-center">

          {/* 🔥 TOP UTILITY BAR — DESKTOP ONLY */}
          <div className="hidden md:block w-full bg-linear-to-r from-[#0f0f0f] via-[#151515] to-[#0f0f0f] border-b border-white/10">
            <div className="container mx-auto px-4 h-10 flex items-center justify-center gap-6 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-white/80">

              <UtilityLink
                href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL2RlY2xhcmFjYW8="
                icon={<FileText size={14} />}
                label="Emissão de Declarações"
              />

              <UtilityLink
                href="https://clubedetirobh.com.br/validar-declaracao/"
                icon={<BadgeCheck size={14} />}
                label="Validar Declarações"
              />

              <UtilityLink
                href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL3NlY3JldGFyaWEvZGVzcGFjaGFudGUvc29saWNpdGFjb2Vz"
                icon={<LayoutDashboard size={14} />}
                label="Serviços de Secretaria"
              />

              <UtilityLink
                href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL2ZpbmFuY2Vpcm8vYm9sZXRv"
                icon={<Printer size={14} />}
                label="2ª Via de Boleto"
              />

            </div>
          </div>

          {/* 🟡 TOP BAR (LOGO + HAMBURGER MOBILE) */}
          <div
            className={`container mx-auto px-4 flex justify-between items-center gap-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"
              }`}
          >
            <div className="shrink-0">
              <Image
                src="/LOGO1.png"
                alt="Logo"
                width={isScrolled ? 130 : 160}
                height={60}
                className="object-contain transition-all duration-300"
              />
            </div>

            {/* DESKTOP RIGHT SIDE */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-3 text-gray-700">
                <IconInstagram /> <IconFacebook /> <IconWhatsapp />{" "}
                <IconLinkedin /> <IconYoutube />
              </div>

              <div className="flex gap-2 border-l border-gray-200 pl-6">
                <FlagBtn lang="us" />
                <FlagBtn lang="br" active />
                <FlagBtn lang="es" />
              </div>



              <a
                href="https://app.shootinghouse.com.br/login/clubedetirobh.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <button
                  className="relative overflow-hidden flex items-center gap-2 bg-[#1a1a1a] text-[#ffb703]
    px-5 py-2.5 rounded-md font-bold text-sm cursor-pointer
    shadow-md transition-all duration-300
    hover:bg-black hover:shadow-lg hover:shadow-[#ffb703]/20 hover:-translate-y-px
    active:scale-95"
                >
                  {/* Glow sweep */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-[#ffb703]/20 to-transparent
    translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />

                  <User size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">ACESSO C.A.C</span>
                </button>
              </a>



            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-black"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* 🧭 NAV DESKTOP */}
          <div
            className={`hidden lg:block container mx-auto px-4 transition-all duration-300 ${isScrolled ? "pb-2" : "pb-4"
              }`}
          >
            <nav className="bg-[#1a1a1a] rounded-full px-6 py-1 shadow-xl">
              <div className="flex justify-between items-center h-12">
                <ul className="flex items-center gap-8 w-full justify-center">
                  {menuItems.map((item) => (
                    <li key={item.key} className="relative group">

                      {/* ITEM NORMAL */}
                      {item.href ? (
                        <a
                          href={withLang(item.href)}
                          className="text-white hover:text-[#ffb703] text-[13px] font-semibold flex items-center gap-1 duration-300 transition-all py-3 uppercase tracking-wider"
                        >
                          {item.label || t[item.key]}
                        </a>
                      ) : (
                        /* ITEM COM DROPDOWN */
                        <span className="text-white text-[13px] font-semibold flex items-center gap-1 py-3 uppercase tracking-wider cursor-pointer">
                          {item.label}
                        </span>
                      )}

                      {/* LINHA AMARELA */}
                      <span className="absolute bottom-2 left-0 w-full scale-x-0 h-0.5 rounded-2xl bg-[#ffb703] duration-300 origin-left transition-all group-hover:scale-x-100"></span>

                      {/* DROPDOWN */}
                      {item.children && (
                        <ul className="absolute left-0 top-full mt-2 w-56 bg-[#1a1a1a] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 z-50">
                          {item.children.map((child, index) => (
                            <li key={index}>
                              <a
                                href={withLang(child.href)}
                                className="block px-4 py-2 text-sm text-white hover:text-[#ffb703] hover:bg-white/5 transition-all"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}

                    </li>
                  ))}

                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-99"
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-100dvh overflow-y-auto w-[85%] max-w-sm bg-black text-white z-100 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-end px-5 py-4 border-b border-white/10">

          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>
          <div className="mt-auto px-5 py-5 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-3">
            <FlagBtn lang="br" active />
            <FlagBtn lang="us" />
            <FlagBtn lang="es" />
          </div>

          <button className="flex items-center gap-2 bg-[#ffb703] text-black px-4 py-2 rounded-md font-bold text-xs hover:bg-[#ffd166] transition">
            <User size={14} />
            ACESSO C.A.C
          </button>
        </div>
        {/* SERVIÇOS */}
        <div className="px-5 pt-4 grid grid-cols-2 gap-3 text-xs uppercase tracking-wide">
          <UtilityMobile
            href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL2RlY2xhcmFjYW8="
            icon={<FileText size={14} />}
            label="Declarações"
          />
          <UtilityMobile
            href="https://clubedetirobh.com.br/validar-declaracao/"
            icon={<BadgeCheck size={14} />}
            label="Validar"
          />
          <UtilityMobile
            href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL3NlY3JldGFyaWEvZGVzcGFjaGFudGUvc29saWNpdGFjb2Vz"
            icon={<LayoutDashboard size={14} />}
            label="Secretaria"
          />
          <UtilityMobile
            href="https://www.shootinghouse.com.br/login-associado/clubedetirobh.com.br/aHR0cHM6Ly93d3cuc2hvb3Rpbmdob3VzZS5jb20uYnIvYXNzb2NpYWRvL2ZpbmFuY2Vpcm8vYm9sZXRv"
            icon={<Printer size={14} />}
            label="Boletos"
          />
        </div>

        {/* LINKS */}
        <nav className="mt-6 px-5 space-y-1 text-sm uppercase tracking-wide">

          {menuItems.map((item) => (
            <div key={item.key} className="border-b border-white/10">

              {/* ITEM NORMAL */}
              {item.href ? (
                <a
                  href={withLang(item.href)}
                  className="block py-3 hover:text-[#ffb703] transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label || t[item.key]}
                </a>
              ) : (
                /* ITEM COM SUBMENU */
                <button
                  onClick={() =>
                    setOpenSub(openSub === item.key ? null : item.key)
                  }
                  className="w-full flex justify-between items-center py-3 hover:text-[#ffb703] transition"
                >
                  <span>{item.label}</span>
                  <span
                    className={`transition-transform duration-300 ${openSub === item.key ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>
              )}

              {/* SUBMENU */}
              {item.children && openSub === item.key && (
                <div className="pl-4 pb-3 space-y-2 text-xs text-white/80">
                  {item.children.map((child, index) => (
                    <a
                      key={index}
                      href={withLang(child.href)}
                      className="block py-1 hover:text-[#ffb703] transition"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}

            </div>
          ))}

        </nav>


        {/* FOOTER MENU — FLAGS + ACESSO */}
        
      </aside>

      {/* SPACER */}
      <div className="h-20 lg:h-35" />
    </>
  );
}

/* ---------------- COMPONENTES AUX ---------------- */

function UtilityLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noreferrer"
      className="flex items-center gap-2 hover:text-[#ffb703] transition-all ease-in-out duration-200 group"
    >
      <span className="opacity-70 group-hover:opacity-100 transition-all">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function UtilityMobile({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function FlagBtn({ lang, active = false }: { lang: string; active?: boolean }) {
  const codes: any = { br: "BR", us: "US", es: "ES" };
  return (
    <button
      className={`hover:scale-110 transition-transform cursor-pointer ${active
        ? "ring-2 ring-[#ffb703] ring-offset-2 ring-offset-black rounded-sm"
        : "opacity-70"
        }`}
    >
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${codes[lang]}.svg`}
        className="w-6 h-auto rounded-sm"
        alt={lang}
      />
    </button>
  );
}

/* ---------------- ICONS ---------------- */

function IconInstagram() {
  return (
    <a href="#" className="hover:text-[#ffb703] transition-all ease-in-out duration-300">
      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      </div>
    </a>
  );
}

function IconWhatsapp() {
  return (
    <a href="#" className="hover:text-[#ffb703] transition-all ease-in-out duration-300">
      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </div>
    </a>
  );
}

function IconLinkedin() {
  return (
    <a href="#" className="hover:text-[#ffb703] transition-all ease-in-out duration-300">
      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      </div>
    </a>
  );
}

function IconYoutube() {
  return (
    <a href="#" className="hover:text-[#ffb703] transition-all ease-in-out duration-300">
      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
        </svg>
      </div>
    </a>
  );
}

function IconFacebook() {
  return (
    <a href="#" className="hover:text-[#ffb703] transition-all ease-in-out duration-300">
      <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-all ease-in-out duration-300">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
        </svg>
      </div>
    </a>
  );
}
