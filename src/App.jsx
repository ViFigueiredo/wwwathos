import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import WhatsAppFloatButton from './components/WhatsAppFloatButton.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </BrowserRouter>
  )
}

export default App
