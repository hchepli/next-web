import Container from "@/components/layout/Container";
import { ArrowUpRight } from "lucide-react"

export default function Contato() {

    return (
        <Container className="w-full min-h-screen mt-20 pt-20">
              <div className="diagnostico flex flex-col lg:flex-row justify-between items-start w-full py-10 md:py-20 gap-12 lg:gap-6">

          <div className="flex w-full lg:w-[45%] justify-center items-start gap-8 flex-col">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl text-start font-semibold">
              Vamos conversar sobre a gestão{" "}
              <span className="text-[rgb(var(--brand-secondary))]">da sua empresa</span>
            </h3>
            <p className="text-start text-[rgb(var(--text-secondary)/0.5)] w-full sm:w-[83%]">
              Entenda como a CHP Smart pode ajudar você a ter mais clareza, organização e segurança nas decisões do dia a dia.
            </p>
            <div className="flex justify-center items-start flex-col">
              <h4 className="text-start text-[rgb(var(--text-secondary)/0.5)]">Email:</h4>
              <p>chepli@italy.com.br</p>
            </div>
            <div className="flex justify-center items-start flex-col">
              <h4 className="text-start text-[rgb(var(--text-secondary)/0.5)]">Telefone:</h4>
              <p>+55 (11) 91102-1278</p>
            </div>
            <a
              className="group relative overflow-hidden bg-black text-white border border-black p-3 pl-6 flex justify-center items-center gap-5 rounded-full transition-colors duration-300 hover:text-black"
              href="https://wa.me/5511911021278"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out rounded-full" aria-hidden="true" />
              <span className="relative z-10">Falar com a CHP Smart</span>
              <div className="relative z-10 flex justify-center items-center bg-white text-black p-3 rounded-full transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                <ArrowUpRight />
              </div>
            </a>
          </div>

          <div className="w-full lg:w-[42%]">
            <div className="rounded-2xl p-6 sm:p-10 flex flex-col gap-6 shadow-md">

              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="name" className="text-sm font-medium text-black">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value=""
                  placeholder="Como eu posso te chamar?"
                  className="w-full h-12 rounded-lg border border-black/30 bg-white px-4 text-sm outline-none focus:border-black transition"
                />
              </div>

              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="email" className="text-sm font-medium text-black">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value=""

                  placeholder="Por onde eu te respondo?"
                  className="w-full h-12 rounded-lg border border-black/30 bg-white px-4 text-sm outline-none focus:border-black transition"
                />
              </div>

              <div className="flex flex-col gap-2 items-start">
                <label htmlFor="message" className="text-sm font-medium text-black">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value=""
                  placeholder="Qual é o principal desafio da sua empresa hoje?"
                  className="w-full h-36 resize-none rounded-lg border border-black/30 bg-white px-4 py-3 text-sm outline-none focus:border-black transition"
                />
              </div>

              <div className="w-full flex justify-end pt-2">
                <button
                  className="group relative overflow-hidden bg-black text-white border border-black p-3 pl-6 flex justify-center items-center gap-5 rounded-full transition-colors duration-300 hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out rounded-full" aria-hidden="true" />
                  <span className="relative z-10">
                     Quero Conversar
                  </span>
                  <div className="relative z-10 flex justify-center items-center bg-white text-black p-3 rounded-full transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight />
                  </div>
                </button>
              </div>

            </div>
          </div>

        </div>
        </Container>
    );
}