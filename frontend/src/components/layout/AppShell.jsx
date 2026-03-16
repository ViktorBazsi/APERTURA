import Header from './Header';
import Footer from './Footer';

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-ink text-canvas">
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export default AppShell;
