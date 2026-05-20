"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, User, Mail, Lock, Loader, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not register node. Try again.");
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center bg-cyber-black relative overflow-hidden">
      <div className="absolute inset-0 bg-matrix-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tdc-red/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md glass-panel border border-tdc-red/20 box-glow-red overflow-hidden relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-tdc-red/20 bg-black/40">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-tdc-red" />
            <span className="font-orbitron text-sm text-tdc-red tracking-widest">
              REGISTER NODE
            </span>
          </div>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <CheckCircle className="w-16 h-16 text-green-400" />
              <h3 className="font-orbitron text-xl font-bold text-green-400 tracking-widest">
                NODE PROVISIONED
              </h3>
              <p className="font-rajdhani text-tdc-silver text-base">
                Your student profile has been created successfully. Handshaking login portal...
              </p>
            </div>
          ) : (
            <>
              <p className="font-rajdhani text-tdc-silver/70 text-sm mb-6 terminal-text">
                <span className="text-tdc-red">&gt;</span> PROVISION A NEW STUDENT ACCESS KEY ON THE NETWORK.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                    {"// HANDLE / FULL NAME"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-tdc-silver/40" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      required
                      className="w-full bg-transparent border border-tdc-red/30 text-white terminal-text text-sm pl-11 pr-4 py-3 focus:outline-none focus:border-tdc-red/70 focus:box-glow-red placeholder:text-tdc-silver/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                    {"// SECURE MAIL (EMAIL)"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-tdc-silver/40" />
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
                    {"// KEYPASSPHRASE"}
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
                      GENERATING SECURE NODES...
                    </>
                  ) : (
                    "PROVISION ACCESS"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="font-rajdhani text-sm text-tdc-silver/50">
                  Already registered?{" "}
                  <Link href="/login" className="text-tdc-red hover:underline ml-1">
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
