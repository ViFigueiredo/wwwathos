import './About.css'

const HIGHLIGHTS = [
  'Atuação nacional',
  'Atendimento consultivo',
  'Do contrato ao pós-venda',
  'Soluções sob medida',
]

function About() {
  return (
    <section id="sobre" className="about">
      <div className="container">
        <h2 className="section-title">
          <span className="accent-mini">
            <span />
            <span />
          </span>
          Sobre a Conexão CO
        </h2>

        <div className="about__content">
          <p>
            Somos um parceiro nacional especializado em soluções corporativas de
            telecomunicações, com foco em telefonia móvel corporativa e fibra óptica
            empresarial.
          </p>
          <p>
            Atuamos exclusivamente no mercado B2B, atendendo empresas de todos os
            portes e segmentos em todo o território nacional — da indústria ao
            comércio, de prestadores de serviço ao agronegócio — com o objetivo de
            oferecer conectividade, mobilidade e comunicação que impulsionam a
            produtividade e o crescimento dos nossos clientes.
          </p>
          <p>
            Nosso diferencial está no atendimento consultivo, na agilidade dos
            processos e no acompanhamento completo, desde a contratação até o
            pós-venda.
          </p>
        </div>

        <div className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <div key={item} className="about__highlight">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
