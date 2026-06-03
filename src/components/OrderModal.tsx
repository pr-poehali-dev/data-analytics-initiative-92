import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SUBMIT_URL = "https://functions.poehali.dev/71433ab5-1185-4543-9213-7c051f0f62b5";

interface OrderModalProps {
  product: { series: string; color: string; id: string } | null;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (product) {
      const article = product.id.split("-")[1];
      setMessage(`Интересует артикул ${product.series} ${article} (${product.color})`);
      setStatus("idle");
      setName("");
      setPhone("");
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const article = product.id.split("-")[1];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-md sm:mx-4 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-black flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={24} className="text-white" />
            </div>
            <p className="text-lg font-semibold mb-2">Заявка принята!</p>
            <p className="text-neutral-500 text-sm mb-6">Мы свяжемся с вами в ближайшее время.</p>
            <button onClick={onClose} className="text-sm uppercase tracking-wide underline text-neutral-500 hover:text-black">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-neutral-400 font-mono mb-1">{product.series} {article}</p>
            <h2 className="text-xl font-bold text-neutral-900 mb-1">{product.color}</h2>
            <p className="text-sm text-neutral-500 mb-6">Оставьте контакт — перезвоним и оформим заказ.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none text-neutral-600"
              />
              {status === "error" && (
                <p className="text-red-600 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Отправка..." : "Заказать"}
              </button>
              <p className="text-neutral-400 text-xs">
                Нажимая «Заказать», вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
