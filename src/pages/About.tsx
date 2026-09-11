import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import { useContent } from "../store/ContentStore";
import { EditableText, EditableImage } from "../components/Editable";

export default function About() {
  const [i, setI] = useState(0);
  const { content } = useContent();
  const slides = content.aboutImages;
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % slides.length), 5000); return () => clearInterval(t); }, [slides.length]);

  return (
    <div style={{ paddingTop: 180 }}>
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 32 }}>About the Chapter</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 60 }}>
              Where <span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>curiosity</span><br/>meets craft<span style={{ color: "var(--red)" }}>.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 32, overflow: "hidden", background: "var(--cream-3)" }}>
              {slides.map((s, idx) => (
                <div key={idx} style={{ position: "absolute", inset: 0, opacity: idx === i ? 1 : 0, transition: "opacity 1.2s", zIndex: idx === i ? 2 : 1 }}>
                  <EditableImage path={`aboutImages.${idx}`} src={s} alt={`Slide ${idx}`} style={{ width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,22,19,0.7), rgba(26,22,19,0.1) 50%, transparent)", pointerEvents: "none" }} />
                </div>
              ))}
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 40, color: "var(--cream)", zIndex: 10, pointerEvents: "none" }}>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.85, marginBottom: 12, fontWeight: 700 }}>Innovation · Excellence · Community</div>
                <h2 className="h-display" style={{ fontSize: "clamp(32px, 5vw, 68px)" }}>Building tomorrow, today.</h2>
              </div>
              <div style={{ position: "absolute", bottom: 30, right: 30, display: "flex", gap: 8, zIndex: 11 }}>
                {slides.map((_, idx) => (
                  <button key={idx} onClick={() => setI(idx)} className="hoverable" style={{ width: idx === i ? 32 : 8, height: 8, borderRadius: 999, background: idx === i ? "var(--red)" : "rgba(250,246,239,0.6)", transition: "all 0.3s", border: "none" }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: 60, background: "var(--cream)", borderRadius: 32, border: "1px solid var(--line)", borderTop: "4px solid var(--red)" }}>
              <h2 className="font-serif" style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 32 }}>Chapter Overview</h2>
              <EditableText path="site.overview" value={content.site.overview} as="p" multiline style={{ fontSize: 18, lineHeight: 1.85, color: "var(--ink-2)", marginBottom: 24 }} />
              <EditableText path="site.overview2" value={content.site.overview2} as="p" multiline style={{ fontSize: 18, lineHeight: 1.85, color: "var(--ink-2)" }} />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}