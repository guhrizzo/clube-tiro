type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

const DATA_SOURCE = [
  { name: "Pistolas", category: "Produtos", href: "/produtos/pistolas", desc: "Confira nossa linha completa de pistolas semi-automáticas." },
  { name: "Tiro Básico", category: "Cursos", href: "/cursos/basico", desc: "Aprenda os fundamentos da segurança e manuseio de armas." },
  { name: "Exército", category: "Despachante", href: "/despachante/exercito", desc: "Documentação e processos junto ao Exército Brasileiro." },
];

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || "";

  const results = query
    ? DATA_SOURCE.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-10 border-b pb-6">
          <h1 className="text-3xl font-bold text-[#003566]">
            Resultados para: <span className="text-[#ffb703]">"{query}"</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Encontramos {results.length} resultado(s) relevante(s).
          </p>
        </header>

        <div className="grid gap-6">
          {results.length > 0 ? (
            results.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block p-6 bg-white rounded-xl shadow-sm border border-transparent hover:border-[#ffb703] transition-all group"
              >
                <span className="text-xs font-bold uppercase text-[#ffb703] tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-xl font-semibold text-[#003566] group-hover:underline mt-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </a>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-inner">
              <p className="text-xl text-gray-400">Não encontramos nada para sua busca.</p>
              <a href="/" className="text-[#003566] font-bold mt-4 inline-block hover:underline">
                Voltar para o início
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
