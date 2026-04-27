export function initAnimations() {
  const selectors = [
    '.hero-inner',
    '.hero-inner h1, .hero-inner p',
    '.projects-grid > *',
    '.project-card',
    '.service-card',
    '.gallery-grid img',
    '.member',
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
