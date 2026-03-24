"use client";

import { useState, useRef, useEffect } from "react";

// Stop words FR + EN
const STOP_WORDS = new Set([
  "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
  "un", "une", "le", "la", "les", "des", "du", "de", "en", "par",
  "sur", "avec", "pour", "ce", "ma", "mon", "mes", "nos", "vos",
  "leur", "leurs", "et", "ou", "à", "au", "aux", "qui", "que",
  "quoi", "dont", "est", "suis", "fait", "faire", "dans", "son",
  "ses", "pas", "plus", "très", "bien", "aussi", "comme", "mais",
  "the", "a", "an", "is", "are", "i", "my", "and", "or", "in",
  "on", "at", "for", "with", "this", "that", "it", "of", "to",
]);

function extractKeywords(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[\s,;.!?:()]+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w))
    .slice(0, 4);
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
      <div className="text-xs text-[var(--text-muted)] mt-1">★ {skill.stars}</div>
    </a>
  );
}

export function SkillDiscovery() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value || status !== "idle") return;

    // Add user message
    setMessages([{ role: "user", text: value }]);
    setStatus("loading");

    const keywords = extractKeywords(value);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const query = keywords.join("+") + "+claude+skill";
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=5`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (!res.ok) throw new Error("GitHub API error");

      const data = await res.json();
      const items: SkillResult[] = (data.items || [])
        .slice(0, 5)
        .map((item: { full_name: string; description: string; stargazers_count: number; html_url: string }) => ({
          name: item.full_name,
          description: item.description || "Skill Claude Code",
          stars: item.stargazers_count,
          url: item.html_url,
        }));

      if (items.length > 0) {
        setMessages([
          { role: "user", text: value },
          {
            role: "assistant",
            text: `J'ai trouvé ${items.length} skills publics liés à ton domaine :`,
            skills: items,
          },
          {
            role: "assistant",
            pitch: true,
            text: "Ces skills encodent l'intelligence générique de quelqu'un dans ton domaine. Mais aucune n'a été entraînée sur tes données, ton vocabulaire, tes cas réels.\n\nC'est exactement ce qu'on construit ensemble.",
          },
        ]);
      } else {
        setMessages([
          { role: "user", text: value },
          {
            role: "assistant",
            pitch: true,
            text: "Aucun skill public trouvé pour ce domaine — c'est souvent le signe que personne n'a encore encodé cette expertise. C'est une opportunité.\n\nC'est exactement ce qu'on construit ensemble.",
          },
        ]);
      }
    } catch {
      setMessages([
        { role: "user", text: value },
        {
          role: "assistant",
          pitch: true,
          text: "GitHub est temporairement indisponible. Mais le principe reste le même : des skills publics encodent des expertises génériques. Les tiens seraient 100 % construits sur tes données réelles.\n\nC'est exactement ce qu'on construit ensemble.",
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
                Tape ton métier. On va chercher ce qui existe déjà sur GitHub — et tu vas voir ce qui manque.
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
                {msg.pitch && (
                  <div className="mt-4">
                    <a
                      href="#tarifs"
                      className="inline-block bg-white text-[#0a0a0a] px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity rounded"
                    >
                      Encoder mon expertise
                    </a>
                  </div>
                )}
              </ChatBubble>
            ))}

            {status === "loading" && (
              <div className="flex justify-start">
                <div className="bg-[rgba(255,255,255,0.06)] border border-[#222] rounded-2xl rounded-bl-sm px-5 py-3.5 text-sm text-[var(--text-muted)]">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                  </span>
                </div>
              </div>
            )}
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
