import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  alignItems: 'stretch',
  width: '100%',
  minHeight: 520,
  padding: '48px 0',
}

export const heroLeft: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '6vw',
}

export const heroRight: CSSProperties = {
  backgroundImage: `url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 12,
  minHeight: 400,
}

export const heroTitle: CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(2.4rem, 5vw, 5.2rem)',
  lineHeight: 0.98,
  margin: 0,
  color: 'var(--text-h, #0f172a)',
  fontWeight: 700,
}

export const heroLead: CSSProperties = {
  marginTop: 12,
  fontFamily: "'Inter', sans-serif",
  color: 'var(--muted, #475569)',
  fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
  maxWidth: 640,
}

export const heroCTA: CSSProperties = {
  marginTop: 18,
  display: 'inline-block',
  padding: '14px 22px',
  background: 'var(--accent, #b45a35)',
  color: '#fff',
  borderRadius: 10,
  textDecoration: 'none',
  fontWeight: 600,
}

export default {}
