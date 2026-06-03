import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Palette",
    title: "20+ цветов в линейке",
    description: "От классического белого и серого до тёплого терракота и глубокого антрацита — найдём оттенок под любой кирпич.",
  },
  {
    icon: "ShieldCheck",
    title: "Морозостойкость F100",
    description: "Выдерживает 100 циклов замерзания и оттаивания. Шов сохраняет цвет и прочность десятилетиями.",
  },
  {
    icon: "Truck",
    title: "Доставка по России",
    description: "Отправляем с центрального склада в Москве. Быстро, надёжно, с соблюдением условий хранения.",
  },
  {
    icon: "BadgeCheck",
    title: "Цена от производителя",
    description: "Официальный дилер Perel — покупаете напрямую без наценки посредников.",
  },
];

export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/9bd55018-b4bf-4753-b863-82368c29cdc4/files/1697c58c-a8a6-483a-99cb-b74a263b103c.jpg"
          alt="Цветные кладочные смеси Perel"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-500">Почему выбирают Perel</h3>
        <p className="text-2xl lg:text-3xl mb-10 text-neutral-900 leading-tight font-semibold">
          Шов — это не просто заполнитель. Это финальный штрих, который делает фасад законченным произведением.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {advantages.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="shrink-0 mt-1">
                <Icon name={item.icon} size={20} className="text-neutral-700" />
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-900 mb-1">{item.title}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://perelshop.ru/tsvetnyye-kladochnyye-smesi/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white border border-black px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide"
        >
          Перейти в каталог
        </a>
      </div>
    </div>
  );
}
