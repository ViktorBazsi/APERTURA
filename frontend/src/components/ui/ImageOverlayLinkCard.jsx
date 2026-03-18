import { Link } from 'react-router-dom';
import Badge from './Badge';

function ImageOverlayLinkCard({
  to,
  imageUrl,
  alt,
  title,
  subtitle,
  description,
  badge,
  meta,
  className = '',
  imagePosition = 'center',
  placeholder = 'Vizuál hamarosan',
}) {
  return (
    <Link
      to={to}
      className={`group relative block min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-white/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className='absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]'
          style={{ objectPosition: imagePosition }}
        />
      ) : (
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,193,107,0.15),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]' />
      )}

      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.12)_0%,rgba(7,7,7,0.34)_42%,rgba(7,7,7,0.92)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(7,7,7,0.1)_0%,rgba(7,7,7,0.28)_36%,rgba(7,7,7,0.9)_100%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.05)_38%,rgba(0,0,0,0.72)_100%)] md:opacity-70 md:transition md:duration-300 md:group-hover:opacity-100' />

      <div className='relative flex h-full min-h-[420px] flex-col justify-end p-5 sm:p-6'>
        <div className='flex flex-wrap items-center justify-between gap-2 opacity-100 transition duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100'>
          {badge ? <Badge tone='gold'>{badge}</Badge> : <span />}
          {meta ? <span className='text-xs uppercase tracking-[0.22em] text-canvas/62'>{meta}</span> : null}
        </div>

        <div className='mt-4 rounded-[26px] border border-white/10 bg-black/28 p-4 backdrop-blur-md transition duration-300 md:translate-y-3 md:bg-black/22 md:opacity-88 md:group-hover:translate-y-0 md:group-hover:bg-black/34 md:group-hover:opacity-100'>
          {subtitle ? <p className='text-xs uppercase tracking-[0.24em] text-canvas/55'>{subtitle}</p> : null}
          <h3 className='mt-2 editorial-title text-3xl leading-[1.02] text-white'>{title}</h3>
          {description ? <p className='mt-3 line-clamp-3 text-sm leading-6 text-canvas/76'>{description}</p> : null}
          {!imageUrl ? <p className='mt-3 text-sm leading-6 text-canvas/52'>{placeholder}</p> : null}
        </div>
      </div>
    </Link>
  );
}

export default ImageOverlayLinkCard;