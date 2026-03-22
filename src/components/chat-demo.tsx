"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
  delay: number;
};

// La vraie conversation — nettoyee, comme si le skill marchait deja
const conversation: Message[] = [
  {
    role: "user",
    text: "Je veux creer un site pour une offre de closing dedie aux solopreneurs. Closer rapidement des deals avec une methode intensive inspiree du Challenger Sale.",
    delay: 0,
  },
  {
    role: "assistant",
    text: "Donne-moi tout ce que t'as en tete. C'est quoi exactement ? Pour qui ? T'as des sites que t'aimes ? Des trucs que tu detestes ? Balance en vrac.",
    delay: 1000,
  },
  {
    role: "user",
    text: "Solopreneurs, solofounders. Le visiteur doit avoir envie de bosser avec moi pour que je l'aide a closer ses deals, challenger sa discovery, challenger ses offres. En francais. Pour le reste, je sais pas encore.",
    delay: 2000,
  },
  {
    role: "assistant",
    text: "T'as rien d'autre ? Un concurrent que t'aimes, un site qui te fait dire 'je veux ca' ?",
    delay: 3000,
  },
  {
    role: "user",
    text: "Comme ca, non.",
    delay: 3800,
  },
  {
    role: "assistant",
    text: "OK. Pas d'indication visuelle. Plutot sombre et intense, ou clair et aere ?",
    delay: 4600,
  },
  {
    role: "user",
    text: "Je sais pas.",
    delay: 5200,
  },
  {
    role: "assistant",
    text: "Pas de souci. Je vais chercher ce qui marche pour ta cible.\n\nLes solopreneurs achetent une personne, pas une marque. Ils veulent comprendre la proposition en 5 secondes. Ils repondent au minimal avec un element bold, au ton direct, a la confiance par l'humain visible.\n\nJe cherche des references qui collent a ca.",
    delay: 6000,
  },
  {
    role: "assistant",
    text: "J'ai explore plusieurs galeries par style (minimal, personal brand, editorial). Voila deux directions :\n\nA — Fond clair, ton nom en gros, serif pour les titres, beaucoup d'air. Chaque mot pese. Ca fait 'je sais ce que je fais, pas besoin d'en rajouter.'\n\nB — Fond sombre, accent chaud, plus intense. Ca fait 'urgence, survie, action.'\n\nLequel te parle ?",
    delay: 7500,
  },
  {
    role: "user",
    text: "Ca me parle.",
    delay: 8500,
  },
  {
    role: "assistant",
    text: "Le A ou le B ?",
    delay: 9000,
  },
  {
    role: "user",
    text: "Le A. Clair et sobre.",
    delay: 9600,
  },
  {
    role: "assistant",
    text: "Direction :\n\n• Fond off-white, serif pour les titres, ton nom en nav\n• Noir dominant, zero couleur, zero decoration\n• Hero : phrase qui parle au probleme du solopreneur\n• Section methode courte (Challenger Sale sans jargon)\n• Section 'c'est pour toi si' — liste de situations\n• CTA : reserver un appel\n• Aucun effet visuel\n\nValidee ?",
    delay: 10500,
  },
  {
    role: "user",
    text: "Go.",
    delay: 11500,
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
        Le skill en action.
      </h2>
      <p className="mt-4 text-center text-[var(--text-muted)] text-sm max-w-[50ch] mx-auto">
        Vraie conversation. Le visiteur donne son idee, le skill calibre sur des references, et le site se construit.
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
