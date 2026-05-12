import React from 'react'

type Props = {
  children: React.ReactNode
  id?: string
  className?: string
}

const styles: React.CSSProperties = {
  marginTop: '40px',
  marginBottom: '18px',
  textAlign: 'center',
  fontSize: 32,
  fontWeight: 700,
  color: 'var(--text-h)',
  letterSpacing: '-0.6px',
  position: 'relative',
  paddingBottom: 12,
  fontFamily: "var(--font-heading)",
}

const underlineStyles: React.CSSProperties = {
  content: "",
  display: 'block',
  width: 84,
  height: 4,
  backgroundImage: 'linear-gradient(90deg,var(--accent),var(--brand-accent))',
  borderRadius: 4,
  margin: '12px auto 0 auto',
  opacity: 0.95,
}

import type { ReactElement } from 'react'

export default function SectionTitle({ children, id, className }: Props): ReactElement {
  return (
    <div id={id} className={className} style={{ textAlign: 'center' }}>
      <h2 style={styles}>{children}</h2>
      <div style={underlineStyles} aria-hidden />
    </div>
  )
}
