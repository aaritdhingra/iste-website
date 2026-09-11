import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/**
 * Reveal — bulletproof scroll animation.
 * - Uses IntersectionObserver when available
 * - Fallback: shows immediately after mount (never stays invisible)
 * - Respects prefers-reduced-motion
 */
export default function Reveal({
  children,
  delay = 0,
  style,
  as: Tag = "div" as any,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion → instantly visible
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) { setSeen(true); return; }

    // No IntersectionObserver support → fallback visible
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    // If already in viewport at mount (top of page)
    const rect = el.getBoundingClientRect();
    const inViewNow = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    if (inViewNow) {
      // Delay for a beat so CSS transition triggers
      const t = setTimeout(() => setSeen(true), 30);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);

    // Safety fallback — after 2s just show it no matter what
    const safety = setTimeout(() => setSeen(true), 2000);

    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);

  return (
    <Tag
      ref={ref as any}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/** Word-by-word text reveal, safe for mobile */
export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) { setSeen(true); return; }

    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      const t = setTimeout(() => setSeen(true), 30);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);

    const safety = setTimeout(() => setSeen(true), 2000);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);

  const words = text.split(/(\s+)/);

  return (
    <span ref={ref} style={{ display: "inline" }}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.15em",
              marginBottom: "-0.15em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: seen ? "translateY(0)" : "translateY(110%)",
                opacity: seen ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + i * 40}ms, opacity 0.8s ease ${delay + i * 40}ms`,
                willChange: "transform, opacity",
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Parallax({ children, speed = 0.3 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${centerOffset * -speed}px, 0)`;
      });
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref}>{children}</div>;
}

export function TiltCard({ children, max = 8 }: { children: ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-4px)`;
  };
  const onLeave = () => { const el = ref.current; if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}>{children}</div>;
}

export function Magnetic({ children, strength = 0.4 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { const el = ref.current; if (el) el.style.transform = "translate(0,0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-block", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>;
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      ref.current.style.transform = `scaleX(${scrolled})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--red)", zIndex: 9999, transformOrigin: "left", transform: "scaleX(0)", transition: "transform 0.15s ease-out" }} />;
}