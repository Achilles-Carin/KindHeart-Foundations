import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}