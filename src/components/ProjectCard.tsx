type Props = {
  title: string
  excerpt?: string
  image?: string
  onClick?: () => void
}

import type { ReactElement } from 'react'

export default function ProjectCard({ title, excerpt, image, onClick }: Props): ReactElement {
  return (
    <article className="project-card" role="button" tabIndex={0} onClick={onClick} onKeyDown={(e) => { if (e.key === 'Enter') onClick?.() }}>
      {image && <img src={image} alt={title} />}
      <div className="card-body">
        <h3>{title}</h3>
        {excerpt && <p>{excerpt}</p>}
      </div>
    </article>
  )
}
