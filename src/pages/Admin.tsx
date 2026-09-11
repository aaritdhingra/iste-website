import { useState, useEffect, type CSSProperties } from "react";
import { useContent } from "../store/ContentStore";
import { ImageEditor } from "../components/ImageEditor";
import { USERS } from "../lib/adminConfig";
import RecruitmentAdmin from "./RecruitmentAdmin";

const inputStyle: CSSProperties = { width: "100%", padding: "14px 16px", background: "var(--cream-2)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 15, color: "var(--ink)", outline: "none", fontFamily: "inherit" };
const labelStyle: CSSProperties = { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, marginBottom: 8, display: "block" };
const cardStyle: CSSProperties = { background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 24, padding: 36, marginBottom: 32 };
const btnRedStyle: CSSProperties = { padding: "12px 24px", background: "var(--red)", color: "var(--cream)", borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", border: "none" };
const btnGhost: CSSProperties = { padding: "10px 18px", background: "var(--cream-2)", color: "var(--ink)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", border: "none" };
const btnDelete: CSSProperties = { padding: "8px 16px", background: "transparent", color: "var(--red-deep)", border: "1.5px solid var(--red-soft)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" };

function ImageThumb({ src, path, title, aspect = "1 / 1", allowRemove = false, placeholder }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={{ position: "relative", width: "100%", aspectRatio: aspect, borderRadius: 20, overflow: "hidden", background: "var(--cream-2)", border: "2px dashed var(--red-soft)", padding: 0, cursor: "pointer", display: "block", transition: "border-color 0.2s, transform 0.2s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--red)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--red-soft)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
        {src ? (
          <>
            <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="thumb-overlay" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(26,22,19,0)", transition: "background 0.2s" }}>
              <span className="thumb-label" style={{ padding: "10px 20px", background: "var(--cream)", color: "var(--ink)", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0, transition: "opacity 0.2s" }}>Change Image</span>
            </div>
          </>
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "var(--ink-3)" }}>
            <div style={{ fontSize: 40, color: "var(--red)", lineHeight: 1 }}>+</div><div style={{ fontSize: 12, fontWeight: 600 }}>{placeholder || "Add Image"}</div>
          </div>
        )}
      </button>
      <ImageEditor open={open} onClose={() => setOpen(false)} path={path} currentSrc={src || ""} title={title} aspect={aspect} allowRemove={allowRemove} />
      <style>{`button:hover .thumb-overlay { background: rgba(26,22,19,0.5) !important; } button:hover .thumb-label { opacity: 1 !important; }`}</style>
    </>
  );
}

export default function Admin() {
  const { draft, updateDraft, userRole, login, hasChanges, saveChanges, logout } = useContent();
  const [usr, setUsr] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<string>("");
  const [showPasswords, setShowPasswords] = useState(false);

  const tabsByRole: Record<string, string[]> = {
    admin: ["general", "events", "past", "members", "recruitment", "images", "links", "access"],
    event_manager: ["events", "past"],
    media_manager: ["images"],
    content_writer: ["past"],
    hr_manager: ["members", "recruitment"],
    webmaster: ["general", "links"],
  };

  useEffect(() => {
    document.body.setAttribute("data-admin", "true");
    if (userRole) {
      const available = tabsByRole[userRole] || [];
      if (available.length > 0 && !available.includes(tab)) setTab(available[0]);
    }
    return () => { document.body.removeAttribute("data-admin"); };
  }, [userRole]);

  if (!userRole) {
    return (
      <div style={{ paddingTop: 160, paddingBottom: 100, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream-2)" }}>
        <div style={{ maxWidth: 440, width: "100%", padding: 48, background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 32, boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 12, fontWeight: 700 }}>Member Access</div>
            <h1 className="h-display" style={{ fontSize: 44, marginBottom: 12 }}>Login to Portal</h1>
            <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6 }}>Authorized chapter members only.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); const res = login(usr, pw); if (!res.ok) setErr(res.error || "Login failed"); else setErr(""); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <input value={usr} onChange={(e) => setUsr(e.target.value)} placeholder="Username" autoFocus style={{ ...inputStyle, padding: "16px 18px", fontSize: 15 }} />
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" style={{ ...inputStyle, padding: "16px 18px", fontSize: 15 }} />
            {err && <div style={{ fontSize: 13, color: "var(--red-deep)", fontWeight: 600, padding: 14, background: "var(--red-mist)", borderRadius: 12 }}>{err}</div>}
            <button type="submit" style={{ ...btnRedStyle, padding: "16px", width: "100%", justifyContent: "center", display: "flex", fontSize: 14 }}>Enter Portal →</button>
          </form>
        </div>
      </div>
    );
  }

  const availableTabs = tabsByRole[userRole] || [];
  const userList = Object.entries(USERS);

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120, background: "var(--cream-2)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 12, fontWeight: 700 }}>
              Secure Dashboard · {String(userRole).replace("_", " ").toUpperCase()}
            </div>
            <h1 className="h-display" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>Content Manager</h1>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {hasChanges && (
              <div style={{ padding: "12px 20px", background: "var(--cream)", border: "2px solid var(--red)", borderRadius: 999, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red-deep)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Unsaved</span>
                <button onClick={saveChanges} style={{ ...btnRedStyle, padding: "8px 18px", fontSize: 11 }}>Publish</button>
              </div>
            )}
            <button onClick={logout} style={{ ...btnGhost, background: "var(--ink)", color: "var(--cream)" }}>Logout</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap", padding: 8, background: "var(--cream)", borderRadius: 999, width: "fit-content", border: "1px solid var(--line)" }}>
          {availableTabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 22px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              background: tab === t ? "var(--ink)" : "transparent",
              color: tab === t ? "var(--cream)" : "var(--ink-3)",
              cursor: "pointer", border: "none", transition: "all 0.3s"
            }}>{t === "past" ? "Articles" : t === "access" ? "🔐 Access" : t}</button>
          ))}
        </div>

        {/* ========== GENERAL ========== */}
        {tab === "general" && (
          <div style={cardStyle}>
            <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 24 }}>Site Settings</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>University</label><input value={draft.site.university} onChange={(e) => updateDraft("site.university", e.target.value)} style={inputStyle} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Hero Intro</label><textarea value={draft.site.intro} onChange={(e) => updateDraft("site.intro", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Chapter Overview — P1</label><textarea value={draft.site.overview} onChange={(e) => updateDraft("site.overview", e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Chapter Overview — P2</label><textarea value={draft.site.overview2} onChange={(e) => updateDraft("site.overview2", e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} /></div>
              <div><label style={labelStyle}>Community Size</label><input value={draft.site.community} onChange={(e) => updateDraft("site.community", e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Email</label><input value={draft.site.email} onChange={(e) => updateDraft("site.email", e.target.value)} style={inputStyle} /></div>
              <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Location</label><input value={draft.site.location} onChange={(e) => updateDraft("site.location", e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Instagram URL</label><input value={draft.site.instagram} onChange={(e) => updateDraft("site.instagram", e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>LinkedIn URL</label><input value={draft.site.linkedin} onChange={(e) => updateDraft("site.linkedin", e.target.value)} style={inputStyle} /></div>
            </div>
          </div>
        )}

        {/* ========== EVENTS ========== */}
        {tab === "events" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 className="font-serif" style={{ fontSize: 28 }}>Upcoming Events</h2>
              <button onClick={() => updateDraft("upcomingEvents", [{ id: "e" + Date.now(), title: "New Event", time: "10:00 AM", date: "TBD", desc: "Description...", participants: "Individual", prize: "Certificate", fee: "Free", location: "Campus", status: "Open" }, ...draft.upcomingEvents])} style={btnRedStyle}>+ Add Event</button>
            </div>
            {draft.upcomingEvents.map((ev, i) => (
              <div key={ev.id} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--red-mist)", padding: "6px 14px", borderRadius: 999, color: "var(--red-deep)", fontWeight: 700 }}>Event #{i + 1}</div>
                  <button onClick={() => { if (confirm("Delete?")) updateDraft("upcomingEvents", draft.upcomingEvents.filter((x) => x.id !== ev.id)); }} style={btnDelete}>Delete</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }} className="ev-grid">
                  <div><label style={labelStyle}>Poster</label><ImageThumb src={ev.poster} path={`upcomingEvents.${i}.poster`} aspect="4 / 5" allowRemove placeholder="Add Poster" /></div>
                  <div style={{ display: "grid", gap: 14 }}>
                    <div><label style={labelStyle}>Title</label><input value={ev.title} onChange={(e) => { const a = [...draft.upcomingEvents]; a[i].title = e.target.value; updateDraft("upcomingEvents", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Description</label><textarea value={ev.desc} onChange={(e) => { const a = [...draft.upcomingEvents]; a[i].desc = e.target.value; updateDraft("upcomingEvents", a); }} rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div><label style={labelStyle}>Date</label><input value={ev.date} onChange={(e) => { const a = [...draft.upcomingEvents]; a[i].date = e.target.value; updateDraft("upcomingEvents", a); }} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Status</label>
                        <select value={ev.status} onChange={(e) => { const a = [...draft.upcomingEvents]; a[i].status = e.target.value as any; updateDraft("upcomingEvents", a); }} style={inputStyle}>
                          <option value="Open">Open</option><option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== PAST ARTICLES ========== */}
        {tab === "past" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 className="font-serif" style={{ fontSize: 28 }}>Articles & Past Events</h2>
              <button onClick={() => updateDraft("pastEvents", [{ id: "p-" + Date.now(), n: String(draft.pastEvents.length + 1).padStart(2, "0"), title: "New Article", date: "TBD", desc: "Short desc", details: "/h1(Main Heading)\n\nWrite article here..." }, ...draft.pastEvents])} style={btnRedStyle}>+ Add Article</button>
            </div>

            <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "28px 32px", borderRadius: 24, marginBottom: 32, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}>
              <div style={{ color: "var(--red-soft)", fontWeight: 800, marginBottom: 20, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace" }}>✨ Magic Text Syntax Guide</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--ink-4)" }} className="magic-grid">
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>/h1(Text)</code> = Big Heading</div>
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>/h2(Text)</code> = Sub Heading</div>
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>/size:32(Text)</code> = Custom Size</div>
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>/red(Text)</code> = <span style={{ color: "var(--red)" }}>Red Text</span></div>
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>**Text**</code> = <strong>Bold</strong></div>
                <div><code style={{ color: "var(--red-soft)", fontWeight: 600 }}>*Text*</code> = <em>Italic</em></div>
                <div style={{ gridColumn: "1 / -1", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 8 }}>
                  <code style={{ color: "var(--red-soft)", fontWeight: 600 }}>/img(URL)</code> = Insert an image directly inside the article.
                </div>
              </div>
              <div style={{ marginTop: 20, fontSize: 13, color: "var(--ink-4)" }}>Note: Leave a blank line to create a new paragraph.</div>
            </div>

            {draft.pastEvents.map((ev, i) => (
              <div key={ev.id} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", background: "var(--red-mist)", padding: "6px 14px", borderRadius: 999, color: "var(--red-deep)", fontWeight: 700 }}>Article #{ev.n}</div>
                  <button onClick={() => { if (confirm("Delete article?")) updateDraft("pastEvents", draft.pastEvents.filter((_, idx) => idx !== i)); }} style={btnDelete}>Delete</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, marginBottom: 24 }} className="ev-grid">
                  <div><label style={labelStyle}>Thumbnail</label><ImageThumb src={ev.image} path={`pastEvents.${i}.image`} aspect="16/9" allowRemove placeholder="Cover" /></div>
                  <div style={{ display: "grid", gap: 14 }}>
                    <div><label style={labelStyle}>URL Slug (ID)</label><input value={ev.id} onChange={(e) => { const a = [...draft.pastEvents]; a[i].id = e.target.value.toLowerCase().replace(/\s+/g, "-"); updateDraft("pastEvents", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Title</label><input value={ev.title} onChange={(e) => { const a = [...draft.pastEvents]; a[i].title = e.target.value; updateDraft("pastEvents", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Date</label><input value={ev.date} onChange={(e) => { const a = [...draft.pastEvents]; a[i].date = e.target.value; updateDraft("pastEvents", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Short Desc (Card View)</label><textarea value={ev.desc} onChange={(e) => { const a = [...draft.pastEvents]; a[i].desc = e.target.value; updateDraft("pastEvents", a); }} rows={2} style={{ ...inputStyle, resize: "vertical" }} /></div>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24 }}>
                  <label style={labelStyle}>Full Article Content (Rich Text)</label>
                  <textarea value={ev.details || ""} onChange={(e) => { const a = [...draft.pastEvents]; a[i].details = e.target.value; updateDraft("pastEvents", a); }} rows={14} style={{ ...inputStyle, resize: "vertical", fontFamily: "JetBrains Mono, monospace", fontSize: 14, background: "var(--ink)", color: "var(--cream)", lineHeight: 1.6 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== MEMBERS ========== */}
        {tab === "members" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 className="font-serif" style={{ fontSize: 28 }}>Members Directory</h2>
              <button onClick={() => updateDraft("members", [...draft.members, { id: "m" + Date.now(), name: "New Member", role: "Role", dept: "Dept", bio: "Short bio...", category: "Core Team" }])} style={btnRedStyle}>+ Add Member</button>
            </div>
            {draft.members.map((m, i) => (
              <div key={m.id} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--red-deep)" }}>{m.name || "Member"}</div>
                  <button onClick={() => { if (confirm("Delete?")) updateDraft("members", draft.members.filter((x) => x.id !== m.id)); }} style={btnDelete}>Delete</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }} className="ev-grid">
                  <div><label style={labelStyle}>Photo</label><ImageThumb src={m.image} path={`members.${i}.image`} aspect="4/5" allowRemove placeholder="Photo" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label style={labelStyle}>Name</label><input value={m.name} onChange={(e) => { const a = [...draft.members]; a[i].name = e.target.value; updateDraft("members", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Category</label><input value={m.category} onChange={(e) => { const a = [...draft.members]; a[i].category = e.target.value; updateDraft("members", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Role</label><input value={m.role} onChange={(e) => { const a = [...draft.members]; a[i].role = e.target.value; updateDraft("members", a); }} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Dept</label><input value={m.dept} onChange={(e) => { const a = [...draft.members]; a[i].dept = e.target.value; updateDraft("members", a); }} style={inputStyle} /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>LinkedIn URL</label><input value={m.linkedin || ""} onChange={(e) => { const a = [...draft.members]; a[i].linkedin = e.target.value; updateDraft("members", a); }} style={inputStyle} /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Bio</label><textarea value={m.bio} onChange={(e) => { const a = [...draft.members]; a[i].bio = e.target.value; updateDraft("members", a); }} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== RECRUITMENT ========== */}
        {tab === "recruitment" && (
          <RecruitmentAdmin />
        )}

        {/* ========== IMAGES ========== */}
        {tab === "images" && (
          <div style={{ display: "grid", gap: 32 }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 className="font-serif" style={{ fontSize: 24 }}>About Us Slider</h2>
                <button onClick={() => updateDraft("aboutImages", [...draft.aboutImages, ""])} style={btnGhost}>+ Add Slide</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="ev-grid">
                {draft.aboutImages.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <ImageThumb src={img} path={`aboutImages.${i}`} aspect="16/9" />
                    <button onClick={() => updateDraft("aboutImages", draft.aboutImages.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: -10, right: -10, width: 28, height: 28, background: "var(--red-deep)", color: "white", borderRadius: 999, border: "none", cursor: "pointer", zIndex: 10 }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 className="font-serif" style={{ fontSize: 24 }}>Past Events Global Gallery</h2>
                <button onClick={() => updateDraft("pastEventsGallery", ["", ...draft.pastEventsGallery])} style={btnRedStyle}>+ Add Photo</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="ev-grid">
                {draft.pastEventsGallery.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <ImageThumb src={img} path={`pastEventsGallery.${i}`} aspect="1/1" />
                    <button onClick={() => updateDraft("pastEventsGallery", draft.pastEventsGallery.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: -10, right: -10, width: 28, height: 28, background: "var(--red-deep)", color: "white", borderRadius: 999, border: "none", cursor: "pointer", zIndex: 10 }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h2 className="font-serif" style={{ fontSize: 24, marginBottom: 20 }}>Website Assets</h2>
              <div style={{ display: "grid", gridTemplateColumns: "180px 180px", gap: 32 }} className="ev-grid">
                <div><label style={labelStyle}>Logo</label><ImageThumb src={draft.logo} path="logo" aspect="1/1" /></div>
                <div><label style={labelStyle}>Award Image</label><ImageThumb src={draft.achievementImage} path="achievementImage" aspect="4/5" /></div>
              </div>
            </div>
          </div>
        )}

        {/* ========== LINKS ========== */}
        {tab === "links" && (
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
              <h2 className="font-serif" style={{ fontSize: 24 }}>Footer Sitemap Links</h2>
              <button onClick={() => updateDraft("footerSitemap", [...draft.footerSitemap, { label: "New Link", url: "/" }])} style={btnGhost}>+ Add Link</button>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {draft.footerSitemap.map((l, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, alignItems: "center" }}>
                  <input value={l.label} onChange={(e) => { const a = [...draft.footerSitemap]; a[i].label = e.target.value; updateDraft("footerSitemap", a); }} style={inputStyle} placeholder="Label" />
                  <input value={l.url} onChange={(e) => { const a = [...draft.footerSitemap]; a[i].url = e.target.value; updateDraft("footerSitemap", a); }} style={inputStyle} placeholder="/url" />
                  <button onClick={() => updateDraft("footerSitemap", draft.footerSitemap.filter((_, idx) => idx !== i))} style={{ ...btnDelete, padding: "10px 14px" }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== ACCESS TAB (admin only, read-only) ========== */}
        {tab === "access" && userRole === "admin" && (
          <div>
            <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "28px 32px", borderRadius: 24, marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "var(--red-soft)", fontWeight: 800, marginBottom: 8, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace" }}>🔐 Access Control (Read-only)</div>
                  <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, maxWidth: 640 }}>
                    Live view of all user accounts registered in <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>src/lib/adminConfig.ts</code>. To add, remove, or change credentials, edit that file directly.
                  </div>
                </div>
                <button onClick={() => setShowPasswords(!showPasswords)} style={{ padding: "10px 18px", background: "rgba(255,255,255,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
                  {showPasswords ? "Hide" : "Reveal"} Passwords
                </button>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1.2fr 2fr", gap: 16, padding: "12px 20px", background: "var(--cream-2)", borderRadius: 12, marginBottom: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 700 }} className="access-header">
                <div>Username</div>
                <div>Password</div>
                <div>Role</div>
                <div>Description</div>
              </div>
              {userList.map(([username, info]) => (
                <div key={username} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1.2fr 2fr", gap: 16, padding: "18px 20px", borderBottom: "1px solid var(--line)", alignItems: "center", fontSize: 14 }} className="access-row">
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "var(--ink)" }}>{username}</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", color: showPasswords ? "var(--red-deep)" : "var(--ink-4)", fontWeight: 600, letterSpacing: showPasswords ? 0 : 4 }}>
                    {showPasswords ? info.pw : "••••••••"}
                  </div>
                  <div>
                    <span style={{ padding: "5px 12px", background: info.role === "admin" ? "var(--ink)" : "var(--red-mist)", color: info.role === "admin" ? "var(--cream)" : "var(--red-deep)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace" }}>
                      {info.role.replace("_", " ")}
                    </span>
                  </div>
                  <div style={{ color: "var(--ink-2)" }}>{info.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: 20, background: "var(--red-mist)", borderRadius: 16, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--red-deep)" }}>How to edit:</strong> Open <code style={{ background: "var(--cream)", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>src/lib/adminConfig.ts</code> in your code editor. Add or modify entries under the <code style={{ background: "var(--cream)", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>USERS</code> object. Changes reflect here automatically on save.
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .ev-grid { grid-template-columns: 1fr !important; }
          .magic-grid { grid-template-columns: 1fr !important; }
          .access-header, .access-row { grid-template-columns: 1fr 1fr !important; gap: 8px !important; font-size: 12px !important; }
          .access-header > div:nth-child(3), .access-header > div:nth-child(4), .access-row > div:nth-child(3), .access-row > div:nth-child(4) { grid-column: span 2; }
        }
      `}</style>
    </div>
  );
}