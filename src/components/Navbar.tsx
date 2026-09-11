import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Close, ArrowUpRight } from "./Icons";
import { useContent } from "../store/ContentStore";
import { Magnetic } from "./Reveal";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/past-events", label: "Archive" },
  { to: "/members", label: "Members" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const { content } = useContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <>
      <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "10px 0", position: "fixed", top: 0, left: 0, right: 0, zIndex: 101, fontSize: 12 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="font-mono" style={{ fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--red)", animation: "pulse 2s infinite" }} />
            Official portal Â· ISTE Student Chapter
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }} className="hide-mobile">
            <a href={`mailto:${content.site.email}`} className="hoverable link-underline" style={{ opacity: 0.85 }}>Email</a>
            <span style={{ opacity: 0.3 }}>Â·</span>
            <a href={content.site.instagram} target="_blank" rel="noreferrer" className="hoverable link-underline" style={{ opacity: 0.85 }}>Instagram</a>
            <span style={{ opacity: 0.3 }}>Â·</span>
            <a href={content.site.linkedin} target="_blank" rel="noreferrer" className="hoverable link-underline" style={{ opacity: 0.85 }}>LinkedIn</a>
          </div>
        </div>
      </div>

      <header style={{ position: "fixed", top: 42, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,246,239,0.94)" : "var(--cream)", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent", transition: "all 0.3s ease" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 100 }}>
          <Link to="/" className="hoverable" style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -6, background: "var(--red)", borderRadius: 999, opacity: 0.15, filter: "blur(12px)" }} />
              <img src={content.logo} alt="ISTE" style={{ width: 78, height: 78, borderRadius: 999, objectFit: "cover", border: "3px solid var(--ink)", position: "relative", boxShadow: "0 8px 24px -8px rgba(26,22,19,0.25)" }} />
            </div>
            <div><div style={{ marginBottom: 2 }}>
                <div className="font-serif" style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1 }}>ISTE</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 500 }}>
                <span style={{ color: "var(--red-deep)", fontWeight: 700 }}>Chandigarh</span> University
              </div>
            </div>
          </Link>

          <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px", background: "var(--cream-2)", borderRadius: 999, border: "1px solid var(--line)" }}>
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} className="hoverable"
                style={({ isActive }) => ({ padding: "12px 22px", fontSize: 13, fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", color: isActive ? "var(--cream)" : "var(--ink-2)", background: isActive ? "var(--ink)" : "transparent", borderRadius: 999, transition: "all 0.25s" })}>
                {l.label}</NavLink>
            ))}
          </nav>

          <div className="nav-desktop">
            <Magnetic strength={0.3}>
              <Link to="/recruitment" className="btn btn-red hoverable" style={{ padding: "14px 26px", fontSize: 13 }}>
                Join Us <ArrowUpRight width={14} height={14} />
              </Link>
            </Magnetic>
          </div>

          <button className="nav-mobile" onClick={() => setOpen(!open)} style={{ width: 48, height: 48, borderRadius: 999, border: "1.5px solid var(--ink)", display: "none", alignItems: "center", justifyContent: "center", background: "var(--cream)" }}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "var(--cream)", paddingTop: 160, animation: "fadeIn 0.3s" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[...NAV, { to: "/recruitment", label: "Join Us" }].map((l, i) => (
              <NavLink key={l.to} to={l.to} style={({ isActive }) => ({ fontFamily: "Fraunces, serif", fontSize: 44, fontWeight: 500, padding: "20px 0", borderBottom: "1px solid var(--line)", color: isActive ? "var(--red-deep)" : "var(--ink)", letterSpacing: "-0.02em", animation: `fadeUp 0.5s ease ${i * 60}ms both`, display: "flex", alignItems: "center", justifyContent: "space-between" })}>
                {l.label}<ArrowUpRight width={26} height={26} />
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}


