"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { useParams } from "next/navigation";
import { db } from "../../../../lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import NavBar from "../../../../components/NavBar";
import ContactPremium from "../../../../components/Contact";
import { ChevronDown, Filter } from "lucide-react";

type Noticia = {
    id: string;
    titulo: string;
    categoria: string;
    data: string;
    conteudo: string;
    imagem_URL: string;
};

export default function BlogPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
    const [carregando, setCarregando] = useState(true);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { locale } = useParams();

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const q = query(collection(db, "noticias"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const listaNoticias = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Noticia[];

                setNoticias(listaNoticias);

                const cats = listaNoticias.map(n => n.categoria);
                const catsUnicas = ["Todas", ...Array.from(new Set(cats))];
                setCategorias(catsUnicas);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setCarregando(false);
            }
        };

        fetchNoticias();
    }, []);

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const noticiasFiltradas =
        categoriaAtiva === "Todas"
            ? noticias
            : noticias.filter(n => n.categoria === categoriaAtiva);

    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <NavBar />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffb703]/10 text-[#ffb703] text-xs font-bold uppercase tracking-[0.25em] border border-[#ffb703]/20">
                        
                    <NotebookPen size={14}/> Nosso Blog
                    </div>
                    <h2 className="text-4xl md:text-5xl xl:text-6xl  font-extrabold text-slate-900 leading-tight mt-4">
                        Fique por dentro das nossas <span className="text-[#ffb703]">atualizações</span>
                    </h2>
                </div>

                {/* ===== FILTRO DROPDOWN ===== */}
                <div className="flex justify-right mb-16">
                    <div ref={dropdownRef} className="relative w-70">
                        <button
                            onClick={() => setOpen(prev => !prev)}
                            className="w-full flex items-center justify-between cursor-pointer gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all font-medium text-slate-700"
                        >
                            <span className="flex items-center gap-2">
                                <Filter size={16} />
                                {categoriaAtiva === "Todas" ? "Filtrar por categoria" : categoriaAtiva}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${open ? "rotate-180" : ""}`}
                            />
                        </button>

                        {open && (
                            <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                {categorias.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setCategoriaAtiva(cat);
                                            setOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm transition-colors
                      ${categoriaAtiva === cat
                                                ? "bg-slate-100 text-slate-900 font-semibold"
                                                : "hover:bg-slate-50 text-slate-600"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {carregando && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                )}

                {/* Grid de Notícias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {noticiasFiltradas.map(noticia => (
                        <article
                            key={noticia.id}
                            className="group bg-white rounded-4xl border border-slate-200 shadow-sm 
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out 
              flex flex-col overflow-hidden"
                        >
                            {/* Imagem */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={noticia.imagem_URL || "/placeholder-blog.jpg"}
                                    alt={noticia.titulo}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                        {noticia.categoria}
                                    </span>
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-8 flex flex-col grow">
                                <span className="text-slate-400 text-sm mb-3 flex items-center gap-2 font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    {new Date(noticia.data).toLocaleDateString("pt-BR")}
                                </span>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors leading-snug">
                                    {noticia.titulo}
                                </h3>

                                <div className="text-slate-500 line-clamp-3 text-sm">
                                    {noticia.conteudo
                                        /* 1. Substitui tags de fechamento de bloco por espaço para evitar grudamento */
                                        .replace(/<\/p>|<\/h[1-6]>|<\/li>|<br\s*\/?>/gi, ' ')
                                        /* 2. Remove todas as tags HTML */
                                        .replace(/<[^>]*>?/gm, '')
                                        /* 3. Limpa espaços HTML especiais e excesso de espaços em branco */
                                        .replace(/&nbsp;/g, ' ')
                                        .replace(/\s+/g, ' ')
                                        .trim()}
                                </div>

                                <div className="mt-auto border-t border-slate-100 pt-6">
                                    <Link
                                        href={`/${locale}/blog/${noticia.id}`}
                                        className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-tighter hover:text-yellow-600 transition-colors group/link"
                                    >
                                        Ler matéria completa
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty */}
                {!carregando && noticiasFiltradas.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-bold text-lg">Nenhum post encontrado nesta categoria.</p>

                    </div>
                )}
            </div>

            <div className="mt-24">
                <ContactPremium />
            </div>
        </section>
    );
}
