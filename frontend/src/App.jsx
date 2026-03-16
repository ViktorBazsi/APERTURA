import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LandingPage from './pages/LandingPage';
import MusorPage from './pages/MusorPage';
import TarsulatPage from './pages/TarsulatPage';
import EloadasokPage from './pages/EloadasokPage';
import CucliPage from './pages/CucliPage';
import TeremberletPage from './pages/TeremberletPage';
import KapcsolatPage from './pages/KapcsolatPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/musor" element={<MusorPage />} />
        <Route path="/tarsulat" element={<TarsulatPage />} />
        <Route path="/eloadasok" element={<EloadasokPage />} />
        <Route path="/cucli" element={<CucliPage />} />
        <Route path="/teremberlet" element={<TeremberletPage />} />
        <Route path="/kapcsolat" element={<KapcsolatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
