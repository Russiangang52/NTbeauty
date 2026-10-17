import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Страховка от «белого экрана»: если в приложении возникнет ошибка,
 * пользователь увидит понятное сообщение и кнопку записи, а не пустую страницу.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("NT Beauty — ошибка приложения:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "32px 24px",
          background: "#171110",
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44 }}>
          NT Beauty
        </div>
        <p style={{ maxWidth: 460, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>
          Что-то пошло не так при загрузке страницы. Попробуйте обновить —
          или запишитесь напрямую.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="https://yandex.ru/maps/org/nt_byuti/38042135240/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=38042135240&ll=37.923781%2C55.701719&source=serp_navig&z=16.74"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              background: "linear-gradient(90deg,#c09b6c,#a8825a)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Записаться онлайн →
          </a>
          <a
            href="tel:+79998146444"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              color: "#fff",
              textDecoration: "none",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,.25)",
            }}
          >
            +7 (999) 814-64-44
          </a>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              height: 52,
              padding: "0 28px",
              borderRadius: 999,
              border: 0,
              background: "rgba(255,255,255,.1)",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Обновить страницу
          </button>
        </div>
        <pre
          style={{
            marginTop: 12,
            maxWidth: 620,
            overflow: "auto",
            fontSize: 12,
            color: "rgba(255,255,255,.35)",
            textAlign: "left",
          }}
        >
          {String(this.state.error)}
        </pre>
      </div>
    );
  }
}
