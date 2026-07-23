import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../data/constants.js'
import { NAV_LINKS } from '../data/nav.js'
import logo from '../assets/logo.jpeg'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/#inicio" className="header__logo" onClick={handleNavClick}>
          <img src={logo} alt="Conexão CO" width="160" height="40" />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={handleNavClick}>
              {link.label}
            </Link>
          ))}
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp header__cta"
          >
            Fale conosco
          </a>
        </nav>

        <button
          className="header__toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
