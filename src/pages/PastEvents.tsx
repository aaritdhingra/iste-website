import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useContent } from "../store/ContentStore";
import { EditableText } from "../components/Editable";
import { ArrowRight, Calendar, Close } from "../components/Icons";

const heroSlides = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=85",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=85",
];

export default function PastEvents() {
  const [i, setI] = useState(0);
  const { content } = useContent();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % heroSlides.length), 4500); return () => clearInterval(t); }, []);

  return (
    <div style={{ paddingTop: 160 }}>
      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 28, overflow: "hidden" }}>
              {heroSlides.map((s, idx) => (
                <div key={idx} style={{ position: "absolute", inset: 0, opacity: idx === i ? 1 : 0, transition: "opacity 1s" }}>
                  <img src={s} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,22,19,0.85), rgba(26,22,19,0.3) 50%, transparent)" }} />
                </div>
              ))}
              <div style={{ position: "absolute", bottom: "12%", left: "8%", right: "8%", color: "var(--cream)" }}>
                <h1 className="h-display" style={{ fontSize: "clamp(40px, 8vw, 100px)", marginBottom: 20 }}>Previous Events<br/>& <span style={{ color: "var(--red-soft)" }}>Achievements</span></h1>
                <p style={{ fontSize: 17, maxWidth: 600, opacity: 0.9, lineHeight: 1.5 }}>Celebrating milestones, success stories, and technical breakthroughs from the ISTE Student Chapter.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="past-grid">
            {content.pastEvents.map((e, i) => (
              <Reveal key={e.id} delay={i * 80}>
                {/* NEW: Clickable Card routing to /past-events/:id */}
                <Link to={`/past-events/${e.id}`} className="card hoverable" style={{ padding: 0, display: "flex", flexDirection: "column", minHeight: 380, overflow: "hidden", color: "var(--ink)", textDecoration: "none" }}>
                  {e.image && <div style={{ aspectRatio: "16/9", overflow: "hidden" }}><img src={e.image} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="img-hover" /></div>}
                  <div style={{ padding: 32, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20 }}>
                      <EditableText path={`pastEvents.${i}.title`} value={e.title} as="h3" className="font-serif" style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }} />
                      <div style={{ padding: "6px 12px", background: "var(--red)", color: "var(--cream)", borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: "JetBrains Mono" }}>{e.n}</div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "var(--red-mist)", color: "var(--red-deep)", borderRadius: 999, fontSize: 12, fontWeight: 600, alignSelf: "flex-start", marginBottom: 20 }}>
                      <Calendar width={12} height={12} /> <EditableText path={`pastEvents.${i}.date`} value={e.date} />
                    </div>
                    <EditableText path={`pastEvents.${i}.desc`} value={e.desc} as="p" multiline style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 28, flex: 1 }} />
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--red-deep)", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
                      Read Full Article <ArrowRight width={12} height={12} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: DYNAMIC GLOBAL GALLERY FOR PAST EVENTS */}
      <section style={{ padding: "60px 0 120px" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 32 }}>Event Gallery</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 48 }}>Moments Captured</h2>
          </Reveal>
          <div style={{ columnCount: 3, columnGap: 20 }} className="gallery-masonry">
            {content.pastEventsGallery.map((img, i) => (
              <Reveal key={i} delay={i * 40}>
                <div onClick={() => setLightbox(img)} className="hoverable" style={{ display: "block", width: "100%", marginBottom: 20, borderRadius: 16, overflow: "hidden", breakInside: "avoid", cursor: "none" }}>
                  <img src={img} alt="Gallery item" loading="lazy" style={{ width: "100%", display: "block", transition: "transform 0.4s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(26,22,19,0.94)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, cursor: "none", animation: "fadeIn 0.3s" }}>
          <img src={lightbox} alt="" style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 16, objectFit: "contain" }} />
          <button onClick={() => setLightbox(null)} className="hoverable" style={{ position: "absolute", top: 30, right: 30, width: 48, height: 48, borderRadius: 999, background: "var(--cream)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Close width={20} height={20} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .past-grid { grid-template-columns: 1fr 1fr !important; } .gallery-masonry { column-count: 2 !important; } }
        @media (max-width: 560px) { .past-grid { grid-template-columns: 1fr !important; } .gallery-masonry { column-count: 1 !important; } }
        .card:hover .img-hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}