import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  width: '100vw',
  marginLeft: 'calc(50% - 50vw)',
  paddingTop: '96px',
  minHeight: 'calc(100vh - 96px)',
  paddingBottom: 0,
}

export const heroLeft: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '6vw',
  position: 'relative',
  zIndex: 2,
  width: '48%',
  color: '#fff',
}

export const heroRight: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center right',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  inset: 0,
  borderRadius: 0,
  minHeight: '100vh',
  zIndex: 0,
}

export const heroTitle: CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)',
  lineHeight: 1,
  margin: 0,
  maxWidth: 820,
  overflowWrap: 'break-word',
  wordBreak: 'normal',
  color: '#fff',
  fontWeight: 700,
}

export const heroLead: CSSProperties = {
  marginTop: 12,
  fontFamily: "'Inter', sans-serif",
  color: 'rgba(255,255,255,0.85)',
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
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.95rem',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
}

export default {}
