"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    name: "Alex Sterling",
    role: "Lead Security Researcher",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Priya Patel",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Marcus Chen",
    role: "Red Team Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Sarah Jenkins",
    role: "Threat Intelligence",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative bg-primary-black" ref={ref}>
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-cyan-glow tracking-[0.4em] uppercase block mb-4">
            // ELITE OPERATIVES
          </span>
          <h2 className="font-space text-4xl md:text-5xl font-black text-text-white">
            MEET THE <span className="text-cyan-glow text-glow-cyan">CORE TEAM</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl glass-panel card-hover cursor-pointer"
            >
              <div className="aspect-[4/5] w-full relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-10 h-1 bg-cyan-glow mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="font-space font-bold text-2xl text-text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-inter text-sm text-cyan-glow font-medium uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
