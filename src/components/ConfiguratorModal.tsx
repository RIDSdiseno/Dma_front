import type { ReactElement } from 'react'
import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function ConfiguratorModal({ open, onClose, children }: Props): ReactElement | null {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return

    previouslyFocused.current = document.activeElement as HTMLElement | null

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(dialog!.querySelectorAll<HTMLElement>(focusableSelector)).filter(el => !el.hasAttribute('disabled'))
    if (focusable.length) {
      focusable[0].focus()
      } else {
      dialog!.setAttribute('tabindex', '-1')
      dialog!.focus()
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const nodes = Array.from(dialog!.querySelectorAll<HTMLElement>(focusableSelector)).filter(el => !el.hasAttribute('disabled'))
        if (nodes.length === 0) {
          e.preventDefault()
          return
        }
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus()
      }
    }
  }, [open, onClose])

  if (!open) return null

  // For productized configurator we always surface the commercial title
  const displayedTitle = 'Diseña tu Proyecto'

  return (
    <div className={`pm-overlay open`} role="dialog" aria-modal="true" aria-label={displayedTitle} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="pm-dialog" ref={dialogRef} style={{maxWidth:980,margin:'18px auto'}}>
        <button className="pm-close" onClick={onClose} aria-label="Cerrar">✕</button>
        <h2 className="pm-title" style={{marginTop:6,marginBottom:10}}>{displayedTitle}</h2>
        <div className="pm-body">
          {children}
        </div>
      </div>
    </div>
  )
}
