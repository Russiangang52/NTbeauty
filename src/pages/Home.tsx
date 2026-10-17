import {
  priceList,
  salon,
  serviceGroups,
  photos,
  photoById,
  IMG,
} from "../data/salon";
import {
  BookButton,
  Button,
  Eyebrow,
  GoodPlaceBadge,
  Heading,
  RatingPill,
  Reveal,
  Section,
  Shell,
} from "../components/ui";
import {
  AmenitiesBlock,
  CTABlock,
  GalleryStrip,
  MapBlock,
  MastersGrid,
  PromoBlock,
  ReviewsBlock,
} from "../components/blocks";

const facts = [
  "Рейтинг 5,0 в Яндекс Картах",
  `${salon.rating.reviews} отзывов гостей`,
  `Скидка ${salon.discount} на первое посещение`,
  "Онлайн-запись",
  "Подарочные сертификаты",
  `${salon.photosCount} фотографий в карточке`,
  salon.hours.weekly,
  "Москва · м. Некрасовка",
];

export default function Home() {
  const popular = priceList.filter((p) => p.popular).slice(0, 6);

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <header className="relative isolate overflow-hidden bg-ink pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
        <img
          src={photoById(IMG.interior)}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/55" />
        <div className="grain absolute inset-0" />

        <Shell className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-3">
                <GoodPlaceBadge />
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.75rem] text-white/70 ring-1 ring-inset ring-white/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                    <path
                      fill="#7ad39a"
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.4l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9.4z"
                    />
                  </svg>
                  Онлайн-запись
                </span>
              </div>

              <h1 className="mt-8 text-balance text-[3rem] leading-[0.95] sm:text-[4.25rem] lg:text-[5.25rem]">
                {salon.nameFirst} <em className="text-rose-3">{salon.nameSecond}</em>
              </h1>
              <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-white/70 sm:text-[1.25rem]">
                Салон красоты в Некрасовке, куда возвращаются за цветом, формой и вниманием.
                Волосы, ногти, брови, ресницы и макияж — в одном месте на проспекте Защитников Москвы, 12.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookButton variant="gold" size="lg" label="Записаться онлайн" />
                <Button href={`tel:${salon.phone.raw}`} variant="light" size="lg">
                  {salon.phone.display}
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <RatingPill className="border-white/15 bg-white/10" />
                <span className="text-sm text-white/55">
                  {salon.address.short}
                </span>
                <span className="text-sm text-white/55">{salon.hours.weekly}</span>
              </div>
            </div>

            {/* Collage */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-5 grid-rows-6 gap-4 h-[34rem]">
                <div className="col-span-3 row-span-4 overflow-hidden rounded-5xl bg-white/5">
                  <HeroImg src={photos[0].src} i={0} />
                </div>
                <div className="col-span-2 row-span-3 overflow-hidden rounded-4xl bg-white/5">
                  <HeroImg src={photos[3].src} i={1} />
                </div>
                <div className="col-span-2 row-span-3 overflow-hidden rounded-4xl bg-white/5">
                  <HeroImg src={photos[2].src} i={2} />
                </div>
                <div className="col-span-3 row-span-2 overflow-hidden rounded-4xl bg-white/5">
                  <HeroImg src={photos[1].src} i={3} />
                </div>
              </div>
              <div className="animate-floaty absolute -bottom-6 -left-8 rounded-3xl border border-white/15 bg-ink/85 p-5 backdrop-blur-xl">
                <div className="font-display text-3xl leading-none">{priceList.length}</div>
                <div className="mt-1 text-xs tracking-wide text-white/55">
                  услуг в прайсе салона
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </header>

      {/* ---------------------------------------------------------- */}
      {/*  Facts marquee                                              */}
      {/* ---------------------------------------------------------- */}
      <div className="border-b border-line bg-porcelain py-5">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...facts, ...facts].map((f, i) => (
              <span
                key={`${f}-${i}`}
                className="flex shrink-0 items-center gap-4 text-[0.8125rem] tracking-wide text-ink/55 uppercase"
              >
                <span className="text-rose-2">✦</span>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  Services                                                   */}
      {/* ---------------------------------------------------------- */}
      <Section className="py-20 sm:py-28">
        <Shell>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <Eyebrow>Услуги</Eyebrow>
              <Heading className="mt-6 max-w-2xl">
                Четыре направления — <em className="text-rose">один визит</em>
              </Heading>
            </Reveal>
            <Reveal delay={100}>
              <Button to="/services" variant="outline" arrow>
                Все услуги и цены
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {serviceGroups.map((g, i) => (
              <Reveal key={g.id} delay={i * 90}>
                <a
                  href={`#/services?f=${g.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-5xl bg-ink text-white"
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    className="h-56 w-full object-cover opacity-70 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-55 sm:h-64"
                  />
                  <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink/60 to-transparent sm:h-64" />
                  <div className="relative flex flex-1 flex-col p-8">
                    <span className="eyebrow text-rose-3">{g.kicker}</span>
                    <h3 className="mt-4 text-[2rem] leading-none">{g.title}</h3>
                    <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-white/60">
                      {g.blurb}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-sm text-white/45">
                        {g.items.length} услуг
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3.5">
                        Смотреть <span>→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      <PromoBlock />

      {/* ---------------------------------------------------------- */}
      {/*  Popular prices                                             */}
      {/* ---------------------------------------------------------- */}
      <Section tone="sand" className="py-20 sm:py-28">
        <Shell>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <Eyebrow>Прайс</Eyebrow>
              <Heading className="mt-6 max-w-2xl">
                Популярные услуги и <em className="text-rose">цены</em>
              </Heading>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-mute">
                Стоимость указана по данным прайса салона на Яндекс Картах. Итоговая цена
                может зависеть от длины и густоты волос — уточняйте при записи.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <BookButton variant="outline" label="Полный прайс" />
            </Reveal>
          </div>

          <div className="mt-14 overflow-hidden rounded-5xl border border-line bg-white">
            {popular.map((p, i) => (
              <a
                key={p.title}
                href={salon.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 border-b border-line px-6 py-6 transition-colors last:border-0 hover:bg-sand/60 sm:flex-row sm:items-center sm:gap-8 sm:px-9"
              >
                <span className="hidden w-7 shrink-0 font-display text-lg text-ink/25 tabular-nums sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[1.25rem] leading-snug sm:text-[1.375rem]">
                    {p.title}
                  </span>
                  {p.description && (
                    <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-mute">
                      {p.description.length > 150
                        ? `${p.description.slice(0, 150)}…`
                        : p.description}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-5">
                  <span className="shrink-0 font-display text-[1.5rem] whitespace-nowrap">
                    {p.price}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/*  Masters                                                    */}
      {/* ---------------------------------------------------------- */}
      <Section className="py-20 sm:py-28">
        <Shell>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <Eyebrow>Команда</Eyebrow>
              <Heading className="mt-6 max-w-2xl">
                Мастера, которых <em className="text-rose">рекомендуют</em>
              </Heading>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-mute">
                Наши гости называют мастеров по именам в отзывах — это лучшая
                характеристика команды.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Button to="/masters" variant="outline" arrow>
                Вся команда
              </Button>
            </Reveal>
          </div>
          <div className="mt-14">
            <MastersGrid limit={4} />
          </div>
        </Shell>
      </Section>

      <GalleryStrip />
      <ReviewsBlock />
      <AmenitiesBlock />
      <MapBlock />
      <CTABlock />
    </>
  );
}

function HeroImg({ src, i }: { src: string; i: number }) {
  return (
    <img
      src={src}
      alt="Салон красоты NT Beauty в Некрасовке"
      loading={i < 2 ? "eager" : "lazy"}
      className="h-full w-full object-cover"
    />
  );
}
