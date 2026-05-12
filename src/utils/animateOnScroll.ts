export function initAnimations() {
  // Selector groups: each group staggers independently
  const GROUPS: string[] = [
    // Section headings
    '.fp-heading, .container h2, .section-title, .kicker, .services-hero',
    // Featured project cards
    '.fp-card',
    // Services accordion items
    '.accordion-item, .services-left',
    // Team members
    '.member-row',
    // Gallery
    '.gallery-carousel-section',
    // Contact callout
    '.contact-callout',
    // Quincho configurator panels
    '.quincho-left, .quincho-right',
    // Footer
    '.site-footer',
  ]

  const allNodes: HTMLElement[] = []

  GROUPS.forEach((selector) => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
    nodes.forEach((el, i) => {
      if (el.classList.contains('reveal')) return // already registered
      el.classList.add('reveal')
      // stagger siblings within same group
      el.style.transitionDelay = `${i * 0.12}s`
      allNodes.push(el)
    })
  })

  if (allNodes.length === 0) return

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
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )

  allNodes.forEach((el) => observer.observe(el))
}

export default initAnimations
