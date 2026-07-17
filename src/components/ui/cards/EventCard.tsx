import Button from "@/components/ui/buttons/Button";
import { CSSProperties } from "react";

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function EventCard({
  image,
  title,
  description,
  buttonLabel = "Saiba Mais",
  onButtonClick,
  className = "",
  style,
}: EventCardProps) {
  return (
    <div className={`flex flex-col justify-center items-center bg-black/60 rounded-[24px] w-[240px] md:w-[260px] lg:w-[350px] flex-shrink-0 ${className}`}>
      <div className="w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-[120px] md:h-[140px] lg:h-[160px] object-cover rounded-t-[24px]"
        />
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-2 py-3 md:py-4 px-3">
        <h2 className="text-lg md:text-xl text-white font-semibold">{title}</h2>
        <p className="text-white/80 w-[85%] text-sm">{description}</p>
      </div>
      <div className="flex justify-end items-center w-full pb-3 md:pb-4 pr-3">
        <Button variant="primary" size="sm" icon onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}