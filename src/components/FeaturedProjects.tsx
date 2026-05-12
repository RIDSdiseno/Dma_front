import type { ReactElement } from 'react'
import type { Project } from '../data/projects'
import SectionTitle from './SectionTitle'

type Props = {
  projects: Project[]
  onOpen: (p: Project) => void
}

export default function FeaturedProjects({ projects, onOpen }: Props): ReactElement {
  return (
    <section id="featured" className="fp-section" aria-label="Proyectos destacados">
      <div className="fp-inner">
        <SectionTitle>Proyectos Destacados</SectionTitle>
        <div className="fp-list">
          {projects.map((p) => (
            <article
              key={p.id}
              className="fp-card"
              onClick={() => onOpen(p)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(p) }}
              tabIndex={0}
              role="button"
              aria-label={`Ver proyecto ${p.title}`}
            >
              <div className="fp-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="fp-overlay">
                  <div className="fp-overlay-inner">
                    <h3 className="fp-title">{p.title}</h3>
                    <button
                      className="fp-link"
                      onClick={(e) => { e.stopPropagation(); onOpen(p) }}
                    >
                      Ver proyecto
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
