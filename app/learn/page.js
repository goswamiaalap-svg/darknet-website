"use client";
import { BookOpen, MonitorPlay, Terminal, Shield } from "lucide-react";

const COURSES = [
  { id: 1, title: "Web Security 101", level: "Beginner", modules: 12, icon: MonitorPlay, color: "text-blue-400", desc: "Learn the fundamentals of web application security, HTTP, and the OWASP Top 10." },
  { id: 2, title: "Applied Cryptography", level: "Intermediate", modules: 8, icon: Shield, color: "text-purple-400", desc: "Understanding encryption, hashing, PKI, and common cryptographic flaws." },
  { id: 3, title: "Binary Exploitation (Pwn)", level: "Advanced", modules: 15, icon: Terminal, color: "text-red-500", desc: "Deep dive into assembly, memory corruption, buffer overflows, and ROP chains." },
  { id: 4, title: "Digital Forensics & IR", level: "Intermediate", modules: 10, icon: BookOpen, color: "text-green-400", desc: "Techniques for investigating cyber incidents, acquiring evidence, and analyzing artifacts." }
];

export default function LearnPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// ACADEMY</span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            CYBER <span className="text-tdc-red text-glow-red">EDUCATION</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-2xl mx-auto">Structured learning paths and interactive courses designed by industry experts to take you from beginner to advanced practitioner.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {COURSES.map(course => (
            <div key={course.id} className="glass-panel border border-tdc-red/10 p-8 hover:border-tdc-red/40 transition-colors group cursor-pointer flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center ${course.color}`}>
                  <course.icon className="w-7 h-7" />
                </div>
                <span className="font-orbitron text-xs border border-tdc-silver/20 text-tdc-silver px-3 py-1">{course.level}</span>
              </div>
              <h2 className="font-orbitron text-2xl font-bold text-white mb-3 group-hover:text-tdc-red transition-colors">{course.title}</h2>
              <p className="font-inter text-tdc-silver text-sm mb-8 flex-1 leading-relaxed">{course.desc}</p>
              
              <div className="flex items-center justify-between border-t border-tdc-red/10 pt-5 mt-auto">
                <span className="font-rajdhani text-sm text-tdc-silver/70">{course.modules} Modules</span>
                <span className="font-orbitron text-xs font-bold text-tdc-red group-hover:tracking-widest transition-all">START LEARNING &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
