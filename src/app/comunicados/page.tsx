"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { Calendar, HatGlasses, Info, X } from "lucide-react";
import EventCalendar from "@/components/ui/calendar/EventCalendar";
import CalendarLegendItem from "@/components/ui/calendar/CalendarLegendItem";
import ComunicadoHero from "@/components/ui/cards/ComunicadoHero";
import NewsSidebarCard from "@/components/ui/cards/NewsSidebarCard";
import FundraisingCard from "@/components/ui/cards/FundraisingCard";
import ComunicadoCarouselCard from "@/components/ui/cards/ComunicadoCarouselCard";
import AnnouncementCarouselArrows from "@/components/ui/buttons/AnnouncementCarouselArrows";
import { useFeaturedAnnouncement } from "@/hooks/useFeaturedAnnouncement";
import { useSidebarAnnouncements } from "@/hooks/useSidebarAnnouncements";
import { useCarouselAnnouncements } from "@/hooks/useCarouselAnnouncements";
import { useActiveFundraisingCampaign } from "@/hooks/useActiveFundraisingCampaign";
import { calendarCategories } from "@/data/event/calendarCategory";

const FALLBACK_ANNOUNCEMENT_IMAGE = "/img/hero/eventos-img.png"; // usada quando o comunicado não tem imagem própria
const CAROUSEL_PAGE_SIZE = 4; // quantos comunicados aparecem por página (4 no desktop)
const CAROUSEL_BREAKPOINTS: Array<"base" | "sm" | "lg" | "xl"> = ["base", "sm", "lg", "xl"];

