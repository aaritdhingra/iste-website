import { Link } from "react-router-dom";
import { useContent } from "../store/ContentStore";
import { Insta, LinkedIn, Mail, ArrowUpRight } from "./Icons";

export default function Footer() {
  const { content } = useContent();
  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "100px 0 40px", marginTop: 80 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 80 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <img src={content.logo} alt="ISTE" style={{ width: 56, height: 56, borderRadius: 999, objectFit: "cover", border: "2px solid rgba(250,246,239,0.2)" }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.02em" }}>ISTE STUDENT CHAPTER</div>
                <div style={{ fontSize: 12, opacity: 0.65, marginTop: 2 }}><span style={{ color: "var(--red-soft)" }}>{content.site.university.split(" ")[0]}</span> {content.site.university.split(" ").slice(1).join(" ")}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.7, maxWidth: 340 }}>{content.site.intro}</p>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 10, opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Sitemap</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {content.footerSitemap.map((l) => (<Link key={l.url} to={l.url} className="link-underline hoverable" style={{ fontSize: 14, opacity: 0.8, width: "fit-content" }}>{l.label}</Link>))}
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 10, opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={content.site.instagram} target="_blank" rel="noreferrer" className="link-underline hoverable" style={{ fontSize: 14, opacity: 0.8, width: "fit-content", display: "flex", alignItems: "center", gap: 6 }}>Instagram <ArrowUpRight width={12} height={12} /></a>
              <a href={content.site.linkedin} target="_blank" rel="noreferrer" className="link-underline hoverable" style={{ fontSize: 14, opacity: 0.8, width: "fit-content", display: "flex", alignItems: "center", gap: 6 }}>LinkedIn <ArrowUpRight width={12} height={12} /></a>
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 10, opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Reach</div>
            <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.8 }}>{content.site.email}<br/>{content.site.location}</div>
          </div>
        </div>
        
        {/* Adjusted Footer Font Size */}
        <div className="font-serif" style={{ fontSize: "clamp(40px, 8vw, 100px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 40 }}>ISTE<span style={{ color: "var(--red)" }}>.</span></div>
        
        <div style={{ borderTop: "1px solid rgba(250,246,239,0.15)", paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ fontSize: 12, opacity: 0.5 }} className="font-mono">© {new Date().getFullYear()} ISTE STUDENT CHAPTER · {content.site.university.toUpperCase()}</div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}