import { createContext, useContext, useMemo, useState } from 'react';
import ModalShell from '../components/ui/ModalShell';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const value = useMemo(
    () => ({
      modal,
      openInfo: (content) => setModal({ type: 'info', ...content }),
      openError: (content) => setModal({ type: 'error', ...content }),
      openConfirm: (content) => setModal({ type: 'confirm', ...content }),
      closeModal: () => setModal(null),
    }),
    [modal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalShell modal={modal} onClose={() => setModal(null)} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
}