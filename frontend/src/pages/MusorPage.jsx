import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import DatePill from '../components/ui/DatePill';
import Badge from '../components/ui/Badge';
import { getEventsWithPerformance } from '../lib/data-utils';

const calendarDays = [
  ['H', '22', true],
  ['K', '23', false],
  ['Sze', '24', false],
  ['Cs', '27', true],
  ['P', '03', true],
  ['Szo', '11', true],
  ['P', '17', true],
];

function MusorPage() {
  const schedule = getEventsWithPerformance();

  return (
    <>
      <PageHero
        eyebrow="Műsor"
        title="Közelgő események és repertoármozgás"
        description="A műsoroldal kártyás listát és naptárszerű vizuális blokkot is tartalmaz, így egyszerre informatív és prezentálható."
        meta="Az adatszerkezet már most backend-barát: minden esemény performanceId alapján kapcsolódik az előadásokhoz."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="surface p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-canvas/45">Naptárnézet</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {calendarDays.map(([weekday, day, active]) => (
                <div
                  key={`${weekday}-${day}`}
                  className={`rounded-[24px] border p-4 ${active ? 'border-gold/30 bg-gold/10 text-gold' : 'border-white/10 bg-white/5 text-canvas/45'}`}
                >
                  <p className="text-xs uppercase tracking-[0.22em]">{weekday}</p>
                  <p className="mt-4 text-3xl">{day}</p>
                  <p className="mt-2 text-sm">{active ? 'program' : 'szabad'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {schedule.map((event) => (
              <Card key={event.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <DatePill date={event.date} time={event.time} />
                  <Badge tone="warm">{event.ticketState}</Badge>
                </div>
                <h2 className="mt-5 text-3xl">{event.performance.title}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45">{event.venue}</p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-canvas/72">{event.lead}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {event.performance.tagIds.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default MusorPage;
