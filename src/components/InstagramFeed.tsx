import type { ReactElement } from 'react'
import { useEffect } from 'react'

const INSTAGRAM_URL = 'https://www.instagram.com/dm_arq/'

export default function InstagramFeed(): ReactElement {
  useEffect(() => {
    if (!(window as any).instgrm) {
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(s)
      s.onload = () => {
        ;(window as any).instgrm?.Embeds?.process()
      }
    } else {
      ;(window as any).instgrm?.Embeds?.process()
    }
  }, [])

  return (
    <section id="instagram" className="instagram-section">
      <div className="centered">
        <h2 className="section-title">Síguenos en Instagram</h2>
        <p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@dm_arq</a>
          {' '}— Arquitectura &amp; Diseño
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{
              background: 'transparent',
              border: 0,
              margin: 0,
              padding: 0,
              width: 540,
              maxWidth: '100%',
            }}
          >
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Ver perfil en Instagram
            </a>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
