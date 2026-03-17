import Container from './Container';

function Section({ eyebrow, title, description, children, className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        {eyebrow || title || description ? (
          <div className='mb-10 max-w-3xl md:mb-14'>
            {eyebrow ? <p className='mb-4 text-xs uppercase tracking-[0.32em] text-canvas/42'>{eyebrow}</p> : null}
            {title ? <h2 className='editorial-title text-4xl leading-[1.02] md:text-6xl'>{title}</h2> : null}
            {description ? <p className='mt-5 max-w-2xl text-base leading-8 text-canvas/68 md:text-lg'>{description}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export default Section;