export const SITE = {
  short: "ISTE",
  full: "Indian Society for Technical Education",
  chapter: "Student Chapter",
  university: "Chandigarh University",
  tagline: "Build, lead, and innovate.",
  intro: "A professional student society dedicated to technical excellence, industry exposure, leadership development, and meaningful innovation beyond the classroom.",
  overview: "We are the Indian Society for Technical Education Student Chapter at Chandigarh University â€” a dynamic, student-driven community built to inspire innovation, creativity, and technological excellence. Backed by the prestigious ISTE network, we aim to create a platform where passionate minds collaborate, innovate, and grow into future leaders of the tech world.",
  overview2: "From coding challenges and technical workshops to hackathons, research initiatives, and networking opportunities, ISTE is more than just a society â€” it's a hub of ideas, ambition, and endless possibilities. We empower students to explore beyond classrooms, transform concepts into impactful solutions, and become part of a thriving community shaping the future of technology.",
  email: "iste@cumail.in",
  location: "Chandigarh University, Mohali, Punjab",
  instagram: "https://instagram.com/iste.cu",
  linkedin: "https://linkedin.com/company/iste-cu",
  community: "700+",
};

export const PILLARS = [
  { n: "01", tag: "Applied Learning", title: "Technical Activities", desc: "Structured workshops, seminars, competitions, and chapter programs that support academic and practical development." },
  { n: "02", tag: "Chapter Experiences", title: "Student Development", desc: "Opportunities for skill building, teamwork, leadership exposure, and professional discipline in chapter participation." },
  { n: "03", tag: "Career Readiness", title: "Official Communication", desc: "A formal channel for verified chapter notices, event publication, and recruitment information intended for public view." },
];

export const VISION = [
  "Promote technical excellence and continuous learning among students.",
  "Create an organized platform for workshops, events, and academic engagement.",
  "Support professional development through chapter-led initiatives.",
  "Encourage collaboration, discipline, and responsible technical leadership.",
];

export const UPCOMING_EVENTS = [
  {
    id: "synccode",
    title: "SyncCode: Git & GitHub Fundamentals",
    time: "9:30 AM - 12:00 PM",
    date: "5 August, 2026",
    desc: "Master Git & GitHub fundamentals through hands-on version control, collaboration, and real-world workflow practices.",
    participants: "Individual",
    prize: "Certificate",
    fee: "Free",
    location: "Chandigarh University",
    status: "Closed",
    poster: "syncode",
  },
  {
    id: "technicia26",
    title: "Technicia'26",
    time: "9:00 AM - 6:00 PM",
    date: "20 September, 2026",
    desc: "A flagship ISTE-CUSC tech fest featuring hackathons, CUMUN, Capture The Flag, ideathons, workshops, and interactive technical events.",
    participants: "Individual",
    prize: "Innovation Showcase",
    fee: "Free",
    location: "Chandigarh University",
    status: "Open",
    poster: "technicia",
  },
];

export const PAST_EVENTS = [
  { n: "01", title: "Technicia", date: "15 Oct 2025", desc: "A national level flagship technical fest featuring hackathons, Capture The Flag challenges, ideathons, and workshops." },
  { n: "02", title: "CUMUN", date: "27 Feb 2025", desc: "Chandigarh University Model United Nations organized by the ISTE Student Chapter to promote diplomacy, global debate, and communication skills." },
  { n: "03", title: "Mind Sprint", date: "21 Jan 2025", desc: "A high-intensity technical quiz and problem-solving competition testing computational logic and speed." },
  { n: "04", title: "Augury", date: "23 Oct 2024", desc: "Official recognition ceremony and induction milestone for the ISTE Student Chapter as a registered professional society." },
  { n: "05", title: "Logo Launch", date: "30 Sep 2024", desc: "The official launch event introducing the brand logo and identity of the ISTE Student Chapter at Chandigarh University." },
];

export const ACHIEVEMENTS = [
  {
    year: "2026",
    items: [
      { title: "Best Professional Society Award", desc: "Presented to the Indian Society for Technical Education (ISTE) in recognition of academic excellence, tech innovation, and leadership." },
      { title: "Change Maker Award", desc: "Recognized for engineering and technology education leadership at Chandigarh University." },
    ],
  },
];

export const NAV = [
  { to: "/", label: "Home Page" },
  { to: "/about", label: "About Us" },
  { to: "/events", label: "Upcoming Events" },
  { to: "/past-events", label: "Previous Events" },
  { to: "/recruitment", label: "Recruitment" },
];
export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85", alt: "ISTE Event", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85", alt: "Technical Workshop", cat: "Workshops" },
  { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=85", alt: "Technology", cat: "Technology" },
];

type Project = {
  id: string;
  title: string;
  type: string;
  status: string;
  year: string;
  desc: string;
  tech: string[];
  image: string;
  problem: string;
  solution: string;
  team: string;
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Coming Soon",
    type: "ISTE Project",
    status: "In Development",
    year: "2026",
    desc: "Innovative projects and initiatives by ISTE CUSC.",
    tech: ["Web", "Technology"],
    image: "/logo.jpg",
    problem: "Project details will be announced soon.",
    solution: "More information coming soon.",
    team: "ISTE CUSC"
  }
];
type TeamMember = {
  name: string;
  role: string;
  image?: string;
  dept?: string;
  bio?: string;
  linkedin?: string;
};

type TeamGroup = {
  cat: string;
  people: TeamMember[];
};

export const TEAM: TeamGroup[] = [
  {
    cat: "Core Team",
    people: []
  }
];



