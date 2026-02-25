import Navbar from "components/NavBar";

export default function OtherPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-6">Outros Cursos</h1>
                <p className="text-gray-400 mb-10 max-w-3xl">
                    Explore nossos cursos adicionais para atiradores, caçadores e colecionadores. Oferecemos uma variedade de treinamentos especializados para aprimorar suas habilidades e conhecimentos no universo do tiro esportivo, caça e colecionismo.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Manutenção de Armas</h2>
                        <p className="text-gray-400 mb-4">
                            Aprenda técnicas de manutenção e limpeza de armas de fogo para garantir seu bom funcionamento e segurança. Este curso é essencial para atiradores, caçadores e colecionadores que desejam cuidar adequadamente de suas armas.
                        </p>
                        <button className="bg-[#ffb703] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg">
                            Saiba Mais
                        </button>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Legislação para CACs</h2>
                        <p className="text-gray-400 mb-4">
                            Este curso é voltado para atiradores, caçadores e colecionadores que desejam entender a legislação vigente relacionada ao porte, posse e uso de armas de fogo. Abordamos as principais leis, regulamentos e procedimentos para garantir a conformidade legal.
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