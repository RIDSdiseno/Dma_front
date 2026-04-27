import type { CSSProperties } from 'react'
import heroImg from '../assets/portada.jpg'

export const heroWrapper: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 520,
}

export const heroBackground: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(0.55)',
}

export const heroInner: CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#fff',
  padding: '40px',
  textAlign: 'center',
}

export const heroContent: CSSProperties = {
  maxWidth: 900,
  width: 'min(98%,900px)',
  paddingLeft: 60,
}

export const heroTitle: CSSProperties = {
  fontSize: '3rem',
  margin: 0,
  lineHeight: 1.05,
  textShadow: '0 6px 18px rgba(0,0,0,0.6)',
  color: '#fff',
}

export const heroText: CSSProperties = {
  marginTop: 8,
  color: 'rgba(255,255,255,0.95)',
  textShadow: '0 4px 12px rgba(0,0,0,0.45)',
}

export const heroButton: CSSProperties = {
  display: 'inline-block',
  marginTop: 12,
  padding: '12px 20px',
  background: 'var(--primary)',
  color: '#fff',
  borderRadius: 10,
  textDecoration: 'none',
  border: '2px solid rgba(255,255,255,0.06)',
}

export default {}
