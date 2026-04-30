import logo from '../assets/logo.png'
import type { ReactElement } from 'react'

export default function Navbar(): ReactElement {
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

          <nav className="nav" style={{gridColumn: '2', justifySelf: 'center'}}>
            <a href="#hero">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#projects">Proyectos</a>
            <a href="#nosotros">Nosotros</a>
          </nav>

          <div className="cta" style={{gridColumn: '3', justifySelf: 'end'}}>
            <a className="btn small" href="#contact">Contacto</a>
          </div>
        </div>
      </div>
    </header>
  )
}
