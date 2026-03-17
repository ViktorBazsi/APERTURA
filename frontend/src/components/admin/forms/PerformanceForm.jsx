import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  title: Yup.string().required('Kötelező'),
  shortDescription: Yup.string().required('Kötelező'),
  longDescription: Yup.string().required('Kötelező'),
});

function PerformanceForm({ initialValues, onSubmit, creatorOptions = [], submitLabel = 'Mentés' }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form className='grid gap-4'>
          <Field name='title' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Cím' />
          <ErrorMessage name='title' component='p' className='text-sm text-ember' />
          <Field as='textarea' name='shortDescription' className='min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Rövid leírás' />
          <ErrorMessage name='shortDescription' component='p' className='text-sm text-ember' />
          <Field as='textarea' name='longDescription' className='min-h-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Hosszú leírás' />
          <ErrorMessage name='longDescription' component='p' className='text-sm text-ember' />
          <Field name='ticketLink' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Jegylink' />
          <Field name='posterUrl' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Poster URL' />
          {values.posterUrl ? <img src={values.posterUrl} alt={values.title || 'Előadás'} className='h-48 w-full rounded-2xl object-cover' /> : null}
          <input type='file' accept='image/*' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm' onChange={(event) => setFieldValue('posterFile', event.currentTarget.files?.[0] || null)} />
          <input type='file' multiple accept='image/*' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm' onChange={(event) => setFieldValue('galleryFiles', Array.from(event.currentTarget.files || []))} />
          <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
            <p className='mb-3 text-sm uppercase tracking-[0.2em] text-canvas/45'>Galéria</p>
            {values.galleryImages?.length ? (
              <div className='grid gap-3 sm:grid-cols-2'>
                {values.galleryImages.map((image, index) => (
                  <div key={`${image.imageUrl}-${index}`} className='rounded-2xl border border-white/10 bg-black/20 p-3'>
                    <img src={image.imageUrl} alt={`Galéria ${index + 1}`} className='h-32 w-full rounded-xl object-cover' />
                    <button type='button' className='mt-3 rounded-full border border-white/10 px-3 py-1 text-xs text-canvas/80 hover:bg-white/10' onClick={() => setFieldValue('galleryImages', values.galleryImages.filter((_, imageIndex) => imageIndex !== index))}>Kép eltávolítása</button>
                  </div>
                ))}
              </div>
            ) : <p className='text-sm text-canvas/55'>Még nincs galériakép.</p>}
          </div>
          <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
            <p className='mb-3 text-sm uppercase tracking-[0.2em] text-canvas/45'>Kapcsolódó alkotók</p>
            <div className='grid gap-2'>
              {creatorOptions.map((creator) => (
                <label key={creator.id} className='flex items-center gap-3 text-sm text-canvas/75'>
                  <input
                    type='checkbox'
                    checked={values.creatorIds.includes(creator.id)}
                    onChange={(event) => {
                      const next = event.target.checked ? [...values.creatorIds, creator.id] : values.creatorIds.filter((id) => id !== creator.id);
                      setFieldValue('creatorIds', next);
                    }}
                  />
                  {creator.name}
                </label>
              ))}
            </div>
          </div>
          <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white'>{submitLabel}</button>
        </Form>
      )}
    </Formik>
  );
}

export default PerformanceForm;