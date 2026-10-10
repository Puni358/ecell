import { useState, KeyboardEvent, MouseEvent } from "react";
import { Instagram, Linkedin, Github, Mail, User, Info } from "lucide-react";
import { TeamMember, sanitizeSocialLinks } from "../utils/teamUtils";

export interface TeamCardProps {
  member: TeamMember;
  isLead: boolean;
  onSelect?: (member: TeamMember) => void;
}

const TeamCard = ({ member, isLead, onSelect }: TeamCardProps) => {
  const [imgError, setImgError] = useState(false);
  const { linkedinUrl, instagramUrl, githubUrl, emailUrl } = sanitizeSocialLinks(member);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(member);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const stopProp = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // Reusable Socials Icon Bar with touch-friendly hit areas
  const Socials = ({ size = 16 }: { size?: number }) => (
    <div className="flex items-center gap-1 mt-2.5 -ml-1.5 flex-wrap" onClick={stopProp}>
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopProp}
          aria-label={`${member.name} on LinkedIn`}
          className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Linkedin size={size} />
        </a>
      )}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopProp}
          aria-label={`${member.name} on Instagram`}
          className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Instagram size={size} />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopProp}
          aria-label={`${member.name} on GitHub`}
          className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Github size={size} />
        </a>
      )}
      {emailUrl && (
        <a
          href={emailUrl}
          onClick={stopProp}
          aria-label={`Email ${member.name}`}
          className="p-2 text-zinc-400 hover:text-primary hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Mail size={size} />
        </a>
      )}
    </div>
  );

  // 1. LEADERSHIP LAYOUT (Horizontal on desktop/tablet, stacked on small mobile)
  if (isLead) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        className="group relative bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 cursor-pointer active:scale-[0.99] shadow-sm hover:shadow-[0_0_25px_rgba(255,107,0,0.12)]"
        aria-label={`View details for ${member.name}, ${member.post}`}
      >
        <div className="flex flex-col sm:flex-row items-stretch min-h-[180px]">
          {/* Picture on Left / Top (Standard 3:4 aspect ratio framing) */}
          <div className="w-full sm:w-48 aspect-[3/4] sm:aspect-[3/4] shrink-0 relative bg-zinc-950/80 overflow-hidden border-b sm:border-b-0 sm:border-r border-white/5">
            {!imgError && member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name}
                loading="lazy"
                onError={() => setImgError(true)}
                style={{
                  objectPosition: member.imagePosition || "center 25%",
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50">
                <User size={40} className="mb-2 text-primary/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
            )}
            {/* Corner badge for leadership */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-secondary/30 text-[9px] font-mono text-secondary uppercase tracking-wider font-bold">
              Lead
            </div>
          </div>

          {/* Info on Right */}
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight break-words group-hover:text-primary transition-colors">
                  {member.name}
                </h4>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 p-1 hidden sm:inline-block">
                  <Info size={16} className="text-primary" />
                </span>
              </div>
              <p className="text-primary font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
                {member.post}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <Socials size={15} />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
                Details →
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. REGULAR MEMBERS LAYOUT (Compact vertical card, wrapping names, touch-safe)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group bg-zinc-950/70 border border-white/5 p-3 sm:p-3.5 rounded-xl hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 cursor-pointer active:scale-[0.98] flex flex-col justify-between hover:bg-zinc-900/30"
      aria-label={`View details for ${member.name}, ${member.post}`}
    >
      <div>
        {/* Member Photo (Standard 3:4 portrait aspect ratio) */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-2.5 bg-zinc-900 border border-white/5">
          {!imgError && member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              loading="lazy"
              onError={() => setImgError(true)}
              style={{
                objectPosition: member.imagePosition || "center 25%",
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900">
              <User size={28} className="mb-1 text-zinc-500" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          )}
          {/* Quick info icon on hover */}
          <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
            <Info size={12} />
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-white break-words line-clamp-2 min-h-[2rem] leading-tight group-hover:text-primary transition-colors">
            {member.name}
          </h4>
          <p className="text-[9px] text-secondary sm:text-zinc-400 sm:group-hover:text-zinc-300 uppercase tracking-widest font-mono transition-colors">
            {member.post}
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between">
        <Socials size={13} />
        <span className="text-[8px] font-mono text-zinc-600 group-hover:text-primary transition-colors">
          Info
        </span>
      </div>
    </div>
  );
};

export default TeamCard;
