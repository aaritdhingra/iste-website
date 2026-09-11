import { useMemo, useState } from "react";
import { readApplications, readRecruitmentConfig, saveRecruitmentConfig, type RecruitmentApplication, type RecruitmentConfig } from "../lib/recruitment";

const inputStyle: React.CSSProperties = { width: "100%", padding: "13px 15px", background: "var(--cream-2)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--ink)", outline: "none" };
const labelStyle: React.CSSProperties = { display: "block", marginBottom: 7, fontSize: 10, fontFamily: "JetBrains Mono, monospace", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-3)" };
const cardStyle: React.CSSProperties = { background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 24, padding: 28, marginBottom: 24 };

function csvEscape(value: unknown) {
  const s = String(value ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

function downloadCSV(rows: RecruitmentApplication[]) {
  const headers = ["ID", "Submitted At", "Name", "Email", "Phone", "Roll No", "Department", "Year", "Role", "Skills", "Experience", "Why Join", "Portfolio", "LinkedIn", "GitHub", "Availability"];
  const body = rows.map((r) => [r.id, r.submittedAt, r.fullName, r.email, r.phone, r.rollNo, r.department, r.year, r.role, r.skills, r.experience, r.whyJoin, r.portfolio, r.linkedin, r.github, r.availability].map(csvEscape).join(","));
  const blob = new Blob([[headers.map(csvEscape).join(","), ...body].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `iste-recruitment-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
}

export default function RecruitmentAdmin() {
  const [config, setConfig] = useState<RecruitmentConfig>(() => readRecruitmentConfig());
  const [applications, setApplications] = useState<RecruitmentApplication[]>(() => readApplications());
  const [view, setView] = useState<"settings" | "applications">("settings");
  const [saved, setSaved] = useState(false);

  const activeCount = useMemo(() => config.roles.filter((r) => r.active).length, [config.roles]);
  const patch = (value: Partial<RecruitmentConfig>) => setConfig((prev) => ({ ...prev, ...value }));

  const save = () => { saveRecruitmentConfig(config); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  const refresh = () => setApplications(readApplications());
  const deleteApplication = (id: string) => { if (!confirm("Delete this application?")) return; const next = applications.filter((a) => a.id !== id); localStorage.setItem("iste_recruitment_applications_v1", JSON.stringify(next)); setApplications(next); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <div><h2 className="font-serif" style={{ fontSize: 30 }}>Recruitment</h2><p style={{ color: "var(--ink-3)", fontSize: 14 }}>Manage the public application page and review saved applications.</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setView("settings")} style={{ padding: "10px 18px", borderRadius: 999, background: view === "settings" ? "var(--ink)" : "var(--cream)", color: view === "settings" ? "var(--cream)" : "var(--ink)", border: "1px solid var(--line)", fontWeight: 700 }}>Page settings</button>
          <button onClick={() => { refresh(); setView("applications"); }} style={{ padding: "10px 18px", borderRadius: 999, background: view === "applications" ? "var(--ink)" : "var(--cream)", color: view === "applications" ? "var(--cream)" : "var(--ink)", border: "1px solid var(--line)", fontWeight: 700 }}>Applications ({applications.length})</button>
        </div>
      </div>

      {view === "settings" ? (
        <>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12 }}>
              <div><div style={labelStyle}>Public page</div><h3 className="font-serif" style={{ fontSize: 24 }}>Recruitment controls</h3></div>
              <button onClick={() => patch({ enabled: !config.enabled })} style={{ padding: "9px 15px", borderRadius: 999, border: "1px solid var(--line)", background: config.enabled ? "var(--red-mist)" : "var(--cream-2)", color: config.enabled ? "var(--red-deep)" : "var(--ink-3)", fontWeight: 800 }}>{config.enabled ? "OPEN" : "CLOSED"}</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="recruit-admin-grid">
              <div><label style={labelStyle}>Badge</label><input value={config.badge} onChange={(e) => patch({ badge: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Status / deadline text</label><input value={config.deadline} onChange={(e) => patch({ deadline: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Main title</label><input value={config.title} onChange={(e) => patch({ title: e.target.value })} style={inputStyle} /></div>
              <div><label style={labelStyle}>Highlighted title</label><input value={config.highlight} onChange={(e) => patch({ highlight: e.target.value })} style={inputStyle} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Intro</label><textarea value={config.intro} onChange={(e) => patch({ intro: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Applicant note</label><textarea value={config.note} onChange={(e) => patch({ note: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} /></div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div><div style={labelStyle}>Available roles · {activeCount} active</div><h3 className="font-serif" style={{ fontSize: 24 }}>Recruitment lanes</h3></div>
              <button onClick={() => patch({ roles: [...config.roles, { id: `role-${Date.now()}`, name: "New Role", description: "Describe this role.", active: true }] })} style={{ padding: "10px 16px", borderRadius: 999, background: "var(--red)", color: "var(--cream)", fontWeight: 800 }}>+ Add role</button>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {config.roles.map((role, i) => (
                <div key={role.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr 2fr auto auto", gap: 12, alignItems: "center", padding: 14, border: "1px solid var(--line)", borderRadius: 16 }} className="recruit-role-row">
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--ink-4)" }}>0{i + 1}</span>
                  <input value={role.name} onChange={(e) => { const roles = [...config.roles]; roles[i] = { ...roles[i], name: e.target.value }; patch({ roles }); }} style={inputStyle} />
                  <input value={role.description} onChange={(e) => { const roles = [...config.roles]; roles[i] = { ...roles[i], description: e.target.value }; patch({ roles }); }} style={inputStyle} />
                  <button onClick={() => { const roles = [...config.roles]; roles[i] = { ...roles[i], active: !roles[i].active }; patch({ roles }); }} style={{ padding: "9px 13px", borderRadius: 999, border: "1px solid var(--line)", background: role.active ? "var(--red-mist)" : "var(--cream-2)", color: role.active ? "var(--red-deep)" : "var(--ink-3)", fontWeight: 800 }}>{role.active ? "Active" : "Hidden"}</button>
                  <button onClick={() => patch({ roles: config.roles.filter((r) => r.id !== role.id) })} style={{ padding: "9px 12px", borderRadius: 999, border: "1px solid var(--red-soft)", color: "var(--red-deep)", background: "transparent", fontWeight: 800 }}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, alignItems: "center" }}>
            {saved && <span style={{ color: "#218838", fontWeight: 800, fontSize: 13 }}>Saved</span>}
            <button onClick={save} style={{ padding: "14px 24px", borderRadius: 999, background: "var(--ink)", color: "var(--cream)", fontWeight: 800 }}>Publish recruitment changes →</button>
          </div>
        </>
      ) : (
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
            <div><div style={labelStyle}>Saved applications</div><h3 className="font-serif" style={{ fontSize: 28 }}>{applications.length} application{applications.length === 1 ? "" : "s"}</h3></div>
            <div style={{ display: "flex", gap: 8 }}><button onClick={refresh} style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid var(--line)", background: "var(--cream-2)", fontWeight: 700 }}>Refresh</button><button onClick={() => downloadCSV(applications)} disabled={!applications.length} style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: "var(--red)", color: "var(--cream)", fontWeight: 800 }}>Export Excel / CSV</button></div>
          </div>
          {!applications.length ? <div style={{ padding: "50px 20px", textAlign: "center", color: "var(--ink-3)" }}>No applications saved on this browser yet.</div> : (
            <div style={{ display: "grid", gap: 12 }}>
              {applications.map((a) => (
                <details key={a.id} style={{ border: "1px solid var(--line)", borderRadius: 16, padding: "16px 18px", background: "var(--cream-2)" }}>
                  <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", listStyle: "none" }}>
                    <span><strong>{a.fullName}</strong><span style={{ color: "var(--ink-3)", marginLeft: 12 }}>{a.role}</span></span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-4)" }}>{a.id}</span>
                  </summary>
                  <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }} className="recruit-admin-grid">
                    <div><b>Email</b><br />{a.email}</div><div><b>Phone</b><br />{a.phone}</div><div><b>Roll No</b><br />{a.rollNo}</div><div><b>Department / Year</b><br />{a.department} · {a.year}</div><div><b>Skills</b><br />{a.skills || "—"}</div><div><b>Availability</b><br />{a.availability || "—"}</div><div style={{ gridColumn: "1 / -1" }}><b>Why ISTE</b><br />{a.whyJoin}</div><div style={{ gridColumn: "1 / -1" }}><b>Experience</b><br />{a.experience || "—"}</div><div><b>Portfolio</b><br />{a.portfolio || "—"}</div><div><b>LinkedIn</b><br />{a.linkedin || "—"}</div><div><b>GitHub</b><br />{a.github || "—"}</div><div><b>Submitted</b><br />{new Date(a.submittedAt).toLocaleString()}</div>
                    <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}><button onClick={() => deleteApplication(a.id)} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid var(--red-soft)", color: "var(--red-deep)", background: "transparent", fontWeight: 800 }}>Delete application</button></div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`@media(max-width:900px){.recruit-admin-grid{grid-template-columns:1fr!important}.recruit-role-row{grid-template-columns:1fr!important}.recruit-role-row > *{width:100%}}`}</style>
    </div>
  );
}
