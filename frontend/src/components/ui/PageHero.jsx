import Container from './Container';
import Badge from './Badge';

function PageHero({ eyebrow, title, description, meta }) {
  return (
    <section className="pb-6 pt-4 md:pb-10">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-12">
          <Badge tone="gold">{eyebrow}</Badge>
          <h1 className="editorial-title mt-6 max-w-4xl text-5xl leading-none md:text-7xl">{title}</h1>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
            <p className="max-w-2xl text-lg leading-8 text-canvas/75">{description}</p>
            {meta ? <div className="surface p-5 text-sm leading-6 text-canvas/70">{meta}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
