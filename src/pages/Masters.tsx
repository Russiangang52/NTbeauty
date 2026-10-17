import { salon } from "../data/salon";
import {
  BookButton,
  Button,
  Eyebrow,
  Heading,
  PageHero,
  Reveal,
  Section,
  Shell,
  Stars,
} from "../components/ui";
import { CTABlock, MastersGrid } from "../components/blocks";
import { IMG, photoById } from "../data/salon";

const quotes = [
  {
    text: "Нейл-стилист Анастасия — это просто невероятный и компетентный профессионал, настоящая нейл-фея.",
    author: "Элеонора Картавченко",
  },
  {
    text: "Мастер Валерия великолепная! Сразу поняла, что мне надо. Очень профессионально владеет техниками.",
    author: "Elena Demakova",
  },
  {
    text: "Мастер всегда выслушивает пожелания перед процедурой, делает максимально естественные брови.",
    author: "Kris",
  },
];

export default function Masters() {
  return (
    <>
      <PageHero
        eyebrow="Команда"
        title={
          <>
            Мастера <em className="text-rose-3">{salon.name}</em>
          </>
        }
        lead="Колористы, мастера маникюра, бровисты и ресничники, к которым гости возвращаются годами. Выбирайте своего — и записывайтесь онлайн или по телефону."
        image={photoById(IMG.interior)}
      >
        <BookButton variant="gold" size="lg" label="Записаться к мастеру" />
        <Button href={salon.telegram.href} variant="light" size="lg">
          Написать в Telegram
        </Button>
      </PageHero>

      <Section className="py-20 sm:py-28">
        <Shell>
          <Reveal>
            <Eyebrow>Команда</Eyebrow>
            <Heading className="mt-6 max-w-2xl">
              Люди, которым <em className="text-rose">доверяют</em>
            </Heading>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-mute">
              Имена и специализации — из реальных отзывов гостей салона в Яндекс Картах.
            </p>
          </Reveal>
          <div className="mt-14">
            <MastersGrid />
          </div>
        </Shell>
      </Section>

      <Section tone="sand" className="py-20 sm:py-28">
        <Shell>
          <Reveal>
            <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Слова гостей</Eyebrow>
                <Heading className="mt-6 max-w-xl">
                  О мастерах — <em className="text-rose">в отзывах</em>
                </Heading>
              </div>
              <Button href={salon.yandexReviews} variant="outline" arrow>
                Читать все отзывы
              </Button>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {quotes.map((q, i) => (
              <Reveal key={q.author} delay={i * 110}>
                <figure className="flex h-full flex-col rounded-4xl border border-line bg-white p-8 shadow-soft">
                  <span className="font-display text-5xl leading-none text-rose-2">“</span>
                  <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink/80">
                    {q.text}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <Stars />
                    <span className="text-sm font-medium">{q.author}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      <CTABlock />
    </>
  );
}
