import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Product {
  id: string;
  series: string;
  name: string;
  color: string;
  hex: string;
  weight: string;
  price: number;
  tag?: string;
  url: string;
}

const PRODUCTS: Product[] = [
  // Серия SL — стандартная линейка
  { id: "sl-00", series: "SL", name: "Perel SL Белый", color: "Белый", hex: "#F5F5F0", weight: "25 кг", price: 890, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-01", series: "SL", name: "Perel SL Светло-серый", color: "Светло-серый", hex: "#C8C8C8", weight: "25 кг", price: 890, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-02", series: "SL", name: "Perel SL Серый", color: "Серый", hex: "#8C8C8C", weight: "25 кг", price: 890, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-03", series: "SL", name: "Perel SL Антрацит", color: "Антрацит", hex: "#3A3A3A", weight: "25 кг", price: 920, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-04", series: "SL", name: "Perel SL Чёрный", color: "Чёрный", hex: "#1A1A1A", weight: "25 кг", price: 950, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-05", series: "SL", name: "Perel SL Бежевый", color: "Бежевый", hex: "#D9C9A8", weight: "25 кг", price: 890, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-06", series: "SL", name: "Perel SL Жёлто-бежевый", color: "Жёлто-бежевый", hex: "#D4B878", weight: "25 кг", price: 890, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-07", series: "SL", name: "Perel SL Терракот", color: "Терракот", hex: "#B5563A", weight: "25 кг", price: 920, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-08", series: "SL", name: "Perel SL Коричневый", color: "Коричневый", hex: "#7A4A2A", weight: "25 кг", price: 920, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "sl-09", series: "SL", name: "Perel SL Тёмно-коричневый", color: "Тёмно-коричневый", hex: "#4A2A10", weight: "25 кг", price: 950, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },

  // Серия RL — расширенная линейка
  { id: "rl-00", series: "RL", name: "Perel RL Белый", color: "Белый", hex: "#FAFAF8", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-01", series: "RL", name: "Perel RL Жемчужный", color: "Жемчужный", hex: "#E8E4DC", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-02", series: "RL", name: "Perel RL Светло-серый", color: "Светло-серый", hex: "#BCBCBC", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-03", series: "RL", name: "Perel RL Серый", color: "Серый", hex: "#888888", weight: "25 кг", price: 1050, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-04", series: "RL", name: "Perel RL Тёмно-серый", color: "Тёмно-серый", hex: "#555555", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-05", series: "RL", name: "Perel RL Песочный", color: "Песочный", hex: "#D6C090", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-06", series: "RL", name: "Perel RL Кремовый", color: "Кремовый", hex: "#E8D8B0", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-07", series: "RL", name: "Perel RL Лососевый", color: "Лососевый", hex: "#D4856A", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-08", series: "RL", name: "Perel RL Красно-коричневый", color: "Красно-коричневый", hex: "#8B3A2A", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },

  // Серия GL — премиум
  { id: "gl-00", series: "GL", name: "Perel GL Белый", color: "Белый", hex: "#FFFFFF", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-01", series: "GL", name: "Perel GL Серебристый", color: "Серебристый", hex: "#D0D0D0", weight: "25 кг", price: 1290, tag: "Премиум", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-02", series: "GL", name: "Perel GL Серый", color: "Серый", hex: "#909090", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-03", series: "GL", name: "Perel GL Антрацит", color: "Антрацит", hex: "#404040", weight: "25 кг", price: 1350, tag: "Премиум", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-04", series: "GL", name: "Perel GL Шоколад", color: "Шоколад", hex: "#5C3A1E", weight: "25 кг", price: 1350, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-05", series: "GL", name: "Perel GL Слоновая кость", color: "Слоновая кость", hex: "#F0EAD6", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
];

const SERIES = ["Все", "SL", "RL", "GL"];

const SERIES_DESC: Record<string, string> = {
  SL: "Стандартная линейка — оптимальное соотношение цены и качества",
  RL: "Расширенная линейка — улучшенный состав, больше цветов",
  GL: "Премиум линейка — максимальная стойкость и насыщенность цвета",
};

export default function Catalog() {
  const [activeSeries, setActiveSeries] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchSeries = activeSeries === "Все" || p.series === activeSeries;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.color.toLowerCase().includes(search.toLowerCase());
    return matchSeries && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-900 text-white px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-neutral-400 transition-colors">
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
        <span className="text-sm uppercase tracking-widest font-semibold">Perel</span>
      </div>

      {/* Hero */}
      <div className="bg-neutral-900 text-white px-6 pb-12 pt-8">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Официальный дилер</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Цветные кладочные смеси</h1>
        <p className="text-neutral-400 max-w-xl">
          {PRODUCTS.length} позиций · Серии SL, RL и GL · Доставка по России
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {SERIES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSeries(s)}
              className={`px-4 py-1.5 text-sm uppercase tracking-wide border transition-all duration-200 ${
                activeSeries === s
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-600 border-neutral-300 hover:border-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск по цвету..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      {/* Series description */}
      {activeSeries !== "Все" && (
        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
          <p className="text-sm text-neutral-600">{SERIES_DESC[activeSeries]}</p>
        </div>
      )}

      {/* Grid */}
      <div className="px-6 py-10">
        {filtered.length === 0 ? (
          <p className="text-neutral-400 text-center py-20">Ничего не найдено</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-neutral-200 hover:border-black transition-all duration-200 flex flex-col"
              >
                {/* Color swatch */}
                <div
                  className="h-28 w-full relative"
                  style={{ backgroundColor: product.hex }}
                >
                  {product.tag && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase tracking-wide px-2 py-0.5">
                      {product.tag}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 text-[10px] uppercase tracking-widest font-bold opacity-40"
                    style={{ color: parseInt(product.hex.slice(1), 16) > 0x888888 ? "#000" : "#fff" }}>
                    {product.series}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">{product.series}</p>
                  <p className="text-sm font-semibold text-neutral-900 leading-tight">{product.color}</p>
                  <p className="text-xs text-neutral-400">{product.weight}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-neutral-900">{product.price} ₽</p>
                    <Icon name="ExternalLink" size={12} className="text-neutral-300 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-neutral-100 px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Не нашли нужный цвет?</h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">Напишите нам — подберём оттенок или сделаем заказ на нужный артикул с официального склада.</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors"
        >
          Оставить заявку
        </Link>
      </div>
    </div>
  );
}
