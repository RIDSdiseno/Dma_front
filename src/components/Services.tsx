import type { ReactElement } from 'react'
import { useState } from 'react'
import SectionTitle from './SectionTitle'

type Service = { id: number; title: string; desc: string; bullets?: string[] }

const services: Service[] = [
  {
    id: 1,
    title: 'Proyectos residenciales',
    desc: 'Diseñamos casas que se adaptan a cómo vive cada familia, no al revés. Partimos desde una idea clara y la llevamos hasta el detalle constructivo.',
    bullets: ['Viviendas unifamiliares', 'Condominios', 'Segundas viviendas'],
  },
  {
    id: 2,
    title: 'Edificios y desarrollos',
    desc: 'Trabajamos con desarrolladores que necesitan un proyecto sólido: bien coordinado, que cumpla la norma y que no genere sorpresas en obra.',
    bullets: ['Edificios de departamentos', 'Oficinas', 'Desarrollos mixtos'],
  },
  {
    id: 3,
    title: 'Diseño interior',
    desc: 'Un buen interior no es solo estético. Pensamos cada espacio para que funcione bien, se vea bien y dure en el tiempo.',
    bullets: ['Cocinas y baños', 'Locales comerciales', 'Mobiliario a medida'],
  },
  {
    id: 4,
    title: 'Paisajismo y entorno',
    desc: 'El jardín y la terraza son parte del proyecto, no un agregado. Los diseñamos con la misma atención que el interior.',
    bullets: ['Diseño de jardines', 'Terrazas y patios', 'Límites y accesos'],
  },
  {
    id: 5,
    title: 'Dirección de obra',
    desc: 'Estar en obra no es un plus, es parte del servicio. Coordinamos a los contratistas, controlamos los plazos y resolvemos los imprevistos antes de que se conviertan en problemas.',
    bullets: ['Dirección técnica', 'Coordinación de oficios', 'Control de calidad'],
  },
]

export default function Services(): ReactElement {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section id="services" className="container services-section">
      <div className="content services-content centered">
        <div className="services-left">
          <SectionTitle>Servicios</SectionTitle>
          <h1 className="services-hero">Ejecución<br/>de obra</h1>
          <p className="services-intro">Buscamos tener una idea clara desde el comienzo. Después la desarrollamos hasta el último detalle.</p>
        </div>

        <div className="services-right">
          <div className="accordion">
            {services.map((s) => {
              const isOpen = openId === s.id
              return (
                <div className={`accordion-item ${isOpen ? 'open' : ''}`} key={s.id}>
                  <button className="accordion-toggle" onClick={() => setOpenId(isOpen ? null : s.id)} aria-expanded={isOpen}>
                    <span className="acc-number">{String(s.id).padStart(2, '0')}</span>
                    <span className="acc-title">{s.title}</span>
                    <span className="acc-icon" aria-hidden>{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="panel" style={{ maxHeight: isOpen ? '420px' : '0px' }}>
                    <div className="panel-inner">
                      <p>{s.desc}</p>
                      {s.bullets && (
                        <ul>
                          {s.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
