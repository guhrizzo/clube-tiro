"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { db } from "../../../../../lib/firebase";
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
    <main className="bg-white min-h-screen overflow-x-hidden">
      <NavBar />

      {/* Banner da Notícia */}
      <header className="relative h-[60vh] w-full">
        <Image
          src={noticia.imagem_URL}
          alt={noticia.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-4xl mx-auto px-6 mb-12 text-white w-full">
            <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-bold uppercase">
              {noticia.categoria}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight wrap-break-word">
              {noticia.titulo}
            </h1>
            <p className="mt-4 text-slate-200">
              {new Date(noticia.data).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      {/* Conteúdo da Notícia */}
      <article className="max-w-5xl mx-auto  py-16">
        <div
          className="prose prose-lg prose-slate max-w-none 
         /* 1. CORREÇÃO DA LARGURA: impede que o texto fuja para os lados */
         wrap-break-word 
         
         /* 2. CORREÇÃO DO ESPAÇO (ENTER): força margem entre parágrafos */
         [&_p]:mb-8 
         
         /* 3. CORREÇÃO DA QUEBRA: faz o texto respeitar o Enter caso não haja tags <p> */
         whitespace-pre-wrap 

         /* Estilização de Links e Listas */
         prose-a:text-yellow-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
         prose-li:marker:text-yellow-500
         
         /* Mantém a compatibilidade com o editor Quill */
         ql-editor"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />
      </article>

      <ContactPremium />
    </main>
  );
}