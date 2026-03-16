import Container from './Container';

function Section({ eyebrow, title, description, children, className = '' }) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <Container>
        {eyebrow || title || description ? (
          <div className="mb-8 max-w-3xl">
            {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[0.28em] text-canvas/45">{eyebrow}</p> : null}
            {title ? <h2 className="editorial-title text-4xl leading-tight md:text-5xl">{title}</h2> : null}
            {description ? <p className="mt-4 text-base leading-7 text-canvas/70 md:text-lg">{description}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export default Section;
