"use client";

export function SiteResult() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] tracking-tight text-center">
        Le site genere.
      </h2>
      <p className="mt-4 text-center text-[var(--text-muted)] text-sm max-w-[55ch] mx-auto">
        Le copy vient du brain dump. La direction vient des references. Chaque choix a ete valide par l'humain.
      </p>

      <div className="mt-12 mx-auto max-w-5xl border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[rgba(255,255,255,0.03)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono text-center">
              lucasrenaud.fr
            </div>
          </div>
        </div>
        <iframe
          src="/closing"
          title="Site closing genere par design-eye"
          className="w-full h-[600px] md:h-[700px] bg-white"
          loading="lazy"
        />
      </div>

      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        Genere avec design-eye. Pas de template. La direction visuelle et le copy
        viennent de la conversation.
      </p>
    </section>
  );
}
