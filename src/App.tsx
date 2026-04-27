import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Team from './components/Team'
import ContactForm from './components/ContactForm'
import g22 from './assets/g22.jpg'
import exterior from './assets/exterior.jpg'
import oficina from './assets/oficina.jpg'

export default function App() {
  const projects = [
    { title: 'Vivienda familiar', excerpt: 'Reordenamiento interior y fachada', image: g22 },
    { title: 'Casa de fin de semana', excerpt: 'Integración con paisaje', image: exterior },
    { title: 'Edificio de oficinas', excerpt: 'Proyecto corporativo', image: oficina }
  ]

  return (
    <Layout>
      <Hero />

      <section id="projects" className="container projects">
        <div className="content">
          <h2>Proyectos</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.title} title={p.title} excerpt={p.excerpt} image={p.image} />
            ))}
          </div>
        </div>
      </section>

      <Services />

      <section id="projects" className="container projects compact">
        <h2>Proyectos destacados</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} title={p.title} excerpt={p.excerpt} image={p.image} />
          ))}
        </div>
      </section>

      <Gallery />

      <Team />

      <section id="contact" className="container contact">
        <div className="content">
          <h2>Contacto</h2>
          <div className="contact-grid">
            <div>
              <p>Teléfono • Email • WhatsApp</p>
              <p>Dirección • Horarios</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}
