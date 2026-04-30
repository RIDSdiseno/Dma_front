
import SectionTitle from './SectionTitle'
import dm1 from '../assets/dm1.jpg'
import dm2 from '../assets/dm2.jpg'
import dm3 from '../assets/dm3.jpg'
import dm4 from '../assets/dm4.jpg'
import dm5 from '../assets/dm5.jpg'
import dm6 from '../assets/dm6.jpg'
import dm9 from '../assets/dm9.jpg'
import dm10 from '../assets/dm10.jpg'
import dm11 from '../assets/dm11.jpg'
import dm12 from '../assets/dm12.jpg'
import dm13 from '../assets/dm13.jpg'
import dm14 from '../assets/dm14.jpg'
import dm15 from '../assets/dm15.jpg'
import dm16 from '../assets/dm16.jpg'
import dm17 from '../assets/dm17.jpg'
import dm18 from '../assets/dm18.jpg'

import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

const images = [dm1, dm2, dm3, dm4, dm5, dm6, dm9, dm10, dm11, dm12, dm13, dm14, dm15, dm16, dm17, dm18]

export default function MosaicGallery(): ReactElement {
  const [index, setIndex] = useState(0)
  const [prevSrc, setPrevSrc] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const total = images.length
  const DURATION = 600 // ms fade duration
  const AUTOPLAY = 4000 // ms

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') changeIndex((index + 1) % total)
      if (e.key === 'ArrowLeft') changeIndex((index - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => changeIndex((index + 1) % total), AUTOPLAY)
    return () => clearInterval(t)
  }, [index, paused, total])

  function changeIndex(newIndex: number) {
    if (newIndex === index) return
    const oldIndex = index
    setPrevSrc(images[oldIndex])
    setIndex(newIndex)
    // trigger CSS animation on next frame
    requestAnimationFrame(() => {
      setAnimating(true)
      setTimeout(() => {
        setAnimating(false)
        setPrevSrc(null)
      }, DURATION)
    })
  }

  return (
    <section id="mosaic" className="container gallery-carousel-section">
      <div className="content centered">
        <SectionTitle>Galería</SectionTitle>

        <div className="gallery-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button className="carousel-prev" aria-label="Anterior" onClick={() => changeIndex((index - 1 + total) % total)}>‹</button>

          <div className="carousel-viewport">
            {prevSrc && (
              <img src={prevSrc} alt={`Anterior ${index}`} className={`carousel-image prev ${animating ? 'fade-out' : ''}`} />
            )}
            <img src={images[index]} alt={`Galería ${index + 1}`} className={`carousel-image current ${animating ? 'fade-in' : 'active'}`} loading="eager" />
          </div>

          <button className="carousel-next" aria-label="Siguiente" onClick={() => changeIndex((index + 1) % total)}>›</button>
        </div>

        <div className="carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => changeIndex(i)} aria-label={`Ir a imagen ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
