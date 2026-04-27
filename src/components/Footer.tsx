import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>© {new Date().getFullYear()} DM-A Arquitectos</div>
        <div>
          Tel: <a href="tel:+56990784222">+56 9 9078 4222</a> • <a href="tel:+56992998255">+56 9 9299 8255</a> • <a href="mailto:contacto@dm-a.cl">contacto@dm-a.cl</a>
        </div>
      </div>
    </footer>
  )
}
