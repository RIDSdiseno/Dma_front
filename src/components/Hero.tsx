// using inline styles via src/styles/heroStyles.ts
import {
  heroWrapper,
  heroBackground,
  heroInner,
  heroContent,
  heroTitle,
  heroText,
  heroButton,
} from '../styles/heroStyles'

export default function Hero() {
  return (
    <section id="hero" style={heroWrapper}>
      <div style={heroBackground} aria-hidden />
      <div style={heroInner}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Estudio de Arquitectura & Diseño</h1>
          <p style={heroText}>Proyectos Residenciales y Comerciales — Soluciones a Medida.</p>
          <a style={heroButton} href="#contact">Solicitar Presupuesto</a>
        </div>
      </div>
    </section>
  )
}
