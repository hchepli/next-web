import Container from "@/components/layout/Container";
import { Bird, Wine, Heart, Flame, ArrowUpRight, LucideIcon, Church } from "lucide-react";

type Sacramento = {
    nome: string;
    Icon: LucideIcon;
    href: string;
};

const sacramentos: Sacramento[] = [
    { nome: "BATISMO", Icon: Bird, href: "/sacramentos/batismo" },
    { nome: "EUCARISTIA", Icon: Wine, href: "/sacramentos/eucaristia" },
    { nome: "CASAMENTO", Icon: Heart, href: "/sacramentos/casamento" },
    { nome: "CRISMA", Icon: Flame, href: "/sacramentos/crisma" },
];

function SacramentoCard({ nome, Icon, href }: Sacramento) {
    return (
        <a
            href={href}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#F1B933]/40 bg-[#701513] transition-colors hover:border-[#F1B933] w-[260px] h-[260px] flex-shrink-0"
        >
            <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-medium text-white/90">
                Saiba Mais
                <ArrowUpRight size={22} />
            </span>

            <Icon className="h-16 w-16 text-[#F1B933]" strokeWidth={1.5} />

            <span className="text-2xl font-bold tracking-wide text-white">
                {nome}
            </span>
        </a>
    );
}

export default function Sacramentos() {
    return (
        <Container className="w-full min-h-screen mt-20 pt-20">
                                <div className="flex flex-col gap-1 pb-10">
                        <div className="flex items-center gap-2 border-b-2 border-[#701513] pb-1">
                            <Church size={28} className="text-black shrink-0" />
                            <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-wide font-semibold text-black">
                                Vida Sacramental
                            </h2>
                        </div>
                        <p className="text-black/60 text-base sm:text-lg">
                            Orientações, significados e informações sobre os sacramentos em nossa paróquia.
                        </p>
                    </div>
            <div className="flex flex-wrap justify-center items-start gap-6">
                {sacramentos.map((s) => (
                    <SacramentoCard key={s.nome} {...s} />
                ))}
                {sacramentos.map((s) => (
                    <SacramentoCard key={s.nome + "-2"} {...s} />
                ))}
                {sacramentos.map((s) => (
                    <SacramentoCard key={s.nome + "-3"} {...s} />
                ))}
            </div>
        </Container>
    );
}