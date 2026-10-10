import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    productName: string;
    description: string;
    price: string;
    image: string;
    orderLink: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30"
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0A0A]">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />

        {/* Category Label - Technical Style */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 border border-white/10 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] text-secondary font-bold">
            {product.category}
          </span>
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={product.orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            Initiate_Order <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
            {product.productName}
          </h3>
          <span className="text-sm font-mono text-primary font-bold">
            {product.price}
          </span>
        </div>

        <p className="text-xs text-gray-500 font-light leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>

        {/* Bottom Metadata - Optional Technical Feel */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] uppercase tracking-widest text-gray-400">
            Official_Gear_2026
          </span>
          <ShoppingCart size={12} className="text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
