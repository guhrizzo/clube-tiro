"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Navbar from "components/NavBar";
import { dictionaries } from "dictionaries";

const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function OtherPage() {
    const pathname = usePathname();

    const currentLang = useMemo<Lang>(() => {
        if (!pathname) return "pt";
        const seg = pathname.split("/").filter(Boolean)[0];
        return SUPPORTED_LANGS.includes(seg as Lang) ? (seg as Lang) : "pt";
    }, [pathname]);

    const t = (dictionaries as any)[currentLang].otherCourses;

    const openWhatsApp = (message: string) => {
        const phone = "5531992118500";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const courses = [
        {
            key: "maintenance",
            ctaMessage: t.maintenance.cta
        },
        {
            key: "legislation",
            ctaMessage: t.legislation.cta
        }
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-6">
                    {t.title}
                </h1>

                <p className="text-gray-400 mb-10 max-w-3xl">
                    {t.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div key={course.key} className="bg-[#1a1a1a] p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">
                                {t[course.key].title}
                            </h2>

                            <p className="text-gray-400 mb-4">
                                {t[course.key].description}
                            </p>

                            <button
                                onClick={() => openWhatsApp(course.ctaMessage)}
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