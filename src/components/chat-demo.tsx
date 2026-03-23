"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
  delay: number;
};

// La vraie conversation — session B2B closing/IA/LinkedIn, nettoyee
const conversation: Message[] = [
  {
    role: "user",
    text: "J'ai 3 activites : closing, IA, LinkedIn setting. Je cherche des missions B2B — startups, PMEs, solopreneurs. CTA = prendre un RDV. Reference : ColdIQ. Je veux quelque chose qui respire l'IA. Epure.",
    delay: 0,
  },
  {
    role: "assistant",
    text: "T'as d'autres references ? Un site que t'aimes, un concurrent ?",
    delay: 1200,
  },
  {
    role: "user",
    text: "ColdIQ c'est tout. Pas d'autre inspi.",
    delay: 2200,
  },
  {
    role: "assistant",
    text: "Sombre et intense, ou clair et aere ?",
    delay: 3100,
  },
  {
    role: "user",
    text: "Clair et aere.",
    delay: 3900,
  },
  {
    role: "assistant",
    text: "J'ai cherche par ambiance et par cible B2B. Trois directions :\n\nA — editorial sombre, dense, ton tres direct. Trop agressif pour du conseil.\n\nB — blanc aere, typo confiante, zero decoration. Fait 'je sais ce que je fais'.\n\nC — blanc avec gradient radial acier tres subtil en fond de section. L'IA se sent, elle ne s'affiche pas.\n\nLequel te parle ?",
    delay: 5000,
  },
  {
    role: "user",
    text: "Le C. stax.ai, oui j'aime bien. Expertise calme.",
    delay: 6500,
  },
  {
    role: "assistant",
    text: "Direction validee :\n\n• Fond blanc #fafafa, texte #141414\n• Accent bleu acier #5b85aa\n• Gradient radial rgba(91,133,170,0.06) sur les sections cles\n• Inter + mono pour les labels techniques\n• Fade-in 600ms, rien d'autre\n\nRefs : stax.ai (AI feel) + joffreyspitzer.com (whitespace)\n\nValidee ?",
    delay: 7800,
  },
  {
    role: "user",
    text: "Oui valide.",
    delay: 9000,
  },
];

function ChatBubble({ msg, visible }: { msg: Message; visible: boolean }) {
  return (
    <div
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
          msg.role === "user"
            ? "bg-white text-[#0a0a0a] rounded-br-sm"
            : "bg-[rgba(255,255,255,0.06)] text-[#ccc] border border-[#222] rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    conversation.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), conversation[i].delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight text-center">
        Les skills en action.
      </h2>
      <p className="mt-4 text-center text-[var(--text-muted)] text-sm max-w-[55ch] mx-auto">
        Vraie conversation. 8 skills guident le process : brain dump, calibration sur des references reelles, validation par l'humain, puis generation.
      </p>

      <div className="mt-10 mx-auto max-w-2xl border border-[var(--border)] rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-[var(--text-muted)] font-mono">
            design-eye
          </span>
        </div>
        <div
          ref={containerRef}
          className="flex flex-col gap-3 p-5 h-[480px] overflow-y-auto scroll-smooth"
        >
          {conversation.map((msg, i) => (
            <ChatBubble
              key={i}
              msg={msg}
              visible={i < visibleCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
