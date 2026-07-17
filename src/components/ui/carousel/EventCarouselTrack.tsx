import { CSSProperties } from "react";
import EventCard from "../cards/EventCard";

interface CarouselTrackItem {
  image: string;
  cardTitle: string;
  cardDescription: string;
}

interface EventCarouselTrackProps {
  items: CarouselTrackItem[];
  translateX: number;
  withTransition: boolean;
  transitionMs: number;
  partialCardIndex?: number;
  nextVisible?: boolean;
  fadeMs?: number;
  onTransitionEnd?: () => void;
  windowWidth: number | string;
}

export function EventCarouselTrack({
  items,
  translateX,
  withTransition,
  transitionMs,
  partialCardIndex,
  nextVisible,
  fadeMs = 300,
  onTransitionEnd,
  windowWidth,
}: EventCarouselTrackProps) {
  return (
    <div
      className="hidden xl:block xl:absolute xl:mb-0 xl:bottom-20 xl:right-0 overflow-hidden"
      style={{ width: windowWidth }}
    >
      <div
        className="flex items-center gap-3"
        onTransitionEnd={onTransitionEnd}
        style={{
          transform: `translateX(-${translateX}px)`,
          transition: withTransition
            ? `transform ${transitionMs}ms ease`
            : "none",
        }}
      >
        {items.map((slide, i) => {
          const style: CSSProperties | undefined =
            i === partialCardIndex
              ? {
                opacity: nextVisible ? 1 : 0,
                transition: `opacity ${fadeMs}ms ease`,
              }
              : undefined;

          return (
            <EventCard
              key={i}
              image={slide.image}
              title={slide.cardTitle}
              description={slide.cardDescription}
              className="w-[350px] flex-shrink-0"
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
}