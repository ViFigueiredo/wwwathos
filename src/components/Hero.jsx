import { COMPANY } from '../data/constants.js'
import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1>Conectividade e mobilidade corporativa para sua empresa crescer</h1>
          <p>
            Parceiro nacional especializado em soluções corporativas de telecomunicações.
            Atendimento consultivo, do contrato ao pós-venda, em todo o território nacional.
          </p>
          <div className="hero__actions">
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Fale com um consultor
            </a>
            <a href="#solucoes" className="btn btn-outline">
              Conheça as soluções
            </a>
          </div>
        </div>
        <div className="hero__accent" aria-hidden="true">
          <div className="hero__stripes">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
