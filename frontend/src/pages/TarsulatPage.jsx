import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { creators } from '../data';
import { getCreatorPerformances } from '../lib/data-utils';

function TarsulatPage() {
  return (
    <>
      <PageHero
        eyebrow="Társulat"
        title="Kis léptékű csapat, erős alkotói nyelv"
        description="Az Apertura olyan független társulatként működik, ahol a produkciók, közösségi programok és partneri együttműködések közös szemléletből születnek."
        meta="Később innen könnyen továbbléphet külön tagprofilokra, sajtóanyagokra vagy adminból kezelt társulati modulokra."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {creators.map((creator) => {
            const related = getCreatorPerformances(creator);

            return (
              <Card key={creator.id} className="cursor-pointer">
                <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-5">
                  <div className="aspect-[4/5] rounded-[18px] bg-gradient-to-br from-white/10 to-transparent p-4 text-sm text-canvas/40">
                    {creator.image}
                  </div>
                </div>
                <h2 className="mt-5 text-2xl">{creator.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45">{creator.role}</p>
                <p className="mt-4 text-sm leading-6 text-canvas/70">{creator.shortBio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {related.map((performance) => (
                    <Badge key={performance.id}>{performance.title}</Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export default TarsulatPage;
