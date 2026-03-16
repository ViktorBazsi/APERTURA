import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from '../ui/Container';
import ButtonLink from '../ui/ButtonLink';

const navigation = [
  { to: '/musor', label: 'Műsor' },
  { to: '/tarsulat', label: 'Társulat' },
  { to: '/eloadasok', label: 'Előadások' },
  { to: '/cucli', label: 'Cucli' },
  { to: '/teremberlet', label: 'Terembérlet' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
];

function navClass({ isActive }) {
  return isActive ? 'text-canvas' : 'text-canvas/70 hover:text-canvas';
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container>
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-ink/80 px-5 py-3 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ember/40 bg-ember/10 font-display text-lg uppercase text-gold">
              A
            </div>
            <div>
              <p className="editorial-title text-lg leading-none">Apertura</p>
              <p className="text-xs uppercase tracking-[0.28em] text-canvas/50">független társulat</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink to="/kapcsolat" variant="primary" size="sm">
              Egyeztessünk
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-canvas md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Menü megnyitása"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className="surface mt-3 p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="rounded-2xl px-4 py-3 text-canvas/80 hover:bg-white/5 hover:text-canvas"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <ButtonLink
                to="/kapcsolat"
                variant="primary"
                className="mt-2 justify-center"
                onClick={() => setIsOpen(false)}
              >
                Egyeztessünk
              </ButtonLink>
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

export default Header;
