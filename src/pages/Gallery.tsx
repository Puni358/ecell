import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";
import { galleryImages } from "../data";

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const events = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.event))),
  ];

  const filteredImages =
    selectedEvent === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.event === selectedEvent);

  const openLightbox = (id: number) => {
    const index = galleryImages.findIndex((img) => img.id === id);
    setLightboxImage(index);
  };

  // Variants for the smooth text reveal on hover
  const captionVariants: Variants = {
    rest: { y: 20, opacity: 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 selection:bg-primary selection:text-black font-sans">
      {/* --- SUBTLE DOT BACKGROUND --- */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        {/* --- HEADER: BOLD & MINIMAL --- */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Camera size={14} className="text-secondary" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
                Archives
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              Visual <br />
              <span className="text-gray-600">Ecosystem.</span>
            </h1>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
            {events.map((event) => (
              <button
                key={event}
                onClick={() => setSelectedEvent(event)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative ${
                  selectedEvent === event
                    ? "text-primary"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {event}
                {selectedEvent === event && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* --- MASONRY GRID --- */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial="rest"
                whileHover="hover"
                animate="rest"
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative break-inside-avoid group cursor-pointer overflow-hidden bg-white/5 border border-white/5"
                onClick={() => openLightbox(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-8">
                  <div className="overflow-hidden">
                    <motion.p
                      variants={captionVariants}
                      className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2"
                    >
                      {image.event}
                    </motion.p>
                    <motion.p
                      variants={captionVariants}
                      className="text-lg font-bold text-white tracking-tight leading-tight"
                    >
                      {image.caption}
                    </motion.p>
                  </div>
                  <Maximize2
                    className="absolute top-8 right-8 text-primary opacity-0 group-hover:opacity-100 transition-all"
                    size={18}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- FULL SCREEN LIGHTBOX --- */}
        <AnimatePresence>
          {lightboxImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-6"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-10 right-10 text-white/40 hover:text-primary transition-colors z-[110]"
              >
                <X size={32} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(
                    (prev) =>
                      (prev! - 1 + galleryImages.length) % galleryImages.length
                  );
                }}
                className="absolute left-6 text-white/10 hover:text-white transition-colors"
              >
                <ChevronLeft size={60} strokeWidth={1} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative flex flex-col items-center justify-center max-w-6xl w-full h-full"
              >
                <img
                  src={galleryImages[lightboxImage].url}
                  className="max-w-full max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                  alt="Full view"
                />
                <div className="mt-12 text-center">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.5em] mb-4 block animate-pulse">
                    {galleryImages[lightboxImage].event}
                  </span>
                  <h2 className="text-3xl font-bold tracking-tighter text-white">
                    {galleryImages[lightboxImage].caption}
                  </h2>
                </div>
              </motion.div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(
                    (prev) => (prev! + 1) % galleryImages.length
                  );
                }}
                className="absolute right-6 text-white/10 hover:text-white transition-colors"
              >
                <ChevronRight size={60} strokeWidth={1} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
