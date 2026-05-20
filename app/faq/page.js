"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "What is The Darknet Community?", a: "The Darknet Community (TDC) is an ethical hacking collective dedicated to cybersecurity education, responsible research, and real-world skill development. We connect security enthusiasts, researchers, and professionals across India through CTFs, hackathons, and workshops." },
  { q: "Is this community legal and ethical?", a: "Absolutely. All our activities are strictly ethical and legal. We focus on authorized penetration testing, CTF competitions (controlled environments), responsible vulnerability disclosure, and security education. We have a zero-tolerance policy for unauthorized access or malicious activity." },
  { q: "How do I join The Darknet Community?", a: "Click the 'JOIN NOW' button on our website and fill in the membership request form. Our team reviews all applications and will reach out within 3–5 business days. We welcome all skill levels — from beginners to seasoned professionals." },
  { q: "Do I need prior experience to join?", a: "No prior experience is required! We welcome beginners who are curious about cybersecurity. We have dedicated beginner-friendly workshops, learning resources, and a mentorship programme to help you get started." },
  { q: "What are CTF competitions?", a: "Capture the Flag (CTF) competitions are cybersecurity challenges where participants solve security puzzles in a controlled, legal environment. Categories include Web Exploitation, Cryptography, Binary Exploitation, Forensics, and OSINT. They are one of the best ways to learn ethical hacking practically." },
  { q: "How do chapters work?", a: "TDC operates through local chapters across Indian cities. Each chapter is run by community leads who organise local events, workshops, and meetups. You can join your city's chapter after becoming a TDC member." },
  { q: "Are events free or paid?", a: "Most workshops and seminars are free for TDC members. Some premium bootcamps and events may have a nominal registration fee to cover venue and resource costs. CTF competitions are always free to participate." },
  { q: "How does bug bounty collaboration work?", a: "TDC members who discover vulnerabilities are encouraged to practise responsible disclosure. We provide guidance on coordinated disclosure processes and connect members with bug bounty programmes from major platforms." },
  { q: "What resources are available for learning?", a: "Members get access to our Resource Library with guides, cheatsheets, whitepapers, and tool lists. We also publish blog posts, research articles, CVE writeups, and run educational video series covering various cybersecurity domains." },
  { q: "How do I report a security issue or vulnerability?", a: "If you've found a real-world vulnerability, use our Support portal to submit a Responsible Disclosure ticket. Our security team will guide you through the proper disclosure process." },
  { q: "Is my personal data safe with TDC?", a: "Yes. We take data privacy seriously. All submitted data is encrypted, stored securely, and never sold or shared with third parties. Read our Privacy Policy for full details." },
  { q: "Can organisations partner or sponsor TDC?", a: "Yes! We welcome partnerships with companies, universities, and cybersecurity firms. Contact us through our Contact page or reach out at partnerships@thedarknetcommunity.com for collaboration opportunities." },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="glass-panel border border-tdc-red/10 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
        <span className={`font-orbitron text-sm font-bold leading-snug pr-4 transition-colors ${open ? "text-tdc-red" : "text-white group-hover:text-tdc-red"}`}>
          {item.q}
        </span>
        <ChevronDown className={`w-5 h-5 text-tdc-red shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-5 pb-5 border-t border-tdc-red/10 pt-4">
              <p className="font-inter text-tdc-silver text-sm leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// HELP CENTER</span>
          <h1 className="font-orbitron text-5xl font-black text-white mb-4">FREQUENTLY <span className="text-tdc-red text-glow-red">ASKED</span></h1>
          <p className="font-inter text-tdc-silver">Find answers to the most common questions about The Darknet Community.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
        </div>
        <div className="mt-14 glass-panel border border-tdc-red/10 p-8 text-center">
          <HelpCircle className="w-10 h-10 text-tdc-red/50 mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-bold text-white mb-2">Still have questions?</h3>
          <p className="font-inter text-tdc-silver/70 text-sm mb-5">Our team is ready to help you through our support portal.</p>
          <a href="/contact" className="inline-block px-8 py-3 border border-tdc-red text-tdc-red font-orbitron text-sm font-bold tracking-widest hover:bg-tdc-red hover:text-white transition-all box-glow-red">
            CONTACT US
          </a>
        </div>
      </div>
    </main>
  );
}
