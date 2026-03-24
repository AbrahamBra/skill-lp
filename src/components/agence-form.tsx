"use client";

import { useState } from "react";
import { CALENDLY_URL } from "@/lib/constants";

export function AgenceForm() {
  const [email, setEmail] = useState("");
  const [contexte, setContexte] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !contexte.trim()) return;
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metier: contexte,
          repetes: "",
          clone: "",
          email,
          source: "agence",
        }),
      });
    } catch {
      // Continue to Calendly even if the email fails
    }

    window.location.href = CALENDLY_URL;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-3">
        <input
          type="text"
          value={contexte}
          onChange={(e) => setContexte(e.target.value)}
          placeholder="Ton métier + ce que tu veux automatiser"
          required
          className="w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-white/30 transition-colors"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          required
          className="w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !email.trim() || !contexte.trim()}
        className="bg-white text-[#0a0a0a] px-10 py-4 text-xs font-medium uppercase tracking-widest hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Redirection..." : "Réserver mon appel gratuit"}
      </button>
      <p className="text-[10px] text-[var(--text-muted)]">
        On te recontacte aussi par email si l'appel n'est pas le bon moment.
      </p>
    </form>
  );
}
