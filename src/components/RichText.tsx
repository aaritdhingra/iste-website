export function RichText({ content, className }: { content: string; className?: string }) {
  const parseMarkup = (text: string) => {
    if (!text) return "";
    let html = text
      .replace(/</g, "&lt;").replace(/>/g, "&gt;") // prevent raw HTML injection
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // italic
      .replace(/\/red\((.*?)\)/g, "<span style='color: var(--red-deep); font-weight: 600'>$1</span>")
      .replace(/\/size:(\d+)\((.*?)\)/g, "<span style='font-size: $1px; line-height: 1.2'>$2</span>")
      .replace(/\/img\((.*?)\)/g, "<img src='$1' style='width:100%; border-radius:24px; margin: 32px 0; border: 1px solid var(--line); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1)' />")
      .replace(/\/h1\((.*?)\)/g, "<h1 class='font-serif' style='font-size: clamp(32px, 5vw, 48px); margin: 48px 0 24px; letter-spacing: -0.02em; color: var(--ink); line-height: 1.1'>$1</h1>")
      .replace(/\/h2\((.*?)\)/g, "<h2 class='font-serif' style='font-size: clamp(24px, 4vw, 36px); margin: 40px 0 20px; letter-spacing: -0.01em; color: var(--ink); line-height: 1.2'>$1</h2>")
      .replace(/\n\n/g, "</p><p style='margin-bottom: 24px'>")
      .replace(/\n/g, "<br/>");
    return `<p style='margin-bottom: 24px'>${html}</p>`;
  };

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: parseMarkup(content) }} 
      style={{ fontSize: 18, lineHeight: 1.8, color: "var(--ink-2)" }}
    />
  );
}
