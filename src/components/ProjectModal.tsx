import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'

type Props = {
  project: Project | null
  open: boolean
  onClose: () => void
}

export default function ProjectModal({ project, open, onClose }: Props): ReactElement | null {
  const [index, setIndex] = useState(0)
  const [isMounted, setMounted] = useState(open)
  const [isClosing, setClosing] = useState(false)
  const DURATION = 900 // ms

  // Normalize images array even if project is null to keep hooks order stable
  const imgs: string[] = project && project.images && project.images.length ? project.images : project && project.image ? [project.image] : []

  // Resolve image paths to safe URLs that work with Vite's dev server bundling.
  // Accepts absolute http(s), root paths, or `src/...` module paths from project data.
  const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%230b0b0b"/><text x="50%" y="50%" fill="%23aaa" font-size="20" font-family="Arial" dominant-baseline="middle" text-anchor="middle">Imagen no disponible</text></svg>'

  function resolveImgPath(s: string): string {
    if (!s) return PLACEHOLDER
    if (/^https?:\/\//.test(s)) return s
    if (s.startsWith('/')) return s
    // handle module-style paths like 'src/assets/foo.jpg'
    if (s.startsWith('src/')) {
      try {
        return new URL(`../${s.replace(/^src\//, '')}`, import.meta.url).href
      } catch (err) {
        return s
      }
    }
    // handle relative paths
    if (s.startsWith('./') || s.startsWith('../')) {
      try { return new URL(s, import.meta.url).href } catch (err) { return s }
    }
    // fallback: try to resolve by filename inside src/assets
    const name = s.split('/').pop() || s
    try { return new URL(`../assets/${name}`, import.meta.url).href } catch (err) { return s }
  }

  const resolvedImgs = imgs.map(resolveImgPath)

  // When open becomes true, mount modal
  useEffect(() => {
    if (open) {
      setMounted(true)
      setClosing(false)
      setIndex(0)
    }
    // when open becomes false, start exit animation (but do not call onClose here — parent already changed open)
    else if (isMounted) {
      setClosing(true)
      const t = setTimeout(() => {
        setMounted(false)
        setClosing(false)
      }, DURATION)
      return () => clearTimeout(t)
    }
  }, [open])

  // internal close handler: play animation then call parent's onClose
  function handleClose() {
    setClosing(true)
    setTimeout(() => {
      setMounted(false)
      setClosing(false)
      onClose()
    }, DURATION)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isMounted) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight' && imgs.length) setIndex((i) => (i + 1) % imgs.length)
      if (e.key === 'ArrowLeft' && imgs.length) setIndex((i) => (i - 1 + imgs.length) % imgs.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMounted, imgs.length])

  // if not mounted or no project, render nothing
  if (!isMounted || !project) return null

  // Thumbnail carousel calculations
  const THUMB_VISIBLE = 3
  const THUMB_WIDTH = 160 // image content width (px) - matches CSS
  const THUMB_PADDING = 4 // px (left+right included in box-sizing)
  const THUMB_BORDER = 1 // px (left+right)
  const GAP = 12
  // total outer width of each thumb element (matches CSS: flex-basis 94px)
  const THUMB_TOTAL = THUMB_WIDTH + THUMB_PADDING * 2 + THUMB_BORDER * 2
  const visible = Math.min(THUMB_VISIBLE, imgs.length)
  const maxStart = Math.max(0, imgs.length - visible)
  const startIndex = Math.min(Math.max(index - Math.floor(visible / 2), 0), maxStart)
  const translate = -(startIndex * (THUMB_TOTAL + GAP))

  const overlayClass = isClosing ? 'closing' : open ? 'open' : ''

  return (
    <div className={`pm-overlay ${overlayClass}`} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={`pm-dialog ${overlayClass}`}>
        <button className="pm-close" onClick={handleClose} aria-label="Cerrar">✕</button>

        <div className="pm-body">
          <div className="pm-carousel">
            <button
              className="pm-prev"
              onClick={() => setIndex((i) => (i - 1 + imgs.length) % imgs.length)}
              aria-label="Anterior"
            >
              ‹
            </button>

            <div className="pm-image-wrap">
              <img
                src={resolvedImgs[index] || PLACEHOLDER}
                alt={`${project.title} ${index + 1}`}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
              />
            </div>

            <button
              className="pm-next"
              onClick={() => setIndex((i) => (i + 1) % imgs.length)}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>

          <aside className="pm-info">
            <h3>{project.title}</h3>
            {project.excerpt && <p className="muted">{project.excerpt}</p>}
            <ul className="pm-meta">
              {project.details?.program && <li><strong>Programa:</strong> {project.details.program}</li>}
              {project.details?.area && <li><strong>Superficie:</strong> {project.details.area}</li>}
              {project.details?.materials && <li><strong>Materialidad:</strong> {project.details.materials}</li>}
              {project.details?.client && <li><strong>Mandante:</strong> {project.details.client}</li>}
            </ul>
            {project.source && (
              <p style={{marginTop:12}}>
                <a href={project.source} target="_blank" rel="noreferrer" className="btn small">Ver en el sitio</a>
              </p>
            )}
          </aside>
        </div>
        <div className="pm-thumbs">
          <div className="pm-thumbs-track" style={{ transform: `translateX(${translate}px)` }}>
            {resolvedImgs.map((s, i) => (
              <button
                key={s}
                className={`pm-thumb ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir a imagen ${i + 1}`}
              >
                <img src={s} alt={`thumb ${i + 1}`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
