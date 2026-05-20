"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Network, Zap } from "lucide-react";
import { getChapters } from "@/lib/getData";
import { urlFor } from "@/lib/sanity.client";

function ChapterCard({ chapter, index }) {
  const imageUrl = chapter.image?.asset
    ? urlFor(chapter.image).width(600).height(400).url()
    : chapter.image?.url || (typeof chapter.image === "string" ? chapter.image : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <Link href={`/chapters/${chapter.slug}`} className="block group">
        <article className="glass-panel card-hover border border-tdc-red/10 overflow-hidden">
          {/* Chapter image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-cyber-dark">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={chapter.name}
                fill
                unoptimized
                className="object-cover opacity-40 group-hover:opacity-75 transition-opacity"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-matrix-dark gap-3">
                <Network className="w-10 h-10 text-tdc-red/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-transparent" />
          </div>

          {/* Card body */}
          <div className="p-5">
            <h2 className="font-orbitron text-lg font-bold text-white group-hover:text-tdc-red transition-colors mb-2 leading-snug">
              {chapter.name}
            </h2>
            {chapter.location && (
              <div className="flex items-center gap-2 text-tdc-silver/70 mb-4">
                <MapPin className="w-3.5 h-3.5 text-tdc-red/60 shrink-0" />
                <span className="font-rajdhani text-sm">{chapter.location}</span>
              </div>
            )}
            <span className="font-orbitron text-xs text-tdc-red flex items-center gap-1 group-hover:gap-2 transition-all">
              VIEW CHAPTER <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function ChaptersPage() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChapters().then((data) => {
      setChapters(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-14">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">
            // NETWORK NODES
          </span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            OUR <span className="text-tdc-red text-glow-red">CHAPTERS</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">
            The Darknet Community operates across multiple cities through local chapters,
            each driving cybersecurity education in their region.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-panel border border-tdc-red/10 h-64 animate-pulse" />
            ))}
          </div>
        ) : chapters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, i) => (
              <ChapterCard key={chapter._id} chapter={chapter} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 border border-tdc-red/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-tdc-red/40" />
            </div>
            <p className="font-orbitron text-lg text-tdc-silver/50 tracking-widest">
              NO CHAPTERS FOUND
            </p>
            <p className="font-rajdhani text-sm text-tdc-silver/30 mt-2">
              Chapters are being established. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
