import { COMPANY } from '../data/constants.js'
import { SOLUTIONS } from '../data/solutions.js'
import SolutionCard from './SolutionCard.jsx'
import './Solutions.css'

function Solutions() {
  return (
    <section id="solucoes" className="solutions">
      <div className="container">
        <h2 className="section-title">
          <span className="accent-mini">
            <span />
            <span />
          </span>
          Nossas soluções
        </h2>

        <div className="solutions__grid">
          {SOLUTIONS.map((solution) => (
            <SolutionCard
              key={solution.id}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
            />
          ))}
        </div>

        <div className="solutions__cta">
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Solicitar proposta
          </a>
        </div>
      </div>
    </section>
  )
}

export default Solutions
