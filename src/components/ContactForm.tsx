export default function ContactForm() {
  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        <input name="name" placeholder="Nombre" required />
        <input name="email" placeholder="Email" type="email" required />
      </div>
      <input name="subject" placeholder="Asunto" />
      <textarea name="message" placeholder="Mensaje" rows={5} required />
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button className="btn" type="submit">Enviar</button>
      </div>
    </form>
  )
}
