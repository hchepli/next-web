import { ReactNode } from "react";

interface EventCardCarouselProps {
  children: ReactNode;
}

export default function EventCardCarousel({ children }: EventCardCarouselProps) {
  return (
    <div className="absolute bottom-8 right-0 w-[480px] md:w-[550px] overflow-hidden">
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}