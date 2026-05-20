"use client";
import { LifeBuoy, Ticket, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// ASSISTANCE</span>
          <h1 className="font-orbitron text-5xl font-black text-white mb-4">
            SUPPORT <span className="text-tdc-red text-glow-red">PORTAL</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">Create a support ticket for technical issues, account help, or reporting security concerns on our platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 glass-panel border border-tdc-red/20 p-8">
            <h2 className="font-orbitron text-xl text-white mb-6 border-b border-tdc-red/20 pb-4">Open New Ticket</h2>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-orbitron text-xs text-tdc-silver mb-2">CATEGORY</label>
                  <select className="w-full bg-cyber-dark border border-tdc-red/20 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red cursor-pointer">
                    <option>Technical Issue</option>
                    <option>Account Access</option>
                    <option>Event Registration</option>
                    <option>Report Vulnerability</option>
                  </select>
                </div>
                <div>
                  <label className="block font-orbitron text-xs text-tdc-silver mb-2">URGENCY</label>
                  <select className="w-full bg-cyber-dark border border-tdc-red/20 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red cursor-pointer">
                    <option>Low (General Help)</option>
                    <option>Medium (Account Issue)</option>
                    <option className="text-tdc-red">High (Security Concern)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-orbitron text-xs text-tdc-silver mb-2">SUBJECT</label>
                <input type="text" className="w-full bg-cyber-dark border border-tdc-red/20 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red" placeholder="Brief description of the issue" />
              </div>
              <div>
                <label className="block font-orbitron text-xs text-tdc-silver mb-2">DETAILS</label>
                <textarea rows={6} className="w-full bg-cyber-dark border border-tdc-red/20 p-3 text-white font-rajdhani focus:outline-none focus:border-tdc-red resize-none" placeholder="Provide as much detail as possible..."></textarea>
              </div>
              <button className="bg-tdc-red text-white font-orbitron font-bold tracking-widest py-3 px-8 hover:bg-tdc-red/80 transition-colors box-glow-red">
                SUBMIT TICKET
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-panel border border-tdc-red/10 p-6 text-center">
              <Ticket className="w-8 h-8 text-tdc-red mx-auto mb-3" />
              <h3 className="font-orbitron font-bold text-white mb-2">Your Tickets</h3>
              <p className="text-sm font-inter text-tdc-silver mb-4">You must be logged in to view your past and active support tickets.</p>
              <button className="border border-tdc-red text-tdc-red font-orbitron text-xs py-2 px-4 hover:bg-tdc-red hover:text-white transition-colors w-full">LOG IN</button>
            </div>
            
            <div className="glass-panel border border-tdc-red/10 p-6">
              <h3 className="font-orbitron font-bold text-white mb-4 flex items-center gap-2"><LifeBuoy className="w-4 h-4 text-tdc-red" /> Need quick help?</h3>
              <ul className="space-y-3 text-sm font-inter text-tdc-silver">
                <li><a href="/faq" className="hover:text-tdc-red transition-colors flex items-center gap-2">&rarr; Check the FAQ</a></li>
                <li><a href="/forum" className="hover:text-tdc-red transition-colors flex items-center gap-2">&rarr; Ask in the Forum</a></li>
                <li><a href="#" className="hover:text-tdc-red transition-colors flex items-center gap-2">&rarr; Join our Discord</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
