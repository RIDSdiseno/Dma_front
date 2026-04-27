import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

type Props = { children: React.ReactNode }

import type { ReactElement } from 'react'

export default function Layout({ children }: Props): ReactElement {
  return (
    <div className="site">
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
