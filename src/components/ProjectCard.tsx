type Props = {
  title: string
  excerpt?: string
  image?: string
}

export default function ProjectCard({ title, excerpt, image }: Props) {
  return (
    <article className="project-card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      {excerpt && <p>{excerpt}</p>}
    </article>
  )
}
