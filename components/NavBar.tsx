"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false); // Menu mobile
  const [searchOpen, setSearchOpen] = useState(false); // Busca mobile
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown de busca ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Lógica de Busca: Achatando a lista para pesquisa
  const searchLibrary = useMemo(() => {
    const list: { name: string; href: string; category: string }[] = [];
    menuItems.forEach(item => {
      list.push({ name: item.name, href: item.href, category: "Menu" });
      if (item.submenu) {
        item.submenu.forEach(sub => {
          list.push({ name: sub, href: item.href, category: item.name });
        });
      }
    });
    return list;
  }, []);

  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchLibrary.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  }, [query, searchLibrary]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setSearchOpen(false);
      setIsFocused(false);
    }
  };

  return (
    <nav className="bg-[#003566] p-4 relative z-50 w-full border-b border-white/10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo e Links Desktop */}
        <div className="text-white flex items-center gap-6">
          <Image src="/logo-horizontal-branco2-removebg-preview.png" alt="Logo" width={110} height={45} className="mr-2 object-contain" />

          <ul className="hidden lg:flex space-x-5 text-[13px] font-medium">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group py-2">
                <a href={item.href} className="text-[#f2f2f2]/80 hover:text-white transition-all flex items-center gap-1">
                  {item.name}
                  {item.submenu && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                </a>

                {item.submenu && (
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-white min-w-55 shadow-2xl border-t-[3px] border-[#ffb703] py-2 animate-in fade-in slide-in-from-top-1">
                    {item.submenu.map((sub) => (
                      <li key={sub}>
                        <a href="#" className="block px-4 py-2 text-[#003566] hover:bg-[#003566] hover:text-white text-[13px] transition-colors">
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

        {/* Lado Direito: Busca e Ações */}
        <div className="flex gap-4 items-center">
          
          {/* Busca Desktop */}
          <div className="relative hidden xl:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={`flex items-center bg-black/20 rounded-full px-3 py-1.5 border transition-all ${isFocused ? 'border-[#ffb703] bg-black/30 w-64' : 'border-white/10 w-48'}`}>
              <input 
                type="text" 
                placeholder="Buscar no site..." 
                className="bg-transparent border-none text-white text-xs outline-none w-full placeholder:text-white/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              <button className="submit text-white/60 hover:text-white">
                <Search size={16} />
              </button>
            </form>

            {/* Resultados Vivos Desktop */}
            {isFocused && filteredResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {filteredResults.map((res, i) => (
                  <a key={i} href={res.href} onClick={() => setQuery("")} className="block px-4 py-2.5 hover:bg-gray-50 border-b last:border-0 border-gray-100">
                    <p className="text-[10px] text-[#ffb703] font-bold uppercase">{res.category}</p>
                    <p className="text-sm text-[#003566] font-medium">{res.name}</p>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <div className="flex gap-3 opacity-80">
              <IconFacebook /> <IconInstagram /> <IconTwitter /> <IconYoutube />
            </div>
            <div className="w-px h-6 bg-white/20 mx-1"></div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)} className="hover:scale-110 transition-transform">
                  <img src={lang.src} alt={lang.label} className="w-5 h-auto rounded-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Botões Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-white">
              {searchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
            <button onClick={() => setOpen(!open)} className="text-white">
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
                <div className={`w-6 h-0.5 bg-white ${open ? "opacity-0" : ""}`} />
                <div className={`w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Busca Mobile Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#002855] border-b border-[#ffb703] p-4 lg:hidden animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input 
              autoFocus
              type="text" 
              placeholder="O que você busca?" 
              className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white outline-none focus:border-[#ffb703]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {filteredResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {filteredResults.map((res, i) => (
                <a key={i} href={res.href} className="block p-3 bg-white/5 rounded-md text-white border-l-2 border-[#ffb703]">
                  <span className="text-[10px] text-white/40 block uppercase">{res.category}</span>
                  {res.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Menu Mobile Lateral/Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-500 opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <div className="bg-[#002855] rounded-xl border border-white/10 p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              <a href={item.href} className="block py-2 text-white font-medium border-b border-white/5">{item.name}</a>
              {item.submenu && (
                <div className="pl-4 py-1 space-y-1 mt-1">
                  {item.submenu.map(sub => (
                    <a key={sub} href="#" className="block py-1 text-white/60 text-sm hover:text-[#ffb703]">{sub}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center gap-6 mt-4">
             {languages.map((lang) => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)} className="flex flex-col items-center gap-1">
                  <img src={lang.src} alt={lang.label} className="w-8 rounded-sm shadow-md" />
                  <span className="text-[10px] text-white/50">{lang.code.toUpperCase()}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Ícones Sociais Reutilizáveis
function IconFacebook() { return <a href="#" className="text-white hover:text-[#ffb703] transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" /></svg></a>; }
function IconInstagram() { return <a href="#" className="text-white hover:text-[#ffb703] transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" /></svg></a>; }
function IconTwitter() { return <a href="#" className="text-white hover:text-[#ffb703] transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /></svg></a>; }
function IconYoutube() { return <a href="#" className="text-white hover:text-[#ffb703] transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" /></svg></a>; }