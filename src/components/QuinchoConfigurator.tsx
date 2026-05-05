import type { ReactElement } from 'react'
import { useMemo } from 'react'

const UF_TO_CLP = 37000 // aproximado usado en el proyecto (ej: 20 UF => 740.000 CLP)

type PackageKey = 'Starter' | 'Pro' | 'Full'

const BASE_UF: Record<PackageKey, number> = {
  Starter: 20,
  Pro: 35,
  Full: 55,
}

const THRESHOLD: Record<PackageKey, number> = {
  Starter: 37,
  Pro: 42,
  Full: 46,
}

// Extra UF per m² above threshold
const EXTRA_RATE: Record<PackageKey, number> = {
  Starter: 0.2,
  Pro: 0.25,
  Full: 0.3,
}

type Props = {
  area: number
  setArea: (n: number) => void
  pkg: PackageKey
  setPkg: (p: PackageKey) => void
}

export default function QuinchoConfigurator({ area, setArea, pkg, setPkg }: Props): ReactElement {
  const { uf, clp, extra } = useMemo(() => {
    if (area < 10) return { uf: 0, clp: 0, extra: 0 }
    const base = BASE_UF[pkg]
    const threshold = THRESHOLD[pkg]
    const rate = EXTRA_RATE[pkg]
    const over = Math.max(0, area - threshold)
    const extraUF = over * rate
    const totalUF = +(base + extraUF).toFixed(1)
    const totalCLP = Math.round(totalUF * UF_TO_CLP)
    return { uf: totalUF, clp: totalCLP, extra: +extraUF.toFixed(2) }
  }, [area, pkg])

  return (
    <section id="quincho" className="container quincho-section">
      <div className="content centered two-col">
        <div className="quincho-left">
          <h2>Diseña tu Quincho como un producto</h2>
          <p className="muted">Claro, rápido y con precio definido.</p>

          <label className="label">m² del proyecto</label>
          <input
            className="form-input"
            type="number"
            min={1}
            value={area}
            onChange={(e) => setArea(Math.max(0, Number(e.target.value) || 0))}
          />

          <div className="pkg-buttons">
            {(['Starter', 'Pro', 'Full'] as PackageKey[]).map((k) => (
              <button
                key={k}
                className={`pkg-btn ${k === pkg ? 'active' : ''}`}
                onClick={() => setPkg(k)}
                aria-pressed={k === pkg}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <aside className="quincho-right">
          <h3 className="pkg-title">{pkg}</h3>
          <div className="pkg-uf">{uf} <span className="uf-label">UF</span></div>
          <div className="pkg-clp">${clp.toLocaleString('es-CL')} CLP</div>

          <button className="btn primary large request-btn">Solicitar este paquete</button>

          <div className="pkg-note muted">
            {extra > 0 ? (
              <span>Incluye +{extra} UF por m² sobre {THRESHOLD[pkg]} m²</span>
            ) : (
              <span>No hay recargo por m² para este paquete.</span>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
