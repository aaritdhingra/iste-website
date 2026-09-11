import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { USERS, AUTH_KEY, ATTEMPT_KEY, SESSION_HOURS, MAX_ATTEMPTS, LOCKOUT_MINUTES } from "../lib/adminConfig";

const STORAGE_KEY = "iste_site_content_v6";

export type EventItem = { id: string; title: string; time: string; date: string; desc: string; participants: string; prize: string; fee: string; location: string; status: "Open" | "Closed"; poster?: string; };
export type PastEventItem = { id: string; n: string; title: string; date: string; desc: string; details: string; image?: string; };
export type Pillar = { n: string; tag: string; title: string; desc: string };
export type LinkItem = { label: string; url: string };
export type Member = { id: string; name: string; role: string; dept: string; bio: string; image?: string; linkedin?: string; category: string; };

export type SiteContent = {
  logo: string; achievementImage: string; aboutImages: string[]; pastEventsGallery: string[];
  site: { tagline: string; intro: string; overview: string; overview2: string; email: string; location: string; instagram: string; linkedin: string; community: string; university: string; };
  pillars: Pillar[]; vision: string[]; upcomingEvents: EventItem[]; pastEvents: PastEventItem[]; footerSitemap: LinkItem[]; members: Member[];
};

export const DEFAULT_CONTENT: SiteContent = {
  logo: "/logo.jpg", achievementImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=85",
  aboutImages: ["https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&q=85", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=85", "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=85"],
  pastEventsGallery: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"],
  site: { tagline: "Build, lead, and innovate.", intro: "A professional student society dedicated to technical excellence, industry exposure, leadership development, and meaningful innovation beyond the classroom.", overview: "We are the Indian Society for Technical Education Student Chapter at Chandigarh University — a dynamic, student-driven community built to inspire innovation, creativity, and technological excellence. Backed by the prestigious ISTE network, we aim to create a platform where passionate minds collaborate, innovate, and grow into future leaders of the tech world.", overview2: "From coding challenges and technical workshops to hackathons, research initiatives, and networking opportunities, ISTE is more than just a society — it's a hub of ideas, ambition, and endless possibilities. We empower students to explore beyond classrooms, transform concepts into impactful solutions, and become part of a thriving community shaping the future of technology.", email: "iste@cumail.in", location: "Chandigarh University, Mohali, Punjab", instagram: "https://instagram.com/iste.cu", linkedin: "https://linkedin.com/company/iste-cu", community: "700+", university: "Chandigarh University" },
  pillars: [{ n: "01", tag: "Applied Learning", title: "Technical Activities", desc: "Structured workshops, seminars, competitions, and chapter programs that support academic and practical development." }, { n: "02", tag: "Chapter Experiences", title: "Student Development", desc: "Opportunities for skill building, teamwork, leadership exposure, and professional discipline in chapter participation." }, { n: "03", tag: "Career Readiness", title: "Official Communication", desc: "A formal channel for verified chapter notices, event publication, and recruitment information intended for public view." }],
  vision: ["Promote technical excellence and continuous learning among students.", "Create an organized platform for workshops, events, and academic engagement.", "Support professional development through chapter-led initiatives.", "Encourage collaboration, discipline, and responsible technical leadership."],
  upcomingEvents: [{ id: "synccode", title: "SyncCode: Git & GitHub Fundamentals", time: "9:30 AM - 12:00 PM", date: "5 August, 2026", desc: "Master Git & GitHub fundamentals through hands-on version control.", participants: "Individual", prize: "Certificate", fee: "Free", location: "Chandigarh University", status: "Closed" }, { id: "technicia26", title: "Technicia'26", time: "9:00 AM - 6:00 PM", date: "20 September, 2026", desc: "A flagship ISTE-CUSC tech fest featuring hackathons, CUMUN, Capture The Flag.", participants: "Individual", prize: "Innovation Showcase", fee: "Free", location: "Chandigarh University", status: "Open" }],
  pastEvents: [
    { id: "technicia-25", n: "01", title: "Technicia", date: "15 Oct 2025", desc: "A national level flagship technical fest featuring hackathons and challenges.", details: "/h1(A Celebration of Tech)\n\nTechnicia 2025 was our biggest flagship event ever. With over /red(1500+ participants), we broke all previous records.\n\n/size:24(Highlights:)\n**1. 36-Hour Hackathon**\n**2. Capture The Flag**\n**3. Robo Wars**\n\n/img(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80)\n\nThe energy was absolutely unmatched. Thank you to everyone who made it possible!", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85" }, 
    { id: "cumun-25", n: "02", title: "CUMUN", date: "27 Feb 2025", desc: "Model United Nations to promote diplomacy, global debate.", details: "/h1(Diplomacy & Debate)\n\nChandigarh University Model United Nations challenged students to think globally.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85" }
  ],
  footerSitemap: [{ label: "Home", url: "/" }, { label: "About", url: "/about" }, { label: "Events", url: "/events" }, { label: "Archive", url: "/past-events" }, { label: "Members", url: "/members" }, { label: "Join Us", url: "/recruitment" }],
  members: [
    { id: "m1", name: "Sneha", role: "President", dept: "Leadership", bio: "Setting strategic direction and overseeing execution.", category: "Core Team" },
    { id: "m2", name: "Ritik", role: "Vice President", dept: "Leadership", bio: "Owning events operations and internal management.", category: "Core Team" },
    { id: "m3", name: "Tanisha", role: "General Secretary", dept: "Operations", bio: "Coordinating logistics and member engagement.", category: "Core Team" },
    { id: "m4", name: "Areeb", role: "Joint Secretary", dept: "Operations", bio: "Assisting in chapter programs and communications.", category: "Core Team" },
    { id: "m5", name: "Darshan", role: "Joint Secretary", dept: "Operations", bio: "Supporting technical events and execution.", category: "Core Team" },
    { id: "m6", name: "Devanshu", role: "Joint Secretary", dept: "Operations", bio: "Handling inter-society partnerships.", category: "Core Team" },
    { id: "m7", name: "Ritish", role: "Joint Secretary", dept: "Operations", bio: "Managing volunteer coordination and schedules.", category: "Core Team" },
  ],
};

type AuthSession = { role: string; expiresAt: number };
function readSession(): string | false { try { const raw = localStorage.getItem(AUTH_KEY); if (!raw) return false; const s: AuthSession = JSON.parse(raw); if (!s.role || Date.now() > s.expiresAt) { localStorage.removeItem(AUTH_KEY); return false; } return s.role; } catch { localStorage.removeItem(AUTH_KEY); return false; } }
function writeSession(role: string) { localStorage.setItem(AUTH_KEY, JSON.stringify({ role, expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000 })); }
function getAttempts() { try { const r = localStorage.getItem(ATTEMPT_KEY); return r ? JSON.parse(r) : { count: 0, lockedUntil: 0 }; } catch { return { count: 0, lockedUntil: 0 }; } }
function setAttempts(c: number, l = 0) { localStorage.setItem(ATTEMPT_KEY, JSON.stringify({ count: c, lockedUntil: l })); }

type Ctx = { content: SiteContent; draft: SiteContent; updateDraft: (path: string, value: any) => void; saveChanges: () => void; discardChanges: () => void; hasChanges: boolean; userRole: string | false; login: (usr: string, pw: string) => { ok: boolean; error?: string }; logout: () => void; editMode: boolean; setEditMode: (b: boolean) => void; exportJSON: () => void; importJSON: (file: File) => Promise<void>; sessionExpiresIn: number; };
const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => { try { const r = localStorage.getItem(STORAGE_KEY); if (r) return { ...DEFAULT_CONTENT, ...JSON.parse(r) }; } catch {} return DEFAULT_CONTENT; });
  const [draft, setDraft] = useState<SiteContent>(content);
  const [userRole, setUserRole] = useState(() => readSession());
  const [editMode, setEditMode] = useState(false);
  const [sessionExpiresIn, setSessionExpiresIn] = useState(0);

  useEffect(() => {
    if (!userRole) return;
    const tick = () => { const raw = localStorage.getItem(AUTH_KEY); if (!raw) { setUserRole(false); setEditMode(false); return; } const s: AuthSession = JSON.parse(raw); const left = s.expiresAt - Date.now(); setSessionExpiresIn(left); if (left <= 0) { localStorage.removeItem(AUTH_KEY); setUserRole(false); setEditMode(false); alert("Session expired."); } };
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, [userRole]);

  useEffect(() => { setDraft(content); }, [content]);
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(content);

  const updateDraft = (path: string, value: any) => { setDraft((prev) => { const clone = JSON.parse(JSON.stringify(prev)); const parts = path.split("."); let cur: any = clone; for (let i = 0; i < parts.length - 1; i++) { const key: any = parts[i].match(/^\d+$/) ? Number(parts[i]) : parts[i]; cur = cur[key]; } const last: any = parts[parts.length - 1].match(/^\d+$/) ? Number(parts[parts.length - 1]) : parts[parts.length - 1]; cur[last] = value; return clone; }); };
  const saveChanges = () => { setContent(draft); localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); };
  const discardChanges = () => { if (confirm("Discard changes?")) setDraft(content); };

  const login = (usr: string, pw: string) => {
    const att = getAttempts();
    if (att.lockedUntil && Date.now() < att.lockedUntil) return { ok: false, error: `Locked for ${Math.ceil((att.lockedUntil - Date.now()) / 60000)} mins.` };
    if (att.lockedUntil && Date.now() >= att.lockedUntil) setAttempts(0, 0);
    const user = USERS[usr];
    if (user && user.pw === pw) { writeSession(user.role); setAttempts(0, 0); setUserRole(user.role); return { ok: true }; }
    const next = (att.count || 0) + 1;
    if (next >= MAX_ATTEMPTS) { setAttempts(next, Date.now() + LOCKOUT_MINUTES * 60 * 1000); return { ok: false, error: "Locked out." }; }
    setAttempts(next, 0); return { ok: false, error: `Wrong credentials. ${MAX_ATTEMPTS - next} attempts left.` };
  };

  const logout = () => { localStorage.removeItem(AUTH_KEY); setUserRole(false); setEditMode(false); };
  const exportJSON = () => { const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "iste-content.json"; a.click(); URL.revokeObjectURL(url); };
  const importJSON = async (f: File) => { const parsed = JSON.parse(await f.text()); const m = { ...DEFAULT_CONTENT, ...parsed }; setContent(m); setDraft(m); localStorage.setItem(STORAGE_KEY, JSON.stringify(m)); alert("Imported!"); };

  const displayContent = (userRole && editMode) ? draft : content;
  return <ContentContext.Provider value={{ content: displayContent, draft, updateDraft, saveChanges, discardChanges, hasChanges, userRole, login, logout, editMode, setEditMode, exportJSON, importJSON, sessionExpiresIn }}>{children}</ContentContext.Provider>;
}

export function useContent() { const ctx = useContext(ContentContext); if (!ctx) throw new Error("Missing"); return ctx; }
export function fileToBase64(file: File): Promise<string> { return new Promise((r, j) => { const fr = new FileReader(); fr.onload = () => r(fr.result as string); fr.onerror = j; fr.readAsDataURL(file); }); }