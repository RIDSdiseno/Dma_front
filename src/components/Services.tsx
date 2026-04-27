import type { ReactElement } from 'react'
import { useState } from 'react'

type Service = { id: number; title: string; desc: string; bullets?: string[] }

const services: Service[] = [
  {
    id: 1,
    title: 'Proyectos residenciales',
    desc:
      'Conceptualizamos y desarrollamos viviendas unifamiliares y proyectos de escala menor con foco en la calidad espacial, la eficiencia constructiva y la coordinación técnica con disciplinas asociadas.',
    bullets: ['Viviendas unifamiliares', 'Condominios', 'Segundas viviendas'],
  },
  {
    id: 2,
    title: 'Edificios y desarrollos',
    desc:
      'Realizamos el proyecto ejecutivo para edificios de departamentos, oficinas y desarrollos mixtos, atendiendo normativa, estructura y sistemas para garantizar entregables constructivos completos.',
    bullets: ['Edificios de departamentos', 'Oficinas', 'Desarrollos mixtos'],
  },
  {
    id: 3,
    title: 'Diseño interior',
    desc:
      'Diseñamos interiores que integran ergonomía, estética y detalles constructivos; abarcamos cocinas, baños, locales comerciales y equipamiento incorporado al proyecto.',
    bullets: ['Cocinas y baños', 'Locales comerciales', 'Amoblamiento a medida'],
  },
  {
    id: 4,
    title: 'Paisajismo y entorno',
    desc:
      'Trabajamos la relación entre edificación y terreno: diseño de jardines, terrazas y soluciones de paisaje que complementan el proyecto arquitectónico.',
    bullets: ['Diseño de jardines', 'Terrazas y patios', 'Tratamiento de linderos'],
  },
  {
    id: 5,
    title: 'Gestión y dirección de obra',
    desc:
      'Acompañamos la etapa de obra con dirección técnica, coordinación de oficios, control de calidad y gestión de cronograma y costos hasta la entrega final.',
    bullets: ['Dirección técnica', 'Coordinación de oficios', 'Control de calidad'],
  },
]

export default function Services(): ReactElement {
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section id="services" className="container services-section">
      <div className="content services-content centered">
        <div className="services-left">
          <small className="kicker">SERVICIOS</small>
          <h1 className="services-hero">Ejecución<br/>de obra</h1>
          <p className="services-intro">Nuestro proceso creativo es metódico y riguroso; transformamos ideas en proyectos constructivos claros y ejecutables.</p>
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
