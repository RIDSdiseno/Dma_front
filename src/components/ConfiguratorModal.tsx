import type { ReactElement } from 'react'
import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function ConfiguratorModal({ open, onClose, title, children }: Props): ReactElement | null {
  if (!open) return null

  return (
    <div className={`pm-overlay open`} role="dialog" aria-modal="true" aria-label={title || 'Configurador'}>
      <div className="pm-dialog">
        <button className="pm-close" onClick={onClose} aria-label="Cerrar">✕</button>
        <div style={{padding:8}}>
          {children}
        </div>
      </div>
    </div>
  )
}
