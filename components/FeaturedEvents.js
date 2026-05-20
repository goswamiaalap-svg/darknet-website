"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Zap } from "lucide-react";
import { urlFor } from "@/lib/sanity.client";

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventCard({ event, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const imageUrl = event.heroImage?.asset ? urlFor(event.heroImage).width(600).height(340).url() : null;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
    >
      <Link href={`/events/${event.slug}`} className="block group">
        <article className="glass-panel card-hover border border-tdc-red/10 overflow-hidden h-full flex flex-col">
          {/* Hero image */}
          <div className="relative w-full aspect-video overflow-hidden bg-cyber-dark">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={event.heroImage?.alt || event.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-matrix-dark">
                <Zap className="w-12 h-12 text-tdc-red/30" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-transparent" />
            {/* Type badge */}
            {event.eventType && (
              <div className="absolute top-3 left-3">
                <span className="font-orbitron text-xs bg-tdc-red text-white px-3 py-1 tracking-widest uppercase">
                  {event.eventType}
                </span>
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="flex flex-col flex-1 p-5">
            <div className="flex items-center gap-3 mb-3 text-tdc-silver/70">
              <Calendar className="w-3.5 h-3.5 text-tdc-red/60 shrink-0" />
              <span className="font-rajdhani text-sm tracking-wide">
                {formatDate(event.startDate)}
              </span>
            </div>

            <h3 className="font-orbitron text-base font-bold text-white group-hover:text-tdc-red transition-colors mb-2 leading-snug">
              {event.name}
            </h3>

            {event.tagline && (
              <p className="font-inter text-sm text-tdc-silver/80 line-clamp-2 flex-1 mb-4">
                {event.tagline}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-tdc-silver/60">
                <MapPin className="w-3.5 h-3.5 text-tdc-red/60" />
                <span className="font-rajdhani text-xs tracking-wide">
                  {event.chapter?.name || event.location?.name || "Online"}
                </span>
              </div>
              <span className="font-orbitron text-xs text-tdc-red group-hover:gap-2 flex items-center gap-1 transition-all">
                VIEW <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function FeaturedEvents({ events = [] }) {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true });

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3"
            >
              {"// LATEST OPS"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-orbitron text-4xl md:text-5xl font-black text-white"
            >
              FEATURED{" "}
              <span className="text-tdc-red text-glow-red">OPERATIONS</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/events"
              className="font-rajdhani text-tdc-silver hover:text-white flex items-center gap-2 text-lg tracking-wide transition-colors group"
            >
              VIEW ALL OPERATIONS{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Events grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 border border-tdc-red/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-tdc-red/40" />
            </div>
            <p className="font-orbitron text-lg text-tdc-silver/50 tracking-widest">
              NO ACTIVE OPERATIONS
            </p>
            <p className="font-rajdhani text-sm text-tdc-silver/30 mt-2">
              Check back soon for upcoming events.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
