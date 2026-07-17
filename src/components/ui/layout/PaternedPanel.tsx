import { ReactNode } from "react";
import PlusPattern from "../svg/PlusPattern";
import LinesPattern from "../svg/LinesPattern";

interface PatternedPanelProps {
  children: ReactNode;
  className?: string;
}

export function PatternedPanel({ children, className = "" }: PatternedPanelProps) {
  return (
    <div
      className={`relative flex flex-col lg:flex-row justify-evenly items-center gap-8 lg:gap-0 bg-[#F8F8F8] rounded-xl min-h-fit lg:min-h-[65dvh] py-12 lg:py-0 px-6 sm:px-10 lg:px-0 overflow-hidden ${className}`}
    >
      <PlusPattern className="absolute top-0 left-0 w-28 sm:w-40 lg:w-60 rotate-180" />
      <LinesPattern className="absolute top-0 right-0 w-28 sm:w-40 lg:w-60" />
      <LinesPattern className="absolute bottom-0 left-0 w-28 sm:w-40 lg:w-60 rotate-180" />
      <PlusPattern className="absolute bottom-0 right-0 w-28 sm:w-40 lg:w-60" />

      {children}
    </div>
  );
}