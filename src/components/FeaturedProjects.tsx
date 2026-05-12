import type { ReactElement } from 'react'
import React from 'react'
import type { Project } from '../data/projects'

type Props = {
  projects: Project[]
  onOpen: (p: Project) => void
}

export default function FeaturedProjects({ projects, onOpen }: Props): ReactElement {
  return (
    <section id="featured" className="featured-projects" aria-label="Proyectos destacados">
      <div className="featured-inner container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <div className="featured-grid">
          {projects.map((p, idx) => (
            <article key={p.id} className={`featured-item item-${(idx % 6) + 1}`} role="button" tabIndex={0}
              onClick={() => onOpen(p)}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpen(p) }}
              aria-label={`Abrir proyecto ${p.title}`}>
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="featured-overlay">
                <div className="overlay-inner">
                  <h3>{p.title}</h3>
                  {p.excerpt && <p className="muted">{p.excerpt}</p>}
                  <div className="overlay-actions">
                    <button className="btn small" onClick={(e) => { e.stopPropagation(); onOpen(p) }}>Ver proyecto</button>
                    {p.source && <a className="btn" href={p.source} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Ver en web</a>}
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
