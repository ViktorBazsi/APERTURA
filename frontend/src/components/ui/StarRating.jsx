function StarRating({ value = 0, onChange, readOnly = false, size = 'md' }) {
  const starSize = size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const active = starValue <= value;

        return (
          <button
            key={starValue}
            type='button'
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            className={`${starSize} transition ${active ? 'text-gold' : 'text-canvas/20'} ${readOnly ? 'cursor-default' : 'hover:scale-110'}`}
            aria-label={`${starValue} csillag`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;