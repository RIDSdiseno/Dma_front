import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  width: '100vw',
  marginLeft: 'calc(50% - 50vw)',
  paddingTop: '72px',
  minHeight: '80vh',
  paddingBottom: 0,
}

export const heroLeft: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: '6vw',
  position: 'relative',
  zIndex: 2,
  width: '100%',
  marginLeft: '0',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  paddingRight: '6vw',
  color: '#fff',
}

export const heroRight: CSSProperties = {
  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.35), rgba(2,6,23,0.15)), url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center left',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '100%',
  borderRadius: 0,
  minHeight: '100vh',
  zIndex: 0,
}

export const heroTitle: CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(2.2rem, 6.8vw, 5.6rem)',
  lineHeight: 1,
  margin: 0,
  maxWidth: 820,
  overflowWrap: 'break-word',
  wordBreak: 'normal',
  color: '#fff',
  fontWeight: 700,
  textShadow: '0 8px 26px rgba(0,0,0,0.6)'
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
