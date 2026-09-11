import Reveal from "../components/Reveal";
import { TEAM } from "../data/siteData";
import { LinkedIn, ArrowUpRight } from "../components/Icons";

export default function Team() {
  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 40 }}>People</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              The <span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>humans</span><br/>behind it all.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 600, color: "var(--ink-2)" }}>
              Engineers, designers, organizers and mentors. Different disciplines. Same conviction: build things that matter.
            </p>
          </Reveal>
        </div>
      </section>

      {TEAM.map((group) => (
        <section key={group.cat} style={{ padding: "60px 0" }}>
          <div className="container">
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid var(--ink)" }}>
                <h2 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em" }}>{group.cat}</h2>
                <div className="font-mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em" }}>{String(group.people.length).padStart(2,"0")} MEMBERS</div>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="team-grid">
              {group.people.map((m, i) => (
                <Reveal key={m.name} delay={i * 60}>
                  <div className="hoverable" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ aspectRatio: "4/5", overflow: "hidden", borderRadius: 20, background: "var(--cream-3)", position: "relative" }}>
                      <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.1)", transition: "all 0.6s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "grayscale(0)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "grayscale(0.1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      />
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                        <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em" }}>{m.name}</h3>
                        <a href="#" style={{ width: 32, height: 32, borderRadius: 999, background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)", transition: "all 0.3s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red)"; (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--cream-2)"; (e.currentTarget as HTMLElement).style.color = "var(--ink-3)"; }}
                        ><LinkedIn width={14} height={14} /></a>
                      </div>
                      <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{m.role}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 12 }}>{m.dept}</div>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>{m.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: "100px 0", textAlign: "center", background: "var(--cream-2)", marginTop: 60 }}>
        <div className="container">
          <Reveal>
            <h3 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 24 }}>Want to be on this page?</h3>
            <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: 480, margin: "0 auto 32px" }}>Recruitment opens every academic year across all six domains.</p>
            <a href="/contact" className="btn btn-ink hoverable">Apply now <ArrowUpRight width={16} height={16} /></a>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
