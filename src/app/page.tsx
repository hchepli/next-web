"use client";

import { useEffect, useState } from "react";


import Container from "@/components/layout/Container";
import HeroSection from "@/components/sections/HeroSection";
import EventSection from "@/components/sections/EventSection";
import ScheduleCarousel from "@/components/layout/containers/ScheduleCarousel";
import TextActionBlock from "@/components/ui/layout/TextActionBlock";
import HeroContent from "@/components/ui/layout/HeroContent";
import PlusPattern from "@/components/ui/svg/PlusPattern";
import LinesPattern from "@/components/ui/svg/LinesPattern";
import { MoveRight } from "lucide-react";

const scheduleColumns = [
  {
    day: "Hoje",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
  },
  {
    day: "Amanhã",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
  },
  {
    day: "Quarta",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
    
  },
    {
    day: "Quinta",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
    
  },
    {
    day: "Sexta",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
    
  },
    {
    day: "Sábado",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
    
  },
    {
    day: "Domingo",
    items: [
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
      { title: "Celebração da Manhã", time: "08:00" },
    ],
    
  },
];

export default function Home() {
   const [offset, setOffset] = useState(50);

  useEffect(() => {
    const onScroll = () => {
const value = (window.scrollY * 0.05) % 100;
setOffset(value);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
            <div className="absolute bottom-[-200px] left-0 z-20 w-full pointer-events-none">
  <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="w-full h-100"
    >
      <defs>
        <path
          id="wavePath"
          d="
            M0,150
            C260,80 560,100 760,130
            C980,160 1220,170 1440,110
          "
        />
      </defs>

      <path
        d="
          M0,150
          C260,80 560,100 760,130
          C980,160 1220,170 1440,110
        "
        fill="none"
        stroke="#7B1111"
        strokeWidth="120"
        strokeLinecap="round"
      />

      <text
        fill="white"
        fontSize="32"
        letterSpacing="8"
        fontWeight="600"
      >
<textPath href="#wavePath" startOffset={`${offset}%`}>
  MISSAS - EVENTOS - AVISOS -
  MISSAS - EVENTOS - AVISOS -
</textPath>
      </text>
    </svg>
    </div>
      </HeroSection>

     <EventSection />

      <section className="flex justify-center items-center min-h-[65dvh]">
        <TextActionBlock
          title="Com Você em Qualquer Lugar"
          description="Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:"
          buttonLabel="Ver Transmissão"
        />

        <ScheduleCarousel columns={scheduleColumns} />
      </section>
      

      <Container className="flex justify-center items-center">
        <div className="relative flex justify-evenly items-center bg-[#F8F8F8] rounded-xl min-h-[65dvh] overflow-hidden">
          <PlusPattern className="absolute top-0 left-0 w-60 rotate-180" />
          <LinesPattern className="absolute top-0 right-0 w-60" />
          <LinesPattern className="absolute bottom-0 left-0 w-60 rotate-180" />
          <PlusPattern className="absolute bottom-0 right-0 w-60" />

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
        </div>
      </Container>

      <Container className="flex justify-center items-center min-h-[95dvh]">
        <div className="flex justify-center items-center flex-col gap-3 w-full">
          <div className="relative">
            <img src="/img/hero/newsletter.png" alt="Igreja" className="rounded-xl w-full" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white rounded-b-xl" />
          </div>
          <h2 className="text-4xl text-center tracking-wide">Se Inscreva na Nossa Newsletter</h2>
          <p className="text-lg text-black/60 text-center w-[30%] leading-[1.2]">
            Fique por dentro de tudo o que acontece na nossa família e receba uma dose extra de fé direto no seu e-mail.
          </p>
          <div className="flex items-center bg-white rounded-full border border-black/10 pl-5 shadow-sm mt-2 w-[45%]">
            <input
              type="email"
              placeholder="Seu melhor email!"
              className="flex-1 bg-transparent outline-none text-black/80 placeholder:text-black/40"
            />
            <button className="flex items-center gap-2 bg-[#7A0C1E] px-6 py-5 text-white rounded-full h-full font-medium hover:bg-[#661828] transition-colors">
              Se Inscreva Agora
              <MoveRight size={24} />
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
