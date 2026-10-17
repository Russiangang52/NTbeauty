import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { photos, salon } from "../data/salon";
import {
  BookButton,
  Button,
  Eyebrow,
  Heading,
  PageHero,
  Reveal,
  Section,
  Shell,
} from "../components/ui";
import { IMG, photoById } from "../data/salon";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <PageHero
        eyebrow="Галерея"
        title={
          <>
            Внутри <em className="text-rose-3">{salon.name}</em>
          </>
        }
        lead={`Фотографии из карточки салона на Яндекс Картах: интерьер и работы мастеров — маникюр, брови, ресницы, окрашивание. Всего в карточке ${salon.photosCount} снимков.`}
        image={photoById(IMG.interior)}
      >
        <BookButton variant="gold" size="lg" label="Записаться онлайн" />
        <Button href={salon.yandexPhotos} variant="light" size="lg" arrow>
          Все {salon.photosCount} фото в Яндекс Картах
        </Button>
      </PageHero>

      <Section className="py-16 sm:py-24">
        <Shell>
          <Reveal>
            <Eyebrow>Фотографии</Eyebrow>
            <Heading className="mt-6 max-w-2xl">
              Атмосфера, в которой <em className="text-rose">хочется остаться</em>
            </Heading>
          </Reveal>

          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {photos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpen(i)}
                className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-4xl bg-sand-2 text-left"
              >
                <div className="relative">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]",
                      p.wide ? "aspect-[3/4]" : "aspect-[4/5]",
                    )}
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
                  <span className="absolute right-4 bottom-4 translate-y-3 rounded-full bg-white/90 px-4 py-2 text-[0.8125rem] font-medium opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    Открыть
                  </span>
                </div>
              </button>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 rounded-4xl border border-line bg-sand px-7 py-6 text-center">
              <p className="text-[0.9375rem] text-ink/70">
                Больше фотографий и работ мастеров — в карточке салона на Яндекс Картах.
                Часть снимков — фото гостей из отзывов.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button href={salon.yandexPhotos} variant="outline" size="md" arrow>
                  {salon.photosCount} фото на Яндекс Картах
                </Button>
                <Button href={salon.telegram.href} variant="outline" size="md" arrow>
                  Telegram
                </Button>
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex animate-scale-in items-center justify-center bg-ink/92 p-4 backdrop-blur-md sm:p-10"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/20 sm:left-8"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) + 1) % photos.length);
            }}
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/20 sm:right-8"
          >
            →
          </button>

          <figure
            className="max-h-full w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photoById(photos[open].id, "orig")}
              alt={photos[open].alt}
              className="max-h-[76vh] w-full rounded-4xl object-contain"
            />
            <figcaption className="mt-5 text-center text-sm text-white/55">
              {photos[open].alt} · {open + 1} / {photos.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
