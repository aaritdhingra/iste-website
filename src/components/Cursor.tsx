import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on admin route
    const isAdmin = loc.pathname.startsWith("/admin");
    setEnabled(!isAdmin);
    document.body.style.cursor = isAdmin ? "auto" : "none";
    return () => { document.body.style.cursor = "auto"; };
  }, [loc.pathname]);

  useEffect(() => {
    if (!enabled) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, .hoverable, input, textarea, select")) ringRef.current?.classList.add("hover");
      else ringRef.current?.classList.remove("hover");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}