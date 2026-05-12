
import SectionTitle from './SectionTitle'
import type { ReactElement, Key } from 'react'
import { useEffect, useState } from 'react'
import fallbackImg from '../assets/carousel-01.jpg'

// Try to use locally downloaded carousel images (src/assets/carousel-*) if present.
// Falls back to remote images hosted at dm-a.cl.
let localImages: string[] = []
// Map of base -> { avif:[], webp:[], jpg:[] }
const localVariants: Record<string, { avif?: string[]; webp?: string[]; jpg?: string[] }> = {}
try {
  const anyImportMeta = import.meta as any
  let modules: Record<string, any> | null = null
  if (typeof anyImportMeta.glob === 'function') {
    // Vite: import.meta.glob with eager option
    modules = anyImportMeta.glob('../assets/*.*', { eager: true })
  } else if (typeof anyImportMeta.globEager === 'function') {
    // older Vite variant
    modules = anyImportMeta.globEager('../assets/*.*')
  }

  if (modules) {
    // collect all assets and build variants map
      for (const [k, m] of Object.entries(modules)) {
      try {
        const url = (m && (m.default || m)) || null
        if (!url) continue
        // filename like '../assets/name-800.jpg' -> name-800.jpg
        let filename = k.replace(/^\.\.\/assets\//, '')
        try {
          // if url is an absolute URL, prefer to extract filename from it (handles different build outputs)
          const u = new URL(url)
          filename = u.pathname.split('/').pop() || filename
        } catch {}
        localImages.push(url)
        const nameNoExt = filename.replace(/\.[^.]+$/, '')
        // derive base by stripping -<size> suffix if present
        const base = nameNoExt.replace(/-\d{2,4}$/, '')
        const ext = (filename.match(/\.(jpg|jpeg|png|webp|avif)$/i) || [])[1] || 'jpg'
        if (!localVariants[base]) localVariants[base] = {}
        const map = localVariants[base]!
        const key = ext === 'avif' ? 'avif' : ext === 'webp' ? 'webp' : 'jpg'
        if (!map[key]) map[key] = []
        map[key]!.push(url)
      } catch (e) {
        // ignore
      }
    }
  } else {
    // Fallback: explicit expected filenames (will 404 if missing)
    const names = ['carousel-01.jpg','carousel-02.jpg','carousel-03.jpg','carousel-04.jpg','carousel-05.jpg','carousel-06.jpg']
    localImages = names.map(n => {
      try { return new URL(`../assets/${n}`, import.meta.url).href } catch { return null }
    }).filter(Boolean) as string[]
    // no variants in fallback mode
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

const initialImages = (localImages && localImages.filter(Boolean).length > 0) ? localImages.filter(Boolean) : fallbackImages

export default function MosaicGallery(): ReactElement {
  const [index, setIndex] = useState(0)
  const [prevSrc, setPrevSrc] = useState<string | null>(null)
  const [animating, setAnimating] = useState<'idle' | 'fading-out' | 'fading-in'>('idle')
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [imagesState, setImagesState] = useState<string[]>(initialImages)
  const images = imagesState
  const total = images.length
  const DURATION_OUT = 2600 // ms fade-out duration (slower)
  const DURATION_IN = 1600 // ms fade-in duration
  const OVERLAP_START = Math.round(DURATION_OUT * 0.45) // start fade-in while fading-out
  const AUTOPLAY = 4000 // ms

  // Preload images and their detected variants into browser memory to avoid re-request on slide change.
  useEffect(() => {
    const toPreload = new Set<string>()
    // add current list
    images.forEach(i => toPreload.add(i))
    // if we detected variants earlier, add them too
    try {
      for (const key of Object.keys(localVariants)) {
        const v = (localVariants as any)[key]
        if (v.avif) v.avif.forEach((u: string) => toPreload.add(u))
        if (v.webp) v.webp.forEach((u: string) => toPreload.add(u))
        if (v.jpg) v.jpg.forEach((u: string) => toPreload.add(u))
      }
    } catch (e) {
      // ignore
    }

    // also include remote fallback set when no local images
    if (toPreload.size === 0) fallbackImages.forEach(u => toPreload.add(u))

    // limit preloads to avoid saturating network
    const MAX = 30
    let count = 0
    for (const url of toPreload) {
      if (count++ >= MAX) break
      try {
        const img = new Image()
        img.src = url
      } catch (e) {
        // ignore
      }
    }
  }, [images])

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
    // start by capturing the current image as the layer to fade out
    setPrevSrc(images[index])
    setPendingIndex(newIndex)
    // begin fade-out of current image
    setAnimating('fading-out')

    // start fade-in after a short overlap so the transition is smooth
    setTimeout(() => {
      setIndex(newIndex)
      setAnimating('fading-in')

      // after fade-in completes, clear animation state and previous src
      setTimeout(() => {
        setAnimating('idle')
        setPrevSrc(null)
        setPendingIndex(null)
      }, DURATION_IN)
    }, OVERLAP_START)
  }

  function renderPictureFor(src: string | null, alt: string, key: Key, role?: 'prev' | 'current') {
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

    if (!src) {
      // usar imagen local conocida como fallback en lugar de renderizar 'undefined'
      src = fallbackImg
      alt = alt || 'Imagen'
    }

    if (isLocal) {
      // attempt to use generated variants (avif/webp/jpg) if available
      try {
        const filename = src.split('/').pop() || ''
        const nameNoExt = filename.replace(/\.[^.]+$/, '')
        const base = nameNoExt.replace(/-\d{2,4}$/, '')
        const variants = (localVariants as any)[base]
        if (variants) {
          // build srcsets: try avif, webp, then jpg
          const buildSrcset = (arr?: string[]) => {
            if (!arr || !arr.length) return null
            return arr.map(u => {
              const m = (u.split('/').pop() || '').match(/-(\d{2,4})\./)
              return m ? `${u} ${m[1]}w` : `${u}`
            }).join(', ')
          }

          const avifSrcset = buildSrcset(variants.avif)
          const webpSrcset = buildSrcset(variants.webp)
          const jpgSrcset = buildSrcset(variants.jpg)

          return (
            <picture key={key}>
              {avifSrcset && <source type="image/avif" srcSet={avifSrcset} />}
              {webpSrcset && <source type="image/webp" srcSet={webpSrcset} />}
              {/* fallback JPGs */}
              <img
                src={src}
                srcSet={jpgSrcset || undefined}
                sizes="100vw"
                alt={alt}
                className={classes.join(' ')}
                loading={role === 'current' ? 'eager' : 'lazy'}
                onError={() => setImagesState(prev => prev.filter(p => p !== src))}
                style={{ zIndex: role === 'prev' ? 0 : 1 }}
              />
            </picture>
          )
        }
      } catch (e) {
        // fall back to simple img
      }
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
        style={{ zIndex: role === 'prev' ? 0 : 1 }}
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
          {/* previous layer (for crossfade) */}
          {prevSrc ? (
            <div
              key={`layer-prev-${index}`}
              className={`carousel-layer prev ${animating === 'fading-out' ? 'fade-out' : ''}`}
              style={{ backgroundImage: `url(${prevSrc})`, zIndex: 0 }}
              aria-hidden
            />
          ) : null}

          {/* current layer: use pendingIndex when set (next image) so it can fade-in after fade-out) */}
          {(() => {
            const currentSrc = pendingIndex !== null ? images[pendingIndex] : images[index]
            if (!currentSrc) return null
            const currentClass = `carousel-layer current ${animating === 'fading-in' ? 'fade-in' : animating === 'idle' ? 'active' : ''}`
            const ariaLabel = pendingIndex !== null ? `Galería ${pendingIndex + 1}` : `Galería ${index + 1}`
            return (
              <div
                key={`layer-current-${pendingIndex !== null ? pendingIndex : index}`}
                className={currentClass}
                style={{ backgroundImage: `url(${currentSrc})`, zIndex: 1 }}
                role="img"
                aria-label={ariaLabel}
              />
            )
          })()}
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
