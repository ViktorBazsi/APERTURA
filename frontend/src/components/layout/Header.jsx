import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from '../ui/Container';
import ButtonLink from '../ui/ButtonLink';
import Logo from '../ui/Logo';

const primaryNavigation = [
  { to: '/musor', label: 'Műsor' },
  { to: '/eloadasok', label: 'Előadások' },
  { to: '/tarsulat', label: 'Társulat' },
  { to: '/dokumentumok', label: 'Dokumentumok' },
];

const secondaryNavigation = [
  { to: '/studio', label: 'Stúdió' },
  { to: '/cucli', label: 'Cucli' },
  { to: '/teremberlet', label: 'Terembérlet' },
  { to: '/kapcsolat', label: 'Kapcsolat' },
];

function navClass({ isActive }) {
  return isActive ? 'text-canvas' : 'text-canvas/62 transition hover:text-canvas';
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  const displayName = useMemo(() => {
    if (!user) {
      return '';
    }

    return user.firstName || user.lastName || user.email?.split('@')[0] || '';
  }, [user]);

  useEffect(() => {
    if (!isOpen) {
      setIsMoreOpen(false);
    }
  }, [isOpen]);

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <Container>
        <div className='mt-4 flex items-center justify-between gap-4 rounded-full border border-white/10 bg-ink/78 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-5 lg:px-6'>
          <div className='flex min-w-0 items-center gap-4'>
            <Logo />
            {isAuthenticated && displayName ? <p className='hidden whitespace-nowrap text-sm text-canvas/56 xl:block'>Szia, <span className='text-canvas'>{displayName}</span>!</p> : null}
          </div>

          <nav className='hidden items-center gap-6 lg:flex'>
            {primaryNavigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}

            <div className='relative'>
              <button
                type='button'
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${isMoreOpen ? 'bg-white/8 text-canvas' : 'text-canvas/62 hover:text-canvas'}`}
                onClick={() => setIsMoreOpen((value) => !value)}
              >
                Több
                <span className={`text-[10px] transition ${isMoreOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {isMoreOpen ? (
                <div className='absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-[24px] border border-white/10 bg-[#101010]/96 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl'>
                  {secondaryNavigation.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => `flex rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/10 text-canvas' : 'text-canvas/68 hover:bg-white/6 hover:text-canvas'}`}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className='hidden items-center gap-2 lg:flex'>
            {isAuthenticated && displayName ? <span className='rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-canvas/68 xl:hidden'>Szia, {displayName}!</span> : null}
            {isAuthenticated ? <ButtonLink to='/profil' variant='secondary' size='sm'>Profil</ButtonLink> : <ButtonLink to='/login' variant='secondary' size='sm'>Belépés</ButtonLink>}
            {isAdmin ? <ButtonLink to='/admin' variant='ghost' size='sm' className='border border-white/10 bg-white/[0.04] px-4 text-canvas/78 hover:bg-white/[0.08] hover:text-canvas'>Admin</ButtonLink> : null}
            {isAuthenticated ? <button type='button' className='rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600' onClick={logout}>Kilépés</button> : null}
          </div>

          <button type='button' className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-canvas lg:hidden' onClick={() => setIsOpen((value) => !value)} aria-label='Menü megnyitása'>
            <span className='space-y-1.5'>
              <span className='block h-0.5 w-5 bg-current' />
              <span className='block h-0.5 w-5 bg-current' />
              <span className='block h-0.5 w-5 bg-current' />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className='surface mt-3 p-4 sm:p-5 lg:hidden'>
            {isAuthenticated && displayName ? <div className='mb-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-canvas/72'>Szia, <span className='text-canvas'>{displayName}</span>!</div> : null}
            <nav className='grid gap-2'>
              {[...primaryNavigation, ...secondaryNavigation].map((item) => (
                <NavLink key={item.to} to={item.to} className='rounded-2xl px-4 py-3 text-canvas/78 hover:bg-white/5 hover:text-canvas' onClick={() => setIsOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
              {isAuthenticated ? <NavLink to='/profil' className='rounded-2xl px-4 py-3 text-canvas/78 hover:bg-white/5 hover:text-canvas' onClick={() => setIsOpen(false)}>Profil</NavLink> : <NavLink to='/login' className='rounded-2xl px-4 py-3 text-canvas/78 hover:bg-white/5 hover:text-canvas' onClick={() => setIsOpen(false)}>Belépés</NavLink>}
              {isAdmin ? <NavLink to='/admin' className='rounded-2xl px-4 py-3 text-canvas/78 hover:bg-white/5 hover:text-canvas' onClick={() => setIsOpen(false)}>Admin</NavLink> : null}
              {isAuthenticated ? <button type='button' className='rounded-2xl bg-red-500 px-4 py-3 text-left text-sm font-medium text-white hover:bg-red-600' onClick={() => { setIsOpen(false); logout(); }}>Kilépés</button> : null}
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

export default Header;