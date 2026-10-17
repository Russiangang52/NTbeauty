import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { salon } from "../data/salon";
import { navigate } from "../lib/router";

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Link that plays nice with the hash router                          */
/* ------------------------------------------------------------------ */

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  external?: string;
};

export function Link({ to, external, children, ...rest }: LinkProps) {
  if (external) {
    return (
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={`#${to ?? "/"}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(to ?? "/");
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50";

const variants = {
  primary:
    "bg-ink text-white hover:bg-ink-2 hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(23,17,16,0.6)]",
  gold: "bg-gradient-to-r from-[#c09b6c] to-[#a8825a] text-white hover:-translate-y-0.5 shadow-[0_12px_34px_-14px_rgba(168,130,90,0.85)]",
  outline:
    "border border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-ink/35 hover:bg-white",
  ghost: "text-ink/70 hover:text-ink",
  light:
    "bg-white/12 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md hover:bg-white/20",
} as const;

const sizes = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-6",
  lg: "h-14 px-8 text-base",
} as const;

export type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  arrow?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  to,
  onClick,
  arrow,
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {arrow && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  if (to)
    return (
      <a
        href={`#${to}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(to);
        }}
        className={cls}
      >
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Главная кнопка сайта — онлайн-запись из карточки Яндекс Карт */
export function BookButton({
  size = "md",
  label = "Записаться онлайн",
  variant = "primary",
  className,
}: {
  size?: keyof typeof sizes;
  label?: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Button href={salon.booking} size={size} variant={variant} arrow className={className}>
      {label}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Yandex-flavoured rating pill                                       */
/* ------------------------------------------------------------------ */

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-[#ffc22e]", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2.4l2.9 6.05 6.6.86-4.84 4.55 1.2 6.54L12 17.3l-5.86 3.1 1.2-6.54L2.5 9.31l6.6-.86z"
          />
        </svg>
      ))}
    </span>
  );
}

export function RatingPill({ className }: { className?: string }) {
  return (
    <a
      href={salon.yandexReviews}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1.5 pl-2 pr-4 backdrop-blur transition-all hover:border-rose-2/60 hover:shadow-soft",
        className,
      )}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffdb4d] text-[0.8125rem] font-bold text-ink">
        5,0
      </span>
      <span className="flex items-center gap-2">
        <Stars />
        <span className="text-[0.8125rem] font-medium text-mute">
          {salon.rating.reviews} отзывов · Яндекс
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */

export function Section({
  children,
  className,
  id,
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "plain" | "sand" | "ink" | "cream";
}) {
  const tones = {
    plain: "bg-porcelain",
    sand: "bg-sand",
    cream: "bg-cream",
    ink: "bg-ink text-white",
  };
  return (
    <section id={id} className={cn("relative", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-3 text-rose", className)}>
      <span className="h-px w-8 bg-current opacity-50" />
      {children}
    </div>
  );
}

export function Heading({
  children,
  className,
  as: As = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "text-balance text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.25rem]",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function GoodPlaceBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#ffdb4d] px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-wide text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2l2.35 1.85 2.9-.3 1 2.78 2.5 1.5-.85 2.82.85 2.82-2.5 1.5-1 2.78-2.9-.3L12 20l-2.35-1.85-2.9.3-1-2.78L3.25 14l.85-2.82-.85-2.82 2.5-1.5 1-2.78 2.9.3z"
        />
        <path
          fill="#fff"
          fillOpacity=".9"
          d="M10.7 15.3l-2.6-2.6 1.1-1.1 1.5 1.5 4-4 1.1 1.1z"
        />
      </svg>
      Рейтинг 5,0 · Яндекс Карты
    </span>
  );
}

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[0.8125rem] text-ink/80",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page header (for inner pages)                                      */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-ink pt-32 pb-16 text-white sm:pt-40 sm:pb-24">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
      <div className="grain absolute inset-0" />
      <Shell className="relative">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow className="text-rose-3">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance text-[2.4rem] leading-[1.05] sm:text-[3.4rem] lg:text-[4.25rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
              {lead}
            </p>
          )}
          {children && <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
      </Shell>
    </header>
  );
}
