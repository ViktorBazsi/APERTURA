import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  performanceId: Yup.string().required('Kötelező'),
  title: Yup.string().required('Kötelező'),
  source: Yup.string().required('Kötelező'),
  url: Yup.string().required('Kötelező'),
});

function CritiqueForm({ initialValues, onSubmit, performanceOptions = [], submitLabel = 'Mentés' }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit} enableReinitialize>
      <Form className='grid gap-4'>
        <Field as='select' name='performanceId' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
          <option value=''>Válassz előadást</option>
          {performanceOptions.map((performance) => <option key={performance.id} value={performance.id}>{performance.title}</option>)}
        </Field>
        <ErrorMessage name='performanceId' component='p' className='text-sm text-ember' />
        <Field name='title' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Cím' />
        <ErrorMessage name='title' component='p' className='text-sm text-ember' />
        <Field name='source' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Forrás' />
        <ErrorMessage name='source' component='p' className='text-sm text-ember' />
        <Field name='url' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='URL' />
        <ErrorMessage name='url' component='p' className='text-sm text-ember' />
        <Field as='textarea' name='quote' className='min-h-24 rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Idézet' />
        <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white'>{submitLabel}</button>
      </Form>
    </Formik>
  );
}

export default CritiqueForm;