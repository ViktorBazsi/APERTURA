import Container from './Container';
import Badge from './Badge';

function PageHero({ eyebrow, title, description, meta }) {
  return (
    <section className='pb-8 pt-6 md:pb-12 md:pt-8'>
      <Container>
        <div className='overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-transparent px-7 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.22)] md:px-10 md:py-12 lg:px-12 lg:py-14'>
          <Badge tone='gold'>{eyebrow}</Badge>
          <h1 className='editorial-title mt-6 max-w-4xl text-5xl leading-[0.94] md:text-7xl'>{title}</h1>
          <div className='mt-8 grid gap-6 md:grid-cols-[1.45fr_0.75fr] md:items-start'>
            <p className='max-w-2xl text-lg leading-8 text-canvas/72'>{description}</p>
            {meta ? <div className='surface p-5 text-sm leading-7 text-canvas/68'>{meta}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PageHero;