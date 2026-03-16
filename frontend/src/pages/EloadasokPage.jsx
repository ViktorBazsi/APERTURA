import { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ButtonLink from '../components/ui/ButtonLink';
import Modal from '../components/ui/Modal';
import DatePill from '../components/ui/DatePill';
import { performances } from '../data';
import { getEventsWithPerformance, getPerformanceCast } from '../lib/data-utils';

function EloadasokPage() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedPerformance = performances.find((item) => item.id === selectedId);
  const relatedEvents = getEventsWithPerformance().filter((event) => event.performanceId === selectedId);
  const cast = selectedPerformance ? getPerformanceCast(selectedPerformance) : [];

  return (
    <>
      <PageHero
        eyebrow="Előadások"
        title="Összekötött repertoárlogika"
        description="Az előadások kapcsolódnak a műsorhoz és a társulati tagokhoz, így a frontend már most rendszerszinten mutatható."
        meta="A részletes nézet egy egyszerű modalban jelenik meg, de a struktúra később külön route-os adatlapokra is átemelhető."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {performances.map((performance) => (
            <Card key={performance.id}>
              <div className="aspect-[4/3] rounded-[24px] border border-dashed border-white/15 bg-gradient-to-br from-white/10 to-transparent p-5 text-sm text-canvas/40">
                {performance.visual}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <Badge tone="gold">{performance.genre}</Badge>
                <span className="text-sm text-canvas/45">{performance.status}</span>
              </div>
              <h2 className="mt-4 text-3xl">{performance.title}</h2>
              <p className="mt-4 text-sm leading-6 text-canvas/70">{performance.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {performance.tagIds.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <button
                type="button"
                className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-canvas hover:bg-white/10"
                onClick={() => setSelectedId(performance.id)}
              >
                Részletes nézet
              </button>
            </Card>
          ))}
        </div>
      </Section>

      <Modal open={Boolean(selectedPerformance)} onClose={() => setSelectedId(null)}>
        {selectedPerformance ? (
          <div>
            <Badge tone="gold">{selectedPerformance.genre}</Badge>
            <h2 className="editorial-title mt-5 text-5xl">{selectedPerformance.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-canvas/72">{selectedPerformance.longDescription}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="surface p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-canvas/45">Kapcsolódó alkotók</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cast.map((creator) => (
                    <Badge key={creator.id}>{creator.name}</Badge>
                  ))}
                </div>
              </div>
              <div className="surface p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-canvas/45">Közelgő időpontok</p>
                <div className="mt-4 space-y-3">
                  {relatedEvents.map((event) => (
                    <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <DatePill date={event.date} time={event.time} />
                      <p className="mt-3 text-sm text-canvas/70">{event.venue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <ButtonLink to="/musor">Műsor megnyitása</ButtonLink>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}

export default EloadasokPage;

