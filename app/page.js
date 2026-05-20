"use client";
import { useState, useEffect } from "react";
import FeaturedEvents from "@/components/FeaturedEvents";
import HeroReveal from "@/components/sections/HeroReveal";
import { getFeaturedEvents } from "@/lib/getData";
import JoinModal from "@/components/ui/JoinModal";

export default function Home() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getFeaturedEvents().then(setEvents).catch(() => setEvents([]));
    const handleOpenJoin = () => setIsJoinOpen(true);
    window.addEventListener("open-join-modal", handleOpenJoin);
    return () => window.removeEventListener("open-join-modal", handleOpenJoin);
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen">
      <HeroReveal onJoin={() => setIsJoinOpen(true)} />
      <div className="relative z-10 bg-cyber-black/40 backdrop-blur-sm border-y border-tdc-red/10">
        <FeaturedEvents events={events} />
      </div>
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
      <footer className="py-12 bg-cyber-black text-center border-t border-gray-900 relative z-10">
        <p className="font-orbitron text-xs text-gray-600 tracking-[0.5em] uppercase">
          &copy; {new Date().getFullYear()} THE DARKNET COMMUNITY // SECURE PROTOCOL ACTIVE
        </p>
      </footer>
    </main>
  );
}
