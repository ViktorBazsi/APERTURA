import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppShell({ children }) {
  return (
    <div className='min-h-screen bg-ink text-canvas'>
      <Header />
      <main className='pt-24'>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default AppShell;
