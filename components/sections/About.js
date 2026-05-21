"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Members" },
  { value: "20+", label: "Events" },
  { value: "10", label: "Chapters" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function About({ onJoin }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Decorative grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      {/* Center radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="w-6 h-px bg-cyan-glow" />
          <span className="font-mono text-sm text-cyan-glow tracking-[0.4em] uppercase">
            {"// ABOUT THE DARKNET"}
          </span>
          <div className="w-6 h-px bg-cyan-glow" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-space text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight"
        >
          HACK.{" "}
          <br className="hidden sm:block" />
          LEARN.{" "}
          <span className="text-cyan-glow text-glow-cyan">EVOLVE.</span>
        </motion.h1>

        {/* Body text */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-inter text-text-gray text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          The Darknet Community is an ethical hacking collective dedicated to
          cybersecurity education, responsible research, and real-world skill
          development. We unite hackers, researchers, and security enthusiasts
          across India through CTFs, hackathons, and hands-on workshops.
        </motion.p>

        {/* Stats row */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-14"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-space text-4xl md:text-5xl font-black text-cyan-glow text-glow-cyan">
                {stat.value}
              </div>
              <div className="font-inter text-text-gray text-sm tracking-[0.3em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/events"
            className="px-8 py-3 border border-cyan-glow text-cyan-glow font-space text-sm font-bold tracking-widest hover:bg-cyan-glow hover:text-primary-black transition-all duration-300 box-glow-cyan"
          >
            EXPLORE EVENTS
          </Link>
          <button
            onClick={onJoin}
            className="px-8 py-3 bg-cyan-glow text-primary-black font-space text-sm font-bold tracking-widest hover:bg-cyan-600 transition-all duration-300 box-glow-cyan cursor-pointer"
          >
            JOIN NOW
          </button>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-glow/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-glow/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-glow/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-glow/20 pointer-events-none" />
    </section>
  );
}
