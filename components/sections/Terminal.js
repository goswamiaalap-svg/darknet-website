"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const BOOT_LINES = [
  { text: "> INITIALIZING SECURE CONNECTION...", delay: 200 },
  { text: "> LOADING DARKNET PROTOCOLS...", delay: 800 },
  { text: "> BYPASSING FIREWALL... [OK]", delay: 1600 },
  { text: "> WELCOME TO THE DARKNET COMMUNITY", delay: 2600 },
  { text: "> ethical hacking | CTF | cybersecurity", delay: 3400 },
  { text: "> TYPE 'help' FOR AVAILABLE COMMANDS", delay: 4200 },
];

const COMMANDS = {
  help: [
    "┌─ AVAILABLE COMMANDS ─────────────────────┐",
    "│  help     → show this menu               │",
    "│  about    → learn about us               │",
    "│  events   → view upcoming events         │",
    "│  join     → join the community           │",
    "│  clear    → clear the terminal           │",
    "└──────────────────────────────────────────┘",
  ],
  about: [
    "THE DARKNET COMMUNITY",
    "─────────────────────",
    "We are an ethical hacking collective.",
    "Mission: educate, connect, and empower",
    "the next generation of cybersecurity",
    "professionals through CTFs, hackathons,",
    "workshops, and real-world challenges.",
    "",
    "500+ Members | 20+ Events | 10 Chapters",
  ],
  events: [
    "UPCOMING OPERATIONS:",
    "──────────────────────────────────────",
    "→ Redirecting to /events...",
    "→ [Navigate to /events to view all]",
  ],
  join: [
    "INITIATING JOIN PROTOCOL...",
    "▓▓▓▓▓▓▓▓▓▓ 100%",
    "→ Opening secure channel...",
  ],
  clear: [],
};

export default function Terminal({ isEmbedded = false, onJoin }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [bootDone, setBootDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTyping, setCurrentTyping] = useState("");
  const [typingLineIndex, setTypingLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentTyping]);

  // Boot sequence typewriter
  useEffect(() => {
    if (typingLineIndex >= BOOT_LINES.length) {
      setBootDone(true);
      setIsTyping(false);
      return;
    }

    const lineData = BOOT_LINES[typingLineIndex];
    const timeout = setTimeout(() => {
      setIsTyping(true);
      setCurrentTyping("");
      setCharIndex(0);
    }, typingLineIndex === 0 ? lineData.delay : lineData.delay - BOOT_LINES[typingLineIndex - 1].delay);

    return () => clearTimeout(timeout);
  }, [typingLineIndex]);

  // Character-by-character typing
  useEffect(() => {
    if (!isTyping || typingLineIndex >= BOOT_LINES.length) return;
    const fullText = BOOT_LINES[typingLineIndex].text;

    if (charIndex < fullText.length) {
      const t = setTimeout(() => {
        setCurrentTyping((prev) => prev + fullText[charIndex]);
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      // Line done
      const t = setTimeout(() => {
        setLines((prev) => [...prev, fullText]);
        setCurrentTyping("");
        setIsTyping(false);
        setTypingLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [isTyping, charIndex, typingLineIndex]);

  const handleCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      setLines((prev) => [...prev, `$ ${cmd}`]);
      setInput("");

      if (trimmed === "clear") {
        setTimeout(() => setLines([]), 100);
        return;
      }
      if (trimmed === "join") {
        const resp = COMMANDS.join;
        resp.forEach((line, i) => {
          setTimeout(() => {
            setLines((prev) => [...prev, line]);
            if (i === resp.length - 1) {
              setTimeout(() => onJoin?.(), 400);
            }
          }, i * 120);
        });
        return;
      }
      if (trimmed === "events") {
        COMMANDS.events.forEach((line, i) => {
          setTimeout(() => {
            setLines((prev) => [...prev, line]);
            if (i === COMMANDS.events.length - 1) {
              setTimeout(() => (window.location.href = "/events"), 600);
            }
          }, i * 120);
        });
        return;
      }
      const response = COMMANDS[trimmed];
      if (response) {
        response.forEach((line, i) => {
          setTimeout(() => setLines((prev) => [...prev, line]), i * 80);
        });
      } else if (trimmed !== "") {
        setTimeout(
          () =>
            setLines((prev) => [
              ...prev,
              `ERROR: Command '${trimmed}' not found. Type 'help' for commands.`,
            ]),
          100
        );
      }
    },
    [onJoin]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col terminal-text text-xs sm:text-sm"
      style={{ background: "rgba(5,5,5,0.95)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-tdc-red/20 bg-black/50 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-600 opacity-80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-600 opacity-80"></div>
        <div className="w-3 h-3 rounded-full bg-green-600 opacity-80"></div>
        <span className="ml-2 font-orbitron text-xs text-tdc-red/60 tracking-widest">
          TDC://SECURE_SHELL
        </span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed whitespace-pre-wrap break-all ${
              line.startsWith("$")
                ? "text-white"
                : line.startsWith("ERROR")
                ? "text-red-400"
                : line.startsWith("┌") ||
                  line.startsWith("│") ||
                  line.startsWith("└")
                ? "text-tdc-red/80"
                : line.startsWith(">") || line.startsWith("→")
                ? "text-tdc-red"
                : "text-tdc-silver"
            }`}
          >
            {line}
          </div>
        ))}

        {/* Currently typing boot line */}
        {currentTyping && (
          <div className="text-tdc-red leading-relaxed">
            {currentTyping}
            <span className="terminal-cursor">&nbsp;</span>
          </div>
        )}

        {/* Interactive input line */}
        {bootDone && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-tdc-red shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white terminal-text text-xs sm:text-sm caret-tdc-red"
              autoFocus={!isEmbedded}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="terminal-cursor">&nbsp;</span>
          </div>
        )}
      </div>
    </div>
  );
}
