import ButtonLink from '../ui/ButtonLink';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

function HeroSection() {
  return (
    <section className="pb-12 pt-6 md:pb-16 md:pt-10">
      <Container>
        <div className="grid gap-6 overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <Badge tone="warm">Budapesti független színház</Badge>
            <h1 className="editorial-title mt-6 max-w-4xl text-5xl leading-[0.95] md:text-7xl">
              Kortárs előadások, közeli terek, nyitott alkotói jelenlét.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-canvas/72">
              Az Apertura olyan társulat, ahol a színpadi forma, a városi közeg és a közösségi figyelem egymást erősítik. Új repertoár, műhelyek és bérelhető tér egy karakteres, mai vizuális nyelven.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/musor" size="lg">Közelgő műsor</ButtonLink>
              <ButtonLink to="/eloadasok" variant="secondary" size="lg">Repertoár megnyitása</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:pl-10">
            <div className="surface bg-gradient-to-br from-ember/20 to-transparent p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-canvas/45">Évadfókusz</p>
              <p className="mt-3 editorial-title text-3xl">Közelség, városi emlékezet, jelenlét</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="surface p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-canvas/45">2026 tavasz</p>
                <p className="mt-2 text-3xl text-gold">5</p>
                <p className="mt-2 text-sm text-canvas/70">aktív produkció és közösségi program</p>
              </div>
              <div className="surface p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-canvas/45">Nyitott tér</p>
                <p className="mt-2 text-3xl text-ember">120 m²</p>
                <p className="mt-2 text-sm text-canvas/70">próbákra, workshopokra és kis eseményekre</p>
              </div>
            </div>
            <div className="rounded-[28px] border border-gold/15 bg-canvas px-6 py-8 text-ink">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/45">Pályázati fókusz</p>
              <p className="mt-3 font-display text-3xl">Megmutatható, tiszta és bővíthető frontend alap.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
