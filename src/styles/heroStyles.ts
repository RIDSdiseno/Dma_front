import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  minHeight: '100vh',
  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.25) 60%, rgba(2,6,23,0.45) 100%), url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
}

export const heroLeft: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  paddingLeft: '6vw',
  paddingRight: '6vw',
  paddingTop: '80px',
  paddingBottom: '10vh',
  position: 'absolute',
  zIndex: 2,
  width: '100%',
  left: 0,
  top: 0,
  bottom: 0,
  boxSizing: 'border-box',
  textAlign: 'left',
  color: '#fff',
}

export const heroRight: CSSProperties = {
  display: 'none',
}

export const heroTitle: CSSProperties = {
  fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  margin: 0,
  maxWidth: 680,
  overflowWrap: 'break-word',
  wordBreak: 'normal',
  color: '#fff',
  fontWeight: 700,
  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
}

export const heroLead: CSSProperties = {
  marginTop: 14,
  fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  fontWeight: 400,
  color: 'rgba(255,255,255,0.88)',
  fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
  maxWidth: 540,
  lineHeight: 1.6,
}

export const heroCTA: CSSProperties = {
  marginTop: 18,
  display: 'inline-block',
  padding: '14px 22px',
  background: 'var(--accent, #d66129)',
  color: '#fff',
  borderRadius: 10,
  textDecoration: 'none',
  fontWeight: 700,
  fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  fontSize: '0.95rem',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
}

export default {}
