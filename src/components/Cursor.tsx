import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname.startsWith("/admin")) return;

    const move = (e: MouseEvent) => {
      if (!dotRef.current) return;

      dotRef.current.style.left = `${e.clientX}px`;
      dotRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [loc.pathname]);

  if (loc.pathname.startsWith("/admin")) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
