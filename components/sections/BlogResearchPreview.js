"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const articles = [
  {
    category: "Malware Analysis",
    title: "Deconstructing the Latest Ransomware Variants in 2026",
    excerpt: "An in-depth look at sophisticated evasion techniques and how our SOC team reverse-engineered the payload.",
    date: "Oct 24, 2026",
  },
  {
    category: "Threat Intelligence",
    title: "Tracking APT Groups Targeting Critical Infrastructure",
    excerpt: "Our latest intelligence report on the TTPs utilized by state-sponsored actors across the APAC region.",
    date: "Oct 18, 2026",
  },
  {
    category: "Web Security",
    title: "Zero-Day Vulnerabilities in Modern JS Frameworks",
    excerpt: "How to secure your supply chain against prototype pollution and SSRF attacks in enterprise applications.",
    date: "Oct 12, 2026",
  }
];

export default function BlogResearchPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative bg-primary-black" ref={ref}>
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-sm text-premium-blue tracking-[0.4em] uppercase block mb-4">
              // INTELLIGENCE HUB
            </span>
            <h2 className="font-space text-4xl md:text-5xl font-black text-text-white">
              RESEARCH & <span className="text-premium-blue">ANALYSIS</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn-secondary px-6 py-2 font-space text-sm font-bold tracking-widest uppercase hover:text-text-white transition-all"
          >
            View All Reports
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link href="/blog" key={i} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass-panel p-8 card-hover flex flex-col justify-between h-full cursor-pointer"
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-premium-blue/10 border border-premium-blue/30 text-premium-blue font-mono text-xs rounded-full mb-6">
                    {article.category}
                  </span>
                  <h3 className="font-space text-2xl font-bold text-text-white mb-4 group-hover:text-cyan-glow transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-inter text-text-gray text-sm leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-text-gray/10">
                  <span className="font-mono text-xs text-text-gray/60">{article.date}</span>
                  <span className="font-space text-xs text-premium-blue font-bold uppercase tracking-wider group-hover:underline">
                    Read Report
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
