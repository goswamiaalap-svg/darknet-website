"use client";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto glass-panel border border-tdc-red/10 p-8 md:p-12">
        <div className="mb-12 border-b border-tdc-red/20 pb-8">
          <span className="font-rajdhani text-sm text-tdc-red tracking-[0.4em] uppercase block mb-3">// LEGAL</span>
          <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-4">
            PRIVACY <span className="text-tdc-red text-glow-red">POLICY</span>
          </h1>
          <p className="font-inter text-tdc-silver/70 text-sm">Last Updated: May 19, 2026</p>
        </div>

        <div className="space-y-8 font-inter text-tdc-silver leading-relaxed">
          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">1. Introduction</h2>
            <p>Welcome to The Darknet Community (TDC). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at privacy@thedarknetcommunity.com.</p>
          </section>

          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, participate in activities on the website, or otherwise contact us.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-tdc-silver/80">
              <li><strong>Personal Information Provided by You:</strong> Names, email addresses, usernames, passwords, contact preferences, and similar information.</li>
              <li><strong>Automatically Collected Information:</strong> IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-tdc-silver/80">
              <li>To facilitate account creation and logon process.</li>
              <li>To post testimonials with your consent.</li>
              <li>Request feedback and contact you about your use of our website.</li>
              <li>To manage user accounts and keep them in working order.</li>
              <li>To send administrative information to you.</li>
              <li>To protect our Services (e.g. fraud monitoring and prevention).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">4. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
          </section>

          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">5. Do We Use Cookies and Other Tracking Technologies?</h2>
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
          </section>

          <section>
            <h2 className="font-orbitron text-xl text-white mb-3">6. Contact Us</h2>
            <p>If you have questions or comments about this notice, you may email us at privacy@thedarknetcommunity.com or by post to our headquarters in Mumbai, India.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
