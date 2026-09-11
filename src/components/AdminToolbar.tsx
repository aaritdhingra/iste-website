import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContent } from "../store/ContentStore";
import { ADMIN_PATH } from "../lib/adminConfig";

export default function AdminToolbar() {
  const { isAdmin, editMode, setEditMode, logout, exportJSON, importJSON, hasChanges, saveChanges, discardChanges, sessionExpiresIn } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const loc = useLocation();

  if (!isAdmin) return null;

  const minsLeft = Math.max(0, Math.floor(sessionExpiresIn / 60000));
  const onPortal = loc.pathname === ADMIN_PATH;

  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
      background: "var(--ink)", color: "var(--cream)", borderRadius: 999, padding: "8px 8px 8px 24px",
      display: "flex", alignItems: "center", gap: 10, boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)",
      fontSize: 12, flexWrap: "wrap", border: hasChanges ? "2px solid var(--red)" : "none", maxWidth: "95vw",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: editMode || onPortal ? "#4ade80" : "var(--red-soft)" }} />
        Admin &bull; {minsLeft}m left
      </span>

      {!onPortal && (
        <button onClick={() => setEditMode(!editMode)} className="hoverable" style={{ padding: "8px 16px", background: editMode ? "var(--red)" : "rgba(250,246,239,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {editMode ? "Inline Editing On" : "Enable Editing"}
        </button>
      )}

      {!onPortal ? (
        <button onClick={() => nav(ADMIN_PATH)} className="hoverable" style={{ padding: "8px 16px", background: "rgba(250,246,239,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Open Portal</button>
      ) : (
        <button onClick={() => nav("/")} className="hoverable" style={{ padding: "8px 16px", background: "rgba(250,246,239,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Exit Portal</button>
      )}

      <button onClick={exportJSON} className="hoverable" style={{ padding: "8px 16px", background: "rgba(250,246,239,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Backup</button>
      <button onClick={() => inputRef.current?.click()} className="hoverable" style={{ padding: "8px 16px", background: "rgba(250,246,239,0.1)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Restore</button>
      <input ref={inputRef} type="file" accept="application/json" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) importJSON(f); }} />

      {hasChanges && (
        <div style={{ display: "flex", gap: 4, background: "rgba(250,246,239,0.1)", padding: 4, borderRadius: 999 }}>
          <button onClick={discardChanges} className="hoverable" style={{ padding: "4px 12px", color: "var(--red-soft)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Discard</button>
          <button onClick={saveChanges} className="hoverable" style={{ padding: "4px 16px", background: "#4ade80", color: "var(--ink)", borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Save Changes</button>
        </div>
      )}

      <button onClick={() => { logout(); nav("/"); }} className="hoverable" style={{ padding: "8px 16px", background: "var(--red-deep)", color: "var(--cream)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "auto" }}>Logout</button>
    </div>
  );
}