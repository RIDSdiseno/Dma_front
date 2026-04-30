import type { ReactElement } from 'react'
import SectionTitle from './SectionTitle'
// Use the same markup as featured items so gallery inherits same full-bleed styles

import portada from '../assets/portada.jpg'
import bano from '../assets/bano.jpg'
import exterior from '../assets/exterior.jpg'
import g22 from '../assets/g22.jpg'
import oficina from '../assets/oficina.jpg'
import terminada from '../assets/terminada.jpg'

const sampleImages = [portada, bano, exterior, g22, oficina, terminada]

export default function Gallery(): ReactElement {
  const items = sampleImages.map((url, i) => ({ title: `Proyecto ${i + 1}`, excerpt: 'Imagen destacada', image: url }))

  return (
    <section id="gallery" className="container gallery">
      <SectionTitle>Galería</SectionTitle>
      <div className="gallery-grid">
        {items.map((it) => (
          <figure key={it.title} className="featured-item project-card" role="button" tabIndex={0}>
            <img src={it.image} alt={it.title} />
            <figcaption>
              <h2>{it.title}</h2>
              {it.excerpt && <p className="muted">{it.excerpt}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
