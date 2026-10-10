import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Package, Truck, ShieldCheck, Mail } from "lucide-react";
import { merchandise } from "../data";
import ProductCard from "../components/ProductCard";

const Merchandise = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(merchandise.map((item) => item.category))),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? merchandise
      : merchandise.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 font-sans selection:bg-primary selection:text-black">
      {/* Background Dot matrix */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag size={14} className="text-secondary" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
              The Gear
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            Brand <br />
            <span className="text-gray-600 italic font-light">Identity.</span>
          </h1>

          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 max-w-2xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative ${
                  selectedCategory === category
                    ? "text-primary"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="merchTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- BULK ORDERS (BENTO STYLE) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">
              Bulk <span className="text-gray-600">Procurement.</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Equip your entire venture team. We offer institutional pricing for
              bulk orders exceeding 20 units per SKU.
            </p>
          </div>
          <a
            href="mailto:ecell@uvce.ac.in"
            className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-3"
          >
            Request Quote <Mail size={16} />
          </a>
        </motion.div>

        {/* --- LOGISTICS INFO --- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Package,
              title: "Campus Pickup",
              desc: "Collect from E-Cell HQ.",
            },
            {
              icon: Truck,
              title: "Global Shipping",
              desc: "Venture gear, delivered.",
            },
            {
              icon: ShieldCheck,
              title: "Quality Lab",
              desc: "Tested for founders.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center text-center"
            >
              <item.icon className="h-6 w-6 text-gray-700 mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
