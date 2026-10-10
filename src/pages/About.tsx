import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "../../gsap-public/gsap-public/esm/index.js";
import { ScrollTrigger } from "../../gsap-public/gsap-public/esm/ScrollTrigger.js";
import {
  Target,
  Eye,
  History,
  Crown,
  Megaphone,
  Palette,
  Terminal,
  FileText,
  Settings,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  ExternalLink,
  Linkedin,
  Instagram,
  Github,
  Mail,
  LucideIcon,
} from "lucide-react";
import { teamData } from "../data/team";
import TeamCard from "../components/TeamCard";
import { TeamMember, sanitizeSocialLinks } from "../utils/teamUtils";

// Department metadata definition
interface DeptConfig {
  label: string;
  icon: LucideIcon;
  description: string;
}

const departmentMeta: Record<string, DeptConfig> = {
  presidents: {
    label: "Core Leadership",
    icon: Crown,
    description: "Presidential leadership guiding vision, strategy, and cross-team execution.",
  },
  publicRelationsTeam: {
    label: "Public Relations",
    icon: Megaphone,
    description: "External outreach, institutional communication, and campus partnerships.",
  },
  designTeam: {
    label: "Design Team",
    icon: Palette,
    description: "Visual identity, creative media, event branding, and UI/UX design.",
  },
  technicalTeam: {
    label: "Technical Team",
    icon: Terminal,
    description: "Web development, digital platforms, technical infrastructure, and tech initiatives.",
  },
  marketingTeam: {
    label: "Marketing Team",
    icon: Target,
    description: "Campaign strategy, event promotion, audience acquisition, and sponsor engagement.",
  },
  contentTeam: {
    label: "Content Team",
    icon: FileText,
    description: "Editorial curation, storytelling, newsletters, and entrepreneurial articles.",
  },
  operationsTeam: {
    label: "Operations Team",
    icon: Settings,
    description: "Event logistics, on-ground coordination, venue management, and workflow planning.",
  },
};

const getDeptMeta = (key: string): DeptConfig => {
  if (departmentMeta[key]) return departmentMeta[key];
  const formatted = key.replace(/([A-Z])/g, " $1");
  const label = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  return {
    label,
    icon: Users,
    description: `${label} members and leadership.`,
  };
};

