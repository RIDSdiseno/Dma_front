type Service = { title: string; desc: string }

const services: Service[] = [
  { title: 'Diseño arquitectónico', desc: 'Proyectos residenciales y comerciales con atención al detalle.' },
  { title: 'Interiorismo', desc: 'Soluciones interiores que integran funcionalidad y estética.' },
  { title: 'Obra y dirección', desc: 'Gestión de obra, cronograma y coordinación de oficios.' }
]

export default function Services() {
  return (
    <section id="services" className="container services">
      <div className="content">
        <h2>Servicios</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
