import { useEffect, useMemo, useState } from 'react';
import PerformanceForm from '../../components/admin/forms/PerformanceForm';
import { performanceService } from '../../services/performance.service';
import { creatorService } from '../../services/creator.service';
import { uploadService } from '../../services/upload.service';
import { useModal } from '../../context/ModalContext';

const emptyValues = {
  title: '',
  shortDescription: '',
  longDescription: '',
  ticketLink: '',
  posterUrl: '',
  posterFile: null,
  galleryFiles: [],
  galleryImages: [],
  creatorIds: [],
};

function AdminPerformancesPage() {
  const [items, setItems] = useState([]);
  const [creators, setCreators] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { openInfo, openError, openConfirm } = useModal();

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) || null, [items, selectedId]);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const [performanceItems, creatorItems] = await Promise.all([performanceService.list(), creatorService.list()]);
      setItems(performanceItems);
      setCreators(creatorItems);
    } catch (error) {
      openError({ title: 'Hiba', message: error.message });
      setItems([]);
      setCreators([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const initialValues = selectedItem ? {
    title: selectedItem.title || '',
    shortDescription: selectedItem.shortDescription || '',
    longDescription: selectedItem.longDescription || '',
    ticketLink: selectedItem.ticketLink || '',
    posterUrl: selectedItem.posterUrl || '',
    posterFile: null,
    galleryFiles: [],
    galleryImages: (selectedItem.images || []).map((image, index) => ({ imageUrl: image.imageUrl, order: image.order ?? index })),
    creatorIds: (selectedItem.creators || []).map((entry) => entry.creator?.id || entry.creatorId).filter(Boolean),
  } : emptyValues;

  return (
    <div className='grid gap-6 xl:grid-cols-[0.95fr_1.05fr]'>
      <div className='surface p-6'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-3xl'>Előadások</h1>
          <button type='button' className='rounded-full border border-white/10 px-4 py-2 text-sm text-canvas/80 hover:bg-white/10' onClick={() => setSelectedId(null)}>Új</button>
        </div>
        <div className='mt-4 space-y-3'>
          {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
          {!isLoading && !items.length ? <p className='text-canvas/60'>Nincs még adat.</p> : null}
          {items.map((item) => (
            <div key={item.id} className={`rounded-2xl border px-4 py-4 ${selectedId === item.id ? 'border-gold bg-white/10' : 'border-white/10 bg-white/5'}`}>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-lg'>{item.title}</p>
                  <p className='mt-1 text-sm text-canvas/55'>{item.events?.length || 0} esemény · {item.images?.length || 0} galériakép</p>
                </div>
                <div className='flex gap-2'>
                  <button type='button' className='rounded-full border border-white/10 px-3 py-1 text-xs text-canvas/80 hover:bg-white/10' onClick={() => setSelectedId(item.id)}>Szerkesztés</button>
                  <button type='button' className='rounded-full border border-ember/40 px-3 py-1 text-xs text-ember hover:bg-ember/10' onClick={() => openConfirm({ title: 'Előadás törlése', message: `${item.title} és a hozzá kapcsolt galériaképek is törlődnek.`, onConfirm: async () => {
                    try {
                      await performanceService.remove(item.id);
                      if (selectedId === item.id) {
                        setSelectedId(null);
                      }
                      await loadItems();
                      openInfo({ title: 'Törölve', message: 'Az előadás törlése sikeres volt.' });
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
        <h2 className='text-3xl'>{selectedItem ? 'Előadás szerkesztése' : 'Új előadás'}</h2>
        <p className='mt-2 text-sm text-canvas/55'>Poster, galéria és alkotói kapcsolatok egy űrlapból kezelhetők.</p>
        <div className='mt-6'>
          <PerformanceForm
            initialValues={initialValues}
            creatorOptions={creators}
            submitLabel={isSaving ? 'Mentés...' : selectedItem ? 'Frissítés' : 'Létrehozás'}
            onSubmit={async (values, helpers) => {
              try {
                setIsSaving(true);
                let posterUrl = values.posterUrl;
                let galleryImages = [...(values.galleryImages || [])];
                if (values.posterFile) {
                  const upload = await uploadService.uploadImages('apertura/performances/posters', [values.posterFile]);
                  posterUrl = upload.files?.[0]?.url || posterUrl;
                }
                if (values.galleryFiles?.length) {
                  const upload = await uploadService.uploadImages('apertura/performances/gallery', values.galleryFiles);
                  const appended = (upload.files || []).map((file, index) => ({ imageUrl: file.url, order: galleryImages.length + index }));
                  galleryImages = [...galleryImages, ...appended];
                }
                const payload = {
                  title: values.title,
                  shortDescription: values.shortDescription,
                  longDescription: values.longDescription,
                  ticketLink: values.ticketLink,
                  posterUrl,
                  creatorIds: values.creatorIds,
                  galleryImages: galleryImages.map((image, index) => ({ imageUrl: image.imageUrl, order: index })),
                };
                if (selectedItem) {
                  await performanceService.update(selectedItem.id, payload);
                  openInfo({ title: 'Mentve', message: 'Az előadás frissítése sikeres volt.' });
                } else {
                  await performanceService.create(payload);
                  openInfo({ title: 'Mentve', message: 'Az előadás létrehozása sikeres volt.' });
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

export default AdminPerformancesPage;