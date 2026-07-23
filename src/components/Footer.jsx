import { COMPANY } from '../data/constants.js'
import logo from '../assets/logo.jpeg'
import './Footer.css'

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="Conexão CO" width="140" height="35" className="footer__logo" />
        <nav className="footer__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer__contact">
          <a href={`tel:${COMPANY.phoneDigits}`}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
        <p className="footer__copy">© {year} Conexão CO. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
