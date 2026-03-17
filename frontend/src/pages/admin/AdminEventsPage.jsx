import { useEffect, useMemo, useState } from 'react';
import EventForm from '../../components/admin/forms/EventForm';
import { eventService } from '../../services/event.service';
import { performanceService } from '../../services/performance.service';
import { useModal } from '../../context/ModalContext';

const emptyValues = {
  performanceId: '',
  startAt: '',
  venue: '',
  ticketLink: '',
};

function AdminEventsPage() {
  const [items, setItems] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { openInfo, openError, openConfirm } = useModal();

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) || null, [items, selectedId]);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const [eventItems, performanceItems] = await Promise.all([eventService.list(), performanceService.list()]);
      setItems(eventItems);
      setPerformances(performanceItems);
    } catch (error) {
      openError({ title: 'Hiba', message: error.message });
      setItems([]);
      setPerformances([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const initialValues = selectedItem ? {
    performanceId: selectedItem.performanceId || selectedItem.performance?.id || '',
    startAt: selectedItem.startAt || '',
    venue: selectedItem.venue || '',
    ticketLink: selectedItem.ticketLink || '',
  } : emptyValues;

  return (
    <div className='grid gap-6 xl:grid-cols-[0.95fr_1.05fr]'>
      <div className='surface p-6'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-3xl'>Események</h1>
          <button type='button' className='rounded-full border border-white/10 px-4 py-2 text-sm text-canvas/80 hover:bg-white/10' onClick={() => setSelectedId(null)}>Új</button>
        </div>
        <div className='mt-4 space-y-3'>
          {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
          {!isLoading && !items.length ? <p className='text-canvas/60'>Nincs még adat.</p> : null}
          {items.map((item) => (
            <div key={item.id} className={`rounded-2xl border px-4 py-4 ${selectedId === item.id ? 'border-gold bg-white/10' : 'border-white/10 bg-white/5'}`}>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-lg'>{item.performance?.title || 'Esemény'}</p>
                  <p className='mt-1 text-sm text-canvas/55'>{new Date(item.startAt).toLocaleString('hu-HU')} · {item.venue}</p>
                </div>
                <div className='flex gap-2'>
                  <button type='button' className='rounded-full border border-white/10 px-3 py-1 text-xs text-canvas/80 hover:bg-white/10' onClick={() => setSelectedId(item.id)}>Szerkesztés</button>
                  <button type='button' className='rounded-full border border-ember/40 px-3 py-1 text-xs text-ember hover:bg-ember/10' onClick={() => openConfirm({ title: 'Esemény törlése', message: 'Az esemény végleg törlődik.', onConfirm: async () => {
                    try {
                      await eventService.remove(item.id);
                      if (selectedId === item.id) {
                        setSelectedId(null);
                      }
                      await loadItems();
                      openInfo({ title: 'Törölve', message: 'Az esemény törlése sikeres volt.' });
                    } catch (error) {
                      openError({ title: 'Hiba', message: error.message });
                    }
                  } })}>Törlés</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='surface p-6'>
        <h2 className='text-3xl'>{selectedItem ? 'Esemény szerkesztése' : 'Új esemény'}</h2>
        <div className='mt-6'>
          <EventForm
            initialValues={initialValues}
            performanceOptions={performances}
            submitLabel={isSaving ? 'Mentés...' : selectedItem ? 'Frissítés' : 'Létrehozás'}
            onSubmit={async (values, helpers) => {
              try {
                setIsSaving(true);
                const payload = { performanceId: values.performanceId, startAt: values.startAt, venue: values.venue, ticketLink: values.ticketLink };
                if (selectedItem) {
                  await eventService.update(selectedItem.id, payload);
                  openInfo({ title: 'Mentve', message: 'Az esemény frissítése sikeres volt.' });
                } else {
                  await eventService.create(payload);
                  openInfo({ title: 'Mentve', message: 'Az esemény létrehozása sikeres volt.' });
                }
                helpers.resetForm();
                setSelectedId(null);
                await loadItems();
              } catch (error) {
                openError({ title: 'Hiba', message: error.message });
              } finally {
                setIsSaving(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminEventsPage;