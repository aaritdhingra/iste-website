import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowUpRight, ArrowDown, Spark, Users, Calendar } from "../components/Icons";
import Reveal, { Magnetic, TiltCard, TextReveal } from "../components/Reveal";
import { useContent } from "../store/ContentStore";
import { EditableText, EditableImage } from "../components/Editable";

function StatBlock({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="hoverable" style={{ padding: "32px 0", borderTop: "1px solid var(--line)" }}>
      <div className="font-serif" style={{ fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12, color: "var(--ink)" }}>
        {n.toLocaleString()}{suffix}
      </div>
      <div className="font-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)" }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const { content } = useContent();

  const featured = useMemo(() => {
    const open = content.upcomingEvents.find((e) => e.status === "Open");
    return open || content.upcomingEvents[0] || null;
  }, [content.upcomingEvents]);

  return (
    <div style={{ paddingTop: 150 }}>
      {/* HERO SECTION */}
      <section style={{ padding: "48px 0 72px", position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "1.15fr 0.95fr", gap: 48, alignItems: "center" }}
            className="hero-grid"
          >
            {/* LEFT */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <Reveal>
                <div className="eyebrow" style={{ marginBottom: 28 }}>Innovation starts here</div>
              </Reveal>

              <h1
                className="h-display"
                style={{
                  fontSize: "clamp(42px, 5.8vw, 78px)",
                  marginBottom: 28,
                  lineHeight: 1.08,
                  maxWidth: 640,
                }}
              >
                <TextReveal text="Build, lead, and innovate" delay={80} />
                <br className="hide-mobile" />
                <TextReveal text=" with the " delay={200} />
                <span className="magic-text" style={{ fontStyle: "italic", color: "var(--red-deep)" }}>
                  ISTE Student Chapter
                </span>
                <span style={{ color: "var(--red)" }}>.</span>
              </h1>

              <Reveal delay={320}>
                <EditableText
                  path="site.intro"
                  value={content.site.intro}
                  as="p"
                  multiline
                  style={{
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: "var(--ink-2)",
                    maxWidth: 540,
                    marginBottom: 36,
                    fontWeight: 400,
                  }}
                />
              </Reveal>

              <Reveal delay={420}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 28 }}>
                  <Magnetic strength={0.2}>
                    <Link to="/events" className="btn btn-red hoverable" style={{ fontSize: 14, padding: "16px 28px" }}>
                      <Spark width={16} height={16} /> Explore Events
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link to="/members" className="btn btn-outline hoverable" style={{ fontSize: 14, padding: "16px 28px" }}>
                      <Users width={16} height={16} /> Meet the Team
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div
                  className="hoverable"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 18px",
                    background: "var(--cream-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                  }}
                >
                  <img
                    src={content.logo}
                    alt=""
                    style={{ width: 40, height: 40, borderRadius: 999, objectFit: "cover", border: "2px solid var(--ink)" }}
                  />
                  <div>
                    <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase", fontWeight: 700 }}>
                      Student Community
                    </div>
                    <EditableText
                      path="site.community"
                      value={content.site.community}
                      as="div"
                      style={{ fontSize: 22, fontWeight: 500, fontFamily: "Fraunces, serif", lineHeight: 1.1 }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — LAYERED BENTO (Spinning Ring PEECHe) */}
            <Reveal delay={280}>
              <div 
                className="hero-right-container" 
                style={{ 
                  position: "relative", 
                  width: "100%", 
                  maxWidth: 580, 
                  margin: "0 auto",
                  aspectRatio: "1 / 1.1",
                }}
              >
                {/* 0. Soft background glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "35%",
                    width: 280,
                    height: 280,
                    transform: "translate(-50%, -50%)",
                    background: "rgba(232,117,107,0.20)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* 1. Spinning Circle Text - TUCKED BEHIND IMAGE (zIndex: 1) */}
                <div
                  style={{
                    position: "absolute",
                    top: "0%",
                    left: "2%",
                    width: "38%",
                    minWidth: 120,
                    aspectRatio: "1/1",
                    zIndex: 1, // ← PEECHE GAYA
                    animation: "spin 20s linear infinite",
                    pointerEvents: "none",
                  }}
                >
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    <defs>
                      <path id="ring" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                    </defs>
                    <text
                      fontSize="9.5"
                      fontWeight="800"
                      letterSpacing="3"
                      fill="var(--red-deep)"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      <textPath href="#ring" startOffset="0%">
                        ISTE · CUSC · ISTE · CUSC ·
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* 2. Main Photo - AAGE AAYA (zIndex: 2) */}
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    right: 0,
                    width: "82%",
                    aspectRatio: "4/5",
                    borderRadius: 28,
                    overflow: "hidden",
                    border: "3px solid var(--cream)",
                    boxShadow: "0 28px 56px -20px rgba(0,0,0,0.25)",
                    zIndex: 2, // ← AAGE AAYA
                  }}
                >
                  <EditableImage
                    path="achievementImage"
                    src={content.achievementImage}
                    alt="ISTE"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    title="Hero Image"
                    aspect="4 / 5"
                  />
                </div>

                {/* 3. Floating Event Card - Z-INDEX 4 (ON TOP OF EVERYTHING) */}
                {featured && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "84%", zIndex: 4 }}>
                    <TiltCard max={5}>
                      <Link
                        to="/events"
                        className="hoverable"
                        style={{
                          display: "block",
                          background: "rgba(250,246,239,0.92)",
                          backdropFilter: "blur(18px)",
                          border: "1.5px solid rgba(26,22,19,0.08)",
                          borderRadius: 24,
                          padding: "22px 24px",
                          boxShadow: "0 24px 48px -16px rgba(26,22,19,0.18)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                          <div
                            className="font-mono"
                            style={{
                              fontSize: 10,
                              background: featured.status === "Open" ? "var(--red)" : "var(--ink-3)",
                              color: "var(--cream)",
                              padding: "5px 12px",
                              borderRadius: 999,
                              fontWeight: 800,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                            }}
                          >
                            {featured.status === "Open" ? "Upcoming" : featured.status}
                          </div>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              background: "var(--ink)",
                              color: "var(--cream)",
                              borderRadius: 999,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowUpRight width={15} height={15} />
                          </div>
                        </div>
                        <h3
                          className="font-serif magic-text"
                          style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.15 }}
                        >
                          {featured.title}
                        </h3>
                        <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 700, letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6 }}>
                          <Calendar width={12} height={12} /> {featured.date}
                        </div>
                      </Link>
                    </TiltCard>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={600}>
            <div
              style={{
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--red)" }} />
                Official portal · {content.site.university}
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                Scroll <ArrowDown width={13} height={13} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marquee */}
      <section style={{ padding: "28px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "var(--red-mist)", display: "flex" }}>
        <div className="marquee-wrapper">
          {Array(4)
            .fill(["Innovation", "Technology", "Excellence", "Community", "Leadership"])
            .flat()
            .map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", paddingRight: 56 }}>
                <span className="font-serif magic-text" style={{ fontSize: 42, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                  {w}
                </span>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--red)", marginLeft: 56 }} />
              </div>
            ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "88px 0", background: "var(--cream-2)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="stats-grid">
            <Reveal delay={0}><StatBlock target={700} suffix="+" label="Active Members" /></Reveal>
            <Reveal delay={80}><StatBlock target={50} suffix="+" label="Events Conducted" /></Reveal>
            <Reveal delay={160}><StatBlock target={25} suffix="+" label="Workshops Delivered" /></Reveal>
            <Reveal delay={240}><StatBlock target={2} suffix="+" label="Years of Excellence" /></Reveal>
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section style={{ padding: "120px 0", background: "var(--cream)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 24 }}>Chapter Overview</div>
            <h2 className="h-display" style={{ fontSize: "clamp(40px, 6vw, 88px)", marginBottom: 64, maxWidth: 1000, lineHeight: 1.08 }}>
              A community built to{" "}
              <span className="magic-text" style={{ fontStyle: "italic", color: "var(--red-deep)" }}>
                inspire
              </span>{" "}
              and redefine engineering.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.4fr", gap: 64, alignItems: "start" }} className="overview-split">
            <Reveal>
              <div style={{ position: "sticky", top: 180 }}>
                <div
                  style={{
                    padding: 32,
                    background: "var(--cream-2)",
                    borderLeft: "5px solid var(--red)",
                    borderRadius: "0 24px 24px 0",
                    boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, fontWeight: 800 }}>
                    Our Mission
                  </div>
                  <p className="font-serif magic-text" style={{ fontSize: 26, lineHeight: 1.35, fontWeight: 500, color: "var(--ink)", fontStyle: "italic" }}>
                    "To transform passionate minds into future leaders of the tech world."
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                <div>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, fontWeight: 800 }}>
                    01 · Who We Are
                  </div>
                  <EditableText
                    path="site.overview"
                    value={content.site.overview}
                    as="p"
                    multiline
                    style={{ fontSize: 18, lineHeight: 1.75, color: "var(--ink-2)" }}
                  />
                </div>
                <div style={{ height: 1, background: "var(--line)" }} />
                <div>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, fontWeight: 800 }}>
                    02 · What We Do
                  </div>
                  <EditableText
                    path="site.overview2"
                    value={content.site.overview2}
                    as="p"
                    multiline
                    style={{ fontSize: 18, lineHeight: 1.75, color: "var(--ink-2)" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0", background: "var(--red-mist)", textAlign: "center" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 24, justifyContent: "center", display: "inline-flex" }}>Join the movement</div>
            <h2 className="h-display" style={{ fontSize: "clamp(40px, 7vw, 96px)", marginBottom: 28 }}>
              Ready to <span className="magic-text" style={{ fontStyle: "italic", color: "var(--red-deep)" }}>build?</span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.6 }}>
              Become part of a community shaping the future of technology at {content.site.university}.
            </p>
            <Magnetic>
              <Link to="/recruitment" className="btn btn-ink hoverable" style={{ padding: "18px 36px", fontSize: 15 }}>
                Apply Now <ArrowUpRight width={16} height={16} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <style>{`
        .hero-grid { grid-template-columns: 1.15fr 0.95fr; }
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right-container { max-width: 480px !important; margin-top: 40px !important; }
          .overview-split { grid-template-columns: 1fr !important; gap: 60px !important; }
          .overview-split > div:first-child { position: relative !important; top: 0 !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}