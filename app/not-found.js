import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 border-2 border-tdc-red/30 flex items-center justify-center mb-8">
        <Zap className="w-8 h-8 text-tdc-red/50" />
      </div>
      <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-4">
        // ERROR 404
      </span>
      <h1 className="font-orbitron text-6xl md:text-8xl font-black text-white mb-4">
        4<span className="text-tdc-red text-glow-red">0</span>4
      </h1>
      <p className="font-inter text-tdc-silver text-lg max-w-sm mb-10">
        Connection lost. The requested resource was not found in the darknet.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 border border-tdc-red text-tdc-red font-orbitron text-sm font-bold tracking-widest hover:bg-tdc-red hover:text-white transition-all box-glow-red"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO BASE
      </Link>
    </main>
  );
}
