import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";
import { Calendar, MapPin, ArrowLeft, Share2, Info, Clock } from "lucide-react";
import { motion } from "framer-motion";

const EventDetail = () => {
  const { name } = useParams();
  const event = events.find(
    (e) =>
      e.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "") === name?.toLowerCase().replace(/[^\w-]/g, ""),
  );

  if (!event)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans selection:bg-primary selection:text-black">
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold font-mono">
              ERROR_404
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Event Not Found
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            The event you're looking for doesn't exist or has been archived.
          </p>
          <Link
            to="/events"
            className="inline-block px-8 py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-white transition-all"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 font-sans selection:bg-primary selection:text-black">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-16 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold font-mono">
            Back to Events
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {/* Left: Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                    event.section === "upcoming"
                      ? "bg-primary text-black shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {event.section}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-10 leading-[1.1] uppercase bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                {event.title}
              </h1>
              {/* Image with Placeholder Handling */}
              <div className="aspect-video w-full rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12 border border-white/5 bg-zinc-900 flex items-center justify-center group relative">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center text-zinc-700">
                    <Info
                      size={48}
                      strokeWidth={1}
                      className="mb-4 opacity-20"
                    />
                    <p className="text-[10px] uppercase font-mono tracking-widest">
                      Poster_Incoming
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
              {/* Description Section */}
              <div className="space-y-8 md:space-y-12">
                <div className="border-l-3 border-primary pl-4 sm:pl-6 md:pl-8">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-100 leading-relaxed tracking-wide">
                    {event.description}
                  </p>
                </div>

                <div className="text-zinc-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed whitespace-pre-line border-t border-white/10 pt-8 md:pt-12 tracking-wide text-justify">
                  {event.fullDescription ||
                    "Detailed intelligence for this initiative is currently being synced. Please check back for updates."}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 sm:p-8 bg-zinc-950 border border-white/5 rounded-xl sm:rounded-2xl md:rounded-[2rem] backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

              <div className="space-y-10 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-4 font-mono font-bold">
                      Date
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Calendar
                        size={18}
                        className="text-zinc-500 flex-shrink-0"
                      />
                      <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight">
                        {event.date}
                      </span>
                    </div>
                  </div>
                  {event.date === "TBA" && (
                    <Clock
                      size={16}
                      className="text-zinc-600 animate-spin-slow"
                    />
                  )}
                </div>

                <div>
                  <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-4 font-mono font-bold">
                    Venue
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <MapPin size={18} className="text-zinc-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight">
                      {event.venue}
                    </span>
                  </div>
                </div>

                {event.section === "upcoming" ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-primary text-black text-center py-4 sm:py-5 rounded-lg sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-[11px] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,107,0,0.15)]"
                  >
                    Register for Event
                  </a>
                ) : (
                  <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-2"></div>
                )}
              </div>
            </motion.div>

            <button
              onClick={() => {
                navigator.share
                  ? navigator.share({
                      title: event.title,
                      url: window.location.href,
                    })
                  : alert("Link Copied");
              }}
              className="w-full py-4 sm:py-5 bg-white/5 border border-white/10 rounded-lg sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 text-zinc-400 hover:text-white hover:bg-white/10 transition-all group"
            >
              <Share2
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-black">
                Broadcast Initiative
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
