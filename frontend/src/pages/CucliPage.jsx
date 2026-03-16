import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ButtonLink from '../components/ui/ButtonLink';
import Badge from '../components/ui/Badge';

const cucliBlocks = [
  {
    title: 'Nyitott műhelyek',
    text: 'Játékos formákon keresztül vezetnek be a közös alkotásba. Jó belépési pont új nézőknek és fiatal alkotóknak.',
  },
  {
    title: 'Mini-események',
    text: 'Kisebb léptékű jelenetek, felolvasások, hangkísérletek és rövid performatív helyzetek váltják egymást.',
  },
  {
    title: 'Közösségi fókusz',
    text: 'A Cucli egyszerre program és hangulat: lazább, de nem könnyelmű, hozzáférhető, mégis igényes.',
  },
];

function CucliPage() {
  return (
    <>
      <PageHero
        eyebrow="Cucli"
        title="Kísérletező, játékos, közösségi oldalszál"
        description="A Cucli külön márkahangsúlyt kap, vizuálisan frissebb tónusokkal, de a teljes oldallal összhangban marad."
        meta="Később önálló aloldalakkal, eseménynaptárral vagy közösségi jelentkezési folyamatokkal bővíthető."
      />

      <Section>
        <div className="rounded-[36px] border border-gold/20 bg-gradient-to-br from-gold/15 via-transparent to-ember/10 p-8 md:p-10">
          <Badge tone="gold">Brand extension</Badge>
          <p className="editorial-title mt-6 max-w-3xl text-4xl md:text-5xl">
            Olyan felület, amely fiatalabb és nyitottabb belépést kínál a társulat világába.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/kapcsolat">Kapcsolatfelvétel</ButtonLink>
            <ButtonLink to="/musor" variant="secondary">Közelgő programok</ButtonLink>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {cucliBlocks.map((block) => (
            <Card key={block.title} className="bg-white/[0.04]">
              <h2 className="text-2xl">{block.title}</h2>
              <p className="mt-4 text-sm leading-7 text-canvas/72">{block.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

export default CucliPage;
