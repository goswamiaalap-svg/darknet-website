"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Research", "Bug Bounty", "Guide", "Malware Analysis", "CVE Disclosure", "Web Security", "Threat Intelligence"];

function formatDate(d) {
  if (!d) return "TBA";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogList({ initialPosts = [] }) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? initialPosts : initialPosts.filter(p => p.category === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 bg-primary-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-sm text-premium-blue tracking-[0.4em] uppercase block mb-4">// INTEL FEED</span>
          <h1 className="font-space text-5xl md:text-6xl font-black text-text-white mb-6">
            RESEARCH & <span className="text-premium-blue">ANALYSIS</span>
          </h1>
          <p className="font-inter text-text-gray max-w-xl text-lg">
            In-depth research, CVE disclosures, and advanced cybersecurity guides from the Darknet elite team.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-5 py-2 font-space text-xs font-bold tracking-widest uppercase transition-all rounded-full border cursor-pointer ${
                filter === cat 
                  ? "bg-premium-blue/20 border-premium-blue text-text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                  : "border-text-gray/20 text-text-gray hover:border-cyan-glow/50 hover:text-cyan-glow"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {initialPosts.length === 0 ? (
          <div className="text-text-gray font-space text-xl">No intel reports found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.div key={post.id || post._id || i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <article className="glass-panel p-8 card-hover h-full flex flex-col justify-between rounded-2xl cursor-pointer">
                    <div>
                      <span className="inline-block px-3 py-1 bg-premium-blue/10 border border-premium-blue/30 text-premium-blue font-mono text-xs rounded-full mb-6 uppercase tracking-wider">
                        {post.category || "ARTICLE"}
                      </span>
                      <h2 className="font-space text-2xl font-bold text-text-white group-hover:text-cyan-glow transition-colors mb-4 leading-snug">
                        {post.title}
                      </h2>
                      <p className="font-inter text-sm text-text-gray leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt || post.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-text-gray/10">
                      <div className="flex items-center gap-4 text-text-gray/60 font-mono text-xs uppercase">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cyan-glow" />{formatDate(post.publishedAt)}</span>
                      </div>
                      <span className="font-space text-xs text-premium-blue font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                        Read <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
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
