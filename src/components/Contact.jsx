import { COMPANY } from '../data/constants.js'
import './Contact.css'

function Contact() {
  return (
    <section id="contato" className="contact">
      <div className="container contact__inner">
        <div className="contact__stripes" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <h2>Vamos conversar sobre a sua empresa?</h2>
        <p>
          Fale agora com um consultor especializado e descubra a melhor solução de
          telecomunicações para o seu negócio.
        </p>

        <a
          href={COMPANY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp contact__whatsapp"
        >
          Falar no WhatsApp
        </a>

        <div className="contact__details">
          <a href={`tel:${COMPANY.phoneDigits}`}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
