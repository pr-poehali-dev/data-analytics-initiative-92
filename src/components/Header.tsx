interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-widest font-semibold">
          Perel
        </div>
        <nav className="flex gap-8">
          <a
            href="https://perelshop.ru/tsvetnyye-kladochnyye-smesi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            Каталог
          </a>
          <a
            href="https://perelshop.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            Заказать
          </a>
        </nav>
      </div>
    </header>
  );
}
