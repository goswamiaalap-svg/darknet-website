"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Shield, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const NAV_GROUPS = [
  { name: "Events", href: "/events" },
  { name: "Chapters", href: "/chapters" },
  {
    name: "Learn",
    children: [
      { name: "Resources", href: "/resources" },
      { name: "Blog", href: "/blog" },
      { name: "Education", href: "/learn" },
    ],
  },
  {
    name: "Community",
    children: [
      { name: "Forum", href: "/forum" },
      { name: "Announcements", href: "/announcements" },
      { name: "Support", href: "/support" },
    ],
  },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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

    // Listen for custom login/logout events
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
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href) => pathname === href || pathname?.startsWith(href + "/");

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
            <div className="absolute inset-0 bg-tdc-red blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 font-rajdhani text-sm font-medium tracking-wider text-tdc-silver hover:text-white transition-colors cursor-pointer">
                  {item.name.toUpperCase()}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-44 glass-panel border border-tdc-red/10 py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-4 py-2 font-rajdhani text-sm tracking-wide transition-colors ${
                            isActive(child.href)
                              ? "text-tdc-red"
                              : "text-tdc-silver hover:text-white hover:bg-tdc-red/5"
                          }`}
                        >
                          {child.name.toUpperCase()}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 font-rajdhani text-sm font-medium tracking-wider transition-all ${
                  isActive(item.href)
                    ? "text-white text-glow-red"
                    : "text-tdc-silver hover:text-white"
                }`}
              >
                {item.name.toUpperCase()}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="font-rajdhani text-sm font-bold text-tdc-red hover:text-red-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                  title="Admin Dashboard"
                >
                  <Shield className="w-4.5 h-4.5" />
                  ADMIN SYS
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="font-rajdhani text-sm font-bold text-white hover:text-tdc-red uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                  title="Student Profile"
                >
                  <User className="w-4.5 h-4.5 text-tdc-red" />
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
                className="font-rajdhani text-xs font-bold text-tdc-silver/50 hover:text-tdc-red uppercase tracking-widest transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 border border-tdc-red text-tdc-red font-orbitron text-xs font-bold hover:bg-tdc-red hover:text-white transition-all box-glow-red tracking-widest uppercase cursor-pointer"
            >
              SIGN IN
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-tdc-red relative z-[110]"
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
            className="lg:hidden absolute top-0 left-0 w-full bg-cyber-black/98 backdrop-blur-xl border-b border-tdc-red/20 pt-20 pb-8 flex flex-col z-[105] overflow-y-auto max-h-screen"
          >
            {NAV_GROUPS.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <div className="px-8 py-2 font-rajdhani text-xs text-tdc-red/50 tracking-[0.4em] uppercase">
                    {item.name}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-10 py-2.5 font-rajdhani text-lg text-tdc-silver hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-8 py-3 font-rajdhani text-xl ${
                    isActive(item.href) ? "text-tdc-red" : "text-tdc-silver"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name.toUpperCase()}
                </Link>
              )
            )}
            <div className="px-8 pt-4 space-y-3">
              {user ? (
                <>
                  {user.role === "ADMIN" ? (
                    <Link
                      href="/admin"
                      className="block w-full py-3 text-center border border-tdc-red text-tdc-red font-orbitron text-lg box-glow-red uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ADMIN SYS
                    </Link>
                  ) : (
                    <Link
                      href="/profile"
                      className="block w-full py-3 text-center border border-white/20 text-white font-orbitron text-lg uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PROFILE
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await fetch("/api/auth/logout", { method: "POST" });
                      setUser(null);
                      router.push("/login");
                      router.refresh();
                    }}
                    className="w-full py-3 text-center text-tdc-silver/60 hover:text-tdc-red font-orbitron text-sm uppercase tracking-wider cursor-pointer block"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block w-full py-3 text-center border border-tdc-red text-tdc-red font-orbitron text-lg box-glow-red uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
