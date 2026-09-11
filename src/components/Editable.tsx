import { useRef, useState } from "react";
import { useContent } from "../store/ContentStore";
import { ImageEditor } from "./ImageEditor";

type Props = { path: string; value: string; as?: any; multiline?: boolean; style?: React.CSSProperties; className?: string; };

export function EditableText({ path, value, as = "span", multiline, style, className }: Props) {
  const { editMode, updateDraft } = useContent();
  const ref = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState(false);

  if (!editMode) { const Comp = as; return <Comp style={style} className={className}>{value}</Comp>; }

  const Comp = as;
  return (
    <Comp
      ref={ref as any}
      className={className}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocused(true)}
      onBlur={(e: any) => {
        setFocused(false);
        const text = multiline ? e.currentTarget.innerText : e.currentTarget.innerText.replace(/\n/g, " ");
        updateDraft(path, text.trim());
      }}
      style={{
        ...style,
        outline: focused ? "2px solid var(--red)" : "1px dashed rgba(232,117,107,0.4)",
        outlineOffset: 4, borderRadius: 4, cursor: "text", minWidth: 40,
        display: as === "span" ? "inline-block" : "block", transition: "outline 0.15s",
      }}
    >
      {value}
    </Comp>
  );
}

export function EditableImage({ path, src, alt, style, className, title, aspect = "16 / 9", allowRemove = false }: { path: string; src: string; alt: string; style?: React.CSSProperties; className?: string; title?: string; aspect?: string; allowRemove?: boolean; }) {
  const { editMode } = useContent();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  if (!editMode) return <img src={src} alt={alt} style={style} className={className} />;

  return (
    <>
      <div
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative", cursor: "pointer", display: "block", overflow: "hidden",
          outline: hover ? "2.5px solid var(--red)" : "2px dashed rgba(232,117,107,0.5)",
          outlineOffset: -2, ...style,
        }}
        className={className}
      >
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s, filter 0.2s", transform: hover ? "scale(1.02)" : "scale(1)", filter: hover ? "brightness(0.75)" : "none" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hover ? "rgba(26,22,19,0.35)" : "transparent",
          transition: "background 0.2s",
          pointerEvents: "none",
        }}>
          {hover && (
            <div style={{
              padding: "12px 20px",
              background: "var(--cream)",
              color: "var(--ink)",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", gap: 8,
              animation: "scaleIn 0.25s",
            }}>
              Edit Image
            </div>
          )}
        </div>
        {!hover && (
          <div style={{
            position: "absolute", top: 10, right: 10,
            padding: "4px 12px", background: "var(--red)", color: "var(--cream)",
            borderRadius: 999, fontSize: 10, fontWeight: 800,
            letterSpacing: "0.1em", textTransform: "uppercase",
            pointerEvents: "none",
            fontFamily: "JetBrains Mono, monospace",
          }}>
            Editable
          </div>
        )}
      </div>

      <ImageEditor
        open={open}
        onClose={() => setOpen(false)}
        path={path}
        currentSrc={src}
        title={title || `Update ${alt}`}
        aspect={aspect}
        allowRemove={allowRemove}
      />
    </>
  );
}