export type RecruitmentRole = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

export type RecruitmentConfig = {
  enabled: boolean;
  badge: string;
  title: string;
  highlight: string;
  intro: string;
  deadline: string;
  note: string;
  roles: RecruitmentRole[];
};

export type RecruitmentApplication = {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  rollNo: string;
  department: string;
  year: string;
  role: string;
  skills: string;
  experience: string;
  whyJoin: string;
  portfolio: string;
  linkedin: string;
  github: string;
  availability: string;
  consent: boolean;
};

export const RECRUITMENT_CONFIG_KEY = "iste_recruitment_config_v1";
export const RECRUITMENT_APPLICATIONS_KEY = "iste_recruitment_applications_v1";

export const DEFAULT_RECRUITMENT: RecruitmentConfig = {
  enabled: true,
  badge: "2026 Recruitment",
  title: "Build something",
  highlight: "worth joining.",
  intro: "ISTE-CUSC is looking for curious, reliable students who want to learn by doing, contribute to the chapter, and build experiences beyond the classroom.",
  deadline: "Applications are currently open",
  note: "Shortlisted applicants may be contacted for a brief interaction before final selection.",
  roles: [
    { id: "technical", name: "Technical", description: "Build, experiment, document, and support technical initiatives.", active: true },
    { id: "events", name: "Events & Operations", description: "Plan events, coordinate logistics, and make chapter experiences run smoothly.", active: true },
    { id: "media", name: "Media & Design", description: "Shape visual communication, photography, video, and social content.", active: true },
    { id: "content", name: "Content & Communication", description: "Write, research, and communicate chapter stories and announcements.", active: true },
    { id: "outreach", name: "Outreach & PR", description: "Build relationships with students, societies, speakers, and collaborators.", active: true },
    { id: "management", name: "Management", description: "Support planning, member coordination, records, and chapter administration.", active: true },
  ],
};

export function readRecruitmentConfig(): RecruitmentConfig {
  try {
    const raw = localStorage.getItem(RECRUITMENT_CONFIG_KEY);
    if (!raw) return DEFAULT_RECRUITMENT;
    const parsed = JSON.parse(raw) as Partial<RecruitmentConfig>;
    return {
      ...DEFAULT_RECRUITMENT,
      ...parsed,
      roles: Array.isArray(parsed.roles) ? parsed.roles : DEFAULT_RECRUITMENT.roles,
    };
  } catch {
    return DEFAULT_RECRUITMENT;
  }
}

export function saveRecruitmentConfig(config: RecruitmentConfig) {
  localStorage.setItem(RECRUITMENT_CONFIG_KEY, JSON.stringify(config));
}

export function readApplications(): RecruitmentApplication[] {
  try {
    const raw = localStorage.getItem(RECRUITMENT_APPLICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApplication(application: RecruitmentApplication) {
  const next = [application, ...readApplications()];
  localStorage.setItem(RECRUITMENT_APPLICATIONS_KEY, JSON.stringify(next));
}
