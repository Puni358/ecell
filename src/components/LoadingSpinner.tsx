import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black font-mono selection:bg-primary selection:text-black">
      {/* Container for Logo and Status */}
      <div className="relative flex flex-col items-center">
        {/* Pulsing Logo - The Core of the Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="p-4 border border-white/10 bg-white/[0.02]">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        {/* Technical Status Text */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.5em] text-white font-bold"
          >
            E-Cell UVCE
          </motion.span>

          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-gray-600">
              Initializing_Ecosystem
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-primary font-bold"
            >
              _
            </motion.span>
          </div>
        </div>

        {/* High-Contrast Minimalist Progress Bar */}
        <div className="mt-12 w-48 h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="fixed top-12 left-12 w-4 h-4 border-t border-l border-white/10" />
      <div className="fixed bottom-12 right-12 w-4 h-4 border-b border-r border-white/10" />
    </div>
  );
};

export default LoadingSpinner;
