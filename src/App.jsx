import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/Home/HomePage';
import AspirasiPage from './pages/Aspirasi/AspirasiPage';
import TransparansiPage from './pages/Aspirasi/TransparansiPage';
import KabarPage from './pages/Kabar/KabarPage';
import KabarDetailPage from './pages/Kabar/KabarDetailPage';
import RekamJejakPage from './pages/RekamJejak/RekamJejakPage';
import RelawanPage from './pages/Relawan/RelawanPage';
import SettingsPage from './pages/Settings/SettingsPage';
import './App.css';

function ThemeLoader() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('web-politisi-theme');
    if (savedTheme && savedTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <ThemeLoader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aspirasi" element={<AspirasiPage />} />
          <Route path="/aspirasi/transparansi" element={<TransparansiPage />} />
          <Route path="/kabar" element={<KabarPage />} />
          <Route path="/kabar/:slug" element={<KabarDetailPage />} />
          <Route path="/rekam-jejak" element={<RekamJejakPage />} />
          <Route path="/relawan" element={<RelawanPage />} />
          <Route path="/pengaturan-tampilan-rs" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
