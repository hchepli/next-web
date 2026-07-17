import { MoveRight } from "lucide-react";

interface NewsletterFormProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export function NewsletterForm({
  placeholder = "Seu melhor email!",
  buttonLabel = "Se Inscreva Agora",
  onSubmit,
  className = "",
}: NewsletterFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    onSubmit?.(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white rounded-full border border-black/10 pl-4 sm:pl-5 shadow-sm mt-2 ${className}`}
    >
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        required
        className="flex-1 min-w-0 bg-transparent outline-none text-black/80 placeholder:text-black/40 text-sm sm:text-base"
      />
      <button
        type="submit"
        className="flex items-center gap-1 sm:gap-2 bg-[#7A0C1E] px-4 sm:px-6 py-4 sm:py-5 text-white rounded-full h-full font-medium hover:bg-[#661828] transition-colors text-sm sm:text-base whitespace-nowrap"
      >
        {buttonLabel}
        <MoveRight size={18} className="sm:hidden" />
        <MoveRight size={24} className="hidden sm:block" />
      </button>
    </form>
  );
}