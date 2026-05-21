"use client";
import { useState, useEffect } from "react";
import FeaturedEvents from "@/components/FeaturedEvents";
import HeroReveal from "@/components/sections/HeroReveal";
import About from "@/components/sections/About";
import CommunityStats from "@/components/sections/CommunityStats";
import TeamSection from "@/components/sections/TeamSection";
import BlogResearchPreview from "@/components/sections/BlogResearchPreview";
import Sponsorship from "@/components/sections/Sponsorship";
import Footer from "@/components/Footer";
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
      <div id="home"><HeroReveal onJoin={() => setIsJoinOpen(true)} /></div>
      
      <CommunityStats />
      
      <div id="about"><About onJoin={() => setIsJoinOpen(true)} /></div>
      
      <div id="team"><TeamSection /></div>

      <div className="relative z-10 bg-primary-black/40 backdrop-blur-sm border-y border-cyan-glow/10">
        <FeaturedEvents events={events} />
      </div>

      <div id="research"><BlogResearchPreview /></div>
      
      <div id="sponsors"><Sponsorship /></div>
      
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
      
      <Footer />
    </main>
  );
}
