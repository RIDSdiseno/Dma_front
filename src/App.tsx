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
import ContactCallout from './components/ContactCallout'
import projects from './data/projects'
import ProjectModal from './components/ProjectModal'
import type { Project } from './data/projects'
import { useState } from 'react'
import SectionTitle from './components/SectionTitle'
import FeaturedProjects from './components/FeaturedProjects'
import InstagramFeed from './components/InstagramFeed'

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
  const [showInfoModal, setShowInfoModal] = useState(false)

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Layout>
      <Hero onDesignClick={scrollToContact} />

      <ConfiguratorModal open={showQcModal} onClose={() => setShowQcModal(false)} title="Diseña tu Quincho">
        <QuinchoConfigurator area={qcArea} setArea={setQcArea} pkg={qcPkg} setPkg={setQcPkg} />
      </ConfiguratorModal>

      <ConfiguratorModal open={showInfoModal} onClose={() => setShowInfoModal(false)} title="En desarrollo">
        <div style={{padding:16}}>
          <p>Estamos trabajando en ese apartado de la página. Pronto estará disponible — gracias por tu paciencia.</p>
        </div>
      </ConfiguratorModal>

      {/* Proyectos removed as requested - featured projects shown below */}

      <Services />

      <FeaturedProjects projects={projects} onOpen={(p) => { setSelected(p); setModalOpen(true) }} />

      <Suspense fallback={null}>
        <MosaicGallery />
      </Suspense>

      <Team />

      <InstagramFeed />

      <ProjectModal project={selected} open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="contact" className="container contact">
        <ContactCallout onDesignClick={() => setShowQcModal(true)} />
      </section>
    </Layout>
  )
}
