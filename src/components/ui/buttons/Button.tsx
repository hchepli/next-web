import { ArrowUpRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "secondary-dark";
  icon?: boolean;
  size?: "default" | "sm";
}

export default function Button({
  variant = "primary",
  icon = false,
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "flex items-center justify-center gap-1 tracking-wide rounded-full transition-colors";
  const variants = {
    primary: "bg-[#701513] border border-[#701513] text-white",
    secondary: "bg-transparent border border-white text-white",
    "secondary-dark": "bg-transparent border border-black text-black",
  };
  const sizes = {
    default: "py-4 px-10",
    sm: "py-2 px-4 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowUpRight size={18} />}
    </button>
  );
}