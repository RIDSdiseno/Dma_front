export function initAnimations() {
  // Split hero title into lines -> words -> chars for staggered animation
  const heroTitles = Array.from(document.querySelectorAll('.hero-inner h1')) as HTMLElement[]
  heroTitles.forEach((h) => {
    // avoid re-splitting
    if (h.querySelector('.char')) return

    // If title has explicit lines (.h-line), split each line separately
    const lines = Array.from(h.querySelectorAll('.h-line')) as HTMLElement[]
    if (lines.length) {
      lines.forEach((lineEl) => {
        const text = lineEl.textContent || ''
        lineEl.textContent = ''

        const words = text.split(' ')
        words.forEach((word, wi) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'word'
          // create char spans inside the word
          Array.from(word).forEach((ch, i) => {
            const span = document.createElement('span')
            span.className = 'char'
            span.textContent = ch
            span.style.transitionDelay = `${(i + 1 + wi * 4) * 0.04}s`
            wordSpan.appendChild(span)
          })
          lineEl.appendChild(wordSpan)
          // add a normal text node space between words so browser can break lines
          if (wi < words.length - 1) lineEl.appendChild(document.createTextNode(' '))
        })
      })
    } else {
      // fallback: split whole h text into chars
      const text = h.textContent || ''
      h.textContent = ''
      const frag = document.createDocumentFragment()
      Array.from(text).forEach((ch, i) => {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.transitionDelay = `${(i + 1) * 0.04}s`
        frag.appendChild(span)
      })
      h.appendChild(frag)
    }
  })

  const selectors = [
    '.hero-inner',
    '.hero-bg',
    '.hero-inner h1, .hero-inner p',
    '.hero-inner a, .hero-inner button',
    '.projects-grid > *',
    '.project-card',
    '.service-card',
    '.gallery-grid img',
    '.contact-form',
  ]

  const nodes = Array.from(document.querySelectorAll(selectors.join(','))) as HTMLElement[]

  // Mark elements as revealable
  nodes.forEach((el, i) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal')
    // add small stagger if no explicit delay
    if (!el.dataset.animateDelay) el.style.transitionDelay = `${Math.min(0.06 * i, 0.6)}s`
  })

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('animated')
          obs.unobserve(el)
        }
      })
    },
    { threshold: 0.12 }
  )

  nodes.forEach((el) => observer.observe(el))
}

export default initAnimations
