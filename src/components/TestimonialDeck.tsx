import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialDeck = ({ testimonials }: { testimonials: any[] }) => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 3; // Number of testimonials visible at once

  const next = () =>
    setIndex((prev) =>
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage,
    );
  const prev = () =>
    setIndex((prev) =>
      prev - itemsPerPage < 0
        ? testimonials.length - itemsPerPage
        : prev - itemsPerPage,
    );

  const currentSet = testimonials.slice(index, index + itemsPerPage);

  return (
    <div className="w-full space-y-8">
      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {currentSet.map((t, i) => (
            <motion.div
              key={`${t.id}-${index}`}
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#050505] border border-white/5 p-6 rounded-lg group hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-2 mb-4 opacity-50 font-mono text-[9px]">
                <Terminal size={10} className="text-secondary" />
                <span>UNIT_DATA_0{t.id}</span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-8 italic min-h-[80px]">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {t.image && typeof t.image === "string" && t.image.startsWith("http") ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    onError={(e) => {
                      // If image fails to load, hide image and show fallback
                      (e.currentTarget as HTMLElement).style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                    className="h-8 w-8 rounded-full object-cover grayscale group-hover:grayscale-0 border border-white/10 shrink-0"
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
                <div className="text-left overflow-hidden">
                  <h4 className="text-[11px] font-bold uppercase text-white truncate">
                    {t.name}
                  </h4>
                  <p className="text-[8px] font-mono text-primary tracking-widest truncate">
                    {t.designation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controller: Terminal Style */}
      <div className="flex items-center justify-between pt-8 border-t border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="p-2 border border-white/10 hover:border-primary text-zinc-500 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="p-2 border border-white/10 hover:border-primary text-zinc-500 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* System Progress Indicator */}
        <div className="flex-1 max-w-xs mx-8 hidden md:block">
          <div className="flex justify-between text-[9px] font-mono text-zinc-600 mb-2 uppercase">
            <span>Progress</span>
            <span>
              {Math.ceil((index + itemsPerPage) / itemsPerPage)} /{" "}
              {Math.ceil(testimonials.length / itemsPerPage)}
            </span>
          </div>
          <div className="h-1 bg-zinc-900 w-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{
                width: `${((index + itemsPerPage) / testimonials.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          Status: Synchronized
        </div>
      </div>
    </div>
  );
};

export default TestimonialDeck;
