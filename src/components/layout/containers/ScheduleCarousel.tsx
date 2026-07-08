"use client";

import { useEffect, useState } from "react";
import ScheduleCard from "@/components/ui/cards/ScheduleCard";
import CarouselControls from "@/components/ui/buttons/CarouselControls";

interface ScheduleColumn {
  day: string;
  items: { title: string; time: string }[];
}

interface ScheduleCarouselProps {
  columns: ScheduleColumn[];
}

const GAP = 28; // gap-7 = 1.75rem = 28px

// Larguras de card por breakpoint (deve bater com o min-w passado ao ScheduleCard)
function getCardWidth() {
  if (typeof window === "undefined") return 300;
  const w = window.innerWidth;
  if (w < 640) return 260;   // mobile
  if (w < 1024) return 280;  // tablet
  return 300;                // desktop
}

export default function ScheduleCarousel({ columns }: ScheduleCarouselProps) {
  const total = columns.length;
  const extendedColumns = [...columns, ...columns, ...columns];

  const [cardWidth, setCardWidth] = useState(300);
  const [index, setIndex] = useState(total);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    const updateWidth = () => setCardWidth(getCardWidth());
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const step = cardWidth + GAP;

  const handleNext = () => {
    setWithTransition(true);
    setIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setWithTransition(true);
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index >= total * 2) {
      setWithTransition(false);
      setIndex(index - total);
    } else if (index < total) {
      setWithTransition(false);
      setIndex(index + total);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-start gap-5 overflow-hidden w-full">
      <div className="flex w-full justify-between items-center px-6 sm:px-10 lg:pr-17 lg:pl-0">
        <h4>Programação:</h4>
        <CarouselControls onPrevious={handlePrevious} onNext={handleNext} />
      </div>

      <div className="w-full overflow-hidden px-6 sm:px-10 lg:px-0">
        <div
          className={`flex gap-5 sm:gap-6 lg:gap-7 ${withTransition ? "transition-transform duration-300 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${index * step}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedColumns.map((column, i) => (
            <ScheduleCard
              key={i}
              day={column.day}
              items={column.items}
              style={{ minWidth: cardWidth, width: cardWidth }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}