const isLead = (post: string): boolean => {
  const lower = post.toLowerCase();
  return ["president", "lead", "head", "vice president"].some((r) =>
    lower.includes(r),
  );
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  // Council Year State (2025 default, with 2024 available)
  const [selectedYear, setSelectedYear] = useState<string>(teamData[0]?.year || "2025");
  const selectedTeam = teamData.find((team) => team.year === selectedYear);

  // Derive department list from active year's data
  const departments = useMemo(() => {
    if (!selectedTeam) return [];
    return Object.entries(selectedTeam)
      .filter(([key, val]) => key !== "year" && Array.isArray(val) && val.length > 0)
      .map(([key, val]) => ({
        key,
        members: val as TeamMember[],
        count: (val as TeamMember[]).length,
        ...getDeptMeta(key),
      }));
  }, [selectedTeam]);

  // Selected Department Key State
  const [selectedDeptKey, setSelectedDeptKey] = useState<string>(
    departments[0]?.key || "presidents"
  );

  // Active Member Modal State for progressive disclosure
  const [activeModalMember, setActiveModalMember] = useState<{
    member: TeamMember;
    deptLabel: string;
  } | null>(null);

  // Sync / validate department selection when changing year
  useEffect(() => {
    if (departments.length > 0) {
      const exists = departments.some((d) => d.key === selectedDeptKey);
      if (!exists) {
        setSelectedDeptKey(departments[0].key);
      }
    }
  }, [selectedYear, departments, selectedDeptKey]);

  // Modal escape key handler and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalMember(null);
      }
    };
    if (activeModalMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalMember]);

  // Resolve currently active department
  const activeDeptIndex = departments.findIndex((d) => d.key === selectedDeptKey);
  const activeDept =
    activeDeptIndex !== -1 ? departments[activeDeptIndex] : departments[0];

  const leads = useMemo(
    () => (activeDept ? activeDept.members.filter((m) => isLead(m.post)) : []),
    [activeDept]
  );
  const regularMembers = useMemo(
    () => (activeDept ? activeDept.members.filter((m) => !isLead(m.post)) : []),
    [activeDept]
  );

  // Department step navigation helpers
  const goToNextDept = useCallback(() => {
    if (departments.length === 0) return;
    const nextIdx = (activeDeptIndex + 1) % departments.length;
    setSelectedDeptKey(departments[nextIdx].key);
  }, [activeDeptIndex, departments]);

  const goToPrevDept = useCallback(() => {
    if (departments.length === 0) return;
    const prevIdx = (activeDeptIndex - 1 + departments.length) % departments.length;
    setSelectedDeptKey(departments[prevIdx].key);
  }, [activeDeptIndex, departments]);

  // Total members in active council cohort
  const totalCouncilMembers = useMemo(() => {
    return departments.reduce((acc, d) => acc + d.count, 0);
  }, [departments]);

  // Scoped GSAP Container and Lifecycle Ref
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const memberGridRef = useRef<HTMLDivElement>(null);
  const mobileChipsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active mobile department chip into view smoothly
  useEffect(() => {
    if (mobileChipsRef.current) {
      const activeChip = mobileChipsRef.current.querySelector<HTMLElement>(
        `[data-dept-chip="${selectedDeptKey}"]`
      );
      if (activeChip) {
        activeChip.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedDeptKey, selectedYear]);

  // 1 & 2. Hero Timeline and Bento Grid ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // If user prefers reduced motion, leave elements in default resting state
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroBadgeRef.current) {
        heroTl.fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
        );
      }

      if (heroTitleRef.current) {
        heroTl.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4"
        );
      }

      if (heroSubtitleRef.current) {
        heroTl.fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.5"
        );
      }

      // 2. Bento Grid Context Cards Scroll-Triggered Reveal (Card-by-card)
      if (bentoGridRef.current) {
        const cards = bentoGridRef.current.querySelectorAll(".bento-reveal-card");
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: (idx % 2) * 0.12, // subtle stagger for adjacent column pairs on tablet/desktop
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        });
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // 3. Dedicated GSAP Member Cards Entrance Stagger on Department or Year Switch
  useEffect(() => {
    if (shouldReduceMotion || !memberGridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = memberGridRef.current?.querySelectorAll(".member-stagger-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, memberGridRef);

    return () => ctx.revert();
  }, [selectedDeptKey, selectedYear, shouldReduceMotion]);

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-black text-white pt-24 sm:pt-32 pb-16 font-sans selection:bg-[#39FF14] selection:text-black"
    >
      {/* Background Matrix */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* --- 1. HERO HEADER SECTION --- */}
        <section className="mb-20 sm:mb-28">
          <div className="flex flex-col items-center text-center">
            {/* Perfectly centered, unified hero eyebrow */}
            <div
              ref={heroBadgeRef}
              className="inline-flex items-center justify-center gap-2 mb-4 sm:mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
              </span>
              <span className="relative top-[1px] text-[10px] uppercase tracking-[0.35em] text-gray-300 font-bold font-mono pl-[0.35em] leading-none select-none">
                Who we are
              </span>
            </div>
            <h1
              ref={heroTitleRef}
              className="text-5xl sm:text-7xl md:text-[8.5rem] font-bold tracking-tighter leading-[0.88] mb-6"
            >
              About <br />
              <span className="text-gray-500 italic font-light">
                E-Cell UVCE.
              </span>
            </h1>
            <p
              ref={heroSubtitleRef}
              className="max-w-2xl text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed"
            >
              Empowering student innovators, founders, and leaders at the University
              Visvesvaraya College of Engineering since 2014.
            </p>
          </div>
        </section>

        {/* --- 2. INSTITUTIONAL & E-CELL CONTEXT (BENTO GRID) --- */}
        <div
          ref={bentoGridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6 mb-28 sm:mb-36"
        >
          {/* Card 1: About UVCE (Full Width Top) */}
          <div
            className="bento-reveal-card md:col-span-6 relative p-6 sm:p-8 md:p-12 bg-zinc-900/20 border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden group hover:bg-zinc-900/40 transition-colors duration-300"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#39FF14]/5 blur-[100px]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[#39FF14] text-[10px] font-bold uppercase tracking-[0.5em] mb-3 sm:mb-4 font-mono">
                Established 1917
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">
                About{" "}
                <span className="text-zinc-500 italic font-light">UVCE.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed font-light text-sm sm:text-base md:text-lg max-w-4xl break-words">
                The{" "}
                <b className="text-zinc-200">
                  University Visvesvaraya College of Engineering
                </b>{" "}
                was established by
                <b className="text-zinc-200">
                  {" "}
                  Bharat Ratna Sir M Visvesvaraya
                </b>
                . As the first engineering college in Karnataka and fifth in
                India, UVCE has pioneered technical education for over a
                century. Today, it remains a premier institution offering 8
                undergraduate and 24 postgraduate programs, dedicated to
                delivering high-quality technical excellence and fostering the
                next generation of global engineers.
              </p>
            </div>
          </div>

          {/* Card 2: Our Vision (Left Side) */}
          <div
            className="bento-reveal-card md:col-span-3 relative p-6 sm:p-8 md:p-12 bg-zinc-900/20 border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden group hover:bg-zinc-900/40 transition-colors duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#39FF14]/50 transition-colors mb-5">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-[#39FF14]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white mb-4 sm:mb-6">
                Our Vision
              </h2>
              <p className="text-zinc-400 leading-relaxed font-light text-xs sm:text-sm md:text-base">
                To foster a dynamic ecosystem where aspiring entrepreneurs are
                empowered with resources, mentorship, and networking
                opportunities to transform their ideas into impactful ventures.
                Through inclusive programs and a culture of innovation, we
                strive to cultivate a new generation of visionary leaders
                dedicated to driving positive change and creating a more
                prosperous future.
              </p>
            </div>
          </div>

          {/* Card 3: Our Mission (Right Side) */}
          <div
            className="bento-reveal-card md:col-span-3 relative p-6 sm:p-8 md:p-12 bg-zinc-900/20 border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden group hover:bg-zinc-900/40 transition-colors duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#39FF14]/50 transition-colors mb-5">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-[#39FF14]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-zinc-400 leading-relaxed font-light text-xs sm:text-sm md:text-base">
                To inspire, educate, and support aspiring entrepreneurs through
                comprehensive resources and opportunities, fostering a culture
                of innovation and collaboration to catalyse the growth of
                impactful ventures.
              </p>
            </div>
          </div>

          {/* Card 4: Legacy & History (Full Width Bottom) */}
          <div
            className="bento-reveal-card md:col-span-6 relative p-6 sm:p-8 md:p-12 bg-zinc-900/20 border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden group hover:bg-zinc-900/40 transition-colors duration-300"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#39FF14]/5 blur-[100px] group-hover:bg-[#39FF14]/10 transition-all" />

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#39FF14]/50 transition-colors mb-4 sm:mb-6">
                  <History className="h-5 w-5 sm:h-6 sm:w-6 text-[#39FF14]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-white">
                  History
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
                <p className="text-zinc-400 leading-relaxed font-light text-xs sm:text-sm md:text-base">
                  The Entrepreneurship Cell of UVCE, founded in{" "}
                  <b className="text-zinc-200 font-medium">
                    2014 by Tejas Narayan
                  </b>
                  , stands tall as a student-run body with the goal of fostering
                  an{" "}
                  <b className="text-zinc-300 font-medium">
                    entrepreneurial culture
                  </b>
                  . In 2019, the club was re-organized with significant{" "}
                  <b className="text-zinc-300 font-medium">
                    support from the alumni
                  </b>
                  .
                </p>

                <p className="text-zinc-400 leading-relaxed font-light text-xs sm:text-sm md:text-base">
                  Through workshops, seminars, and flagship events, we guide
                  students from{" "}
                  <b className="text-zinc-300 font-medium">
                    ideation to execution
                  </b>
                  . The E-Cell envisions nurturing the{" "}
                  <b className="text-zinc-300 font-medium">
                    innovative potential
                  </b>{" "}
                  of every student, invigorated to bring them one step closer to
                  their entrepreneurial vision.
                </p>

                <p className="text-zinc-400 leading-relaxed font-light text-xs sm:text-sm md:text-base">
                  From networking and business modelling to{" "}
                  <b className="text-zinc-300 font-medium">investor pitches</b>,
                  E-Cell strives to provide a platform to holistically develop,
                  including{" "}
                  <b className="text-zinc-300 font-medium">
                    direct interactions with the finance world
                  </b>{" "}
                  to expand the horizon of opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. PROGRESSIVE DISCLOSURE TEAM DIRECTORY --- */}
        <section id="team-section" className="py-16 sm:py-24 border-t border-white/5 scroll-mt-24">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14 gap-3">
            <span className="text-[#39FF14] text-[10px] font-bold uppercase tracking-[0.5em] font-mono">
              Directory & Leadership
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white">
              The <span className="text-zinc-500 italic font-light">Team.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg font-mono">
              Meet the council driving entrepreneurial initiatives across campus.
            </p>
          </div>

          {/* STEP 1: COUNCIL YEAR SELECTOR (Touch-Friendly Segmented Control) */}
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-12">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-3 flex items-center gap-1.5">
              <span>Council Cohort</span>
            </div>
            <div
              role="tablist"
              aria-label="Select Council Year"
              className="flex items-center bg-zinc-950 p-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-lg"
            >
              {teamData.map((team) => {
                const isActive = selectedYear === team.year;
                return (
                  <button
                    key={team.year}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="department-directory"
                    onClick={() => setSelectedYear(team.year)}
                    className={`relative min-h-[44px] min-w-[120px] sm:min-w-[140px] px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#39FF14] ${
                      isActive ? "text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeYearPill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-[#39FF14] rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                      />
                    )}
                    <span className="relative z-10">{team.year} Council</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 mt-3">
              {totalCouncilMembers} Members across {departments.length} Functional Departments
            </span>
          </div>

          {/* STEP 2: TEAM / DEPARTMENT DIRECTORY */}
          <div id="department-directory" className="mb-10 sm:mb-12">
            <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                Select Department
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {activeDeptIndex + 1} of {departments.length}
              </span>
            </div>

            {/* 2A. Mobile: Compact horizontally scrollable chip strip (sm:hidden) */}
            <div
              ref={mobileChipsRef}
              role="tablist"
              aria-label="Select Department (Mobile)"
              className="flex sm:hidden items-center gap-2 overflow-x-auto pb-2.5 pt-1 px-1 -mx-4 px-4 scrollbar-none no-scrollbar touch-pan-x"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {departments.map((dept) => {
                const isSelected = dept.key === selectedDeptKey;
                const DeptIcon = dept.icon;
                return (
                  <button
                    key={`mobile-${dept.key}`}
                    data-dept-chip={dept.key}
                    role="tab"
                    id={`mobile-dept-tab-${dept.key}`}
                    aria-selected={isSelected}
                    aria-controls={`dept-panel-${dept.key}`}
                    onClick={() => setSelectedDeptKey(dept.key)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-1 focus:ring-[#39FF14] active:scale-95 ${
                      isSelected
                        ? "bg-[#39FF14] text-black border-[#39FF14] shadow-[0_0_18px_rgba(57,255,20,0.35)] font-bold"
                        : "bg-zinc-950/80 text-zinc-300 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <DeptIcon
                      size={14}
                      className={isSelected ? "text-black" : "text-[#39FF14]"}
                    />
                    <span>{dept.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-black/20 text-black font-bold"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {dept.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 2B. Desktop / Tablet: Rich grid of department cards (hidden sm:grid) */}
            <div
              role="tablist"
              aria-label="Select Department (Desktop)"
              className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3"
            >
              {departments.map((dept, idx) => {
                const isSelected = dept.key === selectedDeptKey;
                const DeptIcon = dept.icon;
                return (
                  <button
                    key={dept.key}
                    role="tab"
                    id={`dept-tab-${dept.key}`}
                    aria-selected={isSelected}
                    aria-controls={`dept-panel-${dept.key}`}
                    onClick={() => setSelectedDeptKey(dept.key)}
                    className={`group relative text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 min-h-[54px] focus:outline-none focus:ring-1 focus:ring-[#39FF14] active:scale-[0.99] ${
                      isSelected
                        ? "bg-zinc-900/90 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.15)]"
                        : "bg-zinc-950/50 border-white/5 hover:border-white/20 hover:bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#39FF14] text-black"
                            : "bg-white/5 text-zinc-400 group-hover:text-white"
                        }`}
                      >
                        <DeptIcon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                            isSelected
                              ? "text-white"
                              : "text-zinc-300 group-hover:text-white"
                          }`}
                        >
                          {dept.label}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                          {dept.count} {dept.count === 1 ? "Member" : "Members"}
                        </div>
                      </div>
                    </div>

                    {/* Active Indicator Pip */}
                    <div className="shrink-0 flex items-center">
                      {isSelected ? (
                        <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
                      ) : (
                        <span className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-400">
                          0{idx + 1}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: ACTIVE DEPARTMENT MEMBERS AREA (Progressive Disclosure) */}
          <div className="relative">
            {activeDept && (
              <div
                key={`${selectedYear}-${activeDept.key}`}
                id={`dept-panel-${activeDept.key}`}
                role="tabpanel"
                aria-labelledby={`dept-tab-${activeDept.key}`}
                className="space-y-10"
              >
                {/* Department Banner & Step Controller (Compact on mobile) */}
                <div className="bg-zinc-900/30 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] shrink-0">
                        <activeDept.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                            {activeDept.label}
                          </h3>
                          <span className="text-[10px] font-mono bg-[#39FF14]/20 text-[#39FF14] px-2 py-0.5 rounded-full font-bold">
                            {activeDept.count}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 font-light line-clamp-2 sm:line-clamp-none">
                          {activeDept.description}
                        </p>
                      </div>
                    </div>

                    {/* Quick Previous / Next Department Arrows for Compact Mobile Browsing */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest sm:hidden">
                        Switch Dept
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={goToPrevDept}
                          aria-label="Previous Department"
                          className="p-2 rounded-lg border border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-[#39FF14] transition-colors focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={goToNextDept}
                          aria-label="Next Department"
                          className="p-2 rounded-lg border border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-[#39FF14] transition-colors focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3A. LEADERSHIP CARDS (If department contains leads/heads/presidents) */}
                  <div ref={memberGridRef} className="space-y-10">
                    {leads.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14] font-bold">
                            Leadership
                          </span>
                          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          {leads.map((member, index) => (
                            <div key={`${member.name}-lead-${index}`} className="member-stagger-card">
                              <TeamCard
                                member={member}
                                isLead={true}
                                onSelect={(selected) =>
                                  setActiveModalMember({
                                    member: selected,
                                    deptLabel: activeDept.label,
                                  })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3B. REGULAR MEMBERS / EXECUTIVES (Responsive Grid: 2-col on mobile up to 5-col) */}
                    {regularMembers.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold">
                            Members & Executives
                          </span>
                          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                          {regularMembers.map((member, index) => (
                            <div key={`${member.name}-exec-${index}`} className="member-stagger-card">
                              <TeamCard
                                member={member}
                                isLead={false}
                                onSelect={(selected) =>
                                  setActiveModalMember({
                                    member: selected,
                                    deptLabel: activeDept.label,
                                  })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        </section>
      </div>

      {/* --- STEP 4: OPTIONAL MEMBER DETAILS MODAL --- */}
      <AnimatePresence>
        {activeModalMember && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-member-name"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 selection:bg-[#39FF14] selection:text-black"
          >
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalMember(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              {/* Top Action Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/20 px-2.5 py-1 rounded-full font-bold">
                    {activeModalMember.deptLabel}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {selectedYear} Council
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalMember(null)}
                  aria-label="Close Profile"
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#39FF14] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Member Visual & Info */}
              <div className="flex flex-col items-center text-center">
                <div className="w-32 aspect-[3/4] sm:w-40 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg relative mb-4">
                  {activeModalMember.member.imageUrl ? (
                    <img
                      src={activeModalMember.member.imageUrl}
                      alt={activeModalMember.member.name}
                      style={{
                        objectPosition:
                          activeModalMember.member.imagePosition || "center 25%",
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
                      <User size={48} className="text-[#39FF14]/50" />
                    </div>
                  )}
                </div>

                <h3
                  id="modal-member-name"
                  className="text-xl sm:text-2xl font-bold tracking-tight text-white break-words"
                >
                  {activeModalMember.member.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#39FF14] mt-1 font-semibold">
                  {activeModalMember.member.post}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-2">
                  <span>E-Cell UVCE</span>
                  <span>•</span>
                  <span>{activeModalMember.deptLabel}</span>
                </div>
              </div>

              {/* Verified Contact Channels */}
              {(() => {
                const {
                  linkedinUrl,
                  instagramUrl,
                  githubUrl,
                  emailUrl,
                  displayEmail,
                } = sanitizeSocialLinks(activeModalMember.member);
                const hasAnyContact =
                  linkedinUrl || instagramUrl || githubUrl || emailUrl;

                return (
                  <div className="mt-8 pt-6 border-t border-white/5 space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-3 text-center sm:text-left">
                      Verified Contact Channels
                    </span>

                    {hasAnyContact ? (
                      <div className="flex flex-col gap-2">
                        {linkedinUrl && (
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-[#39FF14]/50 hover:bg-zinc-900 text-xs text-zinc-300 hover:text-white transition-all group"
                          >
                            <span className="flex items-center gap-2.5">
                              <Linkedin size={16} className="text-[#39FF14]" />
                              <span>Connect on LinkedIn</span>
                            </span>
                            <ExternalLink
                              size={14}
                              className="text-zinc-600 group-hover:text-[#39FF14] transition-colors"
                            />
                          </a>
                        )}

                        {instagramUrl && (
                          <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-[#39FF14]/50 hover:bg-zinc-900 text-xs text-zinc-300 hover:text-white transition-all group"
                          >
                            <span className="flex items-center gap-2.5">
                              <Instagram size={16} className="text-[#39FF14]" />
                              <span>Follow on Instagram</span>
                            </span>
                            <ExternalLink
                              size={14}
                              className="text-zinc-600 group-hover:text-[#39FF14] transition-colors"
                            />
                          </a>
                        )}

                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-[#39FF14]/50 hover:bg-zinc-900 text-xs text-zinc-300 hover:text-white transition-all group"
                          >
                            <span className="flex items-center gap-2.5">
                              <Github size={16} className="text-[#39FF14]" />
                              <span>View GitHub Profile</span>
                            </span>
                            <ExternalLink
                              size={14}
                              className="text-zinc-600 group-hover:text-[#39FF14] transition-colors"
                            />
                          </a>
                        )}

                        {emailUrl && (
                          <a
                            href={emailUrl}
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-[#39FF14]/50 hover:bg-zinc-900 text-xs text-zinc-300 hover:text-white transition-all group"
                          >
                            <span className="flex items-center gap-2.5">
                              <Mail size={16} className="text-[#39FF14]" />
                              <span className="truncate max-w-[200px]">
                                {displayEmail || "Send Direct Email"}
                              </span>
                            </span>
                            <ExternalLink
                              size={14}
                              className="text-zinc-600 group-hover:text-[#39FF14] transition-colors"
                            />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-zinc-900/30 text-center text-xs text-zinc-500 font-mono">
                        No external public contact links recorded.
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Close Button */}
              <button
                onClick={() => setActiveModalMember(null)}
                className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#39FF14] hover:bg-[#39FF14]/10 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-all min-h-[44px]"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
