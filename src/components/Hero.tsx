import type { ReactElement } from 'react'
// using inline styles via src/styles/heroStyles.ts
import { heroWrapper, heroLeft, heroRight, heroTitle, heroLead } from '../styles/heroStyles'

type Props = {
  onDesignClick?: () => void
}

export default function Hero({ onDesignClick }: Props): ReactElement {
  return (
    <section id="hero" className="hero" style={heroWrapper}>
      <div className="hero-bg" style={heroRight} role="img" aria-label="Imagen representativa de proyecto" />

      <div className="hero-inner content" style={heroLeft}>
        <h1 style={heroTitle}>
          <span className="h-line">Estudio de</span>
          <br />
          <span className="h-line">Arquitectura</span>
          <br />
          <span className="h-line">&amp; Diseño</span>
        </h1>
        <p style={heroLead}>Proyectos residenciales y comerciales con atención al detalle, claridad constructiva y soluciones a medida.</p>
        <div className="hero-ctas" style={{display:'flex',gap:12,marginTop:18}}>
          <a href="#contact" className="btn primary hero-cta" aria-label="Solicitar Presupuesto">Solicitar Presupuesto</a>
          <button onClick={onDesignClick} className="btn primary hero-cta" aria-label="Diseña tu Quincho">Diseña tu Quincho</button>
        </div>
      </div>
    </section>
  )
}
