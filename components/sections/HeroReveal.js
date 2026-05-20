"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Terminal from "./Terminal";
import About from "./About";

export default function HeroReveal({ onJoin }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const tvY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-150%"]);
  const tvRotate = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
  const tvScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.7]);
  const tvOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const bgBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(15px)", "blur(0px)"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      {/* About section revealed behind TV */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-cyber-black overflow-hidden">
        <motion.div
          style={{ filter: bgBlur, opacity: bgOpacity, scale: bgScale }}
          className="w-full h-full flex flex-col justify-center"
        >
          <About onJoin={onJoin} />
        </motion.div>
      </div>

      {/* TV Frame with Terminal overlaid */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none z-20 flex items-center justify-center md:justify-start md:pl-[15%] lg:pl-[20%] p-4">
        <motion.div
          style={{ y: tvY, rotate: tvRotate, scale: tvScale, opacity: tvOpacity }}
          className="w-full max-w-2xl pointer-events-auto"
        >
          <div className="tv-frame">
            <div className="tv-screen-inner">
              <div className="tv-reflection"></div>
              <div className="h-[50vh] md:h-[55vh]">
                <Terminal isEmbedded={true} onJoin={onJoin} />
              </div>
            </div>
            <div className="hidden lg:flex tv-knobs pr-6">
              <div className="tv-knob w-6 h-6"></div>
              <div className="tv-knob w-6 h-6"></div>
              <div className="w-6 h-1.5 bg-tdc-red/20 rounded-full mt-2"></div>
            </div>
          </div>
          {/* Red glow halo behind TV */}
          <div className="absolute -inset-10 bg-tdc-red/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
}
