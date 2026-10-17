import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Masters from "./pages/Masters";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import { useRoute } from "./lib/router";
import { BookButton } from "./components/ui";
import { salon } from "./data/salon";

const routes: Record<string, () => React.ReactElement> = {
  "/": Home,
  "/services": Services,
  "/masters": Masters,
  "/gallery": Gallery,
  "/reviews": Reviews,
  "/about": About,
  "/contacts": Contacts,
};

const meta: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "NT Beauty — салон красоты в Некрасовке | Онлайн-запись",
    desc: "Салон красоты NT Beauty в Москве, проспект Защитников Москвы, 12. Рейтинг 5,0 на Яндекс Картах. Волосы, ногти, брови, ресницы, макияж. Скидка 10% на первое посещение.",
  },
  "/services": {
    title: "Услуги и цены — NT Beauty, салон красоты в Некрасовке",
    desc: "Прайс салона NT Beauty: маникюр, педикюр, окрашивание волос, стрижки, брови, ресницы, макияж и причёски. Москва, пр-т Защитников Москвы, 12.",
  },
  "/masters": {
    title: "Мастера салона NT Beauty — Некрасовка",
    desc: "Колористы, мастера маникюра, бровисты и ресничники NT Beauty. Запись к мастеру онлайн.",
  },
  "/gallery": {
    title: "Фотографии салона и работ — NT Beauty, Некрасовка",
    desc: "Фотографии салона красоты NT Beauty и работы мастеров: маникюр, брови, ресницы, окрашивание волос.",
  },
  "/reviews": {
    title: "Отзывы о салоне NT Beauty — 5,0 в Яндекс Картах",
    desc: "135 отзывов и 173 оценки гостей салона красоты NT Beauty в Некрасовке. Рейтинг 5,0 в Яндекс Картах.",
  },
  "/about": {
    title: "О салоне NT Beauty — Некрасовка",
    desc: "NT Beauty — салон красоты в Некрасовке. Волосы, ногти, брови, ресницы и макияж. Рейтинг 5,0 на Яндекс Картах.",
  },
  "/contacts": {
    title: "Контакты — NT Beauty, пр-т Защитников Москвы, 12",
    desc: "Адрес салона NT Beauty: Москва, проспект Защитников Москвы, 12. Открыто до 22:00. Телефон +7 (999) 814-64-44. М. Некрасовка.",
  },
};

export default function App() {
  const route = useRoute();
  const Page = routes[route] ?? NotFound;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const m = meta[route] ?? meta["/"];
    document.title = m.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", m.desc);
  }, [route]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Reading progress */}
      <div
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-rose-3 via-rose to-gold"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <Header />
      <main key={route} className="animate-fade-up">
        <Page />
      </main>
      <Footer />

      {/* Sticky mobile booking bar */}
      <MobileBookBar />
    </div>
  );
}

function MobileBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full border border-line bg-porcelain/95 p-2 shadow-lift backdrop-blur-xl transition-all duration-500 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a
        href={`tel:${salon.phone.raw}`}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-ink"
        aria-label="Позвонить"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path
            d="M5 4h3.5l1.5 4-2 1.5a12 12 0 006.5 6.5L16 14l4 1.5V19a1.5 1.5 0 01-1.7 1.5C10.6 19.9 4.1 13.4 3.5 5.7A1.5 1.5 0 015 4z"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <BookButton size="md" className="flex-1" label="Записаться онлайн" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-ink px-6 pt-32 pb-24 text-center text-white">
      <span className="font-display text-[6rem] leading-none text-rose-3/50">404</span>
      <h1 className="mt-4 text-[2rem]">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-white/60">
        Возможно, ссылка устарела. Вернитесь на главную — там всё про услуги,
        мастеров и онлайн-запись.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <BookButton size="lg" label="Записаться онлайн" />
        <a
          href="#/"
          className="inline-flex h-14 items-center rounded-full px-8 text-[0.9375rem] font-medium text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
        >
          На главную
        </a>
      </div>
    </div>
  );
}
