import { COMPANY } from '../data/constants.js'
import { NAV_LINKS } from '../data/nav.js'
import logo from '../assets/logo.jpeg'
import { PhoneIcon, MailIcon } from './icons.jsx'
import './Footer.css'

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
          <a href={`tel:${COMPANY.phoneDigits}`} className="footer__contact-item">
            <PhoneIcon />
            {COMPANY.phoneDisplay}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="footer__contact-item">
            <MailIcon />
            {COMPANY.email}
          </a>
        </div>
        <p className="footer__copy">
          ©{' '}
          <a href="https://www.figcodes.tech/" target="_blank" rel="noopener noreferrer">
            Figcodes Soluções
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
