import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import AdminLayout from './components/layout/AdminLayout';
import AdminRoute from './components/routing/AdminRoute';
import ProtectedRoute from './components/routing/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import MusorPage from './pages/MusorPage';
import TarsulatPage from './pages/TarsulatPage';
import CreatorDetailPage from './pages/CreatorDetailPage';
import EloadasokPage from './pages/EloadasokPage';
import PerformanceDetailPage from './pages/PerformanceDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import ProfilePage from './pages/ProfilePage';
import StudioPage from './pages/StudioPage';
import CucliPage from './pages/CucliPage';
import TeremberletPage from './pages/TeremberletPage';
import KapcsolatPage from './pages/KapcsolatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminCreatorsPage from './pages/admin/AdminCreatorsPage';
import AdminPerformancesPage from './pages/admin/AdminPerformancesPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminCritiquesPage from './pages/admin/AdminCritiquesPage';
import AdminDocumentsPage from './pages/admin/AdminDocumentsPage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/musor' element={<MusorPage />} />
        <Route path='/tarsulat' element={<TarsulatPage />} />
        <Route path='/tarsulat/:slug' element={<CreatorDetailPage />} />
        <Route path='/eloadasok' element={<EloadasokPage />} />
        <Route path='/eloadasok/:slug' element={<PerformanceDetailPage />} />
        <Route path='/news/:slug' element={<NewsDetailPage />} />
        <Route path='/dokumentumok' element={<DocumentsPage />} />
        <Route path='/studio' element={<StudioPage />} />
        <Route path='/cucli' element={<CucliPage />} />
        <Route path='/teremberlet' element={<TeremberletPage />} />
        <Route path='/kapcsolat' element={<KapcsolatPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/profil' element={<ProfilePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminDashboardPage />} />
          <Route path='/admin/creators' element={<AdminCreatorsPage />} />
          <Route path='/admin/performances' element={<AdminPerformancesPage />} />
          <Route path='/admin/events' element={<AdminEventsPage />} />
          <Route path='/admin/news' element={<AdminNewsPage />} />
          <Route path='/admin/critiques' element={<AdminCritiquesPage />} />
          <Route path='/admin/documents' element={<AdminDocumentsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;