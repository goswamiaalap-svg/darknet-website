"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Shield, LogOut, Loader, User, Mail, Award, Key } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8 text-tdc-red animate-spin mx-auto" />
          <p className="font-orbitron text-xs text-tdc-silver tracking-widest uppercase">
            HANDSHAKING ENCRYPTED NODE...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-matrix-grid opacity-[0.02] pointer-events-none" />
      
      {/* Profile Header */}
      <div className="glass-panel border border-tdc-red/20 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 border border-tdc-red/30 bg-tdc-red/5 flex items-center justify-center relative box-glow-red rounded-none">
            <User className="w-8 h-8 text-tdc-red" />
          </div>
          <div>
            <h1 className="font-orbitron text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-rajdhani text-xs px-2 py-0.5 border border-tdc-silver/20 text-tdc-silver/70 uppercase">
                STUDENT NODE
              </span>
              <span className="font-rajdhani text-xs px-2 py-0.5 border border-green-500/20 bg-green-500/5 text-green-400 uppercase tracking-widest">
                CLEARANCE LEVEL: Restricted
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-tdc-red/30 text-tdc-red/80 hover:text-white hover:bg-tdc-red/20 font-orbitron text-xs tracking-wider transition-all cursor-pointer w-fit"
        >
          <LogOut className="w-4 h-4" /> DISCONNECT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Node Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel border border-tdc-red/10 p-5 space-y-4">
            <h2 className="font-orbitron text-xs text-tdc-red tracking-widest uppercase mb-4">
              {"// CREDENTIAL KEYS"}
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-tdc-silver/40 shrink-0 mt-0.5" />
                <div>
                  <div className="font-rajdhani text-[11px] text-tdc-silver/50 uppercase tracking-wider">Secure Email</div>
                  <div className="font-inter text-sm text-white break-all">{user.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-tdc-silver/40 shrink-0 mt-0.5" />
                <div>
                  <div className="font-rajdhani text-[11px] text-tdc-silver/50 uppercase tracking-wider">System Role</div>
                  <div className="font-inter text-sm text-white uppercase">{user.role}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Key className="w-4 h-4 text-tdc-silver/40 shrink-0 mt-0.5" />
                <div>
                  <div className="font-rajdhani text-[11px] text-tdc-silver/50 uppercase tracking-wider">Node ID</div>
                  <div className="font-inter text-xs text-tdc-silver/80 font-mono">{user.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Main Profile Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel border border-tdc-red/10 p-6 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-4 bg-tdc-red" />
                <h2 className="font-orbitron text-lg font-bold text-white tracking-wider">
                  STUDENT PERMISSION PROTOCOLS
                </h2>
              </div>

              <p className="font-inter text-sm text-tdc-silver/80 leading-relaxed mb-6">
                Your credentials verify you as a registered student of TheDarkNet Community. 
                As a student, you have access to participate in events, view local chapters, read forums, and access resources. 
                Full administrative actions (e.g. creating/modifying chapters, managing community settings, and access approvals) are restricted to superusers only.
              </p>

              {/* Displaying privileges list */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="font-rajdhani text-xs text-tdc-silver/40 tracking-wider uppercase mb-2">
                  {"// PERMISSION INDEX"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-green-950/10 border border-green-500/10 text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Read Forums & Articles
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-950/10 border border-green-500/10 text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Register for Operations
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-950/10 border border-green-500/10 text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Access Learning Resources
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-950/10 border border-red-500/10 text-red-400/80">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    Create/Modify Chapters [LOCKED]
                  </div>
                </div>
              </div>
            </div>

            <div className="font-rajdhani text-[11px] text-tdc-silver/30 border-t border-white/5 pt-4 mt-6 text-center">
              SYSTEM STATUS: CONNECTED SECURELY // PROTOCOL LEVEL: RESTRICTED STUDENT ACCESS
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
