async function handleConfirm(modal, onClose) {
  if (!modal?.onConfirm) {
    onClose();
    return;
  }

  await modal.onConfirm();
  onClose();
}

function ModalShell({ modal, onClose }) {
  if (!modal) {
    return null;
  }

  const isConfirm = modal.type === 'confirm';

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4 py-8' onClick={onClose}>
      <div className='surface w-full max-w-xl p-7 shadow-[0_32px_90px_rgba(0,0,0,0.35)] md:p-8' onClick={(event) => event.stopPropagation()}>
        <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>{modal.type}</p>
        <h2 className='mt-4 editorial-title text-3xl'>{modal.title || 'Üzenet'}</h2>
        {modal.message ? <p className='mt-4 text-sm leading-7 text-canvas/70'>{modal.message}</p> : null}
        <div className='mt-8 flex flex-wrap gap-3'>
          {isConfirm ? (
            <button type='button' className='rounded-full bg-ember px-5 py-3 text-sm text-white transition hover:bg-[#e57a57]' onClick={() => handleConfirm(modal, onClose)}>
              Megerősítés
            </button>
          ) : null}
          <button type='button' className='rounded-full border border-white/10 px-5 py-3 text-sm text-canvas/82 transition hover:bg-white/[0.06]' onClick={onClose}>
            {isConfirm ? 'Mégse' : 'Bezár'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalShell;