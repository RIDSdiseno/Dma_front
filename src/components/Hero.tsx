import type { ReactElement } from 'react'
import { heroWrapper, heroLeft, heroTitle, heroLead } from '../styles/heroStyles'

type Props = {
  onDesignClick?: () => void
}

const TITLE_WORDS = ['Estudio', 'de', 'Arquitectura', '&', 'Diseño']

export default function Hero({ onDesignClick }: Props): ReactElement {
  return (
    <section id="hero" className="hero" style={heroWrapper} aria-label="Imagen representativa de proyecto">
      <div className="hero-inner content" style={heroLeft}>
        <h1 style={heroTitle} aria-label={TITLE_WORDS.join(' ')}>
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ animationDelay: `${0.1 + i * 0.13}s` }}
            >
              {word === '&' ? '&' : word}
            </span>
          ))}
        </h1>
        <p style={heroLead} className="hero-lead-anim">
          Proyectos residenciales y comerciales con atención al detalle, claridad constructiva y soluciones a medida.
        </p>
        <div className="hero-ctas hero-cta-anim" style={{display:'flex',gap:12,marginTop:18}}>
          <button onClick={onDesignClick} className="btn primary hero-cta" aria-label="Solicitar Presupuesto">
            Solicitar Presupuesto
          </button>
        </div>
      </div>
    </section>
  )
}
