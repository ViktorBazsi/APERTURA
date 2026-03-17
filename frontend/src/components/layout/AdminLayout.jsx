import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header';
import Container from '../ui/Container';
import { useAuth } from '../../context/AuthContext';

const items = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/creators', label: 'Alkotók' },
  { to: '/admin/performances', label: 'Előadások' },
  { to: '/admin/events', label: 'Események' },
  { to: '/admin/news', label: 'Hírek' },
  { to: '/admin/critiques', label: 'Kritikák' },
  { to: '/admin/documents', label: 'Dokumentumok' },
];

function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className='min-h-screen bg-[#090909] text-canvas'>
      <Header />
      <div className='pb-16 pt-28 md:pt-32'>
        <Container>
          <div className='grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8'>
            <aside className='surface h-fit p-5 md:p-6'>
              <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>Admin</p>
              <h1 className='mt-3 editorial-title text-3xl'>Szerkesztői felület</h1>
              <p className='mt-3 text-sm leading-6 text-canvas/62'>{user?.email}</p>
              <nav className='mt-6 grid gap-2'>
                {items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    className={({ isActive }) => `rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-ember text-white shadow-glow' : 'text-canvas/68 hover:bg-white/6 hover:text-canvas'}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </aside>
            <main className='min-w-0'>
              <Outlet />
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminLayout;