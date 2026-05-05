import logo from '../assets/logo.png'
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'

export default function Navbar(): ReactElement {
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

  useEffect(() => {
    const prev = document.body.style.overflow
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prev
    }
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <header className="site-header">
      <div className="container nav-row">
        <div
          className="content"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            columnGap: 24,
          }}
        >
          <div style={{gridColumn: '1'}}>
            <div className="brand">
              <img src={logo} alt="DM-A" className="brand-logo brand-logo--light" />
            </div>
          </div>

          <nav className="nav" style={{gridColumn: '2', justifySelf: 'center'}} aria-hidden={open}>
            <a href="#hero">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#projects">Proyectos</a>
            <a href="#nosotros">Nosotros</a>
          </nav>

          <div className="cta" style={{gridColumn: '3', justifySelf: 'end'}}>
            <a className="btn small" href="#contact">Contacto</a>
            <button className="mobile-toggle" aria-label="Abrir menú" onClick={() => setOpen(true)} aria-expanded={open}>
              <span className="hamburger" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="mobile-nav-overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="mobile-nav-inner">
            <button className="mobile-close" onClick={close} aria-label="Cerrar menú">✕</button>
            <nav className="mobile-nav-list">
              <a href="#hero" onClick={close}>Inicio</a>
              <a href="#services" onClick={close}>Servicios</a>
              <a href="#projects" onClick={close}>Proyectos</a>
              <a href="#nosotros" onClick={close}>Nosotros</a>
              <a className="btn primary" href="#contact" onClick={close}>Contacto</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
