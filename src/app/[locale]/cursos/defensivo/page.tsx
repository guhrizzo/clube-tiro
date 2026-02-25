
import NavBar from "components/NavBar";
export default function DefensivoPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-6">Defensivo Pessoal</h1>
                <p className="text-gray-400 mb-10 max-w-3xl">
                    Aprenda técnicas de defesa pessoal para se proteger em situações de risco. Nossos instrutores experientes ensinam estratégias eficazes para lidar com ameaças, utilizando técnicas de combate corpo a corpo, desarmes e uso de armas de fogo para defesa pessoal.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Defesa Pessoal para Atiradores</h2>
                        <p className="text-gray-400 mb-4">
                            Este curso é voltado para atiradores esportivos que desejam aprender técnicas de defesa pessoal específicas para situações de risco. Abordamos estratégias de combate corpo a corpo, desarmes e uso de armas de fogo para proteção pessoal.
                        </p>
                        <button className="bg-[#ffb703] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg">
                            Saiba Mais
                        </button>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Defesa Pessoal para Caçadores</h2>
                        <p className="text-gray-400 mb-4">
                            Este curso é voltado para caçadores que desejam aprender técnicas de defesa pessoal para se proteger em ambientes rurais e de caça. Abordamos estratégias de combate corpo a corpo, desarmes e uso de armas de fogo para proteção pessoal em situações de risco.
                        </p>
                        <button className="bg-[#ffb703] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg">
                            Saiba Mais
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}