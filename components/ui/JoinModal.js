"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, CheckCircle, AlertCircle, Loader } from "lucide-react";

const FIELD_STYLE =
  "w-full bg-transparent border border-tdc-red/30 text-white terminal-text text-sm px-4 py-3 focus:outline-none focus:border-tdc-red/70 focus:box-glow-red placeholder:text-tdc-silver/30 transition-all";

export default function JoinModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Protocol failure. Try again.");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus("idle"), 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-lg glass-panel border border-tdc-red/20 box-glow-red overflow-hidden">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-tdc-red/20 bg-black/40">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-tdc-red" />
                  <span className="font-orbitron text-sm text-tdc-red tracking-widest">
                    JOIN PROTOCOL
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-tdc-silver hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {status === "success" ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center gap-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400" />
                    <h3 className="font-orbitron text-2xl font-bold text-green-400 tracking-widest">
                      ACCESS GRANTED
                    </h3>
                    <p className="font-rajdhani text-tdc-silver text-lg">
                      Your request has been received. We&apos;ll contact you soon through
                      secure channels.
                    </p>
                    <div className="font-rajdhani text-xs text-tdc-silver/40 tracking-[0.3em] mt-2">
                      {"// PROTOCOL COMPLETE"}
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-4 px-8 py-2 border border-green-500 text-green-400 font-orbitron text-sm tracking-widest hover:bg-green-500 hover:text-black transition-all cursor-pointer"
                    >
                      CLOSE TERMINAL
                    </button>
                  </motion.div>
                ) : (
                  /* Form state */
                  <>
                    <p className="font-rajdhani text-tdc-silver/70 text-sm mb-6 terminal-text">
                      <span className="text-tdc-red">&gt;</span> INITIALIZING SECURE
                      CHANNEL... fill the form below to request access.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                          {"// IDENTITY"}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name / handle"
                          required
                          className={FIELD_STYLE}
                        />
                      </div>

                      <div>
                        <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                          {"// SECURE CHANNEL"}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className={FIELD_STYLE}
                        />
                      </div>

                      <div>
                        <label className="font-rajdhani text-xs text-tdc-red/70 tracking-[0.3em] uppercase block mb-1.5">
                          {"// TRANSMISSION"}
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about yourself, your skills, why you want to join..."
                          required
                          rows={4}
                          className={`${FIELD_STYLE} resize-none`}
                        />
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-red-400 font-rajdhani text-sm">
                          <AlertCircle className="w-4 h-4" />
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
                            INITIATING...
                          </>
                        ) : (
                          "INITIATE PROTOCOL"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
