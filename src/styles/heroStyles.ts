import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  /* make hero full-bleed across viewport using width + negative margins */
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  paddingTop: '72px',
  minHeight: '80vh',
  paddingBottom: 0,
}

export const heroLeft: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  /* position content toward bottom-left so background subject remains visible */
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  paddingLeft: '6vw',
  paddingRight: '6vw',
  position: 'absolute',
  zIndex: 2,
  width: '100%',
  left: 0,
  top: 0,
  bottom: 0,
  textAlign: 'left',
  color: '#fff',
}

export const heroRight: CSSProperties = {
  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.35), rgba(2,6,23,0.15)), url(${heroImg})`,
  backgroundSize: 'cover',
  /* center the image so main subject stays visible on different widths */
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '100%',
  borderRadius: 0,
  /* let the wrapper control height to avoid cropping mismatch */
  minHeight: '100%',
  zIndex: 0,
}

export const heroTitle: CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  /* reduced sizes so background image is more visible */
  fontSize: 'clamp(1.8rem, 4.8vw, 4rem)',
  lineHeight: 1.02,
  letterSpacing: '-0.06em',
  margin: 0,
  maxWidth: 640,
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
  /* reduced subtitle size so background is more visible */
  fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
  maxWidth: 560,
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
