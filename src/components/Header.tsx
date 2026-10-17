import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { nav, salon } from "../data/salon";
import { useRoute } from "../lib/router";
import { BookButton, Button, Link } from "./ui";

export default function Header() {
  const route = useRoute();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = solid;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-line/80 bg-porcelain/90 py-2.5 backdrop-blur-xl"
            : "py-4 sm:py-6",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${salon.name} — на главную`}
          >
            <span
              className={cn(
                "grid h-11 w-11 place-items-center overflow-hidden rounded-2xl transition-all duration-500",
                dark
                  ? "bg-ink text-white ring-1 ring-ink/10"
                  : "bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur",
              )}
            >
              <img
                src={salon.logo}
                alt={salon.name}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="leading-tight">
              <span
                className={cn(
                  "block font-display text-[1.35rem] tracking-tight transition-colors duration-500",
                  dark ? "text-ink" : "text-white",
                )}
              >
                {salon.name}
              </span>
              <span
                className={cn(
                  "block text-[0.6875rem] tracking-[0.2em] uppercase transition-colors duration-500",
                  dark ? "text-mute" : "text-white/60",
                )}
              >
                салон красоты · Некрасовка
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden items-center gap-1 xl:flex">
            {nav.map((n) => {
              const active = route === n.path;
              return (
                <Link
                  key={n.path}
                  to={n.path}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.875rem] font-medium transition-all duration-300",
                    dark
                      ? active
                        ? "bg-ink text-white"
                        : "text-ink/65 hover:bg-ink/6 hover:text-ink"
                      : active
                        ? "bg-white text-ink"
                        : "text-white/75 hover:bg-white/15 hover:text-white",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 xl:ml-0">
            <a
              href={`tel:${salon.phone.raw}`}
              className={cn(
                "hidden rounded-full px-4 py-2 text-[0.875rem] font-medium tracking-tight transition-colors lg:block",
                dark ? "text-ink hover:text-rose" : "text-white hover:text-white",
              )}
            >
              {salon.phone.display}
            </a>
            <BookButton size="sm" className="hidden sm:inline-flex" label="Записаться" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Меню"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-2xl transition-colors xl:hidden",
                dark ? "bg-ink/6 text-ink" : "bg-white/15 text-white ring-1 ring-inset ring-white/25",
              )}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 flex h-full w-[min(88vw,25rem)] flex-col bg-porcelain shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <span className="font-display text-xl">Меню</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink/6 text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {nav.map((n, i) => (
              <Link
                key={n.path}
                to={n.path}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[1.375rem] transition-colors",
                  route === n.path ? "bg-ink text-white" : "text-ink hover:bg-sand-2/60",
                )}
              >
                <span>{n.label}</span>
                <span className="text-xs tabular-nums opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-line px-6 py-6">
            <BookButton size="lg" className="w-full" label="Записаться онлайн" />
            <Button href={`tel:${salon.phone.raw}`} variant="outline" size="lg" className="w-full">
              {salon.phone.display}
            </Button>
            <p className="pt-1 text-center text-xs text-mute">
              {salon.address.short} · {salon.hours.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
