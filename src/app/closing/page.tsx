import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Closing solopreneur — Challenger Sale pour founders solo',
  description:
    'Closing intensif pour solopreneurs. Challenger Sale adapte aux fondateurs solo qui doivent closer vite et bien.',
}

export default function ClosingPage() {
  return (
    <div
      style={{
        background: 'oklch(98% 0.003 60)',
        color: 'oklch(10% 0.005 60)',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          Lucas Renaud
        </span>
        <a
          href="#appel"
          style={{
            border: '1px solid oklch(10% 0.005 60)',
            padding: '0.6rem 1.25rem',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Reserver un appel
        </a>
      </nav>

      {/* Hero */}
      <section
        style={{
          padding: '5rem 1.5rem 4rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            maxWidth: '14ch',
          }}
        >
          Tu sais vendre.
          <br />
          <span style={{ color: 'oklch(42% 0.01 60)', fontStyle: 'italic' }}>
            Mais tu closes pas.
          </span>
        </h1>
        <p
          style={{
            marginTop: '2rem',
            maxWidth: '48ch',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'oklch(42% 0.01 60)',
          }}
        >
          Je travaille avec des solopreneurs qui ont une offre solide mais qui
          laissent filer des deals parce qu'ils n'osent pas challenger en
          discovery. Methode intensive, Challenger Sale adapte aux founders solo.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' as const }}>
          <a
            href="#appel"
            style={{
              background: 'oklch(10% 0.005 60)',
              color: 'oklch(98% 0.003 60)',
              padding: '0.9rem 1.8rem',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
            }}
          >
            On en parle
          </a>
          <a
            href="#methode"
            style={{
              padding: '0.9rem 1.8rem',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              color: 'oklch(58% 0.008 60)',
            }}
          >
            Comment ca marche ↓
          </a>
        </div>
      </section>

      {/* Separator */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid oklch(91% 0.006 60)' }} />
      </div>

      {/* Le probleme */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            maxWidth: '20ch',
          }}
        >
          Le probleme c'est pas ton offre.
        </h2>
        <p
          style={{
            marginTop: '1.5rem',
            maxWidth: '52ch',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: 'oklch(42% 0.01 60)',
          }}
        >
          T'as des appels. Le prospect dit que c'est interessant. Il demande un
          devis. Et ensuite... silence. Il ghost. Il negocie le prix. Il dit
          qu'il va "reflechir". Le probleme c'est pas ton produit. C'est que
          l'appel de discovery n'a pas fait son travail.
        </p>
      </section>

      {/* Separator */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid oklch(91% 0.006 60)' }} />
      </div>

      {/* Methode */}
      <section id="methode" style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          Ce qu'on fait ensemble.
        </h2>
        <div
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
          }}
        >
          {[
            {
              n: '01',
              title: 'Diagnostic',
              desc: "J'ecoute tes appels, je lis tes proposals, je regarde ou les deals meurent. En general c'est toujours au meme endroit.",
            },
            {
              n: '02',
              title: 'Discovery',
              desc: "Le Challenger Sale adapte aux solopreneurs. Pas reciter un framework. Comprendre comment challenger un prospect qui a l'habitude qu'on lui dise oui.",
            },
            {
              n: '03',
              title: 'Autonomie',
              desc: "Je suis pas la pour closer a ta place. Je suis la pour que tu saches le faire. On travaille intensif, en sessions, jusqu'a ce que ca rentre.",
            },
          ].map((item) => (
            <div key={item.n}>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: 'oklch(58% 0.008 60)',
                  fontFamily: 'monospace',
                }}
              >
                {item.n}
              </div>
              <h3
                style={{
                  marginTop: '0.75rem',
                  fontSize: '1.4rem',
                  letterSpacing: '-0.01em',
                  fontWeight: 400,
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'oklch(42% 0.01 60)',
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid oklch(91% 0.006 60)' }} />
      </div>

      {/* Pour qui */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          C'est pour toi si.
        </h2>
        <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
          {[
            "T'as des appels mais ils se transforment pas en contrats",
            "Tu baisses tes prix pour closer au lieu de defendre ta valeur",
            "Tu fais des proposals de 10 pages que personne lit",
            "Tu sais que ton offre est bonne mais t'arrives pas a le prouver en 30 min",
            "T'as essaye des formations closing qui marchent pour des equipes sales, pas pour des solos",
          ].map((item) => (
            <li
              key={item}
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'oklch(42% 0.01 60)',
                paddingLeft: '1.5rem',
                position: 'relative' as const,
              }}
            >
              <span style={{ position: 'absolute' as const, left: 0, color: 'oklch(10% 0.005 60)' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Separator */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ borderTop: '1px solid oklch(91% 0.006 60)' }} />
      </div>

      {/* CTA */}
      <section id="appel" style={{ padding: '4rem 1.5rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            maxWidth: '16ch',
          }}
        >
          Parlons de tes deals.
        </h2>
        <p
          style={{
            marginTop: '1.5rem',
            maxWidth: '48ch',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: 'oklch(42% 0.01 60)',
          }}
        >
          30 min. Tu me racontes un deal que t'as perdu recemment. Je te dis ou
          ca a deraille et ce que t'aurais pu faire. Si ca te parle, on
          travaille ensemble. Sinon, t'as quand meme un retour gratuit sur ton
          closing.
        </p>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '2.5rem',
            display: 'inline-flex',
            background: 'oklch(10% 0.005 60)',
            color: 'oklch(98% 0.003 60)',
            padding: '1rem 2rem',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            textDecoration: 'none',
          }}
        >
          Reserver 30 minutes →
        </a>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'oklch(58% 0.008 60)' }}>
          Gratuit. Pas de pitch. Juste un retour sur ton dernier deal.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid oklch(91% 0.006 60)',
          padding: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'oklch(58% 0.008 60)',
        }}
      >
        <span>© 2026 Lucas Renaud</span>
        <span>Challenger Sale pour solopreneurs</span>
      </footer>
    </div>
  )
}
