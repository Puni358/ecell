export interface HistoryMilestone {
  id: string;
  year: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  image?: string;
  tag?: string;
}

/**
 * Historical milestones for E-Cell UVCE in chronological order,
 * compiled exclusively from existing repository records:
 * - History archive in commit 378b217 and About.tsx
 * - Startups incubation records in startups.ts
 * - Achievements data in achievements.ts
 * - Events archive in events.ts
 */
export const historyMilestones: HistoryMilestone[] = [
  {
    id: "m-1917",
    year: "1917",
    title: "UVCE Foundation",
    shortSummary:
      "Established by Bharat Ratna Sir M Visvesvaraya as the 1st engineering college in Karnataka.",
    fullDescription:
      "The University Visvesvaraya College of Engineering was established by Bharat Ratna Sir M Visvesvaraya. As the first engineering college in Karnataka and fifth in India, UVCE has pioneered technical education for over a century, providing the foundation for campus innovation.",
    tag: "Legacy",
  },
  {
    id: "m-2014",
    year: "2014",
    title: "E-Cell Founded",
    shortSummary:
      "Founded by Tejas Narayan as a student-run body to foster entrepreneurial culture at UVCE.",
    fullDescription:
      "The Entrepreneurship Cell of UVCE was founded in 2014 by Tejas Narayan, standing tall as a student-run body with the goal of fostering an entrepreneurial culture and providing unique opportunities from ideation to venture execution.",
    tag: "Founding",
  },
  {
    id: "m-2017",
    year: "2017",
    title: "First E-Summit",
    shortSummary:
      "Inaugural campus entrepreneurship summit hosted with 200+ attendees and founders.",
    fullDescription:
      "The inaugural entrepreneurship summit brought together 200+ students, alumni founders, and mentors, establishing E-Cell's flagship platform for keynote sessions, workshops, and business discussions.",
    image:
      "https://res.cloudinary.com/dsrudxfnx/image/upload/v1766773417/IMG_20250910_165736875_ht0gk2.jpg",
    tag: "Flagship",
  },
  {
    id: "m-2019",
    year: "2019",
    title: "Alumni Re-organization & Incubation Launch",
    shortSummary:
      "Club re-organized with alumni support; launched flagship startup incubation initiative.",
    fullDescription:
      "In 2019, the club was re-organized with significant support from UVCE alumni. Alongside the restructuring, E-Cell launched its flagship startup incubation program to guide student founders from ideation to venture creation.",
    tag: "Expansion",
  },
  {
    id: "m-2021",
    year: "2021",
    title: "Virtual Pivot & Student Ventures",
    shortSummary:
      "Adapted programs to digital platforms during the pandemic while incubating student startups.",
    fullDescription:
      "E-Cell successfully adapted its workshops and speaker sessions to digital formats during the pandemic, continuing mentorship without pause and supporting early-stage student technology ventures.",
    tag: "Resilience",
  },
  {
    id: "m-2023",
    year: "2023",
    title: "Start-Up to Win & Ecosystem Growth",
    shortSummary:
      "Flagship 3-day workshop with Mr. B.V. Jagadeesh and national Bull Market trading challenges.",
    fullDescription:
      "Conducted the transformative 'Start-Up to Win' workshop led by industry leader Mr. B.V. Jagadeesh (Chairman, UVCE Foundation) and distinguished alumni entrepreneurs, alongside Bull Market 6.0 which engaged 547 participants nationwide in financial market simulation.",
    image:
      "https://res.cloudinary.com/dsrudxfnx/image/upload/v1769017774/StartupToWin_ufjpba.jpg",
    tag: "Mentorship",
  },
  {
    id: "m-2024",
    year: "2024",
    title: "Best Campus E-Cell & Milestone Reach",
    shortSummary:
      "Awarded Best Campus E-Cell by Startup Karnataka; Smart India Hackathon wins.",
    fullDescription:
      "Recognized as the top entrepreneurship cell among Karnataka engineering colleges by Startup Karnataka, while student member teams secured first prizes in the Smart India Hackathon and total student outreach crossed 1,500+ attendees across 200+ events.",
    tag: "Recognition",
  },
  {
    id: "m-2025",
    year: "2025-26",
    title: "BRIDGE Initiative & Sir MV Fellowship",
    shortSummary:
      "Campus-wide venture acceleration in association with MARVEL UVCE.",
    fullDescription:
      "Launched the campus-wide BRIDGE Initiative and the Sir M. Visvesvaraya Entrepreneur & Startup Fellowship in association with MARVEL UVCE, uniting students, faculty, and the UVCE Graduates Association for structured long-term venture incubation.",
    image:
      "https://res.cloudinary.com/dsrudxfnx/image/upload/v1768933439/BRIDGE_zdu41o.jpg",
    tag: "Innovation",
  },
];
