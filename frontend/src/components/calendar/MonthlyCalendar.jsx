function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfCalendar(date) {
  const monthStart = startOfMonth(date);
  const day = (monthStart.getDay() + 6) % 7;
  const result = new Date(monthStart);
  result.setDate(monthStart.getDate() - day);
  return result;
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

const weekDays = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

function MonthlyCalendar({ monthDate, eventsByDay, selectedDayKey, onPrevMonth, onNextMonth, onDaySelect }) {
  const monthStart = startOfMonth(monthDate);
  const firstCell = startOfCalendar(monthDate);

  const days = Array.from({ length: 42 }, (_, index) => {
    const current = new Date(firstCell);
    current.setDate(firstCell.getDate() + index);
    return current;
  });

  return (
    <div className='surface overflow-hidden p-4 sm:p-5 md:p-6'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-[11px] uppercase tracking-[0.28em] text-canvas/42'>Havi naptár</p>
          <h2 className='mt-2 editorial-title text-2xl md:text-3xl'>{monthStart.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long' })}</h2>
        </div>
        <div className='flex gap-2'>
          <button type='button' className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-canvas/76 transition hover:bg-white/[0.06] hover:text-canvas' onClick={onPrevMonth} aria-label='Előző hónap'>
            ‹
          </button>
          <button type='button' className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-canvas/76 transition hover:bg-white/[0.06] hover:text-canvas' onClick={onNextMonth} aria-label='Következő hónap'>
            ›
          </button>
        </div>
      </div>

      <div className='mt-5 grid grid-cols-7 gap-1.5 text-center text-[11px] uppercase tracking-[0.24em] text-canvas/38 sm:gap-2'>
        {weekDays.map((day) => <div key={day} className='py-2'>{day}</div>)}
      </div>

      <div className='mt-1 grid grid-cols-7 gap-1.5 sm:gap-2'>
        {days.map((day) => {
          const key = formatDateKey(day);
          const dayEvents = eventsByDay[key] || [];
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDayKey === key;
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={key}
              type='button'
              onClick={() => onDaySelect(key)}
              className={[
                'group flex min-h-[58px] flex-col justify-between rounded-[20px] border px-2.5 py-2 text-left transition sm:min-h-[76px] sm:px-3 sm:py-3 md:min-h-[88px]',
                isCurrentMonth ? 'border-white/8 bg-white/[0.04] text-canvas' : 'border-white/5 bg-white/[0.02] text-canvas/28',
                isSelected ? 'border-gold/45 bg-gold/12 shadow-[0_8px_24px_rgba(225,193,107,0.12)]' : 'hover:border-white/12 hover:bg-white/[0.06]',
              ].join(' ')}
            >
              <div className='flex items-start justify-between gap-2'>
                <span className={`text-sm sm:text-base ${isSelected ? 'font-medium' : ''}`}>{day.getDate()}</span>
                {hasEvents ? <span className='text-[10px] text-canvas/42 sm:text-[11px]'>{dayEvents.length}</span> : null}
              </div>
              <div className='mt-2 flex items-center gap-1.5'>
                {hasEvents ? (
                  <>
                    <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-gold' : 'bg-ember'}`} />
                    {dayEvents.length > 1 ? <span className='hidden text-[10px] text-canvas/46 sm:inline'>{dayEvents.length} esemény</span> : null}
                  </>
                ) : <span className='h-1.5 w-1.5 rounded-full bg-transparent' />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyCalendar;