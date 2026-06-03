import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-sm uppercase tracking-widest font-semibold hover:text-neutral-300 transition-colors">
          Perel
        </Link>
        <nav className="flex gap-8">
          <Link
            to="/catalog"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            Каталог
          </Link>
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
