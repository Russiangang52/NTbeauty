import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * Монтируем приложение. Устойчиво к двум ситуациям:
 *  1) скрипт выполнился до появления #root в DOM;
 *  2) любая ошибка внутри приложения — её перехватит ErrorBoundary
 *     и покажет кнопку записи вместо белого экрана.
 */
function mount() {
  const container = document.getElementById("root");

  if (!container) {
    // #root ещё не распарсен — ждём готовности документа и пробуем снова
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mount, { once: true });
    } else {
      console.error("NT Beauty: не найден контейнер #root");
    }
    return;
  }

  // Снимаем заставку и сообщаем диагностике в index.html, что старт успешен
  document.getElementById("boot")?.remove();
  (window as unknown as { __ntBeautyBooted?: boolean }).__ntBeautyBooted = true;

  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}

mount();
