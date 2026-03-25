"use client";

import { useState, useRef, useEffect } from "react";
import projects from "@/data/skills-directory.json";

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

type SkillResult = {
  name: string;
  description: string;
  stars: number;
  url: string;
};

type Message = {
  role: "user" | "assistant";
  text?: string;
  skills?: SkillResult[];
  pitch?: boolean;
  exploreQuery?: string;
};

function ChatBubble({
  msg,
  children,
}: {
  msg: { role: "user" | "assistant"; text?: string };
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-line ${
          msg.role === "user"
            ? "bg-white text-[#0a0a0a] rounded-br-sm"
            : "bg-[rgba(255,255,255,0.06)] text-[#ccc] border border-[#222] rounded-bl-sm"
        }`}
      >
        {msg.text}
        {children}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: SkillResult }) {
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-[var(--border)] px-4 py-3 rounded hover:bg-[rgba(255,255,255,0.04)] transition-colors"
    >
      <div className="text-xs font-mono text-[var(--text)]">{skill.name}</div>
      <div className="text-xs text-[var(--text-muted)] leading-relaxed mt-1">
        {skill.description}
      </div>
      <div className="text-xs text-[var(--text-muted)] mt-1">
        ★ {skill.stars >= 1000 ? (skill.stars / 1000).toFixed(skill.stars >= 10000 ? 0 : 1) + "k" : skill.stars}
      </div>
    </a>
  );
}

function searchProjects(query: string): SkillResult[] {
  const q = normalize(query);
  if (!q) return [];

  return projects
    .filter((p) => {
      const haystack = normalize(
        [p.name, p.description, ...p.domains, ...Object.values(p.domain_labels)].join(" ")
      );
      return haystack.includes(q);
    })
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      description: p.description,
      stars: p.stars,
      url: p.github_url,
    }));
}

export function SkillDiscovery() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value || status !== "idle") return;

    const results = searchProjects(value);

    if (results.length > 0) {
      setMessages([
        { role: "user", text: value },
        {
          role: "assistant",
          text: `${results.length} projets trouvés dans notre annuaire :`,
          skills: results,
          exploreQuery: value,
        },
        {
          role: "assistant",
          pitch: true,
          text: "Ces projets encodent des process génériques. Pas les tiens, pas ton vocabulaire, pas tes cas réels.\n\nC'est ce qu'on construit ensemble.",
        },
      ]);
    } else {
      setMessages([
        { role: "user", text: value },
        {
          role: "assistant",
          pitch: true,
          exploreQuery: value,
          text: `On a passé en revue 100 projets Claude sur GitHub. Rien sur "${value}".\n\nNormal. La majorité tournent autour du dev et du marketing. On peut regarder ensemble ce qui manque pour ton métier et le construire.`,
        },
      ]);
    }

    setStatus("done");
  }

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 border-t border-[var(--border)]">
      <div className="max-w-3xl">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight">
          Découvre les skills qui correspondent à ton métier.
        </h2>

        <div className="mt-10 border border-[var(--border)] rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)]">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-[var(--text-muted)] font-mono">
              skill-discovery
            </span>
          </div>

          {/* Chat area */}
          <div
            ref={containerRef}
            className="flex flex-col gap-3 p-5 min-h-[120px] max-h-[520px] overflow-y-auto scroll-smooth"
          >
            {messages.length === 0 && status === "idle" && (
              <p className="text-xs text-[var(--text-muted)] text-center py-6">
                Tape ton métier. On cherche dans les 100 projets Claude les plus utilisés.
              </p>
            )}

            {messages.map((msg, i) => (
              <ChatBubble key={i} msg={msg}>
                {msg.skills && (
                  <div className="mt-3 space-y-2">
                    {msg.skills.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                )}
                {msg.exploreQuery && msg.skills && (
                  <div className="mt-3">
                    <a
                      href={`/explore?q=${encodeURIComponent(msg.exploreQuery)}`}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors underline underline-offset-2"
                    >
                      Voir tous les résultats →
                    </a>
                  </div>
                )}
                {msg.pitch && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="#tarifs"
                      className="inline-block bg-white text-[#0a0a0a] px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity rounded"
                    >
                      Encoder mon expertise
                    </a>
                    {msg.exploreQuery && (
                      <a
                        href={`/explore?q=${encodeURIComponent(msg.exploreQuery)}`}
                        className="inline-block border border-[var(--border)] text-[var(--text-muted)] px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:text-[var(--text)] hover:border-white/30 transition-colors rounded"
                      >
                        Explorer l&apos;annuaire
                      </a>
                    )}
                  </div>
                )}
              </ChatBubble>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 p-4 border-t border-[var(--border)]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={status !== "idle"}
              placeholder="Ex : closing B2B, coaching dirigeants, recrutement tech…"
              className="flex-1 bg-transparent border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-white/30 disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={status !== "idle" || !inputValue.trim()}
              className="bg-white text-[#0a0a0a] px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Chercher
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