export default function Comunicados() {
    const { data: featuredAnnouncement, loading: featuredLoading } = useFeaturedAnnouncement();
    const { data: sidebarAnnouncements, loading: sidebarLoading } = useSidebarAnnouncements();
    const { data: carouselAnnouncements, loading: carouselLoading } = useCarouselAnnouncements();
    const { data: fundraisingCampaign, loading: fundraisingLoading } = useActiveFundraisingCampaign();

    const [carouselPage, setCarouselPage] = useState(0);
    const totalCarouselPages = carouselAnnouncements
        ? Math.ceil(carouselAnnouncements.length / CAROUSEL_PAGE_SIZE)
        : 0;
    const visibleCarouselAnnouncements = (carouselAnnouncements ?? []).slice(
        carouselPage * CAROUSEL_PAGE_SIZE,
        carouselPage * CAROUSEL_PAGE_SIZE + CAROUSEL_PAGE_SIZE
    );
    const canGoNextPage = carouselPage < totalCarouselPages - 1;
    const canGoPreviousPage = carouselPage > 0;

    const [isLegendOpen, setIsLegendOpen] = useState(false);

    return (
        <Container className="w-full min-h-screen mt-20 pt-20">

            {/* HERO + SIDEBAR */}
            <section className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-10 items-start">

                {featuredLoading || !featuredAnnouncement ? (
                    <div className="w-full rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center bg-gray-100">
                        <p className="text-black/60">Carregando destaque...</p>
                    </div>
                ) : (
                    <ComunicadoHero
                        image={featuredAnnouncement.image ?? FALLBACK_ANNOUNCEMENT_IMAGE}
                        imageAlt={featuredAnnouncement.title}
                        badgeLabel={featuredAnnouncement.category}
                        title={featuredAnnouncement.title}
                    />
                )}

                {/* Sidebar */}
                <div className="w-full min-w-0 flex flex-col gap-5 mt-2">

                    {/* Título da sidebar */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 border-b-3 border-[#701513] pb-2">
                            <HatGlasses size={32} className="text-black shrink-0" />
                            <h4 className="text-lg sm:text-xl font-semibold text-black">Fique por Dentro</h4>
                        </div>
                    </div>

                    {sidebarLoading || !sidebarAnnouncements ? (
                        <p className="text-black/60">Carregando comunicados...</p>
                    ) : (
                        sidebarAnnouncements[0] && (
                            <NewsSidebarCard
                                image={sidebarAnnouncements[0].image ?? FALLBACK_ANNOUNCEMENT_IMAGE}
                                imageAlt={sidebarAnnouncements[0].title}
                                badgeLabel={sidebarAnnouncements[0].category}
                                title={sidebarAnnouncements[0].title}
                            />
                        )
                    )}

                    {fundraisingLoading || !fundraisingCampaign ? (
                        <p className="text-black/60">Carregando campanha...</p>
                    ) : (
                        <FundraisingCard
                            title={fundraisingCampaign.title}
                            description={fundraisingCampaign.description}
                            currentAmount={fundraisingCampaign.currentAmount}
                            goalAmount={fundraisingCampaign.goalAmount}
                        />
                    )}

                    {sidebarLoading || !sidebarAnnouncements ? null : (
                        sidebarAnnouncements[1] && (
                            <NewsSidebarCard
                                image={sidebarAnnouncements[1].image ?? FALLBACK_ANNOUNCEMENT_IMAGE}
                                imageAlt={sidebarAnnouncements[1].title}
                                badgeLabel={sidebarAnnouncements[1].category}
                                title={sidebarAnnouncements[1].title}
                            />
                        )
                    )}
                </div>
            </section>

            {/* CARROSSEL */}
            <section className="w-full flex items-center justify-between gap-3 sm:gap-5 my-16 sm:my-20 lg:my-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 flex-1 min-w-0">
                    {carouselLoading || !carouselAnnouncements
                        ? <p className="text-black/60">Carregando...</p>
                        : visibleCarouselAnnouncements.map((announcement, index) => (
                            <ComunicadoCarouselCard
                                key={announcement.id}
                                image={announcement.image ?? FALLBACK_ANNOUNCEMENT_IMAGE}
                                imageAlt={announcement.title}
                                badgeLabel={announcement.category}
                                title={announcement.title}
                                visibleFrom={CAROUSEL_BREAKPOINTS[index] ?? "xl"}
                            />
                        ))}
                </div>

                <AnnouncementCarouselArrows
                    onNext={() => canGoNextPage && setCarouselPage((p) => p + 1)}
                    onPrevious={() => canGoPreviousPage && setCarouselPage((p) => p - 1)}
                    canGoNext={canGoNextPage}
                    canGoPrevious={canGoPreviousPage}
                />
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

                    <div className="w-full overflow-x-auto">
                        <EventCalendar />
                    </div>
                </div>

                {/* Bloco 2: legenda — desktop (lg+): sempre visível ao lado do calendário */}
                <div className="hidden lg:flex flex-col items-end justify-start gap-4">
                    <span className="text-sm text-black/60 text-right">Legenda:</span>
                    <div className="flex flex-col gap-3">
                        {calendarCategories.map((category) => (
                            <CalendarLegendItem key={category.key} color={category.color} label={category.label} />
                        ))}
                    </div>
                </div>

                {/* Bloco 2: legenda — abaixo de lg: some e vira um botão que abre um painel flutuante */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsLegendOpen(true)}
                        className="flex items-center gap-2 text-sm font-medium text-[#701513] border border-[#701513] rounded-full px-4 py-2 hover:bg-[#701513]/5 transition-colors"
                    >
                        <Info size={16} />
                        Ver Legenda
                    </button>

                    {/* Overlay + painel flutuante */}
                    <div
                        className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${
                            isLegendOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setIsLegendOpen(false)}
                        />

                        <div
                            className={`relative bg-white rounded-2xl p-5 m-4 w-full max-w-xs shadow-xl transition-all duration-300 ease-out ${
                                isLegendOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                            }`}
                        >
                            <button
                                onClick={() => setIsLegendOpen(false)}
                                aria-label="Fechar legenda"
                                className="absolute top-3 right-3 text-black/60 hover:text-black transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <span className="text-sm text-black/60 block mb-3">Legenda:</span>
                            <div className="flex flex-col gap-3">
                                {calendarCategories.map((category) => (
                                    <CalendarLegendItem key={category.key} color={category.color} label={category.label} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Container>
    );
}
