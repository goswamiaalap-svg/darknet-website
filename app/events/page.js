"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, Zap, ArrowRight, X } from "lucide-react";
import { getEvents } from "@/lib/getData";
import { urlFor } from "@/lib/sanity.client";

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const SKILL_LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const CATEGORIES = ["All", "CTF", "Hackathon", "Workshop", "Seminar", "Bootcamp"];
const STATUSES = ["All", "Upcoming", "Ongoing", "Completed"];

function EventCard({ event, index }) {
  const imageUrl = event.heroImage?.asset ? urlFor(event.heroImage).width(600).height(340).url() : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <Link href={`/events/${event.slug}`} className="block group h-full">
        <article className="glass-panel card-hover border border-tdc-red/10 overflow-hidden h-full flex flex-col">
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
                <Zap className="w-10 h-10 text-tdc-red/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {event.eventType && (
                <span className="font-orbitron text-xs bg-tdc-red text-white px-2.5 py-1 tracking-widest uppercase">
                  {event.eventType}
                </span>
              )}
              {event.status && (
                <span className={`font-orbitron text-xs px-2.5 py-1 tracking-widest uppercase border ${
                  event.status.toLowerCase() === "upcoming"
                    ? "border-green-500 text-green-400"
                    : event.status.toLowerCase() === "ongoing"
                    ? "border-yellow-500 text-yellow-400"
                    : "border-tdc-silver/30 text-tdc-silver/60"
                }`}>
                  {event.status}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5">
            <div className="flex items-center gap-3 mb-3 text-tdc-silver/70">
              <Calendar className="w-3.5 h-3.5 text-tdc-red/60 shrink-0" />
              <span className="font-rajdhani text-sm tracking-wide">
                {formatDate(event.startDate)}
              </span>
              {event.skillLevel && (
                <>
                  <span className="text-tdc-silver/20">·</span>
                  <span className="font-rajdhani text-xs text-tdc-red/70 uppercase tracking-wide">
                    {event.skillLevel}
                  </span>
                </>
              )}
            </div>

            <h2 className="font-orbitron text-base font-bold text-white group-hover:text-tdc-red transition-colors mb-2 leading-snug">
              {event.name}
            </h2>

            {event.tagline && (
              <p className="font-inter text-sm text-tdc-silver/80 line-clamp-2 flex-1 mb-4">
                {event.tagline}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-tdc-silver/60">
                <MapPin className="w-3.5 h-3.5 text-tdc-red/60" />
                <span className="font-rajdhani text-xs">
                  {event.chapter?.name || event.location?.name || "Online"}
                </span>
              </div>
              <span className="font-orbitron text-xs text-tdc-red flex items-center gap-1 group-hover:gap-2 transition-all">
                VIEW <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "All",
    skillLevel: "All",
    status: "All",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (filters.category !== "All" && e.category !== filters.category) return false;
      if (filters.skillLevel !== "All" && e.skillLevel !== filters.skillLevel) return false;
      if (filters.status !== "All" && e.status?.toLowerCase() !== filters.status.toLowerCase()) return false;
      if (filters.search && !e.name?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [events, filters]);

  const setFilter = (key, val) => setFilters((prev) => ({ ...prev, [key]: val }));
  const clearFilters = () => setFilters({ category: "All", skillLevel: "All", status: "All", search: "" });
  const hasActiveFilters = Object.entries(filters).some(([k, v]) => k === "search" ? v !== "" : v !== "All");

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">
            // ACTIVE OPERATIONS
          </span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            ALL <span className="text-tdc-red text-glow-red">EVENTS</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">
            Browse all CTFs, hackathons, workshops, and seminars organized by The Darknet Community.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px] max-w-sm">
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
                className="w-full bg-transparent border border-tdc-red/20 text-white font-rajdhani text-sm px-4 py-2.5 focus:outline-none focus:border-tdc-red/50 placeholder:text-tdc-silver/30 transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border font-orbitron text-xs tracking-widest transition-all cursor-pointer ${
                showFilters || hasActiveFilters
                  ? "border-tdc-red text-tdc-red bg-tdc-red/10"
                  : "border-tdc-red/20 text-tdc-silver hover:border-tdc-red/50"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              FILTERS {hasActiveFilters && "(ACTIVE)"}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-tdc-silver/60 hover:text-white font-rajdhani text-sm transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> CLEAR
              </button>
            )}
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-panel border border-tdc-red/10 p-5 grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {[
                { label: "CATEGORY", key: "category", options: CATEGORIES },
                { label: "SKILL LEVEL", key: "skillLevel", options: SKILL_LEVELS },
                { label: "STATUS", key: "status", options: STATUSES },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <p className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase mb-3">
                    // {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFilter(key, opt)}
                        className={`px-3 py-1 font-rajdhani text-xs tracking-wide border transition-all cursor-pointer ${
                          filters[key] === opt
                            ? "border-tdc-red bg-tdc-red/20 text-white"
                            : "border-tdc-red/20 text-tdc-silver hover:border-tdc-red/40"
                        }`}
                      >
                        {opt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Results count */}
        <p className="font-rajdhani text-sm text-tdc-silver/50 mb-6 tracking-wide">
          {loading ? "SCANNING DATABASE..." : `${filtered.length} OPERATION${filtered.length !== 1 ? "S" : ""} FOUND`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-panel border border-tdc-red/10 h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 border border-tdc-red/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-tdc-red/40" />
            </div>
            <p className="font-orbitron text-lg text-tdc-silver/50 tracking-widest">
              NO ACTIVE OPERATIONS
            </p>
            <p className="font-rajdhani text-sm text-tdc-silver/30 mt-2">
              {hasActiveFilters ? "Try adjusting your filters." : "Check back soon."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
