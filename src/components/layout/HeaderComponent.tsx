"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function HeaderComponent() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsAtTop(currentScrollY < 80);

            if (window.innerWidth >= 1050) {
                setHideHeader(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY < 80) {
                setHideHeader(false);
            } else if (currentScrollY > lastScrollY.current) {
                setHideHeader(true);
                setIsOpen(false);
            } else {
                setHideHeader(false);
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const isHome = pathname === "/";
    const transparent = isHome && isAtTop && !isOpen;

    const linkClass = (href: string) => {
        const active = pathname === href;
        const color = transparent
            ? active
                ? "text-white font-semibold"
                : "text-white/70 hover:text-white"
            : active
            ? "text-black font-semibold"
            : "text-black/60 hover:text-black";

        return `group relative pb-1 transition-colors duration-300 ${color}`;
    };

    const underlineClass = (href: string, isActive: boolean) => {
        const bgColor = transparent ? "bg-white" : "bg-black";

        if (isActive) {
            // Ativo: barra sempre visível, ancorada à esquerda
            return `absolute left-0 bottom-0 h-[2px] w-full origin-left ${bgColor}`;
        }

        // Inativo: cresce da esquerda ao passar o mouse,
        // e ao sair, encolhe continuando pra direita (não "volta")
        return `absolute left-0 bottom-0 h-[2px] w-full ${bgColor}
                scale-x-0 origin-left
                transition-transform duration-300 ease-out
                group-hover:origin-left group-hover:scale-x-100
                origin-right`;
    };

    const mobileLinkClass = (href: string) =>
        `text-lg py-2 transition-colors ${
            pathname === href
                ? "text-black font-semibold"
                : "text-black/60"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full px-6 md:px-17 py-7 flex items-center justify-between transition-all duration-300 ease-in-out ${
                hideHeader ? "-translate-y-full" : "translate-y-0"
            } ${
                transparent
                    ? "bg-transparent border-b border-transparent"
                    : "bg-white border-b border-gray-200"
            }`}
        >
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src="/img/institucional/logo.png"
                    alt="Logo"
                    className="w-14 md:w-18 h-auto"
                />

                <h2
                    className={`text-lg md:text-xl font-bold flex flex-col leading-5 tracking-wider transition-colors duration-300 ${
                        transparent ? "text-white" : "text-black"
                    }`}
                >
                    <span>Paróquia Divino</span>
                    <span>Espírito Santo</span>
                </h2>
            </div>

            {/* Desktop */}
            <nav className="hidden min-[1050px]:block">
                <ul className="flex items-center gap-6">
                    {navigation.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={linkClass(item.href)}
                                >
                                    {item.title}
                                    <span className={underlineClass(item.href, active)} />
                                </Link>
                            </li>
                        );
                    })}

                    <li>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 rounded-full bg-[#701513] px-4 py-2 font-semibold text-white transition hover:opacity-90"
                        >
                            <User size={20} />
                            Seu Perfil
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Botão Mobile */}
            <button
                className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[6px] min-[1050px]:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menu"
            >
                <span
                    className={`block h-[2px] w-7 rounded-full transition-all duration-300 ${
                        transparent ? "bg-white" : "bg-black"
                    } ${isOpen ? "translate-y-[8px] rotate-45 !bg-black" : ""}`}
                />

                <span
                    className={`block h-[2px] w-7 rounded-full transition-all duration-300 ${
                        transparent ? "bg-white" : "bg-black"
                    } ${isOpen ? "opacity-0" : ""}`}
                />

                <span
                    className={`block h-[2px] w-7 rounded-full transition-all duration-300 ${
                        transparent ? "bg-white" : "bg-black"
                    } ${isOpen ? "-translate-y-[8px] -rotate-45 !bg-black" : ""}`}
                />
            </button>

            {/* Menu Mobile */}
            <nav
                className={`absolute left-0 top-full w-full origin-top overflow-hidden border-b border-gray-200 bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] min-[1050px]:hidden ${
                    isOpen
                        ? "translate-y-0 scale-y-100 opacity-100"
                        : "-translate-y-3 scale-y-95 opacity-0 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col items-center gap-3 px-6 py-8">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={mobileLinkClass(item.href)}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}

                    <li className="mt-3">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#701513] px-5 py-3 font-semibold text-white transition hover:opacity-90"
                        >
                            <User size={20} />
                            Seu Perfil
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}