import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>© {new Date().getFullYear()} DM-A Arquitectos</div>
        <div>
          Tel: +56 9 9078 4222 • +56 9 9299 8255 • contacto@dm-a.cl
        </div>
      </div>
    </footer>
  )
}
