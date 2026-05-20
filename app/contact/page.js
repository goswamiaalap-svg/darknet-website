"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Terminal as TerminalIcon } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// ESTABLISH CONNECTION</span>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-white mb-4">
            CONTACT <span className="text-tdc-red text-glow-red">TDC</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl mx-auto">For partnerships, sponsorships, media inquiries, or general questions, reach out to us using the secure channels below.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel border border-tdc-red/10 p-8 flex items-start gap-5 group">
              <div className="w-12 h-12 bg-tdc-red/10 border border-tdc-red/20 flex flex-col items-center justify-center shrink-0 group-hover:bg-tdc-red/20 transition-colors">
                <Mail className="w-6 h-6 text-tdc-red" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-1">Email Comm Link</h3>
                <p className="font-inter text-tdc-silver text-sm mb-3">General inquiries & support.</p>
                <a href="mailto:hello@thedarknetcommunity.com" className="font-rajdhani text-tdc-red hover:text-white transition-colors text-lg tracking-wide">hello@thedarknetcommunity.com</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel border border-tdc-red/10 p-8 flex items-start gap-5 group">
              <div className="w-12 h-12 bg-tdc-red/10 border border-tdc-red/20 flex flex-col items-center justify-center shrink-0 group-hover:bg-tdc-red/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-tdc-red" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-1">Community Discord</h3>
                <p className="font-inter text-tdc-silver text-sm mb-3">Join our server for real-time chat.</p>
                <a href="#" className="font-rajdhani text-tdc-red hover:text-white transition-colors text-lg tracking-wide">discord.gg/thedarknet</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-panel border border-tdc-red/10 p-8 flex items-start gap-5 group">
              <div className="w-12 h-12 bg-tdc-red/10 border border-tdc-red/20 flex flex-col items-center justify-center shrink-0 group-hover:bg-tdc-red/20 transition-colors">
                <MapPin className="w-6 h-6 text-tdc-red" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-1">Headquarters</h3>
                <p className="font-inter text-tdc-silver text-sm mb-1">Mumbai, Maharashtra, India</p>
                <p className="font-inter text-tdc-silver/50 text-xs">Note: We operate as a decentralized community. In-person meetings are by appointment only.</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel border border-tdc-red/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tdc-red to-transparent opacity-50" />
            
            <div className="flex items-center gap-2 mb-8">
              <TerminalIcon className="w-5 h-5 text-tdc-red" />
              <h2 className="font-orbitron text-xl font-bold text-white tracking-widest">TRANSMIT MESSAGE</h2>
            </div>

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-500/10">
                  <span className="text-green-500 text-2xl">✓</span>
                </div>
                <h3 className="font-orbitron text-xl text-green-400 mb-2 font-bold">TRANSMISSION SECURED</h3>
                <p className="font-inter text-tdc-silver text-sm">Message received. Our team will respond shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 font-orbitron text-xs text-tdc-silver hover:text-white border-b border-tdc-silver/30 pb-1">SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-orbitron text-xs text-tdc-red tracking-widest mb-2">IDENTIFICATION (NAME)</label>
                  <input required type="text" className="w-full bg-cyber-dark/50 border border-tdc-red/30 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block font-orbitron text-xs text-tdc-red tracking-widest mb-2">RETURN ADDRESS (EMAIL)</label>
                  <input required type="email" className="w-full bg-cyber-dark/50 border border-tdc-red/30 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block font-orbitron text-xs text-tdc-red tracking-widest mb-2">INQUIRY TYPE</label>
                  <select className="w-full bg-cyber-dark/50 border border-tdc-red/30 p-3 text-tdc-silver font-rajdhani focus:outline-none focus:border-tdc-red transition-colors cursor-pointer appearance-none">
                    <option>General Inquiry</option>
                    <option>Partnership/Sponsorship</option>
                    <option>Media/Press</option>
                    <option>Vulnerability Disclosure</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-orbitron text-xs text-tdc-red tracking-widest mb-2">PAYLOAD (MESSAGE)</label>
                  <textarea required rows={5} className="w-full bg-cyber-dark/50 border border-tdc-red/30 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red transition-colors resize-none" placeholder="Enter your message here..."></textarea>
                </div>
                <button type="submit" disabled={status === "loading"} className="w-full bg-tdc-red text-white font-orbitron font-bold tracking-widest py-4 hover:bg-tdc-red/80 transition-colors disabled:opacity-50">
                  {status === "loading" ? "ENCRYPTING..." : "INITIATE TRANSMISSION"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
