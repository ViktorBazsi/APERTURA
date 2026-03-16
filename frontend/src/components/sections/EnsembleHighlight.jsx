import { Link } from 'react-router-dom';
import { creators } from '../../data';
import Section from '../ui/Section';
import Card from '../ui/Card';

function EnsembleHighlight() {
  return (
    <Section
      eyebrow="Társulat"
      title="Alkotók, akik nemcsak produkciókat, hanem közeget is építenek"
      description="A társulati oldal már most alkalmas arra, hogy később részletes profilokkal, adminból kezelt tartalmakkal bővüljön."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {creators.slice(0, 3).map((creator) => (
          <Card key={creator.id}>
            <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
              <div className="aspect-[4/5] rounded-[20px] border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm text-canvas/45">
                {creator.image}
              </div>
            </div>
            <h3 className="mt-5 text-2xl">{creator.name}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45">{creator.role}</p>
            <p className="mt-4 text-sm leading-6 text-canvas/70">{creator.shortBio}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/tarsulat" className="text-sm text-gold hover:text-canvas">Társulati oldal megnyitása</Link>
      </div>
    </Section>
  );
}

export default EnsembleHighlight;
