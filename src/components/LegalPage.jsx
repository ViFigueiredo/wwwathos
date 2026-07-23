import './LegalPage.css'

/**
 * Shared layout for legal/institutional text pages (Terms of Use,
 * Privacy Policy). Renders a title and prose content passed as children.
 */
function LegalPage({ title, updatedLabel, children }) {
  return (
    <section className="legal-page">
      <div className="container legal-page__inner">
        <h1 className="legal-page__title">{title}</h1>
        {updatedLabel && <p className="legal-page__updated">{updatedLabel}</p>}
        <div className="legal-page__content">{children}</div>
      </div>
    </section>
  )
}

export default LegalPage
