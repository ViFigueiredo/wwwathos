import { ICONS } from './icons.jsx'
import './SolutionCard.css'

function SolutionCard({ title, description, icon }) {
  const Icon = ICONS[icon]

  return (
    <div className="solution-card">
      <div className="solution-card__icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default SolutionCard
