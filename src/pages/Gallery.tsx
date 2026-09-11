import { useState } from "react";
import Reveal from "../components/Reveal";
import { GALLERY } from "../data/siteData";
import { Close } from "../components/Icons";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<{src: string; alt: string} | null>(null);
  const cats = ["All", ...Array.from(new Set(GALLERY.map(g => g.cat)))];
  const list = filter === "All" ? GALLERY : GALLERY.filter(g => g.cat === filter);

  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 40 }}>Visual archive</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              Moments,<br/><span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>captured.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "20px 0 40px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className="hoverable"
              style={{
                padding: "10px 20px", borderRadius: 999, fontSize: 12, fontWeight: 500,
                fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase",
                background: filter === c ? "var(--ink)" : "transparent",
                color: filter === c ? "var(--cream)" : "var(--ink-2)",
                border: `1px solid ${filter === c ? "var(--ink)" : "var(--line)"}`,
                transition: "all 0.3s",
              }}>{c}</button>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 0 120px" }}>
        <div className="container">
          <div style={{ columnCount: 3, columnGap: 20 }} className="masonry">
            {list.map((g, i) => (
              <Reveal key={g.src} delay={i * 40}>
                <button onClick={() => setLightbox(g)} className="hoverable"
                  style={{ display: "block", width: "100%", marginBottom: 20, borderRadius: 16, overflow: "hidden", breakInside: "avoid", position: "relative", background: "var(--cream-3)" }}>
                  <img src={g.src} alt={g.alt} loading="lazy" style={{ width: "100%", display: "block", transition: "transform 0.6s" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px 16px", background: "linear-gradient(to top, rgba(26,22,19,0.7), transparent)", color: "var(--cream)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", opacity: 0, transition: "opacity 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "0"}
                  >
                    <span style={{ fontSize: 13, fontFamily: "Fraunces, serif" }}>{g.alt}</span>
                    <span className="font-mono" style={{ fontSize: 10, opacity: 0.7 }}>{g.cat}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(26,22,19,0.94)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, cursor: "none", animation: "fadeIn 0.3s" }}>
          <img src={lightbox.src} alt={lightbox.alt} style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 16, objectFit: "contain" }} />
          <button onClick={() => setLightbox(null)} className="hoverable" style={{ position: "absolute", top: 30, right: 30, width: 48, height: 48, borderRadius: 999, background: "var(--cream)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Close width={20} height={20} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .masonry { column-count: 2 !important; } }
        @media (max-width: 560px) { .masonry { column-count: 1 !important; } }
      `}</style>
    </div>
  );
}