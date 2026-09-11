import { useMemo, useState, type FormEvent } from "react";
import Reveal from "../components/Reveal";
import { ArrowRight, Check, Users } from "../components/Icons";
import { readRecruitmentConfig, saveApplication, type RecruitmentApplication } from "../lib/recruitment";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  background: "var(--cream-2)",
  border: "1px solid var(--line)",
  borderRadius: 14,
  color: "var(--ink)",
  outline: "none",
  fontSize: 15,
  transition: "border-color .25s ease, box-shadow .25s ease, transform .25s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
};

export default function Recruitment() {
  const config = useMemo(() => readRecruitmentConfig(), []);
  const activeRoles = config.roles.filter((r) => r.active);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", rollNo: "", department: "", year: "",
    role: activeRoles[0]?.id || "", skills: "", experience: "", whyJoin: "",
    portfolio: "", linkedin: "", github: "", availability: "", consent: false,
  });

  const update = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setBusy(true);
    const selectedRole = activeRoles.find((r) => r.id === form.role)?.name || form.role;
    const application: RecruitmentApplication = {
      id: `ISTE-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      ...form,
      role: selectedRole,
    };
    saveApplication(application);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  };

  if (!config.enabled) {
    return (
      <div className="recruitment-page" style={{ paddingTop: 170, paddingBottom: 140 }}>
        <div className="container">
          <Reveal>
            <div className="recruitment-closed">
              <span className="eyebrow">Recruitment</span>
              <h1 className="h-display" style={{ fontSize: "clamp(48px, 8vw, 92px)", margin: "28px 0 18px" }}>Applications are<br /><em>closed for now.</em></h1>
              <p>{config.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="recruitment-page" style={{ paddingTop: 160, paddingBottom: 140 }}>
        <div className="container">
          <Reveal>
            <div className="recruitment-success">
              <div className="success-mark"><Check width={28} height={28} /></div>
              <span className="eyebrow">Application received</span>
              <h1 className="h-display" style={{ fontSize: "clamp(48px, 7vw, 84px)", margin: "26px 0 18px" }}>You’re on<br /><em>the list.</em></h1>
              <p>Your application has been saved successfully. Keep an eye on your email for the next step from the ISTE-CUSC team.</p>
              <button className="btn btn-ink hoverable" onClick={() => { setSubmitted(false); setForm((prev) => ({ ...prev, consent: false })); }} style={{ marginTop: 30 }}>Submit another <ArrowRight width={15} height={15} /></button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="recruitment-page" style={{ paddingTop: 145, paddingBottom: 120 }}>
      <section className="container recruitment-hero">
        <Reveal>
          <div className="eyebrow">{config.badge}</div>
          <h1 className="h-display recruitment-title">
            {config.title}<br /><em>{config.highlight}</em>
          </h1>
          <p className="recruitment-intro">{config.intro}</p>
          <div className="recruitment-meta">
            <span><i /> {config.deadline}</span>
            <span>{activeRoles.length.toString().padStart(2, "0")} roles available</span>
          </div>
        </Reveal>
      </section>

      <section className="container recruitment-layout">
        <Reveal delay={80}>
          <aside className="recruitment-side">
            <div className="side-number">01</div>
            <h2 className="font-serif">Find your lane.</h2>
            <p>Pick the area where you can contribute now — and learn the rest along the way.</p>
            <div className="role-stack">
              {activeRoles.map((role, index) => (
                <button key={role.id} type="button" className={`role-chip ${form.role === role.id ? "selected" : ""}`} onClick={() => update("role", role.id)}>
                  <span>0{index + 1}</span>
                  <strong>{role.name}</strong>
                  <ArrowRight width={14} height={14} />
                </button>
              ))}
            </div>
          </aside>
        </Reveal>

        <Reveal delay={140}>
          <form className="recruitment-form" onSubmit={submit}>
            <div className="form-heading">
              <div>
                <span className="font-mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--red-deep)", fontWeight: 800 }}>Application / 2026</span>
                <h2 className="font-serif">Tell us about you.</h2>
              </div>
              <Users width={24} height={24} />
            </div>

            <div className="form-grid">
              <div><label style={labelStyle}>Full name *</label><input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} style={fieldStyle} placeholder="Your name" /></div>
              <div><label style={labelStyle}>University email *</label><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} style={fieldStyle} placeholder="you@cumail.in" /></div>
              <div><label style={labelStyle}>Phone *</label><input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} style={fieldStyle} placeholder="10-digit number" /></div>
              <div><label style={labelStyle}>Roll / registration no. *</label><input required value={form.rollNo} onChange={(e) => update("rollNo", e.target.value)} style={fieldStyle} placeholder="University ID" /></div>
              <div><label style={labelStyle}>Department *</label><input required value={form.department} onChange={(e) => update("department", e.target.value)} style={fieldStyle} placeholder="e.g. CSE" /></div>
              <div><label style={labelStyle}>Year *</label><select required value={form.year} onChange={(e) => update("year", e.target.value)} style={fieldStyle}><option value="">Select year</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></div>
              <div className="form-full"><label style={labelStyle}>Preferred role *</label><select required value={form.role} onChange={(e) => update("role", e.target.value)} style={fieldStyle}>{activeRoles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div>
              <div className="form-full"><label style={labelStyle}>Skills / tools you know</label><input value={form.skills} onChange={(e) => update("skills", e.target.value)} style={fieldStyle} placeholder="e.g. React, Figma, video editing, public speaking" /></div>
              <div className="form-full"><label style={labelStyle}>Previous experience</label><textarea value={form.experience} onChange={(e) => update("experience", e.target.value)} rows={4} style={{ ...fieldStyle, resize: "vertical" }} placeholder="Projects, societies, events, internships, competitions..." /></div>
              <div className="form-full"><label style={labelStyle}>Why do you want to join ISTE? *</label><textarea required value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} rows={5} style={{ ...fieldStyle, resize: "vertical" }} placeholder="Keep it honest. We care more about intent than buzzwords." /></div>
              <div><label style={labelStyle}>Portfolio</label><input type="url" value={form.portfolio} onChange={(e) => update("portfolio", e.target.value)} style={fieldStyle} placeholder="https://..." /></div>
              <div><label style={labelStyle}>LinkedIn</label><input type="url" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} style={fieldStyle} placeholder="https://linkedin.com/in/..." /></div>
              <div><label style={labelStyle}>GitHub</label><input type="url" value={form.github} onChange={(e) => update("github", e.target.value)} style={fieldStyle} placeholder="https://github.com/..." /></div>
              <div><label style={labelStyle}>Availability</label><select value={form.availability} onChange={(e) => update("availability", e.target.value)} style={fieldStyle}><option value="">Select</option><option>2–4 hours / week</option><option>4–7 hours / week</option><option>7+ hours / week</option></select></div>
              <label className="consent form-full"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} required /><span>I confirm that the information provided is accurate and may be used by ISTE-CUSC for recruitment and chapter communication.</span></label>
            </div>

            <div className="form-footer">
              <p>{config.note}</p>
              <button disabled={busy || !form.consent} className="btn btn-red hoverable" type="submit">{busy ? "Submitting…" : "Submit application"} <ArrowRight width={16} height={16} /></button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
