import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  )
}

export default App
