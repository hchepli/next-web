"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { HatGlasses } from "lucide-react";
import ComunicadoHero from "@/components/ui/cards/ComunicadoHero";
import NewsSidebarCard from "@/components/ui/cards/NewsSidebarCard";
import FundraisingCard from "@/components/ui/cards/FundraisingCard";
import ComunicadoCarouselCard from "@/components/ui/cards/ComunicadoCarouselCard";
import AnnouncementCarouselArrows from "@/components/ui/buttons/AnnouncementCarouselArrows";
import { useFeaturedAnnouncement } from "@/hooks/useFeaturedAnnouncement";
import { useSidebarAnnouncements } from "@/hooks/useSidebarAnnouncements";
import { useCarouselAnnouncements } from "@/hooks/useCarouselAnnouncements";
import { useActiveFundraisingCampaign } from "@/hooks/useActiveFundraisingCampaign";

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

        </Container>
    );
}
