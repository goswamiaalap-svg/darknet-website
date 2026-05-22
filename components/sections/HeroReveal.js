"use client";
import { motion } from "framer-motion";

export default function HeroReveal({ onJoin }) {
  return (
    <div className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        
        {/* Left Side: Text and CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <h1 className="font-space text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-text-white tracking-tight">
            Building India&apos;s Elite <br />
            <span className="text-gradient">Cybersecurity Network</span>
          </h1>
          
          <p className="font-inter text-text-gray text-lg md:text-xl max-w-lg leading-relaxed">
            Research, Webinars, Innovation & Cybersecurity Excellence. Join the premier platform for technical professionals.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={onJoin}
              className="btn-primary px-8 py-3 font-space font-semibold tracking-wide text-sm"
            >
              Join Community
            </button>
            <a
              href="/events"
              className="btn-secondary px-8 py-3 font-space font-semibold tracking-wide text-sm flex items-center justify-center"
            >
              Explore Events
            </a>
          </div>

          <div className="flex items-center gap-8 mt-8 border-t border-text-gray/10 pt-8">
            <div>
              <div className="font-space text-2xl font-bold text-text-white">6K+</div>
              <div className="font-inter text-xs text-text-gray tracking-wider uppercase mt-1">Active Members</div>
            </div>
            <div>
              <div className="font-space text-2xl font-bold text-text-white">50+</div>
              <div className="font-inter text-xs text-text-gray tracking-wider uppercase mt-1">Events Hosted</div>
            </div>
            <div>
              <div className="font-space text-2xl font-bold text-text-white">100+</div>
              <div className="font-inter text-xs text-text-gray tracking-wider uppercase mt-1">Webinar Hours</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3D Globe placeholder */}
        <div className="hidden lg:flex items-center justify-center h-[500px]">
          <div className="relative w-full h-full flex items-center justify-center translate-z-0 transform-gpu">
             <div className="absolute w-[300px] h-[300px] bg-premium-blue/10 rounded-full blur-[60px] animate-pulse pointer-events-none"></div>
             <div className="absolute w-[200px] h-[200px] bg-cyan-glow/10 rounded-full blur-[40px] animate-glow pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
