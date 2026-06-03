import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/9bd55018-b4bf-4753-b863-82368c29cdc4/files/0a60de48-bd02-4bdb-8160-c07072d2cccd.jpg"
          alt="Кирпичный фасад с цветными кладочными швами"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 opacity-70">
          Официальный дилер Perel
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          ЦВЕТНЫЕ<br />КЛАДОЧНЫЕ<br />СМЕСИ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10">
          Более 20 цветов для идеальных швов. Профессиональное качество Perel — для домов, которые восхищают.
        </p>
        <a
          href="https://perelshop.ru/tsvetnyye-kladochnyye-smesi/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-semibold transition-all duration-300 hover:bg-neutral-200"
        >
          Смотреть каталог
        </a>
      </div>
    </div>
  );
}
