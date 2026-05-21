"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-black border-t border-text-gray/10 pt-20 pb-10 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-40 h-10">
                <Image
                  src="/TDC_logo.PNG"
                  alt="The Darknet Community"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="font-inter text-text-gray text-sm leading-relaxed max-w-sm mb-8">
              Building India's Elite Cybersecurity Network. We are dedicated to research, education, and advancing the field of information security through community-driven initiatives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center text-text-gray hover:text-cyan-glow hover:bg-cyan-glow/10 transition-all border border-transparent hover:border-cyan-glow/30">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center text-text-gray hover:text-cyan-glow hover:bg-cyan-glow/10 transition-all border border-transparent hover:border-cyan-glow/30">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center text-text-gray hover:text-cyan-glow hover:bg-cyan-glow/10 transition-all border border-transparent hover:border-cyan-glow/30">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-dark flex items-center justify-center text-text-gray hover:text-cyan-glow hover:bg-cyan-glow/10 transition-all border border-transparent hover:border-cyan-glow/30">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-space font-bold text-text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/events" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Events & Workshops</Link></li>
              <li><Link href="/chapters" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Local Chapters</Link></li>
              <li><Link href="/research" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Research Blog</Link></li>
              <li><Link href="/forum" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-space font-bold text-text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">About Us</Link></li>
              <li><Link href="/team" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Our Team</Link></li>
              <li><Link href="/sponsors" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Sponsorship</Link></li>
              <li><Link href="/contact" className="font-inter text-sm text-text-gray hover:text-cyan-glow transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-text-gray/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-gray/60 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} THE DARKNET COMMUNITY
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-inter text-xs text-text-gray/60 hover:text-text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-inter text-xs text-text-gray/60 hover:text-text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
