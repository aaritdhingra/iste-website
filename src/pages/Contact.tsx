import { useState } from "react";
import Reveal from "../components/Reveal";
import { IconMail, IconPin, IconInsta, IconLinkedIn, IconYouTube, IconCode, ArrowRight, Check } from "../components/Icons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }, 4000);
  };

  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Reveal><div className="eyebrow" style={{ marginBottom: 40 }}>Reach out</div></Reveal>
          <Reveal delay={80}>
            <h1 className="h-display" style={{ fontSize: "clamp(56px, 10vw, 160px)", marginBottom: 40 }}>
              Say <span style={{ fontStyle: "italic", color: "var(--red-deep)" }}>hello.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 600, color: "var(--ink-2)" }}>
              Collaborate on an event. Sponsor a hackathon. Or just tell us you like what we're building. We read every message.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="contact-grid">

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <Reveal>
                <div>
                  <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 16 }}>Direct line</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--red-mist)", color: "var(--red-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <IconMail width={18} height={18} />
                      </div>
                      <div>
                        <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 4 }}>Email</div>
                        <a href="mailto:iste@college.edu.in" className="link-underline hoverable font-serif" style={{ fontSize: 22 }}>iste@college.edu.in</a>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 999, background: "var(--red-mist)", color: "var(--red-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <IconPin width={18} height={18} />
                      </div>
                      <div>
                        <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 4 }}>Find us</div>
                        <div className="font-serif" style={{ fontSize: 18, lineHeight: 1.4 }}>Student Activity Center<br/>Main Campus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div>
                  <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 16 }}>Follow along</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[IconInsta, IconLinkedIn, IconCode, IconYouTube].map((I, i) => (
                      <a key={i} href="#" className="hoverable" style={{ width: 48, height: 48, borderRadius: 999, border: "1.5px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                      >
                        <I width={16} height={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div style={{ padding: 32, background: "var(--red-mist)", borderRadius: 20 }}>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--red-deep)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Response time</div>
                  <div className="font-serif" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>Within 48 hours.</div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)" }}>Every message is read by a member of our core team.</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div style={{ padding: 48, background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 24 }}>
                {sent ? (
                  <div style={{ padding: "80px 20px", textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--red-mist)", color: "var(--red-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                      <Check width={28} height={28} />
                    </div>
                    <h3 className="h-display" style={{ fontSize: 40, marginBottom: 12 }}>Message received.</h3>
                    <p style={{ fontSize: 15, color: "var(--ink-2)" }}>We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>01 · Your name</div>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ada Lovelace"
                        style={{ width: "100%", padding: "12px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", fontSize: 20, fontFamily: "Fraunces, serif", color: "var(--ink)", outline: "none", transition: "border-color 0.3s" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>02 · Email</div>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ada@example.com"
                        style={{ width: "100%", padding: "12px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", fontSize: 20, fontFamily: "Fraunces, serif", color: "var(--ink)", outline: "none", transition: "border-color 0.3s" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>03 · Subject</div>
                      <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What's this about?"
                        style={{ width: "100%", padding: "12px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", fontSize: 20, fontFamily: "Fraunces, serif", color: "var(--ink)", outline: "none", transition: "border-color 0.3s" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"} />
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>04 · Message</div>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us everything…"
                        style={{ width: "100%", padding: "12px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--line)", fontSize: 18, fontFamily: "Inter, sans-serif", color: "var(--ink)", outline: "none", resize: "none", transition: "border-color 0.3s", lineHeight: 1.6 }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "var(--red)"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "var(--line)"} />
                    </div>
                    <button type="submit" className="btn btn-ink hoverable" style={{ alignSelf: "flex-start", marginTop: 16 }}>
                      Send message <ArrowRight width={16} height={16} />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }
      `}</style>
    </div>
  );
}