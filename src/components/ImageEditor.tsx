import { useRef, useState, useEffect } from "react";
import { useContent, fileToBase64 } from "../store/ContentStore";
import { Close } from "./Icons";

type Props = {
  open: boolean;
  onClose: () => void;
  path: string;         // dot-path to update in draft e.g. "logo" or "pastEvents.2.image"
  currentSrc: string;
  title?: string;
  aspect?: string;      // css aspect-ratio value
  allowRemove?: boolean;
};

export function ImageEditor({ open, onClose, path, currentSrc, title = "Update Image", aspect = "16 / 9", allowRemove = false }: Props) {
  const { updateDraft } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentSrc);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");

  useEffect(() => { if (open) { setPreview(currentSrc); setFileName(""); setFileSize(""); } }, [open, currentSrc]);

  // Lock scroll when open
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const readFile = async (f: File) => {
    if (!f.type.startsWith("image/")) { alert("Please choose an image file (PNG, JPG, WEBP, GIF)."); return; }
    setBusy(true);
    setFileName(f.name);
    setFileSize((f.size / 1024).toFixed(1) + " KB");
    const b64 = await fileToBase64(f);
    setPreview(b64);
    setBusy(false);
  };

  const onSelect = (files: FileList | null) => {
    if (!files || !files[0]) return;
    readFile(files[0]);
  };

  const apply = () => {
    updateDraft(path, preview);
    onClose();
  };

  const remove = () => {
    if (!confirm("Remove this image?")) return;
    updateDraft(path, "");
    onClose();
  };

  const reset = () => {
    setPreview(currentSrc);
    setFileName("");
    setFileSize("");
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(26, 22, 19, 0.72)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div className="modal-panel" style={{
        width: "100%", maxWidth: 720,
        background: "var(--cream)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)",
        display: "flex", flexDirection: "column",
        maxHeight: "90vh",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)" }}>
          <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red-deep)", marginBottom: 4, fontWeight: 700 }}>Media Manager</div>
            <div className="font-serif" style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</div>
          </div>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 999, background: "var(--cream-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", transition: "all 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--red)"; (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--cream-2)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
          >
            <Close width={18} height={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 32, overflow: "auto" }}>
          {/* Preview / Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); onSelect(e.dataTransfer.files); }}
            onClick={() => inputRef.current?.click()}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: aspect,
              borderRadius: 20,
              overflow: "hidden",
              background: preview ? "var(--cream-3)" : "var(--cream-2)",
              border: drag ? "2px solid var(--red)" : "2px dashed var(--red-soft)",
              transition: "all 0.2s",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: busy ? 0.4 : 1 }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: drag ? "rgba(232,117,107,0.3)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--cream)", fontSize: 16, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  transition: "background 0.2s",
                }}>
                  {drag && "Drop to preview"}
                </div>
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  padding: "6px 14px", background: "var(--ink)", color: "var(--cream)",
                  borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "JetBrains Mono, monospace",
                }}>
                  {fileName ? "New Upload" : "Current"}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "var(--ink-3)", padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 12, color: "var(--red)" }}>+</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Drag & drop an image</div>
                <div style={{ fontSize: 12 }}>or click to browse from your computer</div>
              </div>
            )}
          </div>

          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" style={{ display: "none" }} onChange={(e) => onSelect(e.target.files)} />

          {/* File info */}
          {fileName && (
            <div style={{ marginTop: 20, padding: 16, background: "var(--cream-2)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{fileName}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>{fileSize}</div>
              </div>
              <button onClick={reset} style={{ padding: "6px 14px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-2)" }}>
                Cancel new upload
              </button>
            </div>
          )}

          {/* Quick actions row */}
          <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => inputRef.current?.click()} style={{
              padding: "10px 18px", background: "var(--cream-2)", borderRadius: 999,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)",
              display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--line)",
            }}>
              Choose Different File
            </button>
            {allowRemove && preview && (
              <button onClick={remove} style={{
                padding: "10px 18px", background: "transparent", border: "1px solid var(--red-soft)",
                color: "var(--red-deep)", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                Remove Image
              </button>
            )}
          </div>

          <div style={{ marginTop: 20, padding: 14, background: "var(--red-mist)", borderRadius: 12, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--red-deep)" }}>Tip:</strong> Recommended formats — PNG, JPG or WEBP. Keep it under ~2 MB for best performance. Changes are saved as a Draft; hit <em>Save Changes</em> in the toolbar to publish.
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ padding: "20px 32px", borderTop: "1px solid var(--line)", background: "var(--cream-2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Press <kbd style={{ padding: "2px 8px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 4, fontFamily: "inherit", fontSize: 10 }}>Esc</kbd> to close
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{
              padding: "12px 22px", background: "transparent", border: "1px solid var(--ink)",
              borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)",
            }}>
              Cancel
            </button>
            <button onClick={apply} disabled={busy} style={{
              padding: "12px 26px",
              background: "var(--red)", color: "var(--cream)",
              borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
              opacity: busy ? 0.6 : 1,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              Apply Image →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}