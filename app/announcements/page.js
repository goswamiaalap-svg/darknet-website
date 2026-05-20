"use client";
import { AlertCircle, ShieldAlert, Info } from "lucide-react";

const ANNOUNCEMENTS = [
  { id: 1, type: "CRITICAL", title: "Zero-Day Vulnerability in xyz-lib (CVE-2026-9999)", date: "Today, 14:00 IST", content: "A critical unauthenticated RCE vulnerability has been discovered in a widely used npm library. All members are advised to check their projects and update immediately. Proof of Concept is in the wild." },
  { id: 2, type: "UPDATE", title: "HackByte CTF Registration Open", date: "May 18, 2026", content: "Registration for our flagship CTF is now live. Form your teams of up to 5 members. The qualifying round starts next month." },
  { id: 3, type: "INFO", title: "New Resource Added: Advanced Malware Sandbox Guide", date: "May 15, 2026", content: "We've just published a comprehensive 40-page guide on setting up a secure malware analysis lab using open-source tools. Check the Resource Library." },
];

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// BROADCAST</span>
          <h1 className="font-orbitron text-5xl font-black text-white mb-4">
            ALERTS & <span className="text-tdc-red text-glow-red">ANNOUNCEMENTS</span>
          </h1>
          <p className="font-inter text-tdc-silver max-w-xl">Critical security alerts, community updates, and official communications from the TDC core team.</p>
        </div>

        <div className="space-y-6">
          {ANNOUNCEMENTS.map(ann => (
            <div key={ann.id} className={`glass-panel border p-6 relative overflow-hidden ${
              ann.type === "CRITICAL" ? "border-red-500/50 bg-red-500/5" :
              ann.type === "UPDATE" ? "border-blue-500/30 bg-blue-500/5" : "border-tdc-red/10"
            }`}>
              {ann.type === "CRITICAL" && <div className="absolute top-0 left-0 w-1 h-full bg-red-500 box-glow-red" />}
              
              <div className="flex items-start gap-4">
                <div className="pt-1 shrink-0">
                  {ann.type === "CRITICAL" ? <ShieldAlert className="w-6 h-6 text-red-500" /> :
                   ann.type === "UPDATE" ? <Info className="w-6 h-6 text-blue-400" /> :
                   <AlertCircle className="w-6 h-6 text-tdc-silver" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`font-orbitron text-xs px-2 py-0.5 border ${
                      ann.type === "CRITICAL" ? "text-red-500 border-red-500/50 bg-red-500/10" :
                      ann.type === "UPDATE" ? "text-blue-400 border-blue-400/50 bg-blue-400/10" :
                      "text-tdc-silver border-tdc-silver/30"
                    }`}>{ann.type}</span>
                    <span className="font-rajdhani text-sm text-tdc-silver/50">{ann.date}</span>
                  </div>
                  <h2 className="font-orbitron text-xl font-bold text-white mb-3">{ann.title}</h2>
                  <p className="font-inter text-tdc-silver text-sm leading-relaxed">{ann.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
