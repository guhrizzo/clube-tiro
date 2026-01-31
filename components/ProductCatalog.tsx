"use client";

import { useState } from "react";
import { Search, ArrowUpRight, ShoppingCart } from "lucide-react";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = ["Todos", "Pistolas", "Revólveres", "Rifles e Carabinas", "Espingardas"];

  const products = [
    { id: 1, name: "Glock G25 Calibre 380", category: "Pistolas", image: "/glock-g25.png" },
    { id: 2, name: "Taurus PT-938 Inox", category: "Pistolas", image: "/taurus-938.png" },
    { id: 3, name: "Revólver Taurus 889", category: "Revólveres", image: "/taurus-889.png" },
    { id: 4, name: "Carabina Puma Calibre 38", category: "Rifles e Carabinas", image: "/puma-38.png" },
    { id: 5, name: "Espingarda Hatsan Semi-Auto", category: "Espingardas", image: "/hatsan.png" },
  ];

  const filteredProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[#f7f7f7]">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">
              Catálogo
            </h2>
            <h3 className="text-4xl font-extrabold text-gray-900">
              Produtos <span className="text-yellow-500">em Destaque</span>
            </h3>
          </div>

          {/* Busca */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-6 pl-12 shadow-sm focus:ring-2 focus:ring-gray-900/10 outline-none transition-all"
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer bg-white rounded-3xl border border-gray-200 overflow-hidden 
              transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Imagem */}
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
                <span className="absolute top-4 left-4 bg-white text-[10px] font-bold px-3 py-1 rounded-full border border-gray-200 text-gray-500 uppercase">
                  {product.category}
                </span>

                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 
                transition-transform duration-500 group-hover:scale-105">
                  [Imagem]
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity 
                flex items-center justify-center">
                  <div className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col grow">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                  Equipamento de alta precisão, acabamento premium e excelente desempenho operacional.
                </p>

                <button className="cursor-pointer mt-auto w-full border border-gray-900 text-gray-900 font-bold py-3 rounded-xl 
                hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
