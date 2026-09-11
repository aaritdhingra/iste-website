import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { ArrowRight, Users } from "../components/Icons";
import { ADMIN_PATH } from "../lib/adminConfig";

export default function Recruitment() {
  return (
    <div style={{ paddingTop: 160, minHeight: "80vh", display: "flex", alignItems: "center", padding: "160px 0 80px" }}>
      <div className="container">
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <Reveal>
            <div style={{ background: "linear-gradient(180deg, var(--ink) 0%, #2a201c 100%)", color: "var(--cream)", borderRadius: 32, padding: "60px 48px", position: "relative", overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "absolute", top: "20%", right: "-20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(232,117,107,0.25)", filter: "blur(80px)" }} />
              <div style={{ position: "relative" }}>
                <div style={{ display: "inline-block", padding: "8px 20px", background: "rgba(232,117,107,0.15)", border: "1px solid rgba(232,117,107,0.4)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32, color: "var(--red-soft)" }}>Register Now</div>
                <h1 className="h-display" style={{ fontSize: "clamp(40px, 8vw, 68px)", marginBottom: 24, color: "var(--cream)" }}>Become an<br/><span style={{ color: "var(--red-soft)" }}>ISTE Member</span></h1>
                <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, marginBottom: 40, maxWidth: 440, margin: "0 auto 40px" }}>
                  Students can register through the official ISTE Student Chapter process and become part of a community built around technical learning, leadership, and innovation.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <a href="#" className="hoverable" style={{ padding: 18, background: "var(--cream)", color: "var(--ink)", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <Users width={16} height={16} /> Apply to Join ISTE <ArrowRight width={14} height={14} />
                  </a>

                  {/* MEMBER LOGIN → secret admin portal */}
                  <Link
                    to={ADMIN_PATH}
                    className="hoverable"
                    style={{ padding: 18, background: "transparent", color: "var(--cream)", border: "1px solid rgba(250,246,239,0.3)", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                  >
                    Member Login
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}