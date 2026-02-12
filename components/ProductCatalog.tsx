"use client";

import { useState, useEffect } from "react";
import { Search, ArrowUpRight, ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "../lib/firebase"; // Ajuste o caminho conforme seu projeto
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// Definição do tipo do produto vindo do Firebase
type Produto = {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
  descricao: string;
  imagem_URL: string;
  linkCompra: string;
};

export default function ProductCatalog() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Todos", "Pistolas", "Revólveres", "Rifles e Carabinas", "Espingardas", "Acessórios", "Cursos"];

  // 1. Busca os produtos em tempo real do Firebase
  useEffect(() => {
    const q = query(collection(db, "produtos"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Produto[];
      
      setProducts(pData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Lógica de Filtro e Busca combinados
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "Todos" || p.categoria === activeCategory;
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-[#f7f7f7] min-h-screen">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Catálogo Online
            </h2>
            <h3 className="text-4xl font-extrabold text-gray-900">
              Produtos <span className="text-yellow-500">em Destaque</span>
            </h3>
          </div>

          {/* Busca Funcional */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-6 pl-12 shadow-sm focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={40} />
            <p className="text-gray-500 font-medium">Carregando catálogo...</p>
          </div>
        ) : (
          /* Grid de Produtos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col
                transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Imagem Real do Firebase */}
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full border border-gray-200 text-gray-600 uppercase">
                    {product.categoria}
                  </span>

                  <Image 
                    src={product.imagem_URL} 
                    alt={product.nome}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay com Link */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity 
                  flex items-center justify-center">
                    <Link 
                      href={product.linkCompra || "#"} 
                      target="_blank"
                      className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </div>

                {/* Conteúdo Dinâmico */}
                <div className="p-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {product.nome}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {product.descricao}
                  </p>

                  <div className="mt-auto">
                    <p className="text-xl font-black text-gray-900 mb-4">
                      {product.preco.toLowerCase().includes("consulta") ? (
                        <span className="text-sm uppercase tracking-wider text-gray-400">Sob Consulta</span>
                      ) : (
                        `R$ ${product.preco}`
                      )}
                    </p>

                    <Link 
                      href={product.linkCompra || "#"} 
                      target="_blank"
                      className="w-full border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl 
                      hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Tenho Interesse
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}