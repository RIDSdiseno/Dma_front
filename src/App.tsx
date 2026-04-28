import { useEffect } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import Services from './components/Services'
import MosaicGallery from './components/MosaicGallery'
import Team from './components/Team'
import ContactForm from './components/ContactForm'
import projects from './data/projects'
import ProjectModal from './components/ProjectModal'
import type { Project } from './data/projects'
import { useState } from 'react'
import SectionTitle from './components/SectionTitle'

export default function App() {
  useEffect(() => {
    // Inicializa animaciones por scroll (IntersectionObserver)
    import('./utils/animateOnScroll').then((m) => m.default())
  }, [])

  // ahora los proyectos vienen desde `src/data/projects.ts`
  const [selected, setSelected] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Layout>
      <Hero />

      <section id="projects" className="container projects">
        <div className="content">
          <SectionTitle>Proyectos</SectionTitle>
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} title={p.title} excerpt={p.excerpt} image={p.image} onClick={() => { setSelected(p); setModalOpen(true) }} />
            ))}
          </div>
        </div>
      </section>

      <Services />

      <section id="projects" className="container projects compact">
          <SectionTitle>Proyectos Destacados</SectionTitle>
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} title={p.title} excerpt={p.excerpt} image={p.image} onClick={() => { setSelected(p); setModalOpen(true) }} />
          ))}
        </div>
      </section>

      <MosaicGallery />

      <Team />

      <ProjectModal project={selected} open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="contact" className="container contact">
        <div className="content">
          <SectionTitle>Contacto</SectionTitle>
          <div className="contact-grid">
            <div>
              <p style={{marginBottom:8}}>Teléfono: <a href="tel:+56990784222">+56 9 9078 4222</a> • <a href="tel:+56992998255">+56 9 9299 8255</a></p>
              <p style={{marginBottom:8}}>Email: <a href="mailto:contacto@dm-a.cl">contacto@dm-a.cl</a></p>
              <p style={{marginBottom:8}}>WhatsApp: <a href="https://wa.me/56992998255?text=Hola%2C+tengo+una+consulta">+56 9 9299 8255</a></p>
              <p>Dirección: La Concepción 65, Of. 1001, Providencia, Chile</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}
