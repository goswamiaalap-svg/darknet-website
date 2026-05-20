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
      {/* Decorative red grid background */}
      <div className="absolute inset-0 red-grid-bg opacity-40 pointer-events-none" />
      {/* Center radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,0,0,0.06) 0%, transparent 70%)" }}
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
          <div className="w-6 h-px bg-tdc-red" />
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase">
            {"// ABOUT THE DARKNET"}
          </span>
          <div className="w-6 h-px bg-tdc-red" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-orbitron text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight"
        >
          HACK.{" "}
          <br className="hidden sm:block" />
          LEARN.{" "}
          <span className="text-tdc-red text-glow-red">EVOLVE.</span>
        </motion.h1>

        {/* Body text */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-inter text-tdc-silver text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
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
              <div className="font-orbitron text-4xl md:text-5xl font-black text-tdc-red text-glow-red">
                {stat.value}
              </div>
              <div className="font-rajdhani text-tdc-silver text-sm tracking-[0.3em] uppercase mt-1">
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
            className="px-8 py-3 border border-tdc-red text-tdc-red font-orbitron text-sm font-bold tracking-widest hover:bg-tdc-red hover:text-white transition-all duration-300 box-glow-red"
          >
            EXPLORE EVENTS
          </Link>
          <button
            onClick={onJoin}
            className="px-8 py-3 bg-tdc-red text-white font-orbitron text-sm font-bold tracking-widest hover:bg-red-700 transition-all duration-300 box-glow-red cursor-pointer"
          >
            JOIN NOW
          </button>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-tdc-red/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-tdc-red/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-tdc-red/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-tdc-red/20 pointer-events-none" />
    </section>
  );
}
