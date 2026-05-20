import "./globals.css";
import Navbar from "@/components/Navbar";
import SceneWrapper from "@/components/3d/SceneWrapper";

export const metadata = {
  title: { default: "The Darknet Community", template: "%s | The Darknet Community" },
  description: "The Darknet Community is an ethical hacking community dedicated to cybersecurity education, responsible research, and real-world skill development.",
  keywords: ["The Darknet Community", "ethical hacking community", "cybersecurity", "CTF", "hackathons"],
  authors: [{ name: "The Darknet Community" }],
  creator: "The Darknet Community",
  publisher: "The Darknet Community",
  metadataBase: new URL("https://thedarknetcommunity.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-cyber-black text-white selection:bg-tdc-red selection:text-white">
        <div className="noise-overlay"></div>
        <div className="scanline"></div>
        <Navbar />
        <div className="relative z-10">{children}</div>
        <SceneWrapper />
      </body>
    </html>
  );
}
