import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Kötelező'),
  profession: Yup.string().required('Kötelező'),
  shortBio: Yup.string().required('Kötelező'),
});

function CreatorForm({ initialValues, onSubmit, submitLabel = 'Mentés' }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form className='grid gap-4'>
          <Field name='name' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Név' />
          <ErrorMessage name='name' component='p' className='text-sm text-ember' />
          <Field name='profession' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Szerepkör' />
          <ErrorMessage name='profession' component='p' className='text-sm text-ember' />
          <Field as='textarea' name='shortBio' className='min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Rövid bemutató' />
          <ErrorMessage name='shortBio' component='p' className='text-sm text-ember' />
          <Field as='textarea' name='longBio' className='min-h-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Hosszabb bemutató' />
          <Field name='coverImageUrl' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Kép URL' />
          {values.coverImageUrl ? <img src={values.coverImageUrl} alt={values.name || 'Alkotó'} className='h-40 w-full rounded-2xl object-cover' /> : null}
          <input type='file' accept='image/*' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm' onChange={(event) => setFieldValue('coverImageFile', event.currentTarget.files?.[0] || null)} />
          <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white'>{submitLabel}</button>
        </Form>
      )}
    </Formik>
  );
}

export default CreatorForm;