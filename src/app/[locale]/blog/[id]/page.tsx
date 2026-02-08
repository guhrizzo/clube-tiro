"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { db } from "../../../../../lib/firebase"; // Ajuste os pontos se necessário
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../../../../../components/NavBar";
import ContactPremium from "../../../../../components/Contact";

type Noticia = {
  titulo: string;
  categoria: string;
  data: string;
  conteudo: string;
  imagem_URL: string;
};

export default function NoticiaCompleta() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "noticias", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNoticia(docSnap.data() as Noticia);
        }
      } catch (error) {
        console.error("Erro ao buscar notícia:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (carregando) return <div className="py-20 text-center">Carregando...</div>;
  if (!noticia) return <div className="py-20 text-center">Notícia não encontrada.</div>;

  return (
    <main className="bg-white  min-h-screen">
      <NavBar />

      {/* Banner da Notícia */}
      <header className="relative h-[60vh] w-full ">
        <Image
          src={noticia.imagem_URL}
          alt={noticia.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-4xl mx-auto px-6 mb-12 text-white">
            <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-bold uppercase">
              {noticia.categoria}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
              {noticia.titulo}
            </h1>
            <p className="mt-4 text-slate-200">
              {new Date(noticia.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div
          className="prose prose-lg prose-slate max-w-none 
               /* Estilização para Links */
               prose-a:text-yellow-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
               /* Estilização para Código (pre e code) */
               prose-pre:bg-slate-900 prose-pre:text-white prose-pre:rounded-2xl
               prose-code:text-yellow-500 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded
               /* Estilização para Listas */
               prose-li:marker:text-yellow-500
               /* Classe necessária para o Quill */
               ql-editor"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />
      </article>

      <ContactPremium />
    </main>
  );
}