"use client"

import Container from "@/components/layout/Container";
import HeroSection from "@/components/sections/HeroSection";
import HeroContent from "@/components/ui/layout/HeroContent";
import { CarouselIndicators } from "@/components/ui/buttons/CarouselIndicators";
import { EventCarouselTrack } from "@/components/ui/carousel/EventCarouselTrack";
import SectionDivider from "@/components/layout/chevski/SectionDivider";
import TextActionBlock from "@/components/ui/layout/TextActionBlock";
import { PatternedPanel } from "@/components/ui/layout/PaternedPanel";
import WaveText from "@/components/layout/chevski/WaveText";
import { NewsletterForm } from "@/components/ui/form/NewsletterForm";
import { NewsletterIntro } from "@/components/ui/layout/NewsletterIntro";
import ScheduleCard from "@/components/ui/cards/ScheduleCard";
import CarouselControls from "@/components/ui/buttons/CarouselControls";
import { ScheduleCarouselTrack } from "@/components/ui/carousel/ScheduleCarouselTrack";
import { useEventHeroCarousel } from "@/hooks/useEventHeroCarousel";
import { useWeeklyScheduleCarousel } from "@/hooks/useWeeklyScheduleCarousel";
import { useWeeklyMassSchedule } from "@/hooks/useWeeklyMassSchedule";
import { useUpcomingEventSlides } from "@/hooks/useUpcomingEventSlides";

const TRANSITION_MS = 700;
const FADE_MS = 900;
const CARD_WIDTH = 350;
const GAP = 12; // gap do hero carousel de eventos
const PARTIAL_VISIBLE = 180; // quanto do 2º card aparece cortado
const STEP = CARD_WIDTH + GAP;
const WINDOW_WIDTH = CARD_WIDTH + GAP + PARTIAL_VISIBLE;


export default function Home() {
  const { data: eventSlides, loading: eventsLoading } = useUpcomingEventSlides();
  const { data: weeklySchedule, loading: scheduleLoading } = useWeeklyMassSchedule();

  const {
    n,
    pos,
    current,
    partialCardIndex,
    trackItems,
    withTransition,
    nextVisible,
    handleTransitionEnd,
    handleIndicatorClick,
  } = useEventHeroCarousel(eventSlides ?? []);

  const {
    scheduleTotal,
    extendedScheduleColumns,
    scheduleCardWidth,
    scheduleIndex,
    scheduleWithTransition,
    handleScheduleNext,
    handleSchedulePrevious,
    handleScheduleTransitionEnd,
    scheduleStep,
  } = useWeeklyScheduleCarousel(weeklySchedule ?? []);

  return (
    <>
      <HeroSection backgroundImage="/img/hero/hero-img.png" className="relative">
        <Container className="flex flex-col items-start justify-center gap-3 text-white min-h-screen">
          <HeroContent
            eyebrow="Joinville - SC"
            titleLines={["UM ESPAÇO ABERTO", "PARA TODOS"]}
            description="Veja os próximos horários de missa e os avisos atualizados da paróquia"
            primaryLabel="Ver Horários"
            secondaryLabel="Próximos Eventos"
          />
        </Container>
        <div className="absolute bottom-[-80px] sm:bottom-[-120px] lg:bottom-[-200px] left-0 z-20 w-full pointer-events-none">
          <WaveText />
        </div>
      </HeroSection>

      {eventsLoading || !current ? (
        <HeroSection backgroundImage="/img/hero/eventos-img.png" align="end">
          <p className="text-white pl-5 sm:pl-8 md:pl-17">Carregando eventos...</p>
        </HeroSection>
      ) : (
        <HeroSection backgroundImage={current.image} align="end">
          <div className="relative flex flex-col lg:flex-row lg:justify-between w-full h-full px-5 sm:px-8 md:pl-17 pt-6 md:pt-10 lg:pt-0 pb-10 sm:pb-16 md:pb-30">
            <EventCarouselTrack
              items={trackItems}
              translateX={(pos + 1) * STEP}
              withTransition={withTransition}
              transitionMs={TRANSITION_MS}
              partialCardIndex={partialCardIndex}
              nextVisible={nextVisible}
              fadeMs={FADE_MS}
              onTransitionEnd={handleTransitionEnd}
              windowWidth={WINDOW_WIDTH}
            />

            <div className="flex flex-col justify-end flex-1 lg:order-first">
              <HeroContent
                key={pos % n}
                titleLines={current.titleLines}
                description={current.description}
                primaryLabel="Saiba Mais"
                secondaryLabel="Garantir Ingresso"
              />
            </div>

            <CarouselIndicators
              count={n}
              activeIndex={pos % n}
              onSelect={handleIndicatorClick}
              className="hidden md:flex mt-4 lg:mt-0 lg:absolute lg:bottom-15 lg:left-17"
            />
          </div>
          <Container>
            <SectionDivider showLogo showName position="left" />
          </Container>
        </HeroSection>
      )}
      <section className="flex flex-col lg:flex-row justify-center items-center min-h-[100dvh] lg:min-h-[65dvh] gap-5 lg:gap-0 px-6 lg:px-0">
        <TextActionBlock
          title="Com Você em Qualquer Lugar"
          description="Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:"
          buttonLabel="Ver Transmissão"
        />

        <div className="flex flex-1 flex-col justify-center items-start gap-5 overflow-hidden w-full">
          <div className="flex w-full justify-between items-center px-6 sm:px-10 lg:pr-17 lg:pl-0">
            <h4>Programação:</h4>
            <CarouselControls onPrevious={handleSchedulePrevious} onNext={handleScheduleNext} />
          </div>

          {scheduleLoading || scheduleTotal === 0 ? (
            <p className="px-6 sm:px-10">Carregando programação...</p>
          ) : (
            <ScheduleCarouselTrack
              index={scheduleIndex}
              step={scheduleStep}
              withTransition={scheduleWithTransition}
              onTransitionEnd={handleScheduleTransitionEnd}
              wrapperClassName="px-6 sm:px-10 lg:px-0"
            >
              {extendedScheduleColumns.map((column, i) => (
                <ScheduleCard
                  key={i}
                  day={column.day}
                  items={column.items}
                  style={{ minWidth: scheduleCardWidth, width: scheduleCardWidth }}
                />
              ))}
            </ScheduleCarouselTrack>
          )}
        </div>
      </section>

      <Container className="flex justify-center items-center">
        <PatternedPanel>
          <TextActionBlock
            title="Faça sua Doação"
            description="A doação é um modo de agradecer a Deus por todas as bênçãos na nossa vida. E também é como plantamos a semente em busca de alguma graça específica."
            buttonLabel="Fazer uma Doação"
          />

          <TextActionBlock
            title="Faça seu Testemunho"
            description="A oração sincera é o caminho mais puro para conversar com Deus. Abra seu coração, compartilhe seu pedido de oração e ore pelos outros no nosso mural virtual."
            buttonLabel="Conte sua História"
          />
        </PatternedPanel>
      </Container>

      <Container className="flex justify-center items-center min-h-[95dvh]">
        <div className="flex justify-center items-center flex-col gap-3 w-full">
          <NewsletterIntro
            image="/img/hero/newsletter.png"
            imageAlt="Igreja"
            title="Se Inscreva na Nossa Newsletter"
            description="Fique por dentro de tudo o que acontece na nossa família e receba uma dose extra de fé direto no seu e-mail."
          />
          <NewsletterForm
            className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%]"
            onSubmit={(email) => {
              // ex: chamar API de inscrição
              console.log("Inscrever:", email);
            }}
          />
        </div>
      </Container>
    </>
  );
}