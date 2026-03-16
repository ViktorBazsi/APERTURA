import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Card from '../ui/Card';
import DatePill from '../ui/DatePill';
import Badge from '../ui/Badge';
import { getEventsWithPerformance } from '../../lib/data-utils';

function EventsShowcase({ limit }) {
  const items = getEventsWithPerformance().slice(0, limit ?? 10);

  return (
    <Section
      eyebrow="Műsor"
      title="Közelgő előadások"
      description="A műsoroldal és az előadás-adatok ugyanarra az adatmodellre épülnek, így a későbbi backendesítés egyenes vonalban folytatható."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((event) => (
          <Card key={event.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <DatePill date={event.date} time={event.time} />
              <Badge tone="warm">{event.ticketState}</Badge>
            </div>
            <h3 className="mt-5 text-3xl font-medium">{event.performance.title}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-canvas/40">{event.venue}</p>
            <p className="mt-4 text-base leading-7 text-canvas/70">{event.lead}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-sm text-canvas/55">{event.performance.genre}</span>
              <Link to="/eloadasok" className="text-sm text-gold hover:text-canvas">Részletek</Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default EventsShowcase;
