import type { ReactElement } from 'react'
import React from 'react'

type Props = {
  onDesignClick: () => void
}

export default function ContactCallout({ onDesignClick }: Props): ReactElement {
  const whatsappNumber = '56992998255'
  const message = encodeURIComponent('Hola, quisiera información sobre un quincho. ¿Podrían ayudarme?')
  const waHref = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <div className="contact-callout">
      <div className="callout-inner container">
        <div className="callout-text">
          <h3>¿Listo para diseñar tu quincho?</h3>
          <p className="muted">Hablemos por WhatsApp o solicita un presupuesto rápido.</p>
        </div>
        <div className="callout-actions">
          <a className="btn primary" href={waHref} target="_blank" rel="noreferrer">Chatear por WhatsApp</a>
          <button type="button" className="btn primary" onClick={() => { console.log('ContactCallout: click solicitar'); onDesignClick() }}>Cotiza tu proyecto</button>
        </div>
      </div>
    </div>
  )
}
