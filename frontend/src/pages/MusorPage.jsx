import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import DatePill from '../components/ui/DatePill';
import Badge from '../components/ui/Badge';
import MonthlyCalendar from '../components/calendar/MonthlyCalendar';
import { eventService } from '../services/event.service';

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
        eyebrow='MĹ±sor'
        title='KĂ¶zelgĹ‘ esemĂ©nyek Ă©s repertoĂˇrmozgĂˇs'
        description='A havi naptĂˇr Ă©s az aznapi esemĂ©nylista egyĂĽtt mutatja az ApertĂşra mozgĂˇsĂˇt.'
        meta='A kijelĂ¶lt nap esemĂ©nyei kĂĽlĂ¶n blokkban jelennek meg, onnan kĂ¶zvetlenĂĽl tovĂˇbb lehet lĂ©pni az elĹ‘adĂˇs adatlapjĂˇra.'
      />

      <Section>
        {isLoading ? <p className='text-canvas/60'>BetĂ¶ltĂ©s...</p> : null}
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
                <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>EsemĂ©nyek ezen a napon</p>
                <h2 className='mt-3 editorial-title text-2xl leading-tight sm:text-3xl md:text-4xl'>
                  {selectedDayKey ? formatHumanDate(selectedDayKey) : 'VĂˇlassz napot a naptĂˇrbĂłl'}
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
                        <span className='inline-flex text-sm text-gold'>ElĹ‘adĂˇs adatlap megnyitĂˇsa</span>
                        {event.ticketLink ? (
                          <a
                            href={event.ticketLink}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-canvas/82 hover:bg-white/[0.07]'
                            onClick={(clickEvent) => clickEvent.stopPropagation()}
                          >
                            Jegy erre az idĹ‘pontra
                          </a>
                        ) : null}
                      </div>
                    </button>
                  )) : null}

                  {selectedDayKey && !selectedDayEvents.length ? <p className='rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm leading-7 text-canvas/60'>Erre a napra jelenleg nincs mĹ±soron elĹ‘adĂˇs.</p> : null}
                  {!selectedDayKey ? <p className='rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm leading-7 text-canvas/60'>Koppints vagy kattints egy napra, Ă©s itt megjelennek az aznapi esemĂ©nyek.</p> : null}
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
                      <Badge tone='warm'>{event.performance?.title || 'ElĹ‘adĂˇs'}</Badge>
                    </div>
                    <h2 className='mt-5 text-3xl leading-tight'>{event.performance?.title || 'Program'}</h2>
                    <p className='mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45'>{event.venue}</p>
                    <p className='mt-4 max-w-2xl text-base leading-8 text-canvas/72'>{event.performance?.shortDescription}</p>
                    <div className='mt-7 flex flex-wrap gap-3'>
                      {interactive ? <span className='inline-flex rounded-full border border-white/12 px-4 py-2.5 text-sm text-canvas/75'>ElĹ‘adĂˇs adatlap</span> : null}
                      {event.ticketLink ? (
                        <a href={event.ticketLink} target='_blank' rel='noreferrer noopener' className='inline-flex rounded-full bg-ember px-5 py-3 text-sm text-white hover:bg-[#e57a57]' onClick={(clickEvent) => clickEvent.stopPropagation()}>
                          Jegy erre az idĹ‘pontra
                        </a>
                      ) : null}
                    </div>
                  </Card>
                );
              }) : <p className='text-canvas/60'>Ebben a hĂłnapban mĂ©g nincs esemĂ©ny.</p>}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default MusorPage;