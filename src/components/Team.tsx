import type { ReactElement } from 'react'
import { useState } from 'react'
import SectionTitle from './SectionTitle'
import { intro, members } from '../data/nosotros'

export default function Team(): ReactElement {
  const [open, setOpen] = useState<number | null>(null)

  const sectionStyle: React.CSSProperties = { paddingTop: 24, paddingBottom: 8 }
  // center columns vertically so members align with the heading/intro block
  const splitStyle: React.CSSProperties = { display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }
  const leftStyle: React.CSSProperties = { flex: '1 1 420px', minWidth: 300 }
  const rightStyle: React.CSSProperties = { flex: '1 1 420px', minWidth: 300 }

  const heroImage = members[0]?.image

  const hasHero = Boolean(heroImage)

  const leftImageStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    minHeight: 140,
    borderRadius: 12,
    padding: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: hasHero ? `url(${heroImage})` : undefined,
    backgroundColor: hasHero ? undefined : 'transparent',
  }

  const overlayStyle: React.CSSProperties = hasHero
    ? { background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.48) 100%)', padding: 24, borderRadius: 8 }
    : { background: 'transparent', padding: 0 }

  // Use dark text by default so it's always legible; keep overlay white when image is decorative
  const bigTitle: React.CSSProperties = { fontSize: 56, lineHeight: 0.95, margin: '0 0 6px 0', fontWeight: 700, color: 'var(--text-h)' }
  const introStyle: React.CSSProperties = { color: 'var(--muted)', fontSize: 16, maxWidth: 520, marginTop: 12, lineHeight: 1.6 }

  const rowStyle: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', padding: '12px 12px', borderBottom: '1px solid rgba(15,23,42,0.04)', cursor: 'pointer', borderRadius: 10 }
  const thumbStyle: React.CSSProperties = { width: 72, height: 72, objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 6px 20px rgba(16,24,40,0.06)', transition: 'transform .18s ease' }
  const nameStyle: React.CSSProperties = { fontSize: 16, fontWeight: 700 }
  const roleStyle: React.CSSProperties = { color: 'var(--muted)', marginTop: 6 }
  const bioStyle: React.CSSProperties = { marginTop: 10, color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }

  return (
    <section id="nosotros" className="container" style={sectionStyle}>
      <div className="content" style={splitStyle}>
        <div style={{ ...leftStyle }}>
          <SectionTitle>Nosotros</SectionTitle>
          <h2 style={bigTitle}>Somos un estudio de arquitectura</h2>
          <p style={introStyle}>{intro}</p>

          {/* Decorative hero image (kept for visual parity with EPV) */}
          {/* imagen decorativa eliminada por petición */}
        </div>

        <div style={rightStyle} className="team-right">
          {members.map((m, idx) => {
            const isOpen = open === idx
            return (
              <div
                key={m.name}
                className={`member reveal member-row ${isOpen ? 'open' : ''}`}
                style={rowStyle}
                onClick={() => setOpen(isOpen ? null : idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(isOpen ? null : idx)
                  }
                }}
              >
                {m.image ? (
                  <img src={m.image} alt={m.name} style={thumbStyle} className="member-thumb" />
                ) : (
                  <div style={{ ...thumbStyle, background: '#eee' }} />
                )}

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={nameStyle}>{m.name}</div>
                  <div style={roleStyle}>{m.role}</div>
                  <div className="member-bio">
                    <div style={bioStyle}>{m.bio}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
