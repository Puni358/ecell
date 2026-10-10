import { motion } from "framer-motion";

interface PartnerCardProps {
  partner: {
    id: number;
    name: string;
    logo: string;
    website: string;
  };
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <motion.a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      // Minimal, smooth movement
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center h-full w-full group overflow-hidden"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Logo styling: Grayscale by default, clear on hover */}
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-12 max-w-[140px] object-contain filter grayscale opacity-40 contrast-125 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
      />

      {/* Optional: Technical corner accents that appear on hover */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
    </motion.a>
  );
};

export default PartnerCard;
