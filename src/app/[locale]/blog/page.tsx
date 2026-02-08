"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { db } from "../../../../lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import NavBar from "../../../../components/NavBar";
import ContactPremium from "../../../../components/Contact";

// Tipo para a notícia que vem do Firebase
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
    const [carregando, setCarregando] = useState(true);
    const { locale } = useParams();

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                // Busca as notícias ordenadas pela data de criação
                const q = query(collection(db, "noticias"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const listaNoticias = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Noticia[];

                setNoticias(listaNoticias);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setCarregando(false);
            }
        };

        fetchNoticias();
    }, []);

    return (
        <section className="relative bg-white py-24 overflow-hidden">
            <NavBar />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header - Seguindo o estilo da sua página de clientes */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-4 border border-yellow-300">
                        Nosso Blog
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Fique por dentro das nossas <span className="text-yellow-500">atualizações</span>
                    </h2>
                    <p className="mt-4 text-slate-500 text-lg">
                        Acompanhe as últimas notícias, eventos e novidades do setor.
                    </p>
                </div>

                {/* Loading State */}
                {carregando && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                )}

                {/* Grid de Notícias */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {noticias.map((noticia) => (
                        <article
                            key={noticia.id}
                            className="group bg-white rounded-3xl border border-slate-200 shadow-sm 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out 
                         flex flex-col overflow-hidden"
                        >
                            {/* Container da Imagem */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={noticia.imagem_URL || "/placeholder-blog.jpg"}
                                    alt={noticia.titulo}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {noticia.categoria}
                                    </span>
                                </div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="p-8 flex flex-col grow">
                                <span className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {new Date(noticia.data).toLocaleDateString('pt-BR')}
                                </span>

                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors">
                                    {noticia.titulo}
                                </h3>

                                {/* Preview do conteúdo (removendo tags HTML do Quill) */}
                                <div
                                    className="text-slate-500 line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                        __html: noticia.conteudo.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ')
                                    }}
                                />

                                <div className="mt-auto">
                                    <Link
                                        href={`/${locale}/blog/${noticia.id}`}
                                        className="flex items-center gap-2 text-slate-900 font-bold hover:text-yellow-500 transition-colors"
                                    >
                                        Ler matéria completa
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Caso não tenha notícias */}
                {!carregando && noticias.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-500">Nenhuma notícia publicada ainda.</p>
                    </div>
                )}
            </div>

            <div className="mt-24">
                <ContactPremium />
            </div>
        </section>
    );
}