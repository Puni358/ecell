import { testimonials } from "../data/testimonials";
import { Terminal } from "lucide-react";

interface MarqueeProps {
  reverse?: boolean;
  speed?: string;
}

const TestimonialMarquee = ({
  reverse = false,
  speed = "100s",
}: MarqueeProps) => {
  // Triple the data for a perfect mathematical loop
  const duplicatedData = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden py-4 group">
      <div
        className={`flex flex-nowrap shrink-0 gap-0 cursor-pointer hover:pause ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: speed }}
      >
        {duplicatedData.map((t, idx) => (
          <div
            key={`${idx}`}
            className="w-[300px] md:w-[420px] shrink-0 bg-[#050505] border border-white/5 p-6 rounded-lg mx-3 flex flex-col backdrop-blur-xl group/card hover:border-primary/40 transition-all duration-500"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-secondary opacity-60" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
                  REF_0{t.id}_LOG
                </span>
              </div>
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            </div>

            {/* Body: Fixed wrapping and spacing */}
            <div className="mb-6">
              <p className="text-[12px] md:text-[13px] font-light leading-relaxed text-zinc-300 whitespace-normal break-words italic">
                "{t.text}"
              </p>
            </div>

            {/* User Identity */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
              {t.image && typeof t.image === "string" && t.image.startsWith("http") ? (
                <img
                  src={t.image}
                  alt={t.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                  className="h-8 w-8 rounded-full bg-zinc-800 object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 border border-white/10 shrink-0"
                />
              ) : null}
              <div
                style={{
                  display:
                    t.image && typeof t.image === "string" && t.image.startsWith("http")
                      ? "none"
                      : "flex",
                }}
                className="h-8 w-8 rounded-full bg-zinc-900 border border-white/10 items-center justify-center shrink-0 text-primary font-mono text-[10px] font-bold"
              >
                {t.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("") || "U"}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <h4 className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-tighter truncate">
                  {t.name}
                </h4>
                <p className="text-[8px] uppercase tracking-[0.2em] text-primary font-mono truncate">
                  {t.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialMarquee;
