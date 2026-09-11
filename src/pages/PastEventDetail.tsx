import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useContent } from "../store/ContentStore";
import { RichText } from "../components/RichText";
import Reveal from "../components/Reveal";
import { ArrowRight, Calendar } from "../components/Icons";

export default function PastEventDetail() {
  const { id } = useParams();
  const { content } = useContent();
  const event = content.pastEvents.find(e => e.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!event) return <div style={{ paddingTop: 200, textAlign: "center", minHeight: "80vh" }}>Event not found.</div>;

  return (
    <div style={{ paddingTop: 130, paddingBottom: 120, background: "var(--cream)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        
        <Reveal>
          <Link to="/past-events" className="hoverable font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 40 }}>
            <ArrowRight width={12} height={12} style={{ transform: "rotate(180deg)" }} /> Back to Archive
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ padding: "6px 14px", background: "var(--red)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 800, fontFamily: "JetBrains Mono" }}>Event #{event.n}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "var(--red-mist)", color: "var(--red-deep)", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
              <Calendar width={12} height={12} /> {event.date}
            </div>
          </div>
          <h1 className="h-display" style={{ fontSize: "clamp(48px, 8vw, 100px)", marginBottom: 24, lineHeight: 1.05 }}>{event.title}</h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 48, fontWeight: 400 }}>{event.desc}</p>
        </Reveal>

        {event.image && (
          <Reveal delay={100}>
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 32, overflow: "hidden", marginBottom: 60, border: "2px solid var(--line)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.15)" }}>
              <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div style={{ background: "var(--cream-2)", padding: "48px", borderRadius: 32, border: "1px solid var(--line)" }}>
            <RichText content={event.details} />
          </div>
        </Reveal>

      </div>
    </div>
  );
}