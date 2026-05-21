"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Shield, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Research", href: "/research" },
  { name: "Team", href: "/team" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    fetchUser();
    window.addEventListener("auth-changed", fetchUser);
    return () => window.removeEventListener("auth-changed", fetchUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "glass-panel py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-[110]">
          <div className="relative w-32 h-9 md:w-44 md:h-12 flex items-center justify-center">
            <Image
              src="/TDC_logo.PNG"
              alt="The Darknet Community"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-cyan-glow blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-2">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 font-inter text-sm font-medium tracking-wider transition-all relative group ${
                isActive(item.href)
                  ? "text-text-white text-glow-cyan"
                  : "text-text-gray hover:text-text-white"
              }`}
            >
              {item.name}
              {/* Smooth Hover Underline */}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyan-glow transition-transform origin-left duration-300 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="font-inter text-sm font-bold text-cyan-glow hover:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                >
                  <Shield className="w-4.5 h-4.5" />
                  ADMIN SYS
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="font-inter text-sm font-bold text-text-white hover:text-cyan-glow uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                >
                  <User className="w-4.5 h-4.5 text-cyan-glow" />
                  {user.name.split(" ")[0]}
                </Link>
              )}
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  setUser(null);
                  router.push("/login");
                  router.refresh();
                }}
                className="font-inter text-xs font-bold text-text-gray/50 hover:text-cyan-glow uppercase tracking-widest transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-primary px-5 py-2 font-space text-xs font-bold tracking-widest uppercase cursor-pointer"
            >
              SIGN IN
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="xl:hidden text-cyan-glow relative z-[110]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-0 left-0 w-full bg-primary-black/98 backdrop-blur-xl border-b border-cyan-glow/20 pt-20 pb-8 flex flex-col z-[105]"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-8 py-3 font-inter text-xl ${
                  isActive(item.href) ? "text-cyan-glow" : "text-text-gray hover:text-text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-8 pt-4 mt-4 border-t border-cyan-glow/10 space-y-3">
              {user ? (
                <>
                  <Link href={user.role === "ADMIN" ? "/admin" : "/profile"} className="block w-full py-3 text-center btn-primary font-space text-lg uppercase" onClick={() => setMobileMenuOpen(false)}>
                    {user.role === "ADMIN" ? "ADMIN SYS" : "PROFILE"}
                  </Link>
                  <button onClick={async () => { setMobileMenuOpen(false); await fetch("/api/auth/logout", { method: "POST" }); setUser(null); router.push("/login"); router.refresh(); }} className="w-full py-3 text-center text-text-gray/60 hover:text-cyan-glow font-space text-sm uppercase tracking-wider cursor-pointer block">
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link href="/login" className="block w-full py-3 text-center btn-primary font-space text-lg uppercase" onClick={() => setMobileMenuOpen(false)}>
                  SIGN IN
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
