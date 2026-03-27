import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import DatePill from '../components/ui/DatePill';
import Badge from '../components/ui/Badge';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar';
import { eventService } from '../services/event.service';

const uiText = {
  eyebrow: 'M\u0171sor',
  title: 'K\u00f6zelg\u0151 esem\u00e9nyek \u00e9s reperto\u00e1rmozg\u00e1s',
  description: 'A havi napt\u00e1r \u00e9s az aznapi esem\u00e9nylista egy\u00fctt mutatja az Apert\u00fara mozg\u00e1s\u00e1t.',
  meta: 'A kijel\u00f6lt nap esem\u00e9nyei k\u00fcl\u00f6n blokkban jelennek meg, onnan k\u00f6zvetlen\u00fcl tov\u00e1bb lehet l\u00e9pni az el\u0151ad\u00e1s adatlapj\u00e1ra.',
  selectedDayEyebrow: 'Esem\u00e9nyek ezen a napon',
  selectDay: 'V\u00e1lassz napot a napt\u00e1rb\u00f3l',
  openPerformance: 'El\u0151ad\u00e1s adatlap megnyit\u00e1sa',
  noPerformanceToday: 'Erre a napra jelenleg nincs m\u0171soron el\u0151ad\u00e1s.',
  tapDay: 'Koppints vagy kattints egy napra, \u00e9s itt megjelennek az aznapi esem\u00e9nyek.',
  performanceLabel: 'El\u0151ad\u00e1s',
  ticketForDate: 'Jegy erre az id\u0151pontra',
  openPerformanceCard: 'El\u0151ad\u00e1s adatlap',
  noEventsThisMonth: 'Ebben a h\u00f3napban m\u00e9g nincs esem\u00e9ny.',
};

function eventDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatHumanDate(dateKey) {
  if (!dateKey) {
    return '';
  }

  return new Date(`${dateKey}T12:00:00`).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

function MusorPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState(() => new Date());
  const [selectedDayKey, setSelectedDayKey] = useState('');

  useEffect(() => {
    eventService.list()
      .then((items) => {
        setEvents(items);
        if (items[0]?.startAt) {
          const firstDate = new Date(items[0].startAt);
          const key = eventDateKey(firstDate);
          setActiveMonth(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
          setSelectedDayKey(key);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const monthEvents = useMemo(() => {
    return events.filter((event) => {
      const date = new Date(event.startAt);
      return date.getFullYear() === activeMonth.getFullYear() && date.getMonth() === activeMonth.getMonth();
    });
  }, [activeMonth, events]);

  const eventsByDay = useMemo(() => {
    return monthEvents.reduce((accumulator, event) => {
      const key = eventDateKey(new Date(event.startAt));
      accumulator[key] = accumulator[key] || [];
      accumulator[key].push(event);
      return accumulator;
    }, {});
  }, [monthEvents]);

  const selectedDayEvents = selectedDayKey ? (eventsByDay[selectedDayKey] || []) : [];

  const handleNavigateToPerformance = (event) => {
    if (event.performance?.slug) {
      navigate(`/eloadasok/${event.performance.slug}`);
    }
  };

  return (
    <>
      <PageHero
        eyebrow={uiText.eyebrow}
        title={uiText.title}
        description={uiText.description}
        meta={uiText.meta}
      />

      <Section>
        {isLoading ? <p className='text-canvas/60'>Bet\u00f6lt\u00e9s...</p> : null}
        {error ? <p className='text-ember'>{error}</p> : null}
        {!isLoading && !error ? (
          <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1.68fr)_minmax(0,1.02fr)]'>
            <div className='grid self-start gap-6'>
              <MonthlyCalendar
                monthDate={activeMonth}
                eventsByDay={eventsByDay}
                selectedDayKey={selectedDayKey}
                onPrevMonth={() => {
                  const next = new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1);
                  setActiveMonth(next);
                  setSelectedDayKey('');
                }}
                onNextMonth={() => {
                  const next = new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1);
                  setActiveMonth(next);
                  setSelectedDayKey('');
                }}
                onDaySelect={setSelectedDayKey}
              />

              <div className='surface self-start p-6 sm:p-7 md:p-8 xl:max-h-[760px] xl:min-h-[420px] xl:overflow-y-auto'>
                <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>{uiText.selectedDayEyebrow}</p>
                <h2 className='mt-3 editorial-title text-2xl leading-tight sm:text-3xl md:text-4xl'>
                  {selectedDayKey ? formatHumanDate(selectedDayKey) : uiText.selectDay}
                </h2>
                <div className='mt-6 grid gap-3'>
                  {selectedDayKey && selectedDayEvents.length ? selectedDayEvents.map((event) => (
                    <button
                      key={event.id}
                      type='button'
                      onClick={() => handleNavigateToPerformance(event)}
                      className='rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-left transition hover:border-gold/35 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-gold/40 sm:p-5'
                    >
                      <div className='flex flex-wrap items-center justify-between gap-3'>
                        <DatePill date={event.startAt} time={new Date(event.startAt).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} />
                        <Badge tone='warm'>{event.performance?.title || 'Program'}</Badge>
                      </div>
                      <p className='mt-4 text-lg font-medium leading-snug sm:text-xl'>{event.performance?.title || 'Program'}</p>
                      <p className='mt-2 text-sm leading-6 text-canvas/60'>{event.venue}</p>
                      <div className='mt-5 flex flex-wrap items-center gap-3'>
                        <span className='inline-flex text-sm text-gold'>{uiText.openPerformance}</span>
                        {event.ticketLink ? (
                          <a
                            href={event.ticketLink}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-canvas/82 hover:bg-white/[0.07]'
                            onClick={(clickEvent) => clickEvent.stopPropagation()}
                          >
                            {uiText.ticketForDate}
                          </a>
                        ) : null}
                      </div>
                    </button>
                  )) : null}

                  {selectedDayKey && !selectedDayEvents.length ? <p className='rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm leading-7 text-canvas/60'>{uiText.noPerformanceToday}</p> : null}
                  {!selectedDayKey ? <p className='rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm leading-7 text-canvas/60'>{uiText.tapDay}</p> : null}
                </div>
              </div>
            </div>

            <div className='grid self-start gap-6 xl:pr-1'>
              {monthEvents.length ? monthEvents.map((event) => {
                const interactive = Boolean(event.performance?.slug);
                return (
                  <Card
                    key={event.id}
                    className={interactive ? 'cursor-pointer hover:border-gold/30 hover:bg-white/[0.08]' : ''}
                    role={interactive ? 'button' : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    onClick={interactive ? () => handleNavigateToPerformance(event) : undefined}
                    onKeyDown={interactive ? (keyboardEvent) => {
                      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                        keyboardEvent.preventDefault();
                        handleNavigateToPerformance(event);
                      }
                    } : undefined}
                  >
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <DatePill date={event.startAt} time={new Date(event.startAt).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })} />
                      <Badge tone='warm'>{event.performance?.title || uiText.performanceLabel}</Badge>
                    </div>
                    <h2 className='mt-5 text-3xl leading-tight'>{event.performance?.title || 'Program'}</h2>
                    <p className='mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45'>{event.venue}</p>
                    <p className='mt-4 max-w-2xl text-base leading-8 text-canvas/72'>{event.performance?.shortDescription}</p>
                    <div className='mt-7 flex flex-wrap gap-3'>
                      {interactive ? <span className='inline-flex rounded-full border border-white/12 px-4 py-2.5 text-sm text-canvas/75'>{uiText.openPerformanceCard}</span> : null}
                      {event.ticketLink ? (
                        <a href={event.ticketLink} target='_blank' rel='noreferrer noopener' className='inline-flex rounded-full bg-ember px-5 py-3 text-sm text-white hover:bg-[#e57a57]' onClick={(clickEvent) => clickEvent.stopPropagation()}>
                          {uiText.ticketForDate}
                        </a>
                      ) : null}
                    </div>
                  </Card>
                );
              }) : <p className='text-canvas/60'>{uiText.noEventsThisMonth}</p>}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default MusorPage;