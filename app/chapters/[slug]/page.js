import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Zap, ArrowRight } from "lucide-react";
import { getChapterBySlug, getEventsByChapterId } from "@/lib/getData";
import { urlFor } from "@/lib/sanity.client";

export async function generateMetadata({ params }) {
  const chapter = await getChapterBySlug(params.slug);
  if (!chapter) return { title: "Chapter Not Found" };
  return {
    title: chapter.name,
    description: `The Darknet Community ${chapter.name} chapter based in ${chapter.location || "India"}.`,
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ChapterDetailPage({ params }) {
  const chapter = await getChapterBySlug(params.slug);
  if (!chapter) notFound();

  const events = await getEventsByChapterId(chapter._id).catch(() => []);
  const imageUrl = chapter.image?.asset ? urlFor(chapter.image).width(1200).height(600).url() : null;

  const upcoming = events.filter((e) => e.status?.toLowerCase() === "upcoming");
  const past = events.filter((e) => e.status?.toLowerCase() !== "upcoming");

  return (
    <main className="min-h-screen pt-20 pb-24">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[360px] overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={chapter.name} fill unoptimized className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-matrix-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <Link
            href="/chapters"
            className="inline-flex items-center gap-2 font-rajdhani text-sm text-tdc-silver/70 hover:text-white mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ALL CHAPTERS
          </Link>
          <span className="font-rajdhani text-xs text-tdc-red tracking-[0.4em] uppercase block mb-2">
            // CHAPTER
          </span>
          <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white leading-tight">
            {chapter.name}
          </h1>
          {chapter.location && (
            <div className="flex items-center gap-2 mt-3 text-tdc-silver/70">
              <MapPin className="w-4 h-4 text-tdc-red/70" />
              <span className="font-rajdhani text-lg">{chapter.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-14">
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { label: "Total Events", value: events.length },
            { label: "Upcoming", value: upcoming.length },
            { label: "Completed", value: past.length },
          ].map((s, i) => (
            <div key={i} className="glass-panel border border-tdc-red/10 p-5 text-center">
              <div className="font-orbitron text-3xl font-black text-tdc-red text-glow-red mb-1">{s.value}</div>
              <div className="font-rajdhani text-xs text-tdc-silver/60 tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-tdc-red" />
              <h2 className="font-orbitron text-2xl font-bold text-white tracking-wide">UPCOMING OPERATIONS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <Link key={event._id} href={`/events/${event.slug}`} className="block group">
                  <article className="glass-panel card-hover border border-tdc-red/10 p-5 h-full flex flex-col">
                    {event.eventType && (
                      <span className="font-orbitron text-xs bg-tdc-red text-white px-2.5 py-1 mb-3 self-start tracking-widest uppercase">
                        {event.eventType}
                      </span>
                    )}
                    <h3 className="font-orbitron text-base font-bold text-white group-hover:text-tdc-red transition-colors mb-2">
                      {event.name}
                    </h3>
                    {event.tagline && (
                      <p className="font-inter text-sm text-tdc-silver/70 line-clamp-2 flex-1 mb-4">{event.tagline}</p>
                    )}
                    <div className="flex items-center gap-2 text-tdc-silver/60 mt-auto">
                      <Calendar className="w-3.5 h-3.5 text-tdc-red/60" />
                      <span className="font-rajdhani text-sm">{formatDate(event.startDate)}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-tdc-silver/30" />
              <h2 className="font-orbitron text-2xl font-bold text-tdc-silver/70 tracking-wide">PAST OPERATIONS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <Link key={event._id} href={`/events/${event.slug}`} className="block group">
                  <article className="glass-panel card-hover border border-tdc-silver/5 p-5 h-full flex flex-col opacity-80 hover:opacity-100 transition-opacity">
                    {event.eventType && (
                      <span className="font-orbitron text-xs border border-tdc-silver/20 text-tdc-silver/50 px-2.5 py-1 mb-3 self-start tracking-widest uppercase">
                        {event.eventType}
                      </span>
                    )}
                    <h3 className="font-orbitron text-base font-bold text-white/80 group-hover:text-white transition-colors mb-2">
                      {event.name}
                    </h3>
                    {event.tagline && (
                      <p className="font-inter text-sm text-tdc-silver/50 line-clamp-2 flex-1 mb-4">{event.tagline}</p>
                    )}
                    <div className="flex items-center gap-2 text-tdc-silver/40 mt-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-rajdhani text-sm">{formatDate(event.startDate)}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 border border-tdc-red/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-tdc-red/40" />
            </div>
            <p className="font-orbitron text-lg text-tdc-silver/50 tracking-widest">NO OPERATIONS YET</p>
            <p className="font-rajdhani text-sm text-tdc-silver/30 mt-2">This chapter is just getting started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
