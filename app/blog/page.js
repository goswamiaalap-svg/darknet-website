"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight, BookOpen, Clock } from "lucide-react";
import { getAllBlogs } from "@/lib/getData";

const CATEGORIES = ["All", "Research", "Bug Bounty", "Guide", "Malware Analysis", "CVE Disclosure"];

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs().then(d => { setPosts(d || []); setLoading(false); });
  }, []);

  const filtered = filter === "All" ? posts : posts.filter(p => p.category === filter);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// INTEL FEED</span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            NEWS & <span className="text-tdc-red text-glow-red">BLOG</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">Research, writeups, CVE disclosures, and cybersecurity guides from the TDC community.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 font-orbitron text-xs tracking-widest border transition-all cursor-pointer ${
                filter === cat ? "border-tdc-red bg-tdc-red/20 text-white" : "border-tdc-red/20 text-tdc-silver hover:border-tdc-red/50"
              }`}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="glass-panel border border-tdc-red/10 h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id || post._id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <article className="glass-panel card-hover border border-tdc-red/10 p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-orbitron text-xs bg-tdc-red/20 text-tdc-red border border-tdc-red/30 px-2.5 py-0.5 tracking-wider">
                        {post.category?.toUpperCase() || "ARTICLE"}
                      </span>
                    </div>
                    <h2 className="font-orbitron text-base font-bold text-white group-hover:text-tdc-red transition-colors mb-3 leading-snug flex-1">
                      {post.title}
                    </h2>
                    <p className="font-inter text-sm text-tdc-silver/70 line-clamp-3 mb-5">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto text-tdc-silver/50 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
                        {post.readTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}m</span>}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-tdc-red group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
