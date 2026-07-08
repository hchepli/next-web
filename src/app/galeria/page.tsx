import Container from "@/components/layout/Container";
import { Image } from "lucide-react";
const fotos = [
  { src: "/img/galeria/1.png", legenda: "Encontro de jovens" },
  { src: "/img/galeria/2.png", legenda: "Procissão" },
  { src: "/img/galeria/3.png", legenda: "Celebração" },
  { src: "/img/galeria/4.png", legenda: "Batizado" },
  { src: "/img/galeria/5.png", legenda: "Missa dominical" },
  { src: "/img/galeria/6.png", legenda: "Comunidade reunida" },
  { src: "/img/galeria/7.png", legenda: "Celebração no altar" },
];

export default function Galeria() {
  return (
    <Container className="w-full min-h-screen my-20 pt-20">
                                <div className="flex flex-col gap-1 pb-10">
                        <div className="flex items-center gap-2 border-b-2 border-[#701513] pb-1">
                            <Image  size={28} className="text-black shrink-0" />
                            <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-wide font-semibold text-black">
                                Nossa Comunidade em Imagens
                            </h2>
                        </div>
                        <p className="text-black/60 text-base sm:text-lg">
                            Momentos de fé, união e celebração que marcam a nossa história.
                        </p>
                    </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {fotos.map((foto, i) => (
            <figure
              key={i}
              className="break-inside-avoid mb-5 rounded-xl overflow-hidden bg-neutral-100 shadow-sm relative group"
            >
              <img
                src={foto.src}
                alt={foto.legenda}
                loading="lazy"
                className="w-full block transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm px-3 pt-6 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {foto.legenda}
              </figcaption>
            </figure>
          ))}
        </div>
    </Container>
  );
}