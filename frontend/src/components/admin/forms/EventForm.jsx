import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  performanceId: Yup.string().required('Kötelező'),
  startAt: Yup.string().required('Kötelező'),
  venue: Yup.string().required('Kötelező'),
});

function EventForm({ initialValues, onSubmit, performanceOptions = [], submitLabel = 'Mentés' }) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit} enableReinitialize>
      <Form className='grid gap-4'>
        <Field as='select' name='performanceId' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
          <option value=''>Válassz előadást</option>
          {performanceOptions.map((performance) => <option key={performance.id} value={performance.id}>{performance.title}</option>)}
        </Field>
        <ErrorMessage name='performanceId' component='p' className='text-sm text-ember' />
        <Field name='startAt' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='2026-05-01T19:00:00.000Z' />
        <ErrorMessage name='startAt' component='p' className='text-sm text-ember' />
        <Field name='venue' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Helyszín' />
        <ErrorMessage name='venue' component='p' className='text-sm text-ember' />
        <Field name='ticketLink' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Jegylink' />
        <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white'>{submitLabel}</button>
      </Form>
    </Formik>
  );
}

export default EventForm;