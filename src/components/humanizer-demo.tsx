"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
  delay: number;
};

const conversation: Message[] = [
  {
    role: "user",
    text: "Je vois des tics d'IA dans la copy. C'est normal ?",
    delay: 0,
  },
  {
    role: "assistant",
    text: "Oui. Design-eye génère du contenu structuré, pas du contenu humanisé. Humanizer s'en charge : il repère les formules génériques et les réécrit.",
    delay: 1000,
  },
  {
    role: "user",
    text: "Lance.",
    delay: 2200,
  },
  {
    role: "assistant",
    text: "Humanizer appliqué. 6 phrases réécrites.\n\nHero : « méthodes éprouvées, renforcées par l'IA » → « Ce qui bloque les deals, on le règle avec les bons outils IA »\n\nService : « Tu fais plus avec les mêmes ressources » → « Tu traites plus de leads sans grossir l'équipe »\n\nVision : « Pas pour remplacer la relation humaine » → « L'IA s'occupe de la qualification. Toi, tu parles aux gens qui sont prêts à signer. »",
    delay: 3400,
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

export function HumanizerDemo() {
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
    <div className="mt-10 mx-auto max-w-2xl border border-[var(--border)] rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="text-xs text-[var(--text-muted)] font-mono">
          humanizer
        </span>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col gap-3 p-5 h-[300px] overflow-y-auto scroll-smooth"
      >
        {conversation.map((msg, i) => (
          <ChatBubble key={i} msg={msg} visible={i < visibleCount} />
        ))}
      </div>
    </div>
  );
}
