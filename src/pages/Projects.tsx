import Reveal from "../components/Reveal";
import { PROJECTS } from "../data/siteData";
import { ArrowUpRight, Check } from "../components/Icons";

export default function Projects() {
  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 40 }}>Selected work</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              Shipped.<br/><span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>Real.</span> Live.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 600, color: "var(--ink-2)" }}>
              These aren't demos or tutorials. Every project on this page runs in production, used by real students on our campus.
            </p>
          </Reveal>
        </div>
      </section>

      {PROJECTS.map((p, i) => (
        <section key={p.id} style={{ padding: "80px 0", background: i % 2 === 0 ? "transparent" : "var(--cream-2)" }}>
          <div className="container">
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, alignItems: "start" }} className="proj-detail">
                <div style={{ position: "sticky", top: 120 }}>
                  <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 24 }}>
                    Project &bull; 0{i+1} / 0{PROJECTS.length}
                  </div>
                  <h2 className="h-display" style={{ fontSize: "clamp(48px, 7vw, 96px)", marginBottom: 24 }}>
                    {p.title}
                  </h2>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 32 }}>
                    <span className="font-mono" style={{ fontSize: 11, padding: "6px 14px", background: "var(--red-mist)", color: "var(--red-deep)", borderRadius: 999, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}><Check width={12} height={12} /> {p.status}</span>
                    <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>&bull; {p.year}</span>
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", marginBottom: 32 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
                    {p.tech.map(t => (
                      <span key={t} className="font-mono" style={{ fontSize: 11, padding: "6px 12px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 999 }}>{t}</span>
                    ))}
                  </div>
                  <a href="#" className="btn btn-ink hoverable" style={{ display: "inline-flex" }}>
                    View case study <ArrowUpRight width={14} height={14} />
                  </a>
                </div>

                <div>
                  <div style={{ aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", marginBottom: 32 }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "grid", gap: 20 }}>
                    <div style={{ padding: 32, background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 20 }}>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 12 }}>The problem</div>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>{p.problem}</p>
                    </div>
                    <div style={{ padding: 32, background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 20 }}>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 12 }}>Our solution</div>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)" }}>{p.solution}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                      <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em" }}>BUILT BY</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{p.team}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <style>{`
        @media (max-width: 900px) {
          .proj-detail { grid-template-columns: 1fr !important; }
          .proj-detail > div:first-child { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </div>
  );
}