import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <div className="content" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className="brand">
            <img src={logo} alt="DM-A" className="brand-logo" />
          </div>
          <div className="nav-right" style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:20}}>
            <nav className="nav">
              <a href="#hero">Inicio</a>
              <a href="#services">Servicios</a>
              <a href="#projects">Proyectos</a>
              <a href="#nosotros">Nosotros</a>
            </nav>
            <div className="cta">
              <a className="btn small" href="#contact">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
