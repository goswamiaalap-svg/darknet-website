import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, MapPin, Clock, Users, ArrowLeft, ExternalLink,
  Star, Award, BookOpen, Zap, ChevronRight
} from "lucide-react";
import { getEventBySlug, getFeedbackByEvent, getSuccessStoriesByEvent, getSponsorsByEvent } from "@/lib/getData";
import { urlFor } from "@/lib/sanity.client";

export async function generateMetadata({ params }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.name,
    description: event.tagline || event.description?.slice(0, 160),
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StatBadge({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel border border-tdc-red/10 px-5 py-4 flex items-center gap-3">
      <Icon className="w-5 h-5 text-tdc-red" />
      <div>
        <div className="font-orbitron text-xl font-bold text-white">{value || "—"}</div>
        <div className="font-rajdhani text-xs text-tdc-silver/60 tracking-[0.2em] uppercase">{label}</div>
      </div>
    </div>
  );
}

export default async function EventDetailPage({ params }) {
  const [event, feedback, stories, sponsors] = await Promise.all([
    getEventBySlug(params.slug),
    getFeedbackByEvent(params.slug).catch(() => []),
    getSuccessStoriesByEvent(params.slug).catch(() => []),
    getSponsorsByEvent(params.slug).catch(() => []),
  ]);

  if (!event) notFound();

  const imageUrl = event.heroImage?.asset
    ? urlFor(event.heroImage).width(1400).height(700).url()
    : null;

  return (
    <main className="min-h-screen pt-20 pb-24">
      {/* Hero */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={event.heroImage?.alt || event.name} fill unoptimized className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-matrix-dark flex items-center justify-center">
            <Zap className="w-24 h-24 text-tdc-red/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-rajdhani text-sm text-tdc-silver/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO OPERATIONS
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.eventType && (
              <span className="font-orbitron text-xs bg-tdc-red text-white px-3 py-1 tracking-widest uppercase">
                {event.eventType}
              </span>
            )}
            {event.status && (
              <span className={`font-orbitron text-xs px-3 py-1 tracking-widest uppercase border ${
                event.status?.toLowerCase() === "upcoming"
                  ? "border-green-500 text-green-400"
                  : event.status?.toLowerCase() === "ongoing"
                  ? "border-yellow-500 text-yellow-400"
                  : "border-tdc-silver/30 text-tdc-silver/60"
              }`}>
                {event.status}
              </span>
            )}
          </div>
          <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
            {event.name}
          </h1>
          {event.tagline && (
            <p className="font-rajdhani text-xl text-tdc-silver max-w-2xl">{event.tagline}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Stats */}
            {event.stats && (
              <div className="grid grid-cols-3 gap-4">
                <StatBadge icon={Users} label="Registrations" value={event.stats.registrations} />
                <StatBadge icon={Award} label="Attendance" value={event.stats.attendance} />
                <StatBadge icon={BookOpen} label="Projects" value={event.stats.projects} />
              </div>
            )}

            {/* Description */}
            {event.description && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 bg-tdc-red" />
                  <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">MISSION BRIEF</h2>
                </div>
                <p className="font-inter text-tdc-silver leading-relaxed text-lg">{event.description}</p>
              </section>
            )}

            {/* Program */}
            {event.program?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-tdc-red" />
                  <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">PROGRAM SCHEDULE</h2>
                </div>
                <div className="space-y-4">
                  {event.program.map((item, i) => (
                    <div key={i} className="glass-panel border border-tdc-red/10 p-5 flex gap-5">
                      {item.time && (
                        <div className="shrink-0">
                          <span className="font-orbitron text-sm text-tdc-red">{item.time}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-orbitron text-sm font-bold text-white mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="font-inter text-sm text-tdc-silver/70">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers */}
            {event.speakers?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-tdc-red" />
                  <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">SPEAKERS</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="glass-panel border border-tdc-red/10 p-4 text-center">
                      <div className="w-14 h-14 rounded-full bg-matrix-dark border border-tdc-red/20 mx-auto mb-3 flex items-center justify-center">
                        <Users className="w-6 h-6 text-tdc-red/40" />
                      </div>
                      <div className="font-orbitron text-xs font-bold text-white">{speaker.name}</div>
                      {speaker.company && (
                        <div className="font-rajdhani text-xs text-tdc-silver/60 mt-1">{speaker.company}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Feedback */}
            {feedback?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-tdc-red" />
                  <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">TESTIMONIALS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {feedback.map((fb) => (
                    <div key={fb._id} className="glass-panel border border-tdc-red/10 p-5">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < (fb.rating || 5) ? "text-tdc-red fill-tdc-red" : "text-tdc-silver/20"}`} />
                        ))}
                      </div>
                      <p className="font-inter text-sm text-tdc-silver/80 italic mb-4">"{fb.quote}"</p>
                      <div>
                        <div className="font-orbitron text-xs text-white">{fb.authorName}</div>
                        {fb.authorAffiliation && (
                          <div className="font-rajdhani text-xs text-tdc-silver/50">{fb.authorAffiliation}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sponsors */}
            {sponsors?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-tdc-red" />
                  <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">SPONSORS</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {sponsors.map((s) => (
                    <div key={s._id} className="glass-panel border border-tdc-red/10 px-5 py-3">
                      <div className="font-orbitron text-xs text-white">
                        {s.organisation?.name || s.person?.name}
                      </div>
                      {s.tier && (
                        <div className="font-rajdhani text-xs text-tdc-red/70 mt-1 uppercase tracking-wide">{s.tier} TIER</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel border border-tdc-red/10 p-6 space-y-5">
              <h3 className="font-orbitron text-sm text-tdc-red tracking-widest uppercase">
                // OPERATION DETAILS
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Calendar className="w-4 h-4 text-tdc-red shrink-0 mt-0.5" />
                  <div>
                    <div className="font-rajdhani text-xs text-tdc-silver/50 uppercase tracking-wide mb-1">Start Date</div>
                    <div className="font-inter text-sm text-white">{formatDate(event.startDate)}</div>
                  </div>
                </div>

                {event.endDate && (
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-tdc-red shrink-0 mt-0.5" />
                    <div>
                      <div className="font-rajdhani text-xs text-tdc-silver/50 uppercase tracking-wide mb-1">End Date</div>
                      <div className="font-inter text-sm text-white">{formatDate(event.endDate)}</div>
                    </div>
                  </div>
                )}

                {(event.chapter?.name || event.location?.name) && (
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-tdc-red shrink-0 mt-0.5" />
                    <div>
                      <div className="font-rajdhani text-xs text-tdc-silver/50 uppercase tracking-wide mb-1">Location</div>
                      <div className="font-inter text-sm text-white">
                        {event.chapter?.name || event.location?.name}
                      </div>
                    </div>
                  </div>
                )}

                {event.skillLevel && (
                  <div className="flex gap-3">
                    <Zap className="w-4 h-4 text-tdc-red shrink-0 mt-0.5" />
                    <div>
                      <div className="font-rajdhani text-xs text-tdc-silver/50 uppercase tracking-wide mb-1">Skill Level</div>
                      <div className="font-inter text-sm text-white capitalize">{event.skillLevel}</div>
                    </div>
                  </div>
                )}

                {event.domains?.length > 0 && (
                  <div>
                    <div className="font-rajdhani text-xs text-tdc-silver/50 uppercase tracking-wide mb-2">Domains</div>
                    <div className="flex flex-wrap gap-2">
                      {event.domains.map((d, i) => (
                        <span key={i} className="font-orbitron text-xs border border-tdc-red/20 text-tdc-red/80 px-2 py-0.5">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {event.virtualLink && (
                <a
                  href={event.virtualLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-tdc-red text-white font-orbitron text-sm font-bold tracking-widest hover:bg-red-700 transition-all mt-2"
                >
                  JOIN ONLINE <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {event.chapter?.slug && (
                <Link
                  href={`/chapters/${event.chapter.slug}`}
                  className="flex items-center justify-between w-full py-3 px-4 border border-tdc-red/20 text-tdc-silver hover:border-tdc-red/50 hover:text-white transition-all font-rajdhani text-sm group"
                >
                  <span>VIEW CHAPTER</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
