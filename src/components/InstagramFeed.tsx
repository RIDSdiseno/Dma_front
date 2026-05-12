import type { ReactElement } from 'react'

const INSTAGRAM_USER = 'dm_arq'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USER}/`

export default function InstagramFeed(): ReactElement {
  return (
    <section id="instagram" className="container instagram-section">
      <div className="content centered">
        <h2 className="section-title">Lo que estamos haciendo</h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <iframe
            src={`https://www.instagram.com/${INSTAGRAM_USER}/embed`}
            width="400"
            height="480"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            title="Instagram @dm_arq"
            style={{ border: 'none', maxWidth: '100%', borderRadius: 12 }}
          />
        </div>

        <p style={{ textAlign: 'center', maxWidth: 400, margin: '14px auto 0', color: 'var(--muted)', fontSize: 13 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            @{INSTAGRAM_USER}
          </a>
          {' '}— proyectos en proceso, detalles y obra.
        </p>
      </div>
    </section>
  )
}
