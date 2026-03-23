"use client";

import { useEffect, useState } from "react";

const CALENDLY =
  "https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab";

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        borderBottom: "1px solid #e8e8e8",
        background: "#fafafa",
        boxShadow: scrolled ? "0 1px 12px rgba(20,20,20,0.08)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20"
    >
      <span className="text-sm font-semibold tracking-tight" style={{ color: "#141414" }}>
        Abraham Brakha
      </span>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b85aa] focus-visible:ring-offset-2"
        style={{ background: "#141414", color: "#fafafa", boxShadow: "0 2px 8px rgba(20,20,20,0.18)" }}
      >
        Prendre un appel
      </a>
    </nav>
  );
}
