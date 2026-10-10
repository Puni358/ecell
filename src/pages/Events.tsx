import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { events as eventsData } from "../data/events";
import EventCard from "../components/EventCard";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    upcoming: true,
    featured: true,
    past: true,
  });

  const ITEMS_PER_PAGE = 6;

  // Filter events by section and search term
  const upcomingEvents = eventsData.filter(
    (e) =>
      e.section === "upcoming" &&
      e.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const featuredEvents = eventsData.filter(
    (e) =>
      e.section === "featured" &&
      e.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pastEvents = eventsData.filter(
    (e) =>
      e.section === "past" &&
      e.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // State for pagination
  const [displayedUpcoming, setDisplayedUpcoming] = useState(ITEMS_PER_PAGE);
  const [displayedFeatured, setDisplayedFeatured] = useState(ITEMS_PER_PAGE);
  const [displayedPast, setDisplayedPast] = useState(ITEMS_PER_PAGE);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({
    title,
    subtitle,
    isExpanded,
    onToggle,
  }: {
    title: string;
    subtitle: string;
    isExpanded: boolean;
    onToggle: () => void;
  }) => (
    <motion.button
      onClick={onToggle}
      className="w-full text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center text-center mb-16 md:mb-24 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-0 hover:opacity-80 transition-opacity">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold font-mono">
            {subtitle}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
            {title}
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={24}
              className="text-primary flex-shrink-0 mt-4"
            />
          </motion.div>
        </div>
        <div className="h-[1px] w-24 bg-primary opacity-50 mt-8" />
      </div>
    </motion.button>
  );

  const EventsGrid = ({
    events,
    displayedCount,
  }: {
    events: any[];
    displayedCount: number;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.slice(0, displayedCount).map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  );

  const ViewMoreButton = ({
    onClick,
    hasMore,
  }: {
    onClick: () => void;
    hasMore: boolean;
  }) => {
    if (!hasMore) return null;
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-12 py-4 px-8 border-2 border-primary text-primary font-bold uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-primary hover:text-black transition-all"
      >
        View More
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 font-sans selection:bg-primary selection:text-black">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* --- HEADER SECTION --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 md:mb-32"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-8">
              Events & Initiatives <br />
            </h1>

            {/* Search Bar */}
            <div className="relative w-full sm:w-96 group mt-8 sm:mt-12">
              <input
                type="text"
                placeholder="SEARCH ALL INITIATIVES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/30 border border-white/5 rounded-full py-3 sm:py-4 pl-12 pr-6 text-[9px] sm:text-[10px] font-mono tracking-widest focus:border-primary/50 focus:outline-none transition-all"
              />
            </div>
          </div>
        </motion.section>

        {/* --- UPCOMING SECTION --- */}
        {upcomingEvents.length > 0 && (
          <motion.section
            className="mb-32 md:mb-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Upcoming"
              subtitle="Scheduled and Ongoing Initiatives"
              isExpanded={expandedSections.upcoming}
              onToggle={() => toggleSection("upcoming")}
            />
            {expandedSections.upcoming && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <EventsGrid
                  events={upcomingEvents}
                  displayedCount={displayedUpcoming}
                />
                <ViewMoreButton
                  hasMore={displayedUpcoming < upcomingEvents.length}
                  onClick={() =>
                    setDisplayedUpcoming((prev) => prev + ITEMS_PER_PAGE)
                  }
                />
              </motion.div>
            )}
          </motion.section>
        )}

        {/* --- FEATURED SECTION --- */}
        {featuredEvents.length > 0 && (
          <motion.section
            className="mb-32 md:mb-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Featured"
              subtitle="Flagship Programs and Key Initiatives"
              isExpanded={expandedSections.featured}
              onToggle={() => toggleSection("featured")}
            />
            {expandedSections.featured && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <EventsGrid
                  events={featuredEvents}
                  displayedCount={displayedFeatured}
                />
                <ViewMoreButton
                  hasMore={displayedFeatured < featuredEvents.length}
                  onClick={() =>
                    setDisplayedFeatured((prev) => prev + ITEMS_PER_PAGE)
                  }
                />
              </motion.div>
            )}
          </motion.section>
        )}

        {/* --- PAST EVENTS SECTION --- */}
        {pastEvents.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Past"
              subtitle="Highlights from Previous Initiatives"
              isExpanded={expandedSections.past}
              onToggle={() => toggleSection("past")}
            />
            {expandedSections.past && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <EventsGrid
                  events={pastEvents}
                  displayedCount={displayedPast}
                />
                <ViewMoreButton
                  hasMore={displayedPast < pastEvents.length}
                  onClick={() =>
                    setDisplayedPast((prev) => prev + ITEMS_PER_PAGE)
                  }
                />
              </motion.div>
            )}
          </motion.section>
        )}

        {/* --- NO RESULTS STATE --- */}
        {upcomingEvents.length === 0 &&
          featuredEvents.length === 0 &&
          pastEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-zinc-700" />
              <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest">
                No events match your search
              </p>
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default Events;
