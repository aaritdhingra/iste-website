import Reveal from "../components/Reveal";
import { ACHIEVEMENTS } from "../data/siteData";
import { Award } from "../components/Icons";

export default function Achievements() {
  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 40 }}>Track record</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              Milestones,<br/><span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>marked.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 600, color: "var(--ink-2)" }}>
              Awards, recognitions and moments that mattered. A running log of what our members and this chapter have accomplished.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          {ACHIEVEMENTS.map((y, i) => (
            <Reveal key={y.year} delay={i * 80}>
              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 60, padding: "60px 0", borderTop: "1px solid var(--line)" }} className="ach-row">
                <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
                  <div className="h-display" style={{ fontSize: 100, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--red-deep)" }}>{y.year}</div>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 8 }}>
                    {String(y.items.length).padStart(2,"0")} EVENTS
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {y.items.map((it, j) => (
                    <div key={j} className="hoverable" style={{ padding: 32, background: "var(--cream-2)", borderRadius: 20, transition: "all 0.4s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red-mist)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--cream-2)"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                        <Award width={20} height={20} style={{ color: "var(--red-deep)" }} />
                        <h3 className="font-serif" style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.01em" }}>{it.title}</h3>
                      </div>
                      <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, paddingLeft: 36 }}>{it.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .ach-row { grid-template-columns: 1fr !important; gap: 30px !important; }
          .ach-row > div:first-child { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </div>
  );
}