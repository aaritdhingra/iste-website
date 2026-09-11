import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useContent } from "../store/ContentStore";
import { Users, LinkedIn } from "../components/Icons";

export default function Members() {
  const { content } = useContent();
  const categories = ["All", ...Array.from(new Set(content.members.map(m => m.category)))];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? content.members : content.members.filter(m => m.category === filter);

  return (
    <div style={{ paddingTop: 180 }}>
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 32 }}>The People</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              Meet the <span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>humans</span><br/>behind ISTE<span style={{ color: "var(--red)" }}>.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 60 }} className="members-intro">
              <p style={{ fontSize: 20, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 560 }}>
                Engineers, designers, organizers and mentors — different disciplines united by one conviction: build things that matter.
              </p>
              <div style={{ display: "flex", gap: 30, alignItems: "center", justifyContent: "flex-end" }}>
                <div>
                  <div className="font-serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, color: "var(--red-deep)" }}>{content.members.length}</div>
                  <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 6, fontWeight: 700 }}>Team Members</div>
                </div>
                <div style={{ width: 1, height: 60, background: "var(--line)" }} />
                <div>
                  <div className="font-serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, color: "var(--red-deep)" }}>{categories.length - 1}</div>
                  <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 6, fontWeight: 700 }}>Wings</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: "20px 0 40px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", position: "sticky", top: 142, background: "rgba(250,246,239,0.95)", backdropFilter: "blur(20px)", zIndex: 20 }}>
        <div className="container" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="hoverable"
                style={{
                  padding: "10px 20px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                  fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em", textTransform: "uppercase",
                  background: filter === c ? "var(--ink)" : "transparent",
                  color: filter === c ? "var(--cream)" : "var(--ink-2)",
                  border: `1px solid ${filter === c ? "var(--ink)" : "var(--line)"}`, transition: "all 0.3s",
                }}>
                {c} · {c === "All" ? content.members.length : content.members.filter(m => m.category === c).length}
              </button>
            ))}
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.15em", fontWeight: 700 }}>
            SHOWING {filtered.length} OF {content.members.length}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="members-grid">
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div className="member-card hoverable">
                  <div className="member-photo">
                    {m.image ? (
                      <img src={m.image} alt={m.name} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--cream-3), var(--red-mist))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="font-serif" style={{ fontSize: 80, fontWeight: 500, color: "var(--red-deep)", opacity: 0.4 }}>{m.name.charAt(0)}</div>
                      </div>
                    )}
                    <div className="member-overlay">
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.85, marginBottom: 8, fontWeight: 700 }}>{m.category}</div>
                      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{m.bio}</p>
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noreferrer" className="hoverable" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "var(--cream)", color: "var(--ink)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", alignSelf: "flex-start" }}>
                          <LinkedIn width={14} height={14} /> Connect
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="member-info">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                      <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{m.name}</h3>
                      <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-4)", fontWeight: 700 }}>0{i + 1}</div>
                    </div>
                    <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{m.role}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{m.dept}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 80, color: "var(--ink-3)" }}>
              <p style={{ fontSize: 15 }}>No members in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 0", background: "var(--ink)", color: "var(--cream)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -50, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(232,117,107,0.2)", filter: "blur(80px)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 32, justifyContent: "center", display: "inline-flex", color: "var(--red-soft)" }}>Want in?</div>
            <h2 className="h-display" style={{ fontSize: "clamp(48px, 8vw, 100px)", marginBottom: 32 }}>
              Your name could be <span style={{ fontStyle: "italic", color: "var(--red-soft)" }}>next.</span>
            </h2>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
              Recruitment opens every academic year across all our wings.
            </p>
            <Link to="/recruitment" className="btn btn-red hoverable" style={{ padding: "20px 40px", fontSize: 15 }}>
              Apply for Membership <Users width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) {
          .members-intro { grid-template-columns: 1fr !important; }
          .members-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .members-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}