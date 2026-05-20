"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Terminal, Shield, User, Lock, Loader, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setErrorMsg("Access denied. Administrator privileges required.");
      setStatus("error");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        // Dispatch event to update navbar immediately
        window.dispatchEvent(new CustomEvent("auth-changed"));
        
        // Redirect based on role
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
        router.refresh();
      } else {
        throw new Error(data.error || "Authentication failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Protocol handshake failed. Verify credentials.");
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center bg-cyber-black relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-matrix-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tdc-red/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md glass-panel border border-tdc-red/20 box-glow-red overflow-hidden relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-tdc-red/20 bg-black/40">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-tdc-red" />
            <span className="font-orbitron text-sm text-tdc-red tracking-widest">
              SECURE HANDSHAKE
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="font-rajdhani text-tdc-silver/70 text-sm mb-6 terminal-text">
            <span className="text-tdc-red">&gt;</span> ENTER AUTHENTICATION KEYS TO ACCESS THE DECK.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                {"// KEY-ID (EMAIL)"}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-tdc-silver/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-transparent border border-tdc-red/30 text-white terminal-text text-sm pl-11 pr-4 py-3 focus:outline-none focus:border-tdc-red/70 focus:box-glow-red placeholder:text-tdc-silver/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                {"// PASSPHRASE"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-tdc-silver/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-transparent border border-tdc-red/30 text-white terminal-text text-sm pl-11 pr-4 py-3 focus:outline-none focus:border-tdc-red/70 focus:box-glow-red placeholder:text-tdc-silver/30 transition-all"
                />
              </div>
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2.5 text-red-400 font-rajdhani text-sm bg-red-950/20 border border-red-500/20 p-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-tdc-red text-white font-orbitron text-sm font-bold tracking-widest hover:bg-red-700 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {status === "loading" ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  VALIDATING KEYS...
                </>
              ) : (
                "AUTHENTICATE"
              )}
            </button>
          </form>

          {/* Quick Login credentials helper for testing */}
          <div className="mt-6 pt-5 border-t border-tdc-silver/10 space-y-2">
            <div className="font-rajdhani text-[11px] text-tdc-silver/40 tracking-wider uppercase">
              {"// MOCK NODES FOR DECK AUDITING"}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@darknet.com");
                  setPassword("adminpassword");
                }}
                className="text-left p-2 bg-white/5 border border-white/5 hover:border-tdc-red/30 hover:bg-tdc-red/5 transition-all text-xs cursor-pointer group"
              >
                <div className="font-orbitron font-bold text-white group-hover:text-tdc-red">Admin User</div>
                <div className="font-rajdhani text-tdc-silver/50">Full Admin Node</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("student@darknet.com");
                  setPassword("studentpassword");
                }}
                className="text-left p-2 bg-white/5 border border-white/5 hover:border-tdc-red/30 hover:bg-tdc-red/5 transition-all text-xs cursor-pointer group"
              >
                <div className="font-orbitron font-bold text-white group-hover:text-tdc-red">Student User</div>
                <div className="font-rajdhani text-tdc-silver/50">Restricted permissions</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-rajdhani text-sm text-tdc-silver/50">
              No clearance level?{" "}
              <Link href="/register" className="text-tdc-red hover:underline ml-1">
                Register Student Node
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
