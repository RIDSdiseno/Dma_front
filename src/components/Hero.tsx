import type { ReactElement } from 'react'
// using inline styles via src/styles/heroStyles.ts
import { heroWrapper, heroLeft, heroRight, heroTitle, heroLead, heroCTA } from '../styles/heroStyles'

export default function Hero(): ReactElement {
  return (
    <section id="hero" style={heroWrapper}>
      <div style={heroLeft}>
        <h1 style={heroTitle}>Estudio de Arquitectura & Diseño</h1>
        <p style={heroLead}>Proyectos residenciales y comerciales con atención al detalle, claridad constructiva y soluciones a medida.</p>
        <a href="#contact" style={heroCTA} aria-label="Solicitar presupuesto">Solicitar presupuesto</a>
      </div>

      <div style={heroRight} role="img" aria-label="Imagen representativa de proyecto" />
    </section>
  )
}
