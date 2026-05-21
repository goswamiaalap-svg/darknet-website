"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "6K+", label: "Active Members", desc: "Across India" },
  { value: "50+", label: "Events Hosted", desc: "Workshops & CTFs" },
  { value: "100+", label: "Webinar Hours", desc: "Expert talks" },
  { value: "20+", label: "Partnerships", desc: "Global infosec firms" },
];

export default function CommunityStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-panel p-8 flex flex-col items-center justify-center text-center card-hover relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="font-space text-5xl font-black text-cyan-glow text-glow-cyan mb-2">
                {stat.value}
              </h3>
              <div className="font-inter font-bold text-text-white text-lg mb-1">
                {stat.label}
              </div>
              <div className="font-inter text-sm text-text-gray">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
