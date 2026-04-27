type Member = { name: string; role: string }

const team: Member[] = [
  { name: 'María Pérez', role: 'Arquitecta principal' },
  { name: 'Juan González', role: 'Project manager' }
]

export default function Team() {
  return (
    <section id="team" className="container team">
      <div className="content">
        <h2>Equipo</h2>
        <div className="team-grid">
          {team.map((m) => (
            <div key={m.name} className="member">
              <div className="avatar" />
              <h4>{m.name}</h4>
              <small>{m.role}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
