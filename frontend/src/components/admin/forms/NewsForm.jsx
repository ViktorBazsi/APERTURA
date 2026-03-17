import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  title: Yup.string().required('Kötelező'),
  excerpt: Yup.string().required('Kötelező'),
  content: Yup.string().required('Kötelező'),
  publishedAt: Yup.string().required('Kötelező'),
});

function NewsForm({ initialValues, onSubmit, submitLabel = 'Mentés' }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit} enableReinitialize>
      {({ values, setFieldValue }) => (
        <Form className='grid gap-4'>
          <Field name='title' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Cím' />
          <ErrorMessage name='title' component='p' className='text-sm text-ember' />
          <Field name='excerpt' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Kivonat' />
          <ErrorMessage name='excerpt' component='p' className='text-sm text-ember' />
          <Field as='textarea' name='content' className='min-h-40 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Tartalom' />
          <ErrorMessage name='content' component='p' className='text-sm text-ember' />
          <Field name='publishedAt' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='2026-05-01T10:00:00.000Z' />
          <Field name='coverImageUrl' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Borítókép URL' />
          {values.coverImageUrl ? <img src={values.coverImageUrl} alt={values.title || 'Hír'} className='h-40 w-full rounded-2xl object-cover' /> : null}
          <input type='file' accept='image/*' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm' onChange={(event) => setFieldValue('coverImageFile', event.currentTarget.files?.[0] || null)} />
          <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white'>{submitLabel}</button>
        </Form>
      )}
    </Formik>
  );
}

export default NewsForm;