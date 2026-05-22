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

        {/* Right Side: Animated Cyber Globe & Dashboard UI */}
        <div className="hidden lg:flex items-center justify-center h-[600px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background glowing orbs */}
            <div className="absolute w-[400px] h-[400px] bg-premium-blue/10 rounded-full blur-[60px] animate-pulse pointer-events-none"></div>
            <div className="absolute w-[250px] h-[250px] bg-cyan-glow/15 rounded-full blur-[40px] pointer-events-none"></div>
            
            {/* Animated Cyber Globe */}
            <div className="relative w-[350px] h-[350px] border border-cyan-glow/20 rounded-full flex items-center justify-center">
              {/* Rotating outer dashed ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-1px] rounded-full border border-dashed border-cyan-glow/40 border-t-premium-blue"
              ></motion.div>
              
              {/* Rotating inner solid ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[30px] rounded-full border border-premium-blue/30 border-b-cyan-glow/60"
              ></motion.div>

              {/* Core */}
              <div className="absolute inset-[100px] rounded-full bg-gradient-to-tr from-premium-blue/20 to-cyan-glow/10 border border-cyan-glow/50 backdrop-blur-md flex items-center justify-center box-glow-cyan">
                <div className="w-16 h-16 rounded-full bg-cyan-glow animate-pulse blur-[10px]"></div>
              </div>

              {/* Floating UI Nodes */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-10 -right-10 glass-panel px-4 py-2 border-l-2 border-l-cyan-glow rounded-md"
              >
                <div className="font-mono text-xs text-cyan-glow">NODE_01</div>
                <div className="font-inter text-[10px] text-text-gray">ACTIVE SECURE</div>
              </motion.div>

              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-5 -left-10 glass-panel px-4 py-2 border-r-2 border-r-premium-blue rounded-md"
              >
                <div className="font-mono text-xs text-premium-blue">THREAT_LEVEL</div>
                <div className="font-inter text-[10px] text-text-gray">MINIMAL</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
