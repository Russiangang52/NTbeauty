import { useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { priceList, salon, serviceGroups } from "../data/salon";
import {
  BookButton,
  Button,
  Chip,
  Eyebrow,
  Heading,
  PageHero,
  Reveal,
  Section,
  Shell,
} from "../components/ui";
import { CTABlock } from "../components/blocks";
import { IMG, photoById } from "../data/salon";

export default function Services() {
  const initial = (() => {
    const f = window.location.hash.split("?f=")[1];
    return f && serviceGroups.some((g) => g.id === f) ? f : "all";
  })();
  const [filter, setFilter] = useState<string>(initial);

  const items = useMemo(
    () => (filter === "all" ? priceList : priceList.filter((p) => p.category === catTitle(filter))),
    [filter],
  );

  const activeGroup = filter === "all" ? null : serviceGroups.find((g) => g.id === filter);

  return (
    <>
      <PageHero
        eyebrow="Услуги и цены"
        title={
          <>
            Прайс салона <em className="text-rose-3">{salon.name}</em>
          </>
        }
        lead={`Цены соответствуют разделу «Товары и услуги» в карточке салона на Яндекс Картах (обновлено 5 октября). Скидка ${salon.discount} на первое посещение.`}
        image={photoById(IMG.interior2)}
      >
        <BookButton variant="gold" size="lg" label="Записаться онлайн" />
        <Button href={`tel:${salon.phone.raw}`} variant="light" size="lg">
          Позвонить администратору
        </Button>
      </PageHero>

      {/* Category switcher */}
      <Section className="py-14 sm:py-20">
        <Shell>
          <div className="flex flex-wrap gap-2.5">
            <CatBtn active={filter === "all"} onClick={() => setFilter("all")}>
              Все услуги
            </CatBtn>
            {serviceGroups.map((g) => (
              <CatBtn key={g.id} active={filter === g.id} onClick={() => setFilter(g.id)}>
                {g.title}
              </CatBtn>
            ))}
          </div>

          {/* Price list */}
          <div className="mt-12 overflow-hidden rounded-5xl border border-line bg-white">
            {items.map((p, i) => (
              <div
                key={p.title}
                className="group flex flex-col gap-4 border-b border-line px-6 py-7 transition-colors last:border-0 hover:bg-sand/50 sm:flex-row sm:items-start sm:gap-8 sm:px-9"
              >
                <span className="hidden w-8 shrink-0 pt-1 font-display text-lg text-ink/25 tabular-nums sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-[1.375rem] leading-snug">{p.title}</h3>
                    <span className="rounded-full bg-sand px-3 py-1 text-[0.6875rem] tracking-wide text-ink/55 uppercase">
                      {p.category}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-2.5 max-w-3xl text-[0.9375rem] leading-relaxed text-mute">
                      {p.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
                  <span className="font-display text-[1.75rem] whitespace-nowrap">
                    {p.price}
                  </span>
                  <a
                    href={salon.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-white transition-all hover:-translate-y-0.5"
                  >
                    Записаться
                  </a>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="px-9 py-16 text-center text-mute">
                В этой категории цены уточняются у администратора — позвоните, подберём
                услугу и мастера.
              </div>
            )}
          </div>

          <Reveal>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-4xl border border-line bg-sand px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.9375rem] leading-relaxed text-ink/70">
                <strong className="font-semibold">Скидка {salon.discount}</strong> на первое
                посещение. Итоговая стоимость может зависеть от длины и густоты волос —
                администратор подскажет точную цену при записи.
              </p>
              <Button href={salon.booking} variant="primary" size="md" arrow className="shrink-0">
                Записаться
              </Button>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Full catalogue */}
      <Section tone="sand" className="py-20 sm:py-28">
        <Shell>
          <Reveal>
            <Eyebrow>Полный каталог</Eyebrow>
            <Heading className="mt-6 max-w-2xl">
              Всё, что делают <em className="text-rose">наши мастера</em>
            </Heading>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-mute">
              Перечень услуг салона по данным карточки организации в Яндекс Картах.
            </p>
          </Reveal>

          <div className="mt-14 space-y-6">
            {(activeGroup ? [activeGroup] : serviceGroups).map((g, gi) => (
              <Reveal key={g.id} delay={gi * 80}>
                <article className="overflow-hidden rounded-5xl border border-line bg-white">
                  <div className="flex flex-col gap-6 border-b border-line p-8 sm:flex-row sm:items-center sm:gap-8">
                    <img
                      src={g.image}
                      alt={g.title}
                      loading="lazy"
                      className="h-28 w-28 shrink-0 rounded-3xl object-cover"
                    />
                    <div>
                      <span className="eyebrow text-rose">{g.kicker}</span>
                      <h3 className="mt-3 text-[1.875rem] leading-none">{g.title}</h3>
                      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mute">
                        {g.blurb}
                      </p>
                    </div>
                    <div className="sm:ml-auto">
                      <BookButton size="sm" label="Выбрать время" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 p-8">
                    {g.items.map((it) => (
                      <Chip key={it} className="bg-porcelain">
                        {it}
                      </Chip>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      <CTABlock />
    </>
  );
}

function catTitle(id: string) {
  return serviceGroups.find((g) => g.id === id)?.title ?? "";
}

function CatBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2.5 text-[0.875rem] font-medium transition-all duration-300",
        active
          ? "bg-ink text-white shadow-soft"
          : "border border-line bg-white text-ink/70 hover:border-ink/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
