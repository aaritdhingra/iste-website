import Reveal from "../components/Reveal";
import { useContent } from "../store/ContentStore";
import { EditableText } from "../components/Editable";
import { Calendar, Clock, Pin, ArrowRight } from "../components/Icons";

export default function Events() {
  const { content } = useContent();

  return (
    <div style={{ paddingTop: 160 }}>
      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ background: "var(--ink)", color: "var(--cream)", borderRadius: 28, padding: "80px 48px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -50, right: -50, width: 300, height: 300, borderRadius: "50%", background: "rgba(232,117,107,0.15)", filter: "blur(40px)" }} />
              <div style={{ position: "relative" }}>
                <div className="eyebrow" style={{ color: "var(--red-soft)", marginBottom: 24 }}>Professional Excellence</div>
                <h1 className="h-display" style={{ fontSize: "clamp(48px, 9vw, 120px)", marginBottom: 24 }}>Upcoming<br/><span style={{ color: "var(--red-soft)" }}>Chapter Events</span></h1>
                <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 600, lineHeight: 1.6 }}>Discover industry-aligned workshops, hackathons, and technical seminars structured to connect academic learning with professional applications.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "60px 0 100px" }}>
        <div className="container">
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--red-soft)", transform: "translateX(-50%)" }} className="timeline-line" />

            {content.upcomingEvents.map((ev, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={ev.id} delay={i * 100}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 80, position: "relative" }} className="timeline-row">
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 16, height: 16, borderRadius: 999, background: "var(--red)", border: "3px solid var(--cream)", zIndex: 2 }} />
                    <div style={{ order: left ? 0 : 1 }}>
                      <div className="card hoverable" style={{ padding: 36, border: "1.5px solid var(--red-soft)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "var(--red-mist)", color: "var(--red-deep)", borderRadius: 999, fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
                          <Clock width={12} height={12} /> <EditableText path={`upcomingEvents.${i}.time`} value={ev.time} />
                        </div>
                        <EditableText path={`upcomingEvents.${i}.title`} value={ev.title} as="h3" className="font-serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 12 }} />
                        <EditableText path={`upcomingEvents.${i}.desc`} value={ev.desc} as="p" multiline style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 20 }} />
                        <div style={{ fontSize: 13, marginBottom: 24 }}>
                          <span style={{ color: "var(--ink-3)" }}>Registration: </span>
                          <span style={{ color: ev.status === "Open" ? "var(--red-deep)" : "var(--ink-4)", fontWeight: 700 }}>{ev.status}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                          {[
                            { n: "01", l: "Participants", key: "participants" as const },
                            { n: "02", l: "Prize Pool", key: "prize" as const },
                            { n: "03", l: "Fees", key: "fee" as const },
                            { n: "04", l: "Location", key: "location" as const },
                          ].map((x) => (
                            <div key={x.n} style={{ padding: 14, background: "var(--red-mist)", borderRadius: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 10, padding: "2px 6px", background: "var(--red)", color: "var(--cream)", borderRadius: 4, fontFamily: "JetBrains Mono", fontWeight: 700 }}>{x.n}</span>
                                <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--ink-3)", textTransform: "uppercase", fontWeight: 600 }}>{x.l}</span>
                              </div>
                              <EditableText path={`upcomingEvents.${i}.${x.key}`} value={(ev as any)[x.key]} style={{ fontSize: 13, fontWeight: 600 }} />
                            </div>
                          ))}
                        </div>
                        <button className="hoverable" disabled={ev.status === "Closed"} style={{ width: "100%", padding: 16, borderRadius: 999, background: ev.status === "Open" ? "var(--red)" : "var(--red-soft)", color: "var(--cream)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: ev.status === "Closed" ? 0.7 : 1 }}>
                          {ev.status === "Open" ? "Apply Now" : "Registration Closed"}
                          {ev.status === "Open" && <ArrowRight width={14} height={14} />}
                        </button>
                      </div>
                    </div>

                    <div style={{ order: left ? 1 : 0 }}>
                      <div className="card hoverable" style={{ aspectRatio: "4/5", border: "1.5px solid var(--red-soft)", background: ev.poster ? "var(--cream)" : "linear-gradient(135deg, #1a1613 0%, #3d342d 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflow: "hidden" }}>
                        {ev.poster ? (
                          <img src={ev.poster} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
                        ) : (
                          <div style={{ textAlign: "center", color: "var(--cream)" }}>
                            <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.2em", opacity: 0.8, marginBottom: 20, textTransform: "uppercase" }}>ISTE CUSC Presents</div>
                            <div className="font-serif" style={{ fontSize: 42, fontWeight: 500, lineHeight: 1.1, marginBottom: 24 }}>{ev.title}</div>
                            <div style={{ padding: "12px 24px", background: "rgba(250,246,239,0.1)", borderRadius: 12, border: "1px solid rgba(250,246,239,0.2)", display: "inline-block" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13 }}><Calendar width={14} height={14} /> {ev.date}</div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}><Pin width={14} height={14} /> {ev.location}</div>
                            </div>
                            <div style={{ marginTop: 20, fontSize: 10, opacity: 0.6, fontFamily: "JetBrains Mono, monospace" }}>Upload poster from /admin</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .timeline-row { grid-template-columns: 1fr !important; gap: 20px !important; }
          .timeline-row > div:nth-child(2) { order: 1 !important; }
          .timeline-row > div:nth-child(3) { order: 2 !important; }
          .timeline-line { display: none !important; }
        }
      `}</style>
    </div>
  );
}