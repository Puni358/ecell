import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
  Users,
  Rocket,
  Zap,
  ArrowRight,
  Lightbulb,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { stats } from "../data/stats";
import { faqs, heroSlides, testimonials, initiatives, events } from "../data";
import PartnerMarquee from "../components/PartnerMarquee";
import TestimonialDeck from "../components/TestimonialDeck";
import EventCard from "../components/EventCard";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Curate the 5 most essential FAQs for the homepage
  // Priority: 1 (What is E-Cell), 2 (Who can join), 3 (Need an idea), 6 (Events organized), 10 (Partnering/Contact)
  const prioritizedFaqIds = [1, 2, 3, 6, 10];
  const homepageFaqs = faqs.filter((f) => prioritizedFaqIds.includes(f.id));

  // Auto-play Hero logic: interval reduced by 0.75s from 6.0s (6000ms) to 5.25s (5250ms)
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5250);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPaused]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  // Curate 3 genuine flagship events with valid images
  const featuredEvents = events
    .filter((e) => e.image && e.image.startsWith("http"))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black font-sans overflow-x-hidden">
      {/* Background Matrix */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10">
        {/* --- 1. HERO SECTION --- */}
        <section
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5 pt-20 pb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                className="w-full h-full object-cover grayscale opacity-30 scale-105 transition-transform duration-1000"
                alt="hero-bg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black" />
            </motion.div>
          </AnimatePresence>

          <div className="relative text-center px-4 sm:px-6 max-w-5xl mx-auto z-10">
            {/* Institution Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--ecell-primary)]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300 font-bold">
                E-Cell UVCE <span className="text-secondary">· Est. 2014</span>
              </span>
            </motion.div>

            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-tighter leading-[1.05] sm:leading-[0.95]">
                {heroSlides[currentSlide].title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      i === 0
                        ? "text-white"
                        : i === 1
                        ? "text-zinc-200"
                        : "text-zinc-500 font-light italic"
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-light mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].subtitle} — Fostering innovative potential, startup culture, and student-led enterprises at Bangalore's premier engineering heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
                <Link
                  to="/events"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)] inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Events</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-3.5 border border-white/15 hover:border-primary/50 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-200 inline-flex items-center justify-center gap-2"
                >
                  <span>About E-Cell</span>
                  <ArrowUpRight size={14} className="text-secondary" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Controls: Compact & Accessible */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex gap-2 z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-2.5 sm:p-3 border border-white/10 hover:border-primary hover:bg-white/5 text-zinc-400 hover:text-white transition-all rounded-lg"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-2.5 sm:p-3 border border-white/10 hover:border-primary hover:bg-white/5 text-zinc-400 hover:text-white transition-all rounded-lg"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
            <motion.div
              key={currentSlide}
              initial={{ width: 0 }}
              animate={{ width: isPaused ? undefined : "100%" }}
              transition={{ duration: 5.25, ease: "linear" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </section>

        {/* --- 2. STATS & IMPACT METRICS --- */}
        <section className="bg-zinc-950/80 py-12 sm:py-16 md:py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                label: "Events Conducted",
                val: `${stats.events}+`,
                icon: Rocket,
              },
              {
                label: "Students Impacted",
                val: `${stats.students}+`,
                icon: Users,
              },
              {
                label: "Prize Pool Worth",
                val: `₹${stats.prizes}+`,
                icon: Trophy,
              },
              {
                label: "Workshops Hosted",
                val: `${stats.workshops}+`,
                icon: Zap,
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-black/40 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-white/5 text-secondary mb-3 group-hover:text-primary transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-1.5 text-white group-hover:text-primary transition-colors">
                    {stat.val}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.25em]">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 3. WHAT WE DO / INITIATIVES SECTION --- */}
        <section className="py-16 sm:py-24 md:py-28 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em] mb-3 block text-center md:text-left font-mono">
                  Mission & Execution
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center md:text-left text-white">
                  What We <span className="text-primary italic font-light">Do.</span>
                </h2>
              </div>
              <p className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-center md:text-left max-w-md">
                Empowering student innovators from ideation to real-world execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initiatives.map((item, idx) => {
                const icons = [Rocket, Users, Lightbulb];
                const ItemIcon = icons[idx % icons.length];
                return (
                  <div
                    key={item.id}
                    className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-secondary group-hover:text-primary transition-colors">
                          <ItemIcon size={20} />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-6">
                        {item.description}
                      </p>
                    </div>

                    <Link
                      to={item.link}
                      className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-primary transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- 4. FEATURED EVENTS SECTION (Hidden on mobile, visible on sm and up) --- */}
        <section className="hidden sm:block py-16 sm:py-24 md:py-28 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em] mb-3 block text-center md:text-left font-mono">
                  Campus Engagements
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center md:text-left text-white">
                  Featured <span className="text-primary italic font-light">Events.</span>
                </h2>
              </div>
              <Link
                to="/events"
                className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Calendar</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <div key={event.id} className="rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-colors bg-zinc-950">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. PARTNERS SECTION --- */}
        <section className="py-16 sm:py-24 bg-black overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em] mb-3 block text-center md:text-left font-mono">
                  Industry & Ecosystem
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center md:text-left text-white">
                  Our <span className="text-primary italic font-light">Partners.</span>
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-center md:text-left">
                Collaborating to empower student innovation.
              </p>
            </div>
          </div>
          <PartnerMarquee />
        </section>

        {/* --- 6. TESTIMONIALS SECTION (Controlled Deck Presentation) --- */}
        <section className="py-16 sm:py-24 md:py-28 bg-black overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em] mb-3 block text-center md:text-left font-mono">
                  Network Strength
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center md:text-left text-white">
                  Ecosystem <span className="text-primary italic font-light">Voices.</span>
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-center md:text-left">
                Voices from mentors, alumni, and student leaders.
              </p>
            </div>

            {/* Controlled Testimonial Deck with robust avatar fallbacks */}
            <TestimonialDeck testimonials={testimonials} />
          </div>
        </section>

        {/* --- 7. FAQ SECTION --- */}
        <section className="py-16 sm:py-24 md:py-28 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em] mb-3 block text-center md:text-left font-mono">
                  Support Center
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-center md:text-left text-white">
                  General <span className="text-primary italic font-light">FAQs.</span>
                </h2>
              </div>
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-center md:text-left">
                Quick answers to common questions about joining and partnering.
              </p>
            </div>

            <div className="max-w-4xl mx-auto border-t border-white/10">
              {homepageFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-white/5">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                    }
                    className="w-full py-6 sm:py-8 flex items-start justify-between text-left group transition-all"
                  >
                    <div className="flex gap-4 sm:gap-8 pr-4">
                      <span className="font-mono text-[10px] text-zinc-600 mt-1 sm:mt-2 shrink-0">
                        {faq.id < 10 ? `0${faq.id}` : faq.id}
                      </span>
                      <span
                        className={`text-base sm:text-xl font-bold tracking-tight transition-all duration-300 ${
                          expandedFaq === faq.id ? "text-primary" : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`mt-1 shrink-0 transition-transform duration-300 ${
                        expandedFaq === faq.id ? "rotate-45 text-primary" : "rotate-0 text-zinc-600"
                      }`}
                    >
                      <Plus size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="pl-8 sm:pl-16 pb-6 sm:pb-8 pr-6 text-zinc-400 font-light leading-relaxed text-xs sm:text-sm md:text-base max-w-3xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Subtle link for additional inquiries */}
            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-primary/40 bg-zinc-950/50"
              >
                <span>Have more questions? Contact our team</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* --- 8. FINAL ACTION BANNER (CTA) --- */}
        <section className="py-16 sm:py-24 bg-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.4em] font-mono mb-3">
                Begin Your Journey
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4 sm:mb-6">
                Ready to Turn Ideas into <span className="text-primary italic font-light">Ventures?</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-light leading-relaxed">
                Join E-Cell UVCE to participate in flagship workshops, build with ambitious peers, and connect with mentors and angel investors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-primary text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)] inline-flex items-center justify-center gap-2"
                >
                  <span>Connect With Us</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3.5 border border-white/15 hover:border-primary/50 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 inline-flex items-center justify-center"
                >
                  <span>Meet The Council</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

