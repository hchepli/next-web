"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MarqueeRibbonCurved
 * -----------------------------------------------------------------------
 * Versão avançada: o texto segue exatamente a curva da fita (como um
 * "textPath" de SVG), em loop infinito. Anda para a DIREITA ao rolar
 * a página para baixo, e para a ESQUERDA ao rolar para cima.
 *
 * Uso:
 *   <MarqueeRibbonCurved text="MISSAS – EVENTOS – AVISOS" />
 *
 * Observação: por usar <textPath>, a animação é feita manipulando o
 * atributo "startOffset" do <textPath> a cada frame, ao invés de
 * transform/translateX (que não funciona bem com texto em curva).
 * -----------------------------------------------------------------------
 */

interface MarqueeRibbonCurvedProps {
    text?: string;
    color?: string;
    height?: number;
    speed?: number; // % do comprimento do path, por frame
    fontSize?: number;
    fillText?: string; // cor do texto
}

export default function MarqueeRibbonCurved({
    text = "MISSAS – EVENTOS – AVISOS  •  ",
    color = "#701513",
    height = 160,
    speed = 0.05,
    fontSize = 26,
    fillText = "#ffffff",
}: MarqueeRibbonCurvedProps) {
    const textPathRef = useRef<SVGTextPathElement>(null);
    const offsetRef = useRef(0); // em % (0 a 100)
    const directionRef = useRef(1);
    const lastScrollY = useRef(0);
    const rafIdRef = useRef<number | null>(null);

    // ids únicos para evitar conflito se houver múltiplas instâncias na página
    const [uid] = useState(() => Math.random().toString(36).slice(2, 9));
    const pathId = `ribbon-path-${uid}`;

    // Path da onda (mesma curva usada no fundo, mas ligeiramente deslocado
    // para o texto ficar centralizado verticalmente na faixa colorida)
    const wavePath = "M0,60 C 240,120 480,0 720,60 C 960,120 1200,0 1440,60";

    // Repete o texto para preencher todo o comprimento do path e permitir loop
    const repeatedText = text.repeat(6);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            if (delta > 0) {
                directionRef.current = 1; // desceu -> direita
            } else if (delta < 0) {
                directionRef.current = -1; // subiu -> esquerda
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        const animate = () => {
            offsetRef.current += speed * directionRef.current;

            // Loop contínuo dentro de 0% - 100%
            if (offsetRef.current > 100) offsetRef.current -= 100;
            if (offsetRef.current < 0) offsetRef.current += 100;

            if (textPathRef.current) {
                textPathRef.current.setAttribute(
                    "startOffset",
                    `${offsetRef.current}%`
                );
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        rafIdRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [speed]);

    return (
        <div className="relative w-full overflow-hidden" style={{ height }}>
            <svg
                viewBox="0 0 1440 160"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
            >
                {/* Fita de fundo (área preenchida) */}
                <path
                    d={`${wavePath} L1440,160 L0,160 Z`}
                    fill={color}
                />

                {/* Path invisível usado como guia para o texto */}
                <defs>
                    <path id={pathId} d={wavePath} fill="none" />
                </defs>

                {/* Texto seguindo a curva, seguido para a direita, "voltando" pela esquerda */}
                <text
                    fill={fillText}
                    fontSize={fontSize}
                    fontWeight="bold"
                    letterSpacing="2"
                    style={{ textTransform: "uppercase" }}
                >
                    <textPath
                        ref={textPathRef}
                        href={`#${pathId}`}
                        startOffset="0%"
                    >
                        {repeatedText}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}
