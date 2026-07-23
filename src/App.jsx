import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Hero from './components/Hero.jsx'
import Solutions from './components/Solutions.jsx'
import About from './components/About.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
      </main>
      <WhatsAppFloatButton />
    </>
  )
}

export default App
