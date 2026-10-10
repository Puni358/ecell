import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  X,
  Maximize2,
  Layers,
} from "lucide-react";
import { blogPosts } from "../data";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const filteredBlogs = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 font-sans selection:bg-primary selection:text-black">
      {/* Background Dot Matrix */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #444 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers size={14} className="text-secondary" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
                Insight Archive
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-12">
              The <br />
              <span className="text-gray-600 italic">Journal.</span>
            </h1>

            <div className="relative max-w-xl group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search perspectives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-4 pl-8 focus:outline-none focus:border-primary transition-all text-sm uppercase tracking-widest placeholder:text-gray-800"
              />
            </div>
          </motion.div>
        </header>

        {/* --- BLOG GRID (MASONRY STYLE) --- */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredBlogs.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className="break-inside-avoid bg-white/[0.02] border border-white/5 group cursor-pointer hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* IMAGE HANDLING (Conditional) */}
              {post.image && (
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 size={24} className="text-primary" />
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={10} /> {post.author}
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Entry <ArrowRight size={14} className="text-primary" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* --- DETAIL MODAL --- */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-black border border-white/10 max-w-5xl w-full p-8 md:p-16 relative"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-8 right-8 text-white/40 hover:text-primary transition-colors"
                >
                  <X size={32} />
                </button>

                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-secondary mb-6">
                    <span>{selectedPost.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{selectedPost.author}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
                    {selectedPost.title}
                  </h2>

                  {selectedPost.image && (
                    <img
                      src={selectedPost.image}
                      className="w-full h-auto mb-12 border border-white/5"
                      alt=""
                    />
                  )}

                  {/* GALLERY HANDLING (If post has multiple images) */}
                  {selectedPost.gallery && (
                    <div className="grid grid-cols-2 gap-4 mb-12">
                      {selectedPost.gallery.map((img: string, i: number) => (
                        <img
                          key={i}
                          src={img}
                          className="w-full aspect-square object-cover border border-white/5"
                          alt=""
                        />
                      ))}
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-400 text-lg leading-relaxed font-light whitespace-pre-line">
                      {selectedPost.content || selectedPost.excerpt}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blog;
