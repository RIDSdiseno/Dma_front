import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'

type PackageKey = 'Starter' | 'Pro' | 'Full'

const DEFAULT_UF_CLP = 37000

const RATE_PER_SQM: Record<PackageKey, number> = {
  Starter: 0.85,
  Pro: 1.1,
  Full: 1.3,
}

const INCLUDES: Record<PackageKey, string[]> = {
  Starter: [
    '1 Planta de Arquitectura',
    '2 Cortes de Arquitectura',
    '1 Modelo 3D BIM (Revit)',
    '3 Imágenes 3D (Render)',
    '2 Reuniones de trabajo',
    '1 Visita al lugar',
  ],
  Pro: [
    '1 Planta de Arquitectura',
    '1 Planta de terminaciones',
    '1 Planta de tabiques',
    '1 Lámina de mobiliario',
    '4 Cortes de Arquitectura',
    '2 Cortes Constructivos',
    '1 Modelo 3D BIM',
    '3 Imágenes 3D',
    '5 Reuniones',
    '1 Visita',
    'Especificaciones Técnicas',
    'Coordinación especialidades',
  ],
  Full: [
    'Proyecto completo',
    'Plantas, cortes, elevaciones',
    'Cortes de escantillón',
    'Especificaciones técnicas',
    'Presupuesto construcción',
    'Carta Gantt diseño',
    'Carta Gantt obra',
    'Listo para construir sin errores',
    'Servicio de visitas a obra',
    'Evita sobrecostos',
  ],
}

type Props = {
  area: number
  setArea: (n: number) => void
  pkg: PackageKey
  setPkg: (p: PackageKey) => void
}

export default function QuinchoConfigurator({ area, setArea, pkg, setPkg }: Props): ReactElement {
  const [service, setService] = useState<string>('Diseño de Quincho')
  const [ufClp, setUfClp] = useState<number>(DEFAULT_UF_CLP)

  const rates = RATE_PER_SQM

  const { totalUf, totalClp } = useMemo(() => {
    if (!area || area < 10) return { totalUf: 0, totalClp: 0 }
    const per = rates[pkg]
    const uf = +(per * area).toFixed(2)
    const clp = Math.round(uf * ufClp)
    return { totalUf: uf, totalClp: clp }
  }, [area, pkg, ufClp])

  const whatsappNumber = '56992998255'

  function buildWhatsAppHref() {
    const msg = `Hola, quiero cotizar un ${service} de ${area} m² con el paquete ${pkg}. Total estimado: ${totalUf} UF (~$${totalClp.toLocaleString('es-CL')} CLP).`
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
  }

  return (
    <section id="quincho" className="container quincho-section">
      <div className="content centered two-col">
        <div className="quincho-left">
          <h2>Diseña tu proyecto a tu medida</h2>
          <p className="muted">Elige un paquete, ingresa los m² y obtén el valor estimado en UF y CLP. Estándares altos, entregables claros y tiempos definidos.</p>

          <label className="label">Tipo de servicio</label>
          <select className="form-input" value={service} onChange={(e) => setService(e.target.value)}>
            <option>Diseño de Quincho</option>
            <option>Diseño de Cocina</option>
            <option>Diseño de Remodelación</option>
            <option>Diseño de Proyecto nuevo</option>
            <option>Diseño de Local Comercial</option>
          </select>

          <label className="label">m² del proyecto</label>
          <input className="form-input" type="number" min={0} value={area} onChange={(e) => setArea(Math.max(0, Number(e.target.value) || 0))} />

          <label className="label">Valor UF (CLP)</label>
          <input className="form-input" type="number" min={1000} value={ufClp} onChange={(e) => setUfClp(Math.max(0, Number(e.target.value) || 0))} />

          <div style={{marginTop:12}} className="pkg-buttons" role="tablist" aria-label="Seleccionar paquete">
            {(['Starter','Pro','Full'] as PackageKey[]).map(k => (
              <button key={k} className={`pkg-btn ${k === pkg ? 'active' : ''}`} onClick={() => setPkg(k)} aria-pressed={k === pkg}>{k}</button>
            ))}
          </div>

          <div style={{display:'grid',gap:12,marginTop:18}}>
            <div style={{background:'#fff',color:'#0b0b0b',padding:14,borderRadius:10,border:'1px solid rgba(15,23,42,0.04)'}}>
              <h4 style={{margin:'0 0 8px'}}>Qué entregamos</h4>
              <ul style={{margin:0,paddingLeft:18,color:'#1f2937'}}>
                <li>Documentos listos para cotizar</li>
                <li>Renders realistas con materiales seleccionados</li>
                <li>Expediente físico y digital</li>
              </ul>
            </div>

            <div style={{background:'#fff',color:'#0b0b0b',padding:14,borderRadius:10,border:'1px solid rgba(15,23,42,0.04)'}}>
              <h4 style={{margin:'0 0 8px'}}>Cómo funciona</h4>
              <ul style={{margin:0,paddingLeft:18,color:'#1f2937'}}>
                <li>Cotiza tu proyecto</li>
                <li>Primera reunión</li>
                <li>Visita a terreno</li>
                <li>Calendario de trabajo</li>
                <li>Entrega final</li>
              </ul>
            </div>
          </div>
        </div>

        <aside className="quincho-right">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontSize:12,color:'var(--muted)',letterSpacing:1}}>PAQUETE SELECCIONADO</div>
              <h3 className="pkg-title" style={{marginTop:6}}>{pkg}</h3>
              <div style={{color:'var(--muted)',marginTop:4}}>{service}</div>
            </div>
          </div>

          <div style={{marginTop:18}}>
            <div className="pkg-uf" style={{fontSize:52,letterSpacing:-1}}>{totalUf} <span className="uf-label">UF</span></div>
            <div className="pkg-clp">${totalClp.toLocaleString('es-CL')} CLP</div>
          </div>

          <div style={{display:'flex',gap:10,marginTop:16}}>
            <div style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,flex:1}}>
              <div style={{fontSize:12,color:'var(--muted)'}}>Superficie</div>
              <div style={{fontWeight:700,marginTop:6}}>{area} m²</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,flex:1}}>
              <div style={{fontSize:12,color:'var(--muted)'}}>Valor UF usado</div>
              <div style={{fontWeight:700,marginTop:6}}>{RATE_PER_SQM[pkg]} UF/m²</div>
            </div>
          </div>

          <div style={{marginTop:18}}>
            <h4 style={{margin:'0 0 12px'}}>Incluye</h4>
            <div className="includes-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {INCLUDES[pkg].map((it) => (
                <div key={it} style={{display:'flex',alignItems:'flex-start',gap:8,color:'var(--muted)'}}>
                  <div style={{fontSize:18,lineHeight:1.1}}>•</div>
                  <div style={{fontSize:14}}>{it}</div>
                </div>
              ))}
            </div>
          </div>

          <a className="request-btn" href={buildWhatsAppHref()} target="_blank" rel="noreferrer" style={{display:'block',marginTop:18,textDecoration:'none',textAlign:'center'}}>
            Solicitar este paquete
          </a>

          <div style={{marginTop:12,color:'var(--muted)',fontSize:12}}>
            Valor visita extra 2 UF dentro de Santiago. El precio final puede variar según complejidad, ubicación, normativa local y complejidad de detalles y terminaciones.
          </div>
        </aside>
      </div>
    </section>
  )
}
