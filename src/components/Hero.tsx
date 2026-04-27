import heroImg from '../assets/portada.jpg'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <img src={heroImg} alt="Hero" className="hero-bg" />
      <div className="hero-inner">
        <div className="content">
          <h1>Estudio de arquitectura & diseño</h1>
          <p>Proyectos residenciales y comerciales — soluciones a medida.</p>
          <a className="btn" href="#contact">Solicitar presupuesto</a>
        </div>
      </div>
    </section>
  )
}
