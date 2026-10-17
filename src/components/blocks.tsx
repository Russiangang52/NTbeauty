import { cn } from "../utils/cn";
import {
  accessibility,
  amenities,
  masters,
  metro,
  payments,
  photos,
  promo,
  reviews,
  salon,
  stops,
} from "../data/salon";
import {
  BookButton,
  Button,
  Chip,
  Eyebrow,
  GoodPlaceBadge,
  Heading,
  Reveal,
  Section,
  Shell,
  Stars,
} from "./ui";

/* ------------------------------------------------------------------ */
/*  Отзывы                                                             */
/* ------------------------------------------------------------------ */

export function ReviewsBlock() {
  return (
    <Section tone="cream" className="py-20 sm:py-28">
      <Shell>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>Отзывы гостей</Eyebrow>
            <Heading className="mt-6 max-w-xl">
              5,0 из 5 — <em className="text-rose">{salon.rating.reviews} отзывов</em> в Яндекс Картах
            </Heading>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-mute">
              Оценки собраны в карточке салона на Яндекс Картах. Мы публикуем их без правок —
              так, как их оставили гости.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-4xl border border-line bg-white p-6 shadow-soft sm:min-w-[19rem]">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl leading-none">5,0</span>
                <div>
                  <Stars />
                  <div className="mt-1 text-sm text-mute">
                    {salon.rating.ratings} оценок
                  </div>
                </div>
              </div>
              <Button
                href={salon.yandexReviews}
                variant="outline"
                size="sm"
                className="mt-6 w-full"
              >
                Все {salon.rating.reviews} отзывов
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <Reveal key={r.author} delay={i * 110}>
              <article className="flex h-full flex-col rounded-4xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#f3d9e2] to-[#dfc0cd] font-display text-lg text-ink/70">
                    {r.author.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{r.author}</div>
                    <div className="flex items-center gap-2 text-xs text-mute">
                      <Stars className="scale-90 origin-left" />
                      {r.date}
                    </div>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink/75">
                  {r.text.length > 430 ? `${r.text.slice(0, 430)}…` : r.text}
                </p>
                {r.photo && (
                  <img
                    src={r.photo}
                    alt=""
                    loading="lazy"
                    className="mt-5 h-40 w-full rounded-3xl object-cover"
                  />
                )}
                {r.answer && (
                  <div className="mt-5 rounded-3xl bg-sand p-5">
                    <div className="eyebrow text-rose">Ответ салона</div>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{r.answer}</p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Мастера                                                            */
/* ------------------------------------------------------------------ */

export function MastersGrid({ limit }: { limit?: number }) {
  const list = limit ? masters.slice(0, limit) : masters;
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {list.map((m, i) => (
        <Reveal key={m.name} delay={i * 100}>
          <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
            <div
              className={cn(
                "grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br font-display text-3xl text-ink/75",
                m.tint,
              )}
            >
              {m.initials}
            </div>
            <h3 className="mt-6 text-[1.625rem] leading-none">{m.name}</h3>
            <p className="mt-2 text-[0.8125rem] tracking-[0.14em] text-rose uppercase">
              {m.role}
            </p>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink/70">
              {m.bio}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {m.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-sand px-3 py-1 text-[0.75rem] text-ink/60"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href={salon.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-rose"
            >
              Записаться к мастеру
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Галерея                                                            */
/* ------------------------------------------------------------------ */

export function GalleryStrip() {
  const strip = photos.slice(0, 8);
  return (
    <Section className="overflow-hidden py-20 sm:py-28">
      <Shell>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <Eyebrow>Атмосфера</Eyebrow>
            <Heading className="mt-6 max-w-lg">Как выглядит салон</Heading>
          </Reveal>
          <Reveal delay={100}>
            <Button to="/gallery" variant="outline" size="md" arrow>
              Все {salon.photosCount} фото
            </Button>
          </Reveal>
        </div>
      </Shell>
      <div className="no-bar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
        {strip.map((p, i) => (
          <figure
            key={p.id}
            className={cn(
              "group relative shrink-0 snap-center overflow-hidden rounded-4xl bg-sand-2",
              i % 3 === 0
                ? "h-[26rem] w-[19rem] sm:h-[30rem] sm:w-[22rem]"
                : "h-[26rem] w-[15rem] sm:h-[30rem] sm:w-[17rem]",
            )}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Удобства                                                           */
/* ------------------------------------------------------------------ */

export function AmenitiesBlock() {
  return (
    <Section tone="sand" className="py-20 sm:py-28">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <Eyebrow>Сервис</Eyebrow>
            <Heading className="mt-6">
              Продумано <em className="text-rose">до мелочей</em>
            </Heading>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-mute">
              Волосы, ногти, брови, ресницы и макияж — в одном месте. Чай, кофе и сладости
              для гостей, Wi-Fi, подарочные сертификаты и полностью доступный для
              маломобильных гостей вход.
            </p>
            <div className="mt-8 rounded-4xl border border-line bg-white p-7">
              <div className="eyebrow text-rose">Оплата</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {payments.map((p) => (
                  <Chip key={p}>{p}</Chip>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 transition-colors hover:border-rose-2/50">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-lg text-rose">
                    {a.icon}
                  </span>
                  <div>
                    <div className="font-medium leading-snug">{a.title}</div>
                    <div className="mt-1 text-sm text-mute">{a.note}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-4xl border border-line bg-white px-7 py-6">
            <span className="eyebrow text-rose">Доступная среда</span>
            <span className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
              {accessibility.slice(0, 5).map((a) => (
                <span key={a} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-2" />
                  {a}
                </span>
              ))}
            </span>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Карта и локация                                                    */
/* ------------------------------------------------------------------ */

export function MapBlock() {
  return (
    <Section className="py-20 sm:py-28">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Reveal>
            <Eyebrow>Как найти</Eyebrow>
            <Heading className="mt-6">
              Москва, пр-т&nbsp;Защитников&nbsp;Москвы,&nbsp;12
            </Heading>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-mute">
              Район Некрасовка. До метро «Некрасовка» — 291 м, остановка «Ул. Ухтомского
              Ополчения» — 151 м. Рядом есть велопарковка.
            </p>

            <div className="mt-8 space-y-3">
              {metro.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-4 rounded-3xl border border-line bg-white px-5 py-4"
                >
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: m.color }} />
                  <span className="font-medium">м. {m.name}</span>
                  <span className="ml-auto text-sm text-mute">{m.distance}</span>
                </div>
              ))}
              {stops.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-4 rounded-3xl border border-line bg-white px-5 py-4"
                >
                  <span className="h-3 w-3 shrink-0 rounded-full bg-gold" />
                  <span className="font-medium">Остановка «{s.name}»</span>
                  <span className="ml-auto text-sm text-mute">{s.distance}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={salon.route} variant="outline" size="md">
                Построить маршрут
              </Button>
              <Button href={salon.yandexMaps} variant="ghost" size="md" arrow>
                Открыть в Яндекс Картах
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-5xl border border-line bg-white p-2.5 shadow-lift">
              <iframe
                src={salon.mapEmbed}
                width="100%"
                height="460"
                title="NT Beauty на карте — Москва, проспект Защитников Москвы, 12"
                className="block h-[380px] w-full rounded-[1.25rem] border-0 sm:h-[460px]"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Акция                                                              */
/* ------------------------------------------------------------------ */

export function PromoBlock() {
  return (
    <Section className="py-16 sm:py-20">
      <Shell>
        <Reveal>
          <div className="relative grid overflow-hidden rounded-5xl bg-ink text-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grain relative z-10 p-8 sm:p-12 lg:p-14">
              <span className="eyebrow text-rose-3">Предложение для новых гостей</span>
              <h2 className="mt-6 text-balance text-[1.85rem] leading-[1.1] sm:text-[2.5rem] lg:text-[2.9rem]">
                Скидка <em className="text-rose-3">{salon.discount}</em> на первое посещение
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                {promo.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <BookButton variant="gold" size="lg" label="Записаться со скидкой" />
                <a
                  href={`tel:${salon.phone.raw}`}
                  className="inline-flex h-14 items-center rounded-full px-8 text-[0.9375rem] font-medium text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
                >
                  Уточнить условия
                </a>
              </div>
            </div>
            <div className="relative min-h-[16rem]">
              <img
                src={promo.photo}
                alt="Салон красоты NT Beauty — скидка на первое посещение"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/35 to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Финальный CTA                                                      */
/* ------------------------------------------------------------------ */

export function CTABlock() {
  return (
    <Section tone="ink" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute top-1/2 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle,#b96e8d,transparent 70%)" }}
      />
      <div className="grain absolute inset-0" />
      <Shell className="relative text-center">
        <Reveal>
          <GoodPlaceBadge className="mx-auto" />
          <h2 className="mx-auto mt-8 max-w-3xl text-balance text-[2.2rem] leading-[1.08] text-white sm:text-[3.2rem]">
            Запишитесь в удобное окно — <em className="text-rose-3">онлайн, за минуту</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/60">
            Нажмите «Записаться онлайн» в карточке салона на Яндекс Картах — или просто
            позвоните администратору. Подскажем свободное время и подберём мастера.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            <a
              href={salon.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl bg-gradient-to-r from-[#c09b6c] to-[#a8825a] p-5 text-left text-white transition-all duration-400 hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M8 7V3m8 4V3M3.5 9h17M5 5h14a1.5 1.5 0 011.5 1.5V20a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 20V6.5A1.5 1.5 0 015 5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block text-[0.9375rem] font-semibold">
                  Онлайн-запись в 1 клик
                </span>
                <span className="block text-[0.8125rem] text-white/75">
                  Карточка салона · Яндекс Карты
                </span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href={salon.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-white/15 bg-white/5 p-5 text-left text-white backdrop-blur transition-all duration-400 hover:-translate-y-0.5 hover:border-white/35"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#ffdb4d] text-ink">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block text-[0.9375rem] font-semibold">
                  Отзывы и фото в Яндекс Картах
                </span>
                <span className="block text-[0.8125rem] text-white/55">
                  {salon.rating.reviews} отзывов · 5,0 ★
                </span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={`tel:${salon.phone.raw}`} variant="light" size="lg">
              Позвонить · {salon.phone.display}
            </Button>
            <Button href={salon.telegram.href} variant="light" size="lg">
              Telegram · {salon.telegram.label}
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/45">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffdb4d]" />
              Рейтинг 5,0 · {salon.rating.reviews} отзывов
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffdb4d]" />
              {salon.hours.weekly}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffdb4d]" />
              {salon.address.short}
            </span>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
