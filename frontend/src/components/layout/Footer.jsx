import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { siteMeta } from '../../content/site';

function Footer() {
  return (
    <footer className='border-t border-white/10 py-10'>
      <Container>
        <div className='grid gap-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[1.3fr_1fr_1fr]'>
          <div>
            <Logo compact />
            <p className='mt-3 max-w-md text-sm leading-6 text-canvas/70'>{siteMeta.description}</p>
          </div>
          <div>
            <p className='text-sm uppercase tracking-[0.24em] text-canvas/45'>Navigáció</p>
            <div className='mt-4 flex flex-col gap-3 text-sm text-canvas/70'>
              <Link to='/musor'>Műsor</Link>
              <Link to='/eloadasok'>Előadások</Link>
              <Link to='/tarsulat'>Társulat</Link>
            </div>
          </div>
          <div>
            <p className='text-sm uppercase tracking-[0.24em] text-canvas/45'>Kapcsolat</p>
            <div className='mt-4 space-y-3 text-sm text-canvas/70'>
              <p>{siteMeta.contact.address}</p>
              <p>{siteMeta.contact.email}</p>
              <p>{siteMeta.contact.phone}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;