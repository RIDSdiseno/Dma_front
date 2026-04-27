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
          <h1 style={heroTitle}>Estudio de arquitectura & diseño</h1>
          <p style={heroText}>Proyectos residenciales y comerciales — soluciones a medida.</p>
          <a style={heroButton} href="#contact">Solicitar presupuesto</a>
        </div>
      </div>
    </section>
  )
}
