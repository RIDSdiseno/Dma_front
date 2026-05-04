import { useEffect } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import QuinchoConfigurator from './components/QuinchoConfigurator'
import ConfiguratorModal from './components/ConfiguratorModal'
import ProjectCard from './components/ProjectCard'
import Services from './components/Services'
import { Suspense, lazy } from 'react'
const MosaicGallery = lazy(() => import('./components/MosaicGallery'))
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

  // Configurator state lifted here so modal shows the latest inputs
  const [qcArea, setQcArea] = useState<number>(10)
  const [qcPkg, setQcPkg] = useState<'Starter'|'Pro'|'Full'>('Starter')
  const [showQcModal, setShowQcModal] = useState(false)

  return (
    <Layout>
      <Hero onDesignClick={() => setShowQcModal(true)} />

      <ConfiguratorModal open={showQcModal} onClose={() => setShowQcModal(false)} title="Diseña tu Quincho">
        <QuinchoConfigurator area={qcArea} setArea={setQcArea} pkg={qcPkg} setPkg={setQcPkg} />
      </ConfiguratorModal>

      {/* Proyectos removed as requested - featured projects shown below */}

      <Services />

      <section id="featured" className="container featured-projects">
        <SectionTitle>Proyectos Destacados</SectionTitle>
        <div className="featured-grid">
          {projects.map((p) => (
            <figure key={p.id} className="featured-item" role="button" tabIndex={0} onClick={() => { setSelected(p); setModalOpen(true) }} onKeyDown={(e) => { if (e.key === 'Enter') { setSelected(p); setModalOpen(true) } }}>
              <img src={p.image} alt={p.title} />
              <figcaption>
                <h2>{p.title}</h2>
                {p.excerpt && <p className="muted">{p.excerpt}</p>}
                <button className="link-btn" onClick={(e) => { e.stopPropagation(); setSelected(p); setModalOpen(true) }}>Ver proyecto</button>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Suspense fallback={null}>
        <MosaicGallery />
      </Suspense>

      <Team />

      <ProjectModal project={selected} open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="contact" className="container contact">
        <div className="content">
          <SectionTitle>Contacto</SectionTitle>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-card-left">
                <p className="contact-line"><strong>Teléfono:</strong> +56 9 9078 4222 • +56 9 9299 8255</p>
                <p className="contact-line"><strong>Email:</strong> contacto@dm-a.cl</p>
                <p className="contact-line"><strong>WhatsApp:</strong> +56 9 9299 8255</p>
                <p className="contact-line"><strong>Dirección:</strong> La Concepción 65, Of. 1001, Providencia, Chile</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}
