export const ADMIN_PATH = "/iste-ops-x7k9m2";

// ROLE BASED ACCESS CONTROL (RBAC)
export const USERS: Record<string, { pw: string; role: string; desc: string }> = {
  "admin":        { pw: "iste@2026",      role: "admin",          desc: "Full System Access" },
  "events_lead":  { pw: "events@iste01",  role: "event_manager",  desc: "Manage Upcoming & Past Events" },
  "media_lead":   { pw: "media@iste01",   role: "media_manager",  desc: "Manage Galleries & Images" },
  "content_lead": { pw: "content@iste01", role: "content_writer", desc: "Write Articles & Event Recaps" },
  "hr_lead":      { pw: "hr@iste01",      role: "hr_manager",     desc: "Manage Team Members Directory" },
  "webmaster":    { pw: "web@iste01",     role: "webmaster",      desc: "Edit Settings & Footer Links" },
};

export const SESSION_HOURS = 2;
export const MAX_ATTEMPTS = 5;
export const LOCKOUT_MINUTES = 15;

export const AUTH_KEY = "iste_auth_session_v3";
export const ATTEMPT_KEY = "iste_auth_attempts_v3";