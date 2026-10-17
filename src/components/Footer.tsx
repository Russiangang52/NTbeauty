import { metro, nav, salon } from "../data/salon";
import { BookButton, Link, Shell, Stars } from "./ui";

const serviceLinks = [
  { label: "Волосы и окрашивание", to: "/services" },
  { label: "Маникюр и педикюр", to: "/services" },
  { label: "Брови и ресницы", to: "/services" },
  { label: "Макияж и причёски", to: "/services" },
];

const aboutLinks = [
  { label: "О салоне", to: "/about" },
  { label: "Мастера", to: "/masters" },
  { label: "Галерея", to: "/gallery" },
  { label: "Отзывы", to: "/reviews" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grain absolute inset-0" />
      <div
        className="absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle,#f58cb6,transparent 70%)" }}
      />

      <Shell className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20">
                <img src={salon.logo} alt={salon.name} className="h-full w-full object-cover" />
              </span>
              <div>
                <div className="font-display text-2xl">{salon.name}</div>
                <div className="text-[0.6875rem] tracking-[0.2em] text-white/45 uppercase">
                  Beauty salon
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              Салон красоты в Некрасовке с рейтингом 5,0 на Яндекс Картах. Волосы, ногти,
              брови, ресницы и макияж — в одном месте, в нескольких минутах от метро «Некрасовка».
            </p>
            <a
              href={salon.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 transition-colors hover:border-white/30"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffdb4d] text-sm font-bold text-ink">
                5,0
              </span>
              <span className="text-left">
                <Stars className="text-[#ffc22e]" />
                <span className="block text-xs text-white/55">
                  {salon.rating.reviews} отзывов в Яндекс Картах
                </span>
              </span>
            </a>
          </div>

          <FooterCol title="Услуги" links={serviceLinks} />
          <FooterCol title="Салон" links={aboutLinks} />

          <div>
            <h3 className="eyebrow text-white/45">Контакты</h3>
            <ul className="mt-5 space-y-3.5 text-[0.9375rem]">
              <li>
                <a
                  href={salon.yandexMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {salon.address.full}
                  <span className="block text-sm text-white/40">
                    м. Некрасовка · {metro[0].distance}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${salon.phone.raw}`}
                  className="font-medium text-white transition-colors hover:text-rose-3"
                >
                  {salon.phone.display}
                </a>
                <span className="block text-sm text-white/40">{salon.phone.note}</span>
              </li>
              <li className="text-white/70">{salon.hours.weekly}</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={salon.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                Telegram
              </a>
              <a
                href={salon.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-4xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-display text-[1.5rem] leading-tight">
                Свободные окна — прямо сейчас
              </div>
              <p className="mt-1.5 text-sm text-white/55">
                Запишитесь онлайн через карточку салона на Яндекс Картах
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookButton size="lg" variant="gold" label="Записаться онлайн" />
              <a
                href={`tel:${salon.phone.raw}`}
                className="inline-flex h-14 items-center rounded-full px-8 text-[0.9375rem] font-medium text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8125rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {salon.name} · {salon.address.postal}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <Link
                key={n.path}
                to={n.path}
                className="transition-colors hover:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </Shell>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; to: string }>;
}) {
  return (
    <div>
      <h3 className="eyebrow text-white/45">{title}</h3>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-white/65 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
