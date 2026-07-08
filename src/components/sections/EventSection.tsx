"use client";
import HeroSection from "@/components/sections/HeroSection";
import HeroContent from "@/components/ui/layout/HeroContent";
import EventCard from "@/components/ui/cards/EventCard";
import { useEffect, useRef, useState } from "react";

interface Slide {
  image: string;
  titleLines: string[];
  description: string;
  cardTitle: string;
  cardDescription: string;
}

const BUTTON_LABEL = "Saiba Mais";

const slides: Slide[] = [
  {
    image: "/img/hero/eventos-img.png",
    titleLines: ["FESTA DE NATAL"],
    description: "Veja os próximos horários de missa e os avisos atualizados da paróquia",
    cardTitle: "Festa de Natal",
    cardDescription: "Veja os próximos horários de missa e os avisos atualizados da paróquia",
  },
  {
    image: "/img/hero/vespera-ano-novo.png",
    titleLines: ["VÉSPERA DE ANO NOVO"],
    description: "Curta a véspera de ano novo com Deus e com toda a nossa comunidade",
    cardTitle: "Véspera de Ano Novo",
    cardDescription: "Curta a véspera de ano novo com Deus e com toda a nossa comunidade",
  },
];

const SLIDE_DURATION = 6000;
const TRANSITION_MS = 700;
const FADE_MS = 900;
const REVEAL_DELAY_MS = 500;
const CARD_WIDTH = 350;
const GAP = 12;
const PARTIAL_VISIBLE = 180; // quanto do 2º card aparece cortado
const STEP = CARD_WIDTH + GAP;
const WINDOW_WIDTH = CARD_WIDTH + GAP + PARTIAL_VISIBLE;

const n = slides.length;
const trackItems = [...slides, ...slides];

export default function EventSection() {
  const [pos, setPos] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [nextVisible, setNextVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const current = slides[pos % n];
  const partialCardIndex = pos + 2;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setWithTransition(true);
      setNextVisible(false);
      setPos((p) => p + 1);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  const handleTransitionEnd = () => {
    if (pos >= n) {
      setWithTransition(false);
      setPos(0);
    }
    revealTimeoutRef.current = setTimeout(() => {
      setNextVisible(true);
    }, REVEAL_DELAY_MS);
  };

  const handleIndicatorClick = (i: number) => {
    setWithTransition(true);
    setNextVisible(false);
    setPos(i);
  };

  return (
    <HeroSection backgroundImage={current.image} align="end">
      <div className="flex justify-between w-full h-full pl-17 pb-15">
        <HeroContent
          key={pos % n}
          titleLines={current.titleLines}
          description={current.description}
          primaryLabel={BUTTON_LABEL}
          secondaryLabel={BUTTON_LABEL}
        />

        <div
          className="absolute bottom-8 right-0 overflow-hidden"
          style={{ width: WINDOW_WIDTH }}
        >
          <div
            className="flex items-center gap-3"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${(pos + 1) * STEP}px)`,
              transition: withTransition
                ? `transform ${TRANSITION_MS}ms ease`
                : "none",
            }}
          >
            {trackItems.map((slide, i) => (
              <EventCard
                key={i}
                image={slide.image}
                title={slide.cardTitle}
                description={slide.cardDescription}
                className="w-[350px] flex-shrink-0"
                style={
                  i === partialCardIndex
                    ? {
                        opacity: nextVisible ? 1 : 0,
                        transition: `opacity ${FADE_MS}ms ease`,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-17 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === pos % n ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </HeroSection>
  );
}