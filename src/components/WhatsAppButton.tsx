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
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
        <path fill="currentColor" d="M20.52 3.48A11.65 11.65 0 0 0 12 0C5.373 0 .028 5.344.028 11.97c0 2.107.55 4.172 1.6 5.99L0 24l6.24-1.64A11.9 11.9 0 0 0 12 23.94c6.627 0 11.972-5.344 11.972-11.97a11.8 11.8 0 0 0-3.452-8.5Zm-8.28 17.23a9.3 9.3 0 0 1-4.95-1.35l-.35-.21-3.7.97.98-3.58-.23-.36A9.45 9.45 0 0 1 2.5 12.01c0-5.12 4.16-9.28 9.28-9.28 2.48 0 4.8.97 6.55 2.72a9.17 9.17 0 0 1 2.72 6.53c0 5.12-4.16 9.28-9.28 9.28Zm5.15-6.62c-.28-.14-1.65-.82-1.9-.92-.25-.1-.43-.14-.62.15-.19.28-.73.92-.9 1.12-.18.19-.36.21-.63.07-.27-.14-1.1-.4-2.1-1.31-.78-.69-1.3-1.54-1.45-1.85-.15-.31-.01-.47.13-.62.14-.14.32-.36.49-.54.16-.18.2-.3.3-.48.1-.18.05-.32-.02-.45-.07-.13-.65-1.4-.88-1.9-.23-.48-.44-.42-.62-.43l-.53-.01c-.2 0-.52.07-.8.37s-1.05 1-1.05 2.46c0 1.46 1.02 2.75 1.17 2.95.15.21 2 3.08 4.83 4.32 0 0 .31.13.56.06.24-.07 1.65-.6 1.88-1.19.23-.59.23-1.12.16-1.23-.08-.11-.27-.18-.56-.31Z"/>
      </svg>
    </a>
  )
}
