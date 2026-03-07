"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NavBar from "components/NavBar";
import { dictionaries } from "dictionaries";

const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function CapacitacaoPage() {
    const pathname = usePathname();

    const currentLang = useMemo<Lang>(() => {
        if (!pathname) return "pt";
        const seg = pathname.split("/").filter(Boolean)[0];
        return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : "pt";
    }, [pathname]);

    const t = (dictionaries as any)[currentLang].guardTraining;

    const openWhatsApp = (message: string) => {
        const phone = "5531992118500";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const coursesList = [
        {
            key: "sportiveShooting",
            cta: t.courses.sportiveShooting.cta
        },
        {
            key: "responsibleHunting",
            cta: t.courses.responsibleHunting.cta
        }
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-6">
                    {t.title}
                </h1>

                <p className="text-gray-400 mb-10 max-w-3xl">
                    {t.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {coursesList.map((course) => (
                        <div key={course.key} className="bg-[#1a1a1a] p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">
                                {t.courses[course.key].title}
                            </h2>

                            <p className="text-gray-400 mb-4">
                                {t.courses[course.key].description}
                            </p>

                            <button
                                onClick={() => openWhatsApp(course.cta)}
                                className="bg-[#ffb703] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg cursor-pointer"
                            >
                                {t.buttons.learnMore}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
{/*
    import NavBar from "components/NavBar";
import {
    ShieldCheck,
    Target,
    ArrowRightLeft,
    FileText,
    Globe,
    GraduationCap,
    Clock,
    Users,
    Award,
    ChevronRight,
    CheckCircle2,
    PlayCircle
} from "lucide-react";

export default function CapacitacaoPage() {
    const courses = [
        {
            icon: <Target size={32} />,
            title: "Tiro Esportivo",
            level: "Iniciante ao Avançado",
            duration: "16 horas",
            students: "500+ alunos",
            description: "Aprenda técnicas avançadas de tiro esportivo, incluindo postura, mira, controle de respiração e segurança. Ideal para atiradores que desejam aprimorar suas habilidades.",
            topics: ["Postura e posicionamento", "Técnicas de mira", "Controle de respiração", "Segurança no manuseio"],
            featured: true
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Caça Responsável",
            level: "Intermediário",
            duration: "20 horas",
            students: "300+ alunos",
            description: "Práticas de caça responsável, incluindo ética, legislação, técnicas de rastreamento e segurança no campo. Promovemos a conservação da fauna.",
            topics: ["Ética na caça", "Legislação vigente", "Técnicas de rastreamento", "Preservação ambiental"],
            featured: false
        },
        {
            icon: <GraduationCap size={32} />,
            title: "Instrutor de Tiro",
            level: "Avançado",
            duration: "40 horas",
            students: "150+ alunos",
            description: "Formação completa para instrutores de tiro, com metodologia de ensino, psicologia do atirador e gestão de treinamentos.",
            topics: ["Metodologia de ensino", "Psicologia aplicada", "Gestão de turmas", "Avaliação de desempenho"],
            featured: false
        },
        {
            icon: <FileText size={32} />,
            title: "Legislação e Regularização",
            level: "Todos os níveis",
            duration: "8 horas",
            students: "1000+ alunos",
            description: "Entenda a legislação brasileira sobre armas de fogo, processos de regularização e direitos do CAC.",
            topics: ["Estatuto do Desarmamento", "Processo de CAC", "Documentação necessária", "Direitos e deveres"],
            featured: false
        }
    ];

    const stats = [
        { number: "2.000+", label: "Alunos formados" },
        { number: "15+", label: "Cursos disponíveis" },
        { number: "98%", label: "Taxa de aprovação" },
        { number: "10+", label: "Instrutores certificados" }
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] text-slate-900">
            <NavBar />

           
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffb703]/5 via-transparent to-slate-100" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(rgba(255,183,3,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,183,3,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
                
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-[#ffb703]" />
                            <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em]">Centro de Treinamento</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase italic leading-none mb-6">
                            Capacitação <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb703] to-[#ff8c00]">Profissional</span>
                        </h1>
                        
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                            Cursos de capacitação e treinamento para atiradores esportivos, caçadores e colecionadores. 
                            Instrutores altamente qualificados garantindo formação completa e segura.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a 
                                href="#cursos"
                                className="group inline-flex items-center gap-3 bg-[#ffb703] text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:shadow-xl hover:shadow-[#ffb703]/30 hover:scale-105 transition-all duration-300"
                            >
                                Ver Cursos
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a 
                                href="#sobre"
                                className="inline-flex items-center gap-3 bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:border-[#ffb703] hover:text-[#ffb703] transition-all duration-300"
                            >
                                Conheça Mais
                            </a>
                        </div>
                    </div>
                </div>
            </section>

       
            <section className="py-12 border-y border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl md:text-4xl font-black text-[#ffb703] mb-2">{stat.number}</p>
                                <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section id="cursos" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Nossos Cursos</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-4">
                            Programas de <span className="text-[#ffb703]">Formação</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Escolha o curso ideal para o seu desenvolvimento como atirador profissional
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {courses.map((course, index) => (
                            <div 
                                key={index}
                                className={`group relative bg-white rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                                    course.featured 
                                        ? 'border-[#ffb703] shadow-xl shadow-[#ffb703]/10' 
                                        : 'border-slate-200 hover:border-[#ffb703]/50'
                                }`}
                            >
                                {course.featured && (
                                    <div className="absolute -top-4 left-8 bg-[#ffb703] text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Mais Popular
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                                        course.featured 
                                            ? 'bg-[#ffb703] text-slate-900' 
                                            : 'bg-slate-100 text-slate-600 group-hover:bg-[#ffb703]/10 group-hover:text-[#ffb703]'
                                    }`}>
                                        {course.icon}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Clock size={16} />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#ffb703] transition-colors">
                                    {course.title}
                                </h3>
                                
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <span className="text-[#ffb703] font-semibold">{course.level}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500 flex items-center gap-1">
                                        <Users size={14} />
                                        {course.students}
                                    </span>
                                </div>

                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {course.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {course.topics.map((topic, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                            <CheckCircle2 size={16} className="text-[#ffb703] shrink-0" />
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                                    course.featured
                                        ? 'bg-[#ffb703] text-slate-900 hover:shadow-lg hover:shadow-[#ffb703]/30'
                                        : 'bg-slate-900 text-white hover:bg-[#ffb703] hover:text-slate-900'
                                }`}>
                                    Inscreva-se Agora
                                    <ArrowRightLeft size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section id="sobre" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#ffb703]/5 via-transparent to-transparent" />
                
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#ffb703] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Por que nos escolher</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 leading-tight">
                                Excelência em <br />
                                <span className="text-[#ffb703]">Treinamento</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Nossa metodologia única combina teoria e prática, proporcionando uma formação completa 
                                e alinhada às melhores práticas internacionais de tiro esportivo.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: <Award size={24} />, title: "Certificação Reconhecida", desc: "Certificados válidos em todo território nacional" },
                                    { icon: <Users size={24} />, title: "Turmas Reduzidas", desc: "Atenção individualizada para cada aluno" },
                                    { icon: <Globe size={24} />, title: "Infraestrutura Moderna", desc: "Pistas equipadas com tecnologia de ponta" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <div className="w-12 h-12 bg-[#ffb703]/10 rounded-xl flex items-center justify-center text-[#ffb703] shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffb703]/20 to-transparent rounded-3xl transform rotate-3" />
                            <div className="relative bg-slate-900 rounded-3xl p-8 text-white overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb703]/10 rounded-full blur-3xl" />
                                
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <PlayCircle size={32} className="text-[#ffb703]" />
                                        <span className="text-[#ffb703] font-bold uppercase tracking-wider">Vídeo Institucional</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-4">Conheça nossa estrutura</h3>
                                    <p className="text-slate-400 mb-6">
                                        Assista ao vídeo e descubra por que somos referência em capacitação de atiradores no Brasil.
                                    </p>
                                    
                                    <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-slate-700 transition-colors">
                                        <div className="w-20 h-20 bg-[#ffb703] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#ffb703]/30">
                                            <PlayCircle size={32} className="text-slate-900 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffb703]/20 via-transparent to-transparent" />
                
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
                        Pronto para começar?
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Entre em contato conosco e dê o primeiro passo para se tornar um atirador profissional certificado.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://wa.me/5531992118500"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#ffb703] text-slate-900 px-10 py-5 rounded-2xl font-bold uppercase tracking-wider hover:shadow-xl hover:shadow-[#ffb703]/30 hover:scale-105 transition-all duration-300"
                        >
                            Falar no WhatsApp
                            <ChevronRight size={20} />
                        </a>
                        <a 
                            href="tel:+5531992118500"
                            className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-wider hover:bg-white hover:text-slate-900 transition-all duration-300"
                        >
                            Ligar Agora
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
*/}