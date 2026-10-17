import { useCallback, useEffect, useState } from "react";

const read = () => {
  const h = window.location.hash.replace(/^#/, "").split("?")[0];
  return h.startsWith("/") ? h : "/";
};

export function useRoute() {
  const [route, setRoute] = useState<string>(read);

  useEffect(() => {
    const onHash = () => {
      setRoute(read());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

export function navigate(path: string) {
  if (read() === path) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = path;
}

export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
