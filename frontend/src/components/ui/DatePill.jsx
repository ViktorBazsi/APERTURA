function formatDate(dateString) {
  return new Intl.DateTimeFormat('hu-HU', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

function DatePill({ date, time }) {
  return (
    <div className='inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm text-gold'>
      <span>{formatDate(date)}</span>
      {time ? <span className='text-gold/60'>• {time}</span> : null}
    </div>
  );
}

export default DatePill;