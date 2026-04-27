import React from 'react'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'

import portada from '../assets/portada.jpg'
import bano from '../assets/bano.jpg'
import exterior from '../assets/exterior.jpg'
import g22 from '../assets/g22.jpg'
import oficina from '../assets/oficina.jpg'
import terminada from '../assets/terminada.jpg'

const sampleImages = [portada, bano, exterior, g22, oficina, terminada]

export default function Gallery() {
  const items = sampleImages.map((url, i) => ({ title: `Proyecto ${i + 1}`, excerpt: 'Imagen destacada', image: url }))

  return (
    <section id="gallery" className="container gallery">
      <div className="content">
        <SectionTitle>Galería</SectionTitle>
        <div className="gallery-grid">
          {items.map((it) => (
            <ProjectCard key={it.title} title={it.title} excerpt={it.excerpt} image={it.image} />
          ))}
        </div>
      </div>
    </section>
  )
}
