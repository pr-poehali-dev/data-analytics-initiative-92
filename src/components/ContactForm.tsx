import { useState } from "react";

const SUBMIT_URL = "https://functions.poehali.dev/71433ab5-1185-4543-9213-7c051f0f62b5";

interface ContactFormProps {
  initialMessage?: string;
}

export default function ContactForm({ initialMessage = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-neutral-100 py-20 px-6">
      <div className="max-w-xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-500 mb-3">Получить консультацию</p>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 leading-tight">
          Подберём смесь<br />под ваш проект
        </h2>
        <p className="text-neutral-500 mb-10 text-sm">
          Оставьте заявку — наш специалист свяжется с вами, поможет выбрать цвет и рассчитает количество.
        </p>

        {status === "success" ? (
          <div className="bg-black text-white px-6 py-8 text-center">
            <p className="text-lg font-semibold mb-2">Заявка принята!</p>
            <p className="text-neutral-400 text-sm">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400"
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400"
            />
            <textarea
              placeholder="Комментарий (необязательно)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400 resize-none"
            />
            {status === "error" && (
              <p className="text-red-600 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-black text-white px-6 py-3 text-sm uppercase tracking-wide transition-all duration-300 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Отправка..." : "Отправить заявку"}
            </button>
            <p className="text-neutral-400 text-xs">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}