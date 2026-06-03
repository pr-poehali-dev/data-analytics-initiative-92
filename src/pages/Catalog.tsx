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
  // Серия SL — 14 цветов, водопоглощение кирпича 5–12%
  { id: "sl-0005", series: "SL", name: "Perel SL 0005", color: "Белый", hex: "#F2F0EB", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0010", series: "SL", name: "Perel SL 0010", color: "Светло-серый", hex: "#D0CECC", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0015", series: "SL", name: "Perel SL 0015", color: "Серый", hex: "#969490", weight: "25 кг", price: 870, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0020", series: "SL", name: "Perel SL 0020", color: "Тёмно-серый", hex: "#606060", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0025", series: "SL", name: "Perel SL 0025", color: "Антрацит", hex: "#3C3C3C", weight: "25 кг", price: 900, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0030", series: "SL", name: "Perel SL 0030", color: "Чёрный", hex: "#1E1E1E", weight: "25 кг", price: 930, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0035", series: "SL", name: "Perel SL 0035", color: "Кремовый", hex: "#EDE0C4", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0040", series: "SL", name: "Perel SL 0040", color: "Бежевый", hex: "#D6C49A", weight: "25 кг", price: 870, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0045", series: "SL", name: "Perel SL 0045", color: "Жёлто-бежевый", hex: "#C8A85C", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0050", series: "SL", name: "Perel SL 0050", color: "Песочный", hex: "#C4A46E", weight: "25 кг", price: 870, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0055", series: "SL", name: "Perel SL 0055", color: "Терракот", hex: "#B05A3C", weight: "25 кг", price: 900, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0060", series: "SL", name: "Perel SL 0060", color: "Красно-коричневый", hex: "#8C3A28", weight: "25 кг", price: 900, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0065", series: "SL", name: "Perel SL 0065", color: "Коричневый", hex: "#6E3E22", weight: "25 кг", price: 900, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },
  { id: "sl-0070", series: "SL", name: "Perel SL 0070", color: "Тёмно-коричневый", hex: "#3E2010", weight: "25 кг", price: 930, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/perel-sl/" },

  // Серия RL — 18 цветов, для кирпича с водопоглощением 12–18%
  { id: "rl-0005", series: "RL", name: "Perel RL 0005", color: "Белый", hex: "#F4F2ED", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0010", series: "RL", name: "Perel RL 0010", color: "Светло-серый", hex: "#CECCC8", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0015", series: "RL", name: "Perel RL 0015", color: "Серый", hex: "#929090", weight: "25 кг", price: 1010, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0020", series: "RL", name: "Perel RL 0020", color: "Тёмно-серый", hex: "#606060", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0025", series: "RL", name: "Perel RL 0025", color: "Антрацит", hex: "#3A3A3A", weight: "25 кг", price: 1050, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0030", series: "RL", name: "Perel RL 0030", color: "Чёрный", hex: "#1C1C1C", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0035", series: "RL", name: "Perel RL 0035", color: "Жемчужный", hex: "#E6E0D2", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0040", series: "RL", name: "Perel RL 0040", color: "Кремовый", hex: "#EAD8B0", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0045", series: "RL", name: "Perel RL 0045", color: "Бежевый", hex: "#D4BC94", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0050", series: "RL", name: "Perel RL 0050", color: "Жёлто-бежевый", hex: "#C8A456", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0055", series: "RL", name: "Perel RL 0055", color: "Песочный", hex: "#BEA06A", weight: "25 кг", price: 1010, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0060", series: "RL", name: "Perel RL 0060", color: "Лососевый", hex: "#D27C64", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0065", series: "RL", name: "Perel RL 0065", color: "Терракот", hex: "#AC5436", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0070", series: "RL", name: "Perel RL 0070", color: "Красно-коричневый", hex: "#8A3826", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0075", series: "RL", name: "Perel RL 0075", color: "Коричневый", hex: "#6C3C20", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0080", series: "RL", name: "Perel RL 0080", color: "Тёмно-коричневый", hex: "#3E200E", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0085", series: "RL", name: "Perel RL 0085", color: "Оливковый", hex: "#7A7A50", weight: "25 кг", price: 1050, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "rl-0090", series: "RL", name: "Perel RL 0090", color: "Синий", hex: "#4A5A7A", weight: "25 кг", price: 1080, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },

  // Серия GL — 12 цветов, для клинкерного кирпича и блоков с водопоглощением до 5%
  { id: "gl-0005", series: "GL", name: "Perel GL 0005", color: "Белый", hex: "#F6F4F0", weight: "25 кг", price: 1250, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0010", series: "GL", name: "Perel GL 0010", color: "Светло-серый", hex: "#CCCAC6", weight: "25 кг", price: 1250, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0015", series: "GL", name: "Perel GL 0015", color: "Серый", hex: "#909090", weight: "25 кг", price: 1250, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0020", series: "GL", name: "Perel GL 0020", color: "Тёмно-серый", hex: "#585858", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0025", series: "GL", name: "Perel GL 0025", color: "Антрацит", hex: "#3C3C3C", weight: "25 кг", price: 1320, tag: "Популярный", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0030", series: "GL", name: "Perel GL 0030", color: "Чёрный", hex: "#1A1A1A", weight: "25 кг", price: 1350, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0035", series: "GL", name: "Perel GL 0035", color: "Слоновая кость", hex: "#EEE6D0", weight: "25 кг", price: 1250, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0040", series: "GL", name: "Perel GL 0040", color: "Бежевый", hex: "#D2BC96", weight: "25 кг", price: 1250, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0045", series: "GL", name: "Perel GL 0045", color: "Песочный", hex: "#BEA060", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0050", series: "GL", name: "Perel GL 0050", color: "Терракот", hex: "#A84E34", weight: "25 кг", price: 1290, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0055", series: "GL", name: "Perel GL 0055", color: "Коричневый", hex: "#6A3A1E", weight: "25 кг", price: 1320, url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
  { id: "gl-0060", series: "GL", name: "Perel GL 0060", color: "Тёмно-коричневый", hex: "#3C1E0A", weight: "25 кг", price: 1350, tag: "Премиум", url: "https://perelshop.ru/tsvetnyye-kladochnyye-smesi/" },
];

const SERIES = ["Все", "SL", "RL", "GL"];

const SERIES_DESC: Record<string, string> = {
  SL: "14 цветов · Для кирпича с водопоглощением 5–12% · Мешок 25 кг",
  RL: "18 цветов · Для кирпича с водопоглощением 12–18% · Мешок 25 кг",
  GL: "12 цветов · Для клинкерного кирпича с водопоглощением до 5% · Мешок 25 кг",
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
                  <p className="text-xs text-neutral-400 font-mono tracking-wide">
                    {product.series} {product.id.split("-")[1]}
                  </p>
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