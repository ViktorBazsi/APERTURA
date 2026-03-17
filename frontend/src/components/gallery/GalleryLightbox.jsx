import { useEffect } from 'react';

function GalleryLightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        onPrev();
      }
      if (event.key === 'ArrowRight') {
        onNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const current = images[activeIndex];

  if (!current) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4' onClick={onClose}>
      <button type='button' className='absolute right-4 top-4 rounded-full border border-white/15 px-4 py-2 text-sm text-white' onClick={onClose}>Bezárás</button>
      <button type='button' className='absolute left-4 rounded-full border border-white/15 px-4 py-2 text-sm text-white' onClick={(event) => { event.stopPropagation(); onPrev(); }}>Előző</button>
      <div className='max-h-[90vh] max-w-5xl' onClick={(event) => event.stopPropagation()}>
        <img src={current.imageUrl} alt='Galéria kép' className='max-h-[80vh] w-auto rounded-[28px] object-contain' />
      </div>
      <button type='button' className='absolute right-4 rounded-full border border-white/15 px-4 py-2 text-sm text-white' onClick={(event) => { event.stopPropagation(); onNext(); }}>Következő</button>
    </div>
  );
}

export default GalleryLightbox;