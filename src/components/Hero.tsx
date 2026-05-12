import type { ReactElement } from 'react'
import { useEffect, useRef } from 'react'
import { heroWrapper, heroLeft, heroTitle, heroLead } from '../styles/heroStyles'

type Props = {
  onDesignClick?: () => void
}

const TITLE_WORDS = ['Estudio', 'de', 'Arquitectura', '&', 'Diseño']

export default function Hero({ onDesignClick }: Props): ReactElement {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
      bg.style.transform = `scale(${1 + progress * 0.12})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="hero" style={{ ...heroWrapper, backgroundImage: 'none' }} aria-label="Imagen representativa de proyecto">
      {/* capa de imagen — escala con parallax */}
      <div
        ref={bgRef}
        className="hero-parallax-bg"
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: heroWrapper.backgroundImage as string,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transformOrigin: 'center bottom',
          willChange: 'transform',
        }}
      />
      <div className="hero-inner content" style={heroLeft}>
        <h1 style={heroTitle} aria-label={TITLE_WORDS.join(' ')}>
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ animationDelay: `${0.1 + i * 0.13}s` }}
            >
              {word === '&' ? '&' : word}
            </span>
          ))}
        </h1>
        <p style={heroLead} className="hero-lead-anim">
          Diseñar y construir bien cambia tu forma de vivir.
        </p>
        <div className="hero-ctas hero-cta-anim" style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <button onClick={onDesignClick} className="btn primary hero-cta" aria-label="Solicitar Presupuesto">
            Solicitar Presupuesto
          </button>
        </div>
      </div>
    </section>
  )
}
