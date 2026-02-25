import NavBar from "components/NavBar";
import {
    ShieldCheck,
    Target,
    ArrowRightLeft,
    FileText,
    Globe,
    GraduationCap,
} from "lucide-react";

export default function CapacitacaoPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-6">Capacitação e Treinamento</h1>
                <p className="text-gray-400 mb-10 max-w-3xl">
                    Oferecemos cursos de capacitação e treinamento para atiradores esportivos, caçadores e colecionadores. Nossos instrutores são altamente qualificados e experientes, garantindo uma formação completa e segura.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Tiro Esportivo</h2>
                        <p className="text-gray-400 mb-4">
                            Aprenda técnicas avançadas de tiro esportivo, incluindo postura, mira, controle de respiração e segurança. Ideal para atiradores que desejam aprimorar suas habilidades e competir em eventos esportivos.
                        </p>
                        <button className="bg-[#ffb703] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg">
                            Saiba Mais
                        </button>
                    </div>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Curso de Caça Responsável</h2>
                        <p className="text-gray-400 mb-4">
                            Este curso é voltado para caçadores que desejam aprender práticas de caça responsável, incluindo ética, legislação, técnicas de rastreamento e segurança no campo. Promovemos a conservação da fauna e o respeito ao meio ambiente.
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