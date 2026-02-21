import NavBar from "components/NavBar";

export default function MuseuDaPaz() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
        <NavBar />
        <section className="pt-32 px-6 text-center">
            <div className="inline-block px-3 py-1 border border-[#ffb703] text-[#ffb703] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                Museu da Paz
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
                Em Breve
            </h1>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto uppercase text-xs tracking-widest leading-loose">
                Estamos preparando algo especial para celebrar a paz e a harmonia. Fique atento!
            </p>
        </section>
    </main>
  );
}