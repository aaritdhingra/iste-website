import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();

  useEffect(() => {
    const isAdmin = loc.pathname.startsWith("/iste-ops-x7k9m2");
    if (isAdmin) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "auto";
    };
  }, [loc.pathname]);

  if (loc.pathname.startsWith("/iste-ops-x7k9m2")) return null;

  return <div ref={dotRef} className="cursor" />;
}
