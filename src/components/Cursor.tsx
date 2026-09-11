import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isAdmin = loc.pathname.startsWith("/admin");
    setEnabled(!isAdmin);
    document.body.style.cursor = isAdmin ? "auto" : "none";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [loc.pathname]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement;

      if (
        target.closest(
          "a, button, .hoverable, input, textarea, select, .magic-text, .pro-hover"
        )
      ) {
        cursorRef.current?.classList.add("is-hover");
      } else {
        cursorRef.current?.classList.remove("is-hover");
      }
    };

    const down = () => {
      cursorRef.current?.classList.add("is-click");
    };

    const up = () => {
      cursorRef.current?.classList.remove("is-click");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="pro-cursor" aria-hidden="true">
      <span className="cursor-corner tl" />
      <span className="cursor-corner tr" />
      <span className="cursor-corner bl" />
      <span className="cursor-corner br" />
      <span className="cursor-center" />
    </div>
  );
}
