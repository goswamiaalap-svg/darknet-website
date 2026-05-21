"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Sponsorship() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sponsors = [
    "CrowdStrike", "Palo Alto", "Tines", "Cloudflare", "OffSec"
  ];

  return (
    <section className="py-24 relative bg-secondary-dark border-y border-cyan-glow/10" ref={ref}>
      <div className="container mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-text-gray tracking-[0.3em] uppercase block mb-8">
            TRUSTED BY INDUSTRY LEADERS
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {sponsors.map((sponsor, i) => (
              <div key={i} className="font-space font-bold text-2xl md:text-3xl text-text-white hover:text-cyan-glow transition-colors cursor-pointer">
                {sponsor}
              </div>
            ))}
          </div>

          <div className="mt-20 glass-panel max-w-3xl mx-auto p-10 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-premium-blue/10 to-cyan-glow/10"></div>
            <div className="relative z-10">
              <h3 className="font-space text-3xl font-bold text-text-white mb-4">
                Partner with <span className="text-cyan-glow">The Darknet</span>
              </h3>
              <p className="font-inter text-text-gray mb-8">
                Gain access to India's top cybersecurity talent pool. Sponsor events, host hackathons, and recruit elite professionals.
              </p>
              <button className="btn-primary px-8 py-3 font-space font-bold text-sm tracking-widest uppercase">
                Become a Sponsor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
