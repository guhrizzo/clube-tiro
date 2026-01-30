import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-6 text-center">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <p className="text-lg text-neutral-300 mb-6">
        Opa! Essa página não existe ou foi movida.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-110 transition"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
