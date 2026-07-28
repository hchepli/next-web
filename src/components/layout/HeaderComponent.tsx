"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function HeaderComponent() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);

    // Dropdown desktop (ex: "Pastorais"): controla qual item está aberto.
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLLIElement>(null);

    // Submenu mobile (accordion dentro do menu mobile).
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

    // Fecha o dropdown desktop ao clicar fora dele.
    useEffect(() => {
        if (!openDropdown) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

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

    const handleToggleMobileMenu = () => {
        setIsOpen((prev) => {
            const next = !prev;
            if (!next) {
                setOpenMobileSubmenu(null);
            }
            return next;
        });
    };

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
                        const hasChildren = !!item.children?.length;
                        const active =
                            pathname === item.href ||
                            (hasChildren && item.children!.some((child) => pathname === child.href));

                        if (hasChildren) {
                            const isDropdownOpen = openDropdown === item.href;
                            return (
                                <li
                                    key={item.href}
                                    ref={isDropdownOpen ? dropdownRef : undefined}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(item.href)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button
                                        type="button"
                                        className={`${linkClass(item.href)} flex items-center gap-1`}
                                        onClick={() =>
                                            setOpenDropdown(isDropdownOpen ? null : item.href)
                                        }
                                        aria-expanded={isDropdownOpen}
                                        aria-haspopup="true"
                                    >
                                        {item.title}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${
                                                isDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                        <span className={underlineClass(item.href, active)} />
                                    </button>

                                    {/* Wrapper com padding-top (em vez de margin no <ul>) para que o
                                        espaço entre o botão e o dropdown continue "dentro" da área
                                        hoverável, evitando que o mouse dispare mouseleave no meio do
                                        caminho e feche o menu antes de chegar nas opções. */}
                                    <div
                                        className={`absolute left-0 top-full pt-3 ${
                                            isDropdownOpen ? "" : "pointer-events-none"
                                        }`}
                                    >
                                        <ul
                                            className={`min-w-[220px] rounded-xl border border-gray-200 bg-white py-2 shadow-lg transition-all duration-200 origin-top ${
                                                isDropdownOpen
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-95"
                                            }`}
                                        >
                                            {item.children!.map((child) => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className={`block px-4 py-2 text-sm transition-colors ${
                                                            pathname === child.href
                                                                ? "text-black font-semibold"
                                                                : "text-black/60 hover:text-black hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        }

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

{/* 
                    <li>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 rounded-full bg-[#701513] px-4 py-2 font-semibold text-white transition hover:opacity-90"
                        >
                            <User size={20} />
                            Seu Perfil
                        </Link>
                    </li> */}
                </ul>
            </nav>

            {/* Botão Mobile */}
            <button
                className="relative z-[60] flex h-8 w-8 flex-col items-center justify-center gap-[6px] min-[1050px]:hidden"
                onClick={handleToggleMobileMenu}
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
                    {navigation.map((item) => {
                        const hasChildren = !!item.children?.length;

                        if (hasChildren) {
                            const isSubmenuOpen = openMobileSubmenu === item.href;
                            return (
                                <li key={item.href} className="flex flex-col items-center w-full">
                                    <button
                                        type="button"
                                        className={`${mobileLinkClass(item.href)} flex items-center gap-1`}
                                        onClick={() =>
                                            setOpenMobileSubmenu(isSubmenuOpen ? null : item.href)
                                        }
                                        aria-expanded={isSubmenuOpen}
                                    >
                                        {item.title}
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-200 ${
                                                isSubmenuOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isSubmenuOpen && (
                                        <ul className="flex flex-col items-center gap-2 pt-2 pb-1">
                                            {item.children!.map((child) => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        className="text-base text-black/60 hover:text-black transition-colors"
                                                        onClick={() => {
                                                            setOpenMobileSubmenu(null);
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={mobileLinkClass(item.href)}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}

                    {/* <li className="mt-3">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#701513] px-5 py-3 font-semibold text-white transition hover:opacity-90"
                        >
                            <User size={20} />
                            Seu Perfil
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
}