export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Ton site pro en 3 questions.
      </h1>
      <p className="mb-10 max-w-md text-lg text-[var(--text-muted)]">
        Pas de code. Pas de template. Juste Claude Code + les bonnes skills.
      </p>
      <div className="flex gap-4">
        <a
          href="#questionnaire"
          className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
        >
          Essayer la démo
        </a>
        <a
          href="#before-after"
          className="rounded-lg border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)]"
        >
          Voir l'avant / après
        </a>
      </div>
    </section>
  );
}
