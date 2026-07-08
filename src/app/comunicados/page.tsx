import Container from "@/components/layout/Container";
import Image from "next/image";
import { Calendar, HatGlasses, MoveRight } from "lucide-react";
import Button from "@/components/ui/buttons/Button";
import EventCalendar from "@/components/ui/calendar/EventCalendar";

export default function Comunicados() {
    return (
        <Container className="w-full min-h-screen mt-20 pt-20">

            {/* HERO + SIDEBAR */}
            <section className="w-full flex flex-col lg:flex-row items-start justify-between gap-10">

                {/* Hero da imagem */}
                <div className="w-full lg:flex-[0_0_60%] relative rounded-2xl overflow-hidden aspect-[16/10]">
                    <Image
                        src="/img/comunicados/noticia.png"
                        alt="Congresso de Famílias 2026"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-10 sm:bottom-16 lg:bottom-25 left-5 sm:left-8 lg:left-10 right-5 sm:right-8 flex flex-col items-start gap-3">
                        <span className="flex justify-center items-center text-sm sm:text-md font-semibold text-white bg-[#FF7700]/40 backdrop-blur-sm px-4 py-1 rounded-full">
                            Eventos
                        </span>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white max-w-2xl">
                            Vem aí o Congresso de Famílias 2026: Inscrições abertas para um
                            final de semana de renovação.
                        </h1>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-auto flex flex-col gap-5 mt-2">

                    {/* Título da sidebar */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 border-b-3 border-[#701513] pb-2">
                            <HatGlasses size={32} className="text-black shrink-0" />
                            <h4 className="text-lg sm:text-xl font-semibold text-black">Fique por Dentro</h4>
                        </div>
                    </div>

                    {/* Card de notícia 1 */}
                    <div className="flex items-stretch justify-center gap-4">
                        <div className="relative w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem] shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src="/img/comunicados/ministerios.png"
                                alt="Ministérios"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                            <span className="flex justify-center items-center text-sm sm:text-md font-semibold text-white bg-[#0059FF]/40 backdrop-blur-sm px-4 py-1 rounded-full">
                                Ministérios
                            </span>
                            <p className="max-w-[85%] text-base sm:text-xl font-semibold text-black tracking-wide leading-[1.2]">
                                Escala de Voluntários: Confira quem serve no próximo domingo
                            </p>
                        </div>
                    </div>

                    {/* Card de doação */}
                    <div className="w-full border border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
                        <span className="text-lg sm:text-xl font-semibold text-black">Construindo Nosso Futuro!</span>
                        <p className="text-base sm:text-lg text-black/60 w-full sm:w-[65%] leading-[1.2]">
                            Contribua com a nossa nova área e deixe seu legado nesta obra.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 w-full">
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex items-baseline gap-1 flex-wrap">
                                    <span className="text-lg font-bold text-[#206D0D]">R$75.769,78</span>
                                    <span className="text-sm font-normal text-gray-400">/ R$100.000,00</span>
                                </div>
                                <div className="w-full h-6 bg-[#55D835] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#206D0D] rounded-full" style={{ width: "75%" }} />
                                </div>
                            </div>
                            <Button size="sm" icon>Quero ajudar</Button>
                        </div>
                    </div>

                    {/* Card de notícia 2 */}
                    <div className="flex items-stretch justify-center gap-4">
                        <div className="relative w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem] shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src="/img/comunicados/ministerios.png"
                                alt="Ministérios"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                            <span className="flex justify-center items-center text-sm sm:text-md font-semibold text-white bg-[#0059FF]/40 backdrop-blur-sm px-4 py-1 rounded-full">
                                Ministérios
                            </span>
                            <p className="max-w-[85%] text-base sm:text-xl font-semibold text-black tracking-wide leading-[1.2]">
                                Escala de Voluntários: Confira quem serve no próximo domingo
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* CARROSSEL */}
{/* CARROSSEL */}
{/* CARROSSEL */}
<section className="w-full flex items-center justify-between gap-3 sm:gap-5 my-16 sm:my-20 lg:my-30">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 flex-1 min-w-0">
        {/* Card 1 - sempre visível */}
        <div className="relative aspect-[5/3] rounded-xl overflow-hidden">
            <Image
                src="/img/comunicados/carrossel.png"
                alt="Escala de Voluntários"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-5 left-4 right-4 flex flex-col justify-center items-start gap-1">
                <span className="flex justify-center items-center text-xs font-semibold text-white bg-[#FF7700]/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Eventos
                </span>
                <p className="text-sm font-semibold text-white tracking-wide leading-[1.2]">
                    Escala de Voluntários: Confira quem serve no próximo domingo
                </p>
            </div>
        </div>

        {/* Card 2 - some no mobile, aparece a partir de sm */}
        <div className="hidden sm:block relative aspect-[5/3] rounded-xl overflow-hidden">
            <Image
                src="/img/comunicados/carrossel.png"
                alt="Escala de Voluntários"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-5 left-4 right-4 flex flex-col justify-center items-start gap-1">
                <span className="flex justify-center items-center text-xs font-semibold text-white bg-[#FF7700]/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Eventos
                </span>
                <p className="text-sm font-semibold text-white tracking-wide leading-[1.2]">
                    Escala de Voluntários: Confira quem serve no próximo domingo
                </p>
            </div>
        </div>

        {/* Card 3 - some até md, aparece a partir de lg */}
        <div className="hidden lg:block relative aspect-[5/3] rounded-xl overflow-hidden">
            <Image
                src="/img/comunicados/carrossel.png"
                alt="Escala de Voluntários"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-5 left-4 right-4 flex flex-col justify-center items-start gap-1">
                <span className="flex justify-center items-center text-xs font-semibold text-white bg-[#FF7700]/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Eventos
                </span>
                <p className="text-sm font-semibold text-white tracking-wide leading-[1.2]">
                    Escala de Voluntários: Confira quem serve no próximo domingo
                </p>
            </div>
        </div>

        {/* Card 4 - some até lg, aparece só em telas bem largas */}
        <div className="hidden xl:block relative aspect-[5/3] rounded-xl overflow-hidden">
            <Image
                src="/img/comunicados/carrossel.png"
                alt="Escala de Voluntários"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute bottom-5 left-4 right-4 flex flex-col justify-center items-start gap-1">
                <span className="flex justify-center items-center text-xs font-semibold text-white bg-[#FF7700]/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    Eventos
                </span>
                <p className="text-sm font-semibold text-white tracking-wide leading-[1.2]">
                    Escala de Voluntários: Confira quem serve no próximo domingo
                </p>
            </div>
        </div>
    </div>

    {/* Botão seta */}
    <button className="flex items-center justify-center py-1 px-5 rounded-full bg-[#701513] shrink-0 hover:opacity-90 transition-opacity">
        <MoveRight size={32} className="text-white" />
    </button>
</section>
            {/* CALENDÁRIO + LEGENDA */}
            <section className="w-full flex flex-col lg:flex-row gap-8 my-16 sm:my-20 lg:my-30">

                {/* Bloco 1: título + subtítulo + calendário */}
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 border-b-2 border-[#701513] pb-1">
                            <Calendar size={28} className="text-black shrink-0" />
                            <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-wide font-semibold text-black">
                                Calendário de Eventos e Missas
                            </h2>
                        </div>
                        <p className="text-black/60 text-base sm:text-lg">
                            Acompanhe a programação completa da Paróquia Divino Espírito Santo.
                        </p>
                    </div>

                    {/* componente do calendário aqui */}
                    <div className="w-full overflow-x-auto">
                        <EventCalendar />
                    </div>
                </div>

                {/* Bloco 2: legenda */}
                <div className="flex flex-row lg:flex-col items-start lg:items-end justify-start gap-4 flex-wrap">
                    <span className="text-sm text-black/60 w-full lg:w-auto lg:text-right">Legenda:</span>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                        <div className="relative flex items-center gap-3 w-full sm:w-56 lg:w-72">
                            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E8B923] shrink-0 z-10" />
                            <span className="absolute left-4 sm:left-5 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#E8B923]" />
                            <span className="relative z-10 bg-white text-sm font-medium text-black border border-[#E8B923] rounded-full px-4 py-1 whitespace-nowrap">
                                Missas e Liturgia
                            </span>
                        </div>

                        <div className="relative flex items-center gap-3 w-full sm:w-56 lg:w-72">
                            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#701513] shrink-0 z-10" />
                            <span className="absolute left-4 sm:left-5 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#701513]" />
                            <span className="relative z-10 bg-white text-sm font-medium text-black border border-[#701513] rounded-full px-4 py-1 whitespace-nowrap">
                                Eventos e Festas
                            </span>
                        </div>

                        <div className="relative flex items-center gap-3 w-full sm:w-56 lg:w-72">
                            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1E3A5F] shrink-0 z-10" />
                            <span className="absolute left-4 sm:left-5 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#1E3A5F]" />
                            <span className="relative z-10 bg-white text-sm font-medium text-black border border-[#1E3A5F] rounded-full px-4 py-1 whitespace-nowrap">
                                Pastorais e Cursos
                            </span>
                        </div>
                    </div>
                </div>
            </section>

        </Container>
    );
}