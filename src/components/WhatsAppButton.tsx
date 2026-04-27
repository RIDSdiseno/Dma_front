import React from 'react'

const PHONE = '+56992998255'
const MESSAGE = 'Hola, me gustaría solicitar información sobre sus servicios.'
const WA_LINK = `https://wa.me/${PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(MESSAGE)}`

export default function WhatsAppButton(): JSX.Element {
  return (
    <a
      className="whatsapp-fab"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.866-2.03-.966-.273-.099-.472-.149-.672.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.392-1.475-.885-.788-1.48-1.761-1.65-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.173.2-.297.3-.495.099-.198.05-.372-.025-.52-.075-.149-.672-1.612-.92-2.21-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487 0 0 .33.142.59.072.255-.07 1.758-.715 2.006-1.407.248-.693.248-1.287.173-1.407-.074-.12-.272-.198-.57-.347z" fill="currentColor" />
      </svg>
    </a>
  )
}
