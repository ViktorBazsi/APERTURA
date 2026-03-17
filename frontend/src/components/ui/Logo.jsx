import { Link } from 'react-router-dom';

function Logo({ to = '/', compact = false }) {
  return (
    <Link to={to} className='flex items-center gap-3'>
      <div className='flex h-11 w-11 items-center justify-center rounded-full border border-ember/40 bg-ember/10 font-display text-lg uppercase text-gold'>
        A
      </div>
      {!compact ? (
        <div>
          <p className='editorial-title text-lg leading-none'>Apertura</p>
          <p className='text-xs uppercase tracking-[0.28em] text-canvas/50'>framed placeholder</p>
        </div>
      ) : null}
    </Link>
  );
}

export default Logo;
