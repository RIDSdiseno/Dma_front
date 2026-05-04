
import SectionTitle from './SectionTitle'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

// Try to use locally downloaded carousel images (src/assets/carousel-*) if present.
// Falls back to remote images hosted at dm-a.cl.
let localImages: string[] = []
try {
  const anyImportMeta = import.meta as any
  if (typeof anyImportMeta.glob === 'function') {
    // Vite: import.meta.glob with eager option
    const modules: Record<string, any> = anyImportMeta.glob('../assets/carousel-*.*', { eager: true })
    localImages = Object.values(modules).map((m: any) => (m && m.default) || m).filter(Boolean)
  } else if (typeof anyImportMeta.globEager === 'function') {
    // older Vite variant
    const modules: Record<string, any> = anyImportMeta.globEager('../assets/carousel-*.*')
    localImages = Object.values(modules).map((m: any) => (m && m.default) || m).filter(Boolean)
  } else {
    // Fallback: explicit expected filenames (will 404 if missing)
    const names = ['carousel-01.jpg','carousel-02.jpg','carousel-03.jpg','carousel-04.jpg','carousel-05.jpg','carousel-06.jpg']
    localImages = names.map(n => {
      try { return new URL(`../assets/${n}`, import.meta.url).href } catch { return null }
    }).filter(Boolean) as string[]
  }
} catch (e) {
  localImages = []
}

// If we don't have many carousel images, try to augment with other assets present in the repo.
if (localImages.length < 8) {
  const extraCandidates = [
    // dm series
    'dm1.jpg','dm2.jpg','dm3.jpg','dm4.jpg','dm5.jpg','dm6.jpg','dm9.jpg','dm10.jpg','dm11.jpg','dm12.jpg','dm13.jpg','dm14.jpg','dm15.jpg','dm16.jpg','dm17.jpg','dm18.jpg',
    // santa series
    'santa-A-1.jpg','santa-A-2.jpg','santa-A-3.jpg','santa-exterior2.jpg','santa-exterior3.jpg','santa-imagen-lugar.jpg','santa-isometrica-web.jpg','santa-planta1.jpg','santa-planta-techo.jpg',
    // pieza ninos
    'pieza-ninos-1.jpg','pieza-ninos-2.jpg','pieza-ninos-3.jpg','pieza-ninos-4.jpg',
    // array / misc
    'array-21-1.jpg','array-23-1.jpg','array-24-1.jpg','array-25-1.jpg','array-26-1.jpg','array-27-1.jpg','terminada.jpg','exterior.jpg','portada.jpg','carousel-03.png'
  ]

  for (const name of extraCandidates) {
    try {
      const href = new URL(`../assets/${name}`, import.meta.url).href
      if (!localImages.includes(href)) localImages.push(href as string)
    } catch (e) {
      // ignore missing files
    }
    if (localImages.length >= 16) break
  }
}

const fallbackImages = [
  'https://dm-a.cl/wp-content/uploads/2023/04/IM_02-1024x576.jpg',
  'https://dm-a.cl/wp-content/uploads/2023/04/PORTADA-ISLA-MAIPO-e1681434396379-1024x644.jpg',
  'https://dm-a.cl/wp-content/uploads/2011/09/Imagen-0-1024x739.png',
  'https://dm-a.cl/wp-content/uploads/2011/09/Imagen-1-1024x576.jpg',
  'https://dm-a.cl/wp-content/uploads/2011/09/imagen-2-1024x576.jpg',
  'https://dm-a.cl/wp-content/uploads/2011/09/imagen-3-1024x576.jpg'
]

const initialImages = localImages.length > 0 ? localImages : fallbackImages

export default function MosaicGallery(): ReactElement {
  const [index, setIndex] = useState(0)
  const [prevSrc, setPrevSrc] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const [imagesState, setImagesState] = useState<string[]>(initialImages)
  const images = imagesState
  const total = images.length
  const DURATION = 800 // ms fade duration
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

  function renderPictureFor(src: string, alt: string, key: number, role?: 'prev' | 'current') {
    // If local images were bundled, `localModulesMap` contains file variants keyed by base name
    // We built `localMap` earlier when importing; reuse import.meta.globEager map if present
    // Build base name (without extension) from src when local; for remote fall back to simple img
    const isLocal = !!src && (src.startsWith('/') || src.startsWith('.'))

    const classes = ['carousel-image']
    if (role === 'prev') {
      classes.push('prev', 'active') // prev must be visible to fade out
    }
    if (role === 'current') classes.push('current')
    // current image active when it's the selected index
    if (key === index) classes.push('active')
    if (animating && role === 'current') classes.push('fade-in')
    if (animating && role === 'prev') classes.push('fade-out')

    if (isLocal) {
      // try to derive webp variant by replacing extension with .webp
      const webp = src.replace(/\.[^.]+$/, '.webp')
      return (
        <picture key={key}>
          {/* use webp when available locally */}
          <source srcSet={webp} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className={classes.join(' ')}
            loading={role === 'current' ? 'eager' : 'lazy'}
            onError={() => {
              // remove failing image from carousel
              setImagesState(prev => prev.filter(p => p !== src))
            }}
            style={{ zIndex: 1 }}
          />
        </picture>
      )
    }

    // remote fallback: just an img (could be enhanced to point to provider srcset later)
    return (
      <img
        key={key}
        src={src}
        alt={alt}
        className={classes.join(' ')}
        loading={role === 'current' ? 'eager' : 'lazy'}
        onError={() => setImagesState(prev => prev.filter(p => p !== src))}
        style={{ zIndex: 1 }}
      />
    )
  }

  // if current index is out of bounds (after removal), clamp it
  useEffect(() => {
    if (index >= images.length && images.length > 0) {
      setIndex(images.length - 1)
    }
    if (images.length === 0) {
      setIndex(0)
    }
  }, [images, index])

  return (
    <section id="mosaic" className="gallery-carousel-section">
      <SectionTitle>Galería</SectionTitle>

      <div className="gallery-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <button className="carousel-prev" aria-label="Anterior" onClick={() => changeIndex((index - 1 + total) % total)}>‹</button>

        <div className="carousel-viewport">
          {/* current image only (previous image layer removed to avoid visual artifacts) */}
          {typeof images[index] === 'string' ? renderPictureFor(images[index], `Galería ${index + 1}`, index, 'current') : null}
        </div>

        <button className="carousel-next" aria-label="Siguiente" onClick={() => changeIndex((index + 1) % total)}>›</button>
      </div>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => changeIndex(i)} aria-label={`Ir a imagen ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
