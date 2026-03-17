import { useEffect, useMemo, useState } from 'react';
import NewsForm from '../../components/admin/forms/NewsForm';
import { newsService } from '../../services/news.service';
import { uploadService } from '../../services/upload.service';
import { useModal } from '../../context/ModalContext';

const emptyValues = {
  title: '',
  excerpt: '',
  content: '',
  publishedAt: '',
  coverImageUrl: '',
  coverImageFile: null,
};

function AdminNewsPage() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { openInfo, openError, openConfirm } = useModal();

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) || null, [items, selectedId]);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      setItems(await newsService.list());
    } catch (error) {
      openError({ title: 'Hiba', message: error.message });
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const initialValues = selectedItem ? {
    title: selectedItem.title || '',
    excerpt: selectedItem.excerpt || '',
    content: selectedItem.content || '',
    publishedAt: selectedItem.publishedAt || '',
    coverImageUrl: selectedItem.coverImageUrl || '',
    coverImageFile: null,
  } : emptyValues;

  return (
    <div className='grid gap-6 xl:grid-cols-[0.95fr_1.05fr]'>
      <div className='surface p-6'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-3xl'>Hírek</h1>
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
                  <p className='mt-1 text-sm text-canvas/55'>{new Date(item.publishedAt).toLocaleDateString('hu-HU')}</p>
                </div>
                <div className='flex gap-2'>
                  <button type='button' className='rounded-full border border-white/10 px-3 py-1 text-xs text-canvas/80 hover:bg-white/10' onClick={() => setSelectedId(item.id)}>Szerkesztés</button>
                  <button type='button' className='rounded-full border border-ember/40 px-3 py-1 text-xs text-ember hover:bg-ember/10' onClick={() => openConfirm({ title: 'Hír törlése', message: `${item.title} végleg törlődik.`, onConfirm: async () => {
                    try {
                      await newsService.remove(item.id);
                      if (selectedId === item.id) {
                        setSelectedId(null);
                      }
                      await loadItems();
                      openInfo({ title: 'Törölve', message: 'A hír törlése sikeres volt.' });
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
        <h2 className='text-3xl'>{selectedItem ? 'Hír szerkesztése' : 'Új hír'}</h2>
        <p className='mt-2 text-sm text-canvas/55'>A borítókép Cloudinaryba töltődik, a publikus oldal SEO meta címet és leírást állít.</p>
        <div className='mt-6'>
          <NewsForm
            initialValues={initialValues}
            submitLabel={isSaving ? 'Mentés...' : selectedItem ? 'Frissítés' : 'Létrehozás'}
            onSubmit={async (values, helpers) => {
              try {
                setIsSaving(true);
                let coverImageUrl = values.coverImageUrl;
                if (values.coverImageFile) {
                  const upload = await uploadService.uploadImages('apertura/news', [values.coverImageFile]);
                  coverImageUrl = upload.files?.[0]?.url || coverImageUrl;
                }
                const payload = {
                  title: values.title,
                  excerpt: values.excerpt,
                  content: values.content,
                  publishedAt: values.publishedAt,
                  coverImageUrl,
                };
                if (selectedItem) {
                  await newsService.update(selectedItem.id, payload);
                  openInfo({ title: 'Mentve', message: 'A hír frissítése sikeres volt.' });
                } else {
                  await newsService.create(payload);
                  openInfo({ title: 'Mentve', message: 'A hír létrehozása sikeres volt.' });
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

export default AdminNewsPage;