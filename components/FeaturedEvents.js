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
  const imageUrl = event.heroImage?.asset
    ? urlFor(event.heroImage).width(600).height(340).url()
    : event.heroImage?.url || (typeof event.heroImage === 'string' ? event.heroImage : null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
    >
      <Link href={`/events/${event.slug}`} className="block group h-full">
        <article className="glass-panel card-hover overflow-hidden h-full flex flex-col relative rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
          {/* Hero image */}
          <div className="relative w-full aspect-video overflow-hidden bg-primary-black">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={event.heroImage?.alt || event.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary-dark">
                <Zap className="w-12 h-12 text-cyan-glow/30" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent" />
            {/* Type badge */}
            {event.eventType && (
              <div className="absolute top-4 left-4 z-10">
                <span className="font-space font-bold text-xs bg-premium-blue text-white px-3 py-1 uppercase tracking-wider rounded-full shadow-lg border border-premium-blue/50">
                  {event.eventType}
                </span>
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="flex flex-col flex-1 p-6 relative z-10">
            <div className="flex items-center gap-3 mb-4 text-text-gray">
              <Calendar className="w-4 h-4 text-cyan-glow shrink-0" />
              <span className="font-mono text-xs tracking-wide uppercase">
                {formatDate(event.startDate)}
              </span>
            </div>

            <h3 className="font-space text-xl font-bold text-text-white group-hover:text-cyan-glow transition-colors mb-3 leading-snug">
              {event.name}
            </h3>

            {event.tagline && (
              <p className="font-inter text-sm text-text-gray/80 line-clamp-2 flex-1 mb-6">
                {event.tagline}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-text-gray/10">
              <div className="flex items-center gap-1.5 text-text-gray">
                <MapPin className="w-3.5 h-3.5 text-cyan-glow" />
                <span className="font-mono text-xs tracking-wide uppercase">
                  {event.chapter?.name || event.location?.name || "Online"}
                </span>
              </div>
              <span className="font-space text-xs font-bold text-premium-blue uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Register <ArrowRight className="w-3 h-3" />
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
    <section className="relative py-32 px-6 bg-primary-black">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="font-mono text-sm text-cyan-glow tracking-[0.4em] uppercase block mb-4"
            >
              // ACTIVE DEPLOYMENTS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-space text-4xl md:text-5xl font-black text-text-white"
            >
              UPCOMING <span className="text-cyan-glow">EVENTS</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/events"
              className="btn-secondary px-6 py-2 font-space text-sm font-bold tracking-widest uppercase flex items-center gap-2 group"
            >
              View Past Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Events grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-glow/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-cyan-glow" />
            </div>
            <p className="font-space font-bold text-xl text-text-white mb-2">
              NO ACTIVE DEPLOYMENTS
            </p>
            <p className="font-inter text-sm text-text-gray">
              Check back soon for upcoming events, webinars, and hackathons.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
