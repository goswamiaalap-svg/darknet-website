"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, FileText, Video, Link as LinkIcon, Search, Filter } from "lucide-react";
import { getResources } from "@/lib/getData";

const CATEGORIES = ["All", "Guide", "Cheatsheet", "Whitepaper", "Tool", "Course"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const typeIcon = { PDF: FileText, Video, Link: LinkIcon, default: BookOpen };

function DifficultyBadge({ level }) {
  const colors = { Beginner: "text-green-400 border-green-500/30 bg-green-500/10", Intermediate: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10", Advanced: "text-red-400 border-red-500/30 bg-red-500/10" };
  return <span className={`font-orbitron text-xs px-2 py-0.5 border ${colors[level] || "text-tdc-silver border-tdc-silver/20"} tracking-wide`}>{level?.toUpperCase()}</span>;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => { getResources().then(d => setResources(d || [])); }, []);

  const filtered = resources.filter(r => {
    if (category !== "All" && r.category !== category) return false;
    if (difficulty !== "All" && r.difficulty !== difficulty) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// KNOWLEDGE BASE</span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            RESOURCE <span className="text-tdc-red text-glow-red">LIBRARY</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">Curated guides, cheatsheets, whitepapers, and tools for every skill level.</p>
        </div>

        {/* Filters */}
        <div className="glass-panel border border-tdc-red/10 p-5 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tdc-silver/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." className="w-full bg-transparent border border-tdc-red/20 pl-9 pr-4 py-2.5 text-white font-rajdhani text-sm focus:outline-none focus:border-tdc-red/50 placeholder:text-tdc-silver/30" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="bg-cyber-dark border border-tdc-red/20 text-tdc-silver font-rajdhani text-sm px-4 py-2.5 focus:outline-none focus:border-tdc-red/50 cursor-pointer">
            {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="bg-cyber-dark border border-tdc-red/20 text-tdc-silver font-rajdhani text-sm px-4 py-2.5 focus:outline-none focus:border-tdc-red/50 cursor-pointer">
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
        </div>

        <p className="font-rajdhani text-sm text-tdc-silver/50 mb-6">{filtered.length} RESOURCE{filtered.length !== 1 ? "S" : ""} FOUND</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((res, i) => {
            const Icon = typeIcon[res.type] || typeIcon.default;
            return (
              <motion.div key={res.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <article className="glass-panel card-hover border border-tdc-red/10 p-5 h-full flex flex-col">
                  <div className="w-10 h-10 border border-tdc-red/20 flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-5 h-5 text-tdc-red" />
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="font-orbitron text-xs text-tdc-red/70 tracking-wider">{res.category?.toUpperCase()}</span>
                    <DifficultyBadge level={res.difficulty} />
                  </div>
                  <h3 className="font-orbitron text-sm font-bold text-white mb-2 leading-snug flex-1">{res.title}</h3>
                  <p className="font-inter text-xs text-tdc-silver/60 line-clamp-3 mb-4">{res.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-rajdhani text-xs text-tdc-silver/40">{res.downloads?.toLocaleString()} downloads</span>
                    <a href={res.url || "#"} className="flex items-center gap-1.5 font-orbitron text-xs text-tdc-red hover:text-white transition-colors">
                      <Download className="w-3.5 h-3.5" /> GET
                    </a>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
