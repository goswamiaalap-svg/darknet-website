"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, BookOpen, AlertTriangle, MessageSquare, Terminal } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Members", value: "1,248", icon: Users, color: "text-blue-400" },
    { label: "Active Incidents", value: "3", icon: AlertTriangle, color: "text-red-400" },
    { label: "Pending Approvals", value: "24", icon: Shield, color: "text-yellow-400" },
    { label: "Forum Posts Today", value: "156", icon: MessageSquare, color: "text-green-400" },
  ];

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 glass-panel border border-tdc-red/10 p-4 h-fit">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Terminal className="w-5 h-5 text-tdc-red" />
          <h2 className="font-orbitron font-bold text-white tracking-widest text-sm">ADMIN SYS</h2>
        </div>
        <nav className="flex flex-col gap-1">
          {["overview", "users", "content", "security", "settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-3 font-rajdhani text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab ? "bg-tdc-red/20 text-tdc-red border-l-2 border-tdc-red" : "text-tdc-silver hover:bg-white/5 hover:text-white border-l-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <header className="glass-panel border border-tdc-red/10 p-6 flex justify-between items-center">
          <div>
            <h1 className="font-orbitron text-2xl font-bold text-white uppercase">{activeTab}</h1>
            <p className="font-rajdhani text-tdc-silver text-sm mt-1">System status: <span className="text-green-400">NOMINAL</span></p>
          </div>
          <div className="font-orbitron text-xs px-3 py-1 border border-tdc-red text-tdc-red bg-tdc-red/10">SUPERUSER</div>
        </header>

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel border border-tdc-red/10 p-5">
                  <div className="flex justify-between items-start mb-4">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h3 className="font-orbitron text-2xl font-black text-white mb-1">{s.value}</h3>
                  <p className="font-rajdhani text-tdc-silver text-xs uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-panel border border-tdc-red/10 p-6 min-h-[300px] flex items-center justify-center">
              <p className="font-rajdhani text-tdc-silver/50 text-sm tracking-widest">[ DASHBOARD MODULES INITIALIZING... ]</p>
            </div>
          </>
        )}

        {activeTab !== "overview" && (
          <div className="glass-panel border border-tdc-red/10 p-6 min-h-[400px] flex flex-col items-center justify-center text-center">
            <Shield className="w-12 h-12 text-tdc-red/30 mb-4" />
            <h3 className="font-orbitron text-lg text-white mb-2 uppercase">{activeTab} Module Locked</h3>
            <p className="font-inter text-sm text-tdc-silver">This module is currently being updated. Please check back later.</p>
          </div>
        )}
      </div>
    </main>
  );
}
