"use client";
import { useState } from "react";
import { MessageSquare, ThumbsUp, Eye, Clock, Hash } from "lucide-react";

const CATEGORIES = ["General", "Web Security", "Malware Analysis", "CTF Discussions", "Career Advice"];

const TOPICS = [
  { id: 1, title: "Thoughts on the new OWASP Top 10?", author: "cyberninja99", category: "Web Security", replies: 24, views: 342, time: "2 hours ago" },
  { id: 2, title: "Need help analyzing this suspicious PE file", author: "malware_hunter", category: "Malware Analysis", replies: 8, views: 156, time: "5 hours ago" },
  { id: 3, title: "HackByte CTF 2025 Team Building Thread", author: "admin", category: "CTF Discussions", replies: 56, views: 1205, time: "1 day ago" },
  { id: 4, title: "Best certifications for entry-level pentesting?", author: "newbiewhacker", category: "Career Advice", replies: 15, views: 430, time: "2 days ago" },
  { id: 5, title: "Bypassing WAFs using unicode normalization", author: "redteam_lead", category: "Web Security", replies: 32, views: 890, time: "3 days ago" },
];

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTopics = activeCategory === "All" ? TOPICS : TOPICS.filter(t => t.category === activeCategory);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <button className="w-full bg-tdc-red text-white font-orbitron font-bold py-3 mb-6 hover:bg-tdc-red/80 transition-colors box-glow-red cursor-pointer">
            NEW DISCUSSION
          </button>
          
          <div className="glass-panel border border-tdc-red/10 p-4">
            <h3 className="font-orbitron text-white text-sm tracking-widest mb-4">CATEGORIES</h3>
            <ul className="space-y-1">
              <li>
                <button onClick={() => setActiveCategory("All")} className={`w-full text-left px-3 py-2 text-sm font-rajdhani transition-colors ${activeCategory === "All" ? "text-tdc-red bg-tdc-red/10" : "text-tdc-silver hover:text-white"}`}>
                  <Hash className="w-4 h-4 inline-block mr-2 opacity-50" /> All Topics
                </button>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button onClick={() => setActiveCategory(cat)} className={`w-full text-left px-3 py-2 text-sm font-rajdhani transition-colors ${activeCategory === cat ? "text-tdc-red bg-tdc-red/10" : "text-tdc-silver hover:text-white"}`}>
                    <Hash className="w-4 h-4 inline-block mr-2 opacity-50" /> {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8 border-b border-tdc-red/20 pb-4 flex justify-between items-end">
            <div>
              <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-1">// COMMUNITY</span>
              <h1 className="font-orbitron text-3xl font-black text-white">DISCUSSION <span className="text-tdc-red">FORUM</span></h1>
            </div>
            <div className="text-tdc-silver text-sm font-rajdhani">
              Showing {filteredTopics.length} topics
            </div>
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="glass-panel border border-tdc-red/10 p-5 hover:border-tdc-red/30 transition-colors group cursor-pointer">
                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                  <div className="flex-1">
                    <span className="text-xs font-orbitron text-tdc-red bg-tdc-red/10 px-2 py-0.5 border border-tdc-red/20 mb-2 inline-block">{topic.category}</span>
                    <h2 className="font-orbitron text-lg font-bold text-white group-hover:text-tdc-red transition-colors mb-1">{topic.title}</h2>
                    <p className="font-inter text-sm text-tdc-silver/70">Posted by <span className="text-tdc-silver">{topic.author}</span> • {topic.time}</p>
                  </div>
                  <div className="flex items-center gap-6 text-tdc-silver/50 text-sm font-rajdhani shrink-0">
                    <div className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {topic.replies}</div>
                    <div className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {topic.views}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTopics.length === 0 && (
              <div className="text-center py-12 text-tdc-silver font-inter">
                No topics found in this category. Be the first to start a discussion!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
