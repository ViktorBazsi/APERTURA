function Modal({ open, onClose, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm" onClick={onClose}>
      <div className="surface max-h-full w-full max-w-3xl overflow-y-auto p-6 md:p-8" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="ml-auto block rounded-full border border-white/10 px-4 py-2 text-sm text-canvas/70 hover:text-canvas"
          onClick={onClose}
        >
          Bezár
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
