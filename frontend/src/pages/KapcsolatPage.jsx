import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import { siteMeta } from '../content/site';
import { contactService } from '../services/contact.service';

const schema = Yup.object({
  name: Yup.string().trim().required('A név megadása kötelező'),
  email: Yup.string().email('Érvényes email cím kell').required('Az email megadása kötelező'),
  phone: Yup.string().trim().test('phone', 'A telefonszám formátuma nem megfelelő', (value) => !value || /^[\d\s()+-]{7,20}$/.test(value)),
  message: Yup.string().trim().required('Az üzenet megadása kötelező'),
});

function KapcsolatPage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <PageHero
        eyebrow='Kapcsolat'
        title='Beszéljünk együttműködésről, meghívásról vagy térhasználatról'
        description='A kapcsolatoldal továbbra is könnyű belépési pont kulturális partnerek, szervezők és érdeklődők számára.'
        meta='Az űrlap most már ténylegesen backend email-küldéssel működik.'
      />

      <Section>
        <div className='grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='space-y-5'>
            <div className='rounded-[32px] border border-white/10 bg-canvas p-8 text-ink'>
              <p className='text-sm uppercase tracking-[0.24em] text-ink/45'>Elérhetőségek</p>
              <div className='mt-6 space-y-4'>
                <p>{siteMeta.contact.address}</p>
                <p>{siteMeta.contact.email}</p>
                <p>{siteMeta.contact.phone}</p>
              </div>
            </div>

            <div className='surface p-8'>
              <p className='text-sm uppercase tracking-[0.24em] text-canvas/45'>Social</p>
              <div className='mt-6 flex flex-wrap gap-3'>
                {siteMeta.socials.map((social) => (
                  <a key={social.label} href={social.href} className='rounded-full border border-white/10 px-4 py-2 text-sm text-canvas/75 hover:bg-white/10 hover:text-canvas'>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className='surface p-8'>
            <h2 className='text-3xl'>Kapcsolatfelvétel</h2>
            <Formik
              initialValues={{ name: '', email: '', phone: '', message: '' }}
              validationSchema={schema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  setStatus('');
                  setError('');
                  await contactService.submit(values);
                  resetForm();
                  setStatus('Az üzenet sikeresen elküldve. Rövidesen jelentkezünk.');
                } catch (submissionError) {
                  setError(submissionError.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className='mt-6 grid gap-4 sm:grid-cols-2'>
                  <div>
                    <Field name='name' className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='Név' />
                    {touched.name && errors.name ? <p className='mt-2 text-sm text-ember'>{errors.name}</p> : null}
                  </div>
                  <div>
                    <Field name='email' className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='E-mail' />
                    {touched.email && errors.email ? <p className='mt-2 text-sm text-ember'>{errors.email}</p> : null}
                  </div>
                  <div className='sm:col-span-2'>
                    <Field name='phone' className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='Telefonszám (opcionális)' />
                    {touched.phone && errors.phone ? <p className='mt-2 text-sm text-ember'>{errors.phone}</p> : null}
                  </div>
                  <div className='sm:col-span-2'>
                    <Field as='textarea' name='message' className='min-h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='Írd meg röviden, miben keresel bennünket.' />
                    {touched.message && errors.message ? <p className='mt-2 text-sm text-ember'>{errors.message}</p> : null}
                  </div>
                  {status ? <p className='text-sm text-gold sm:col-span-2'>{status}</p> : null}
                  {error ? <p className='text-sm text-ember sm:col-span-2'>{error}</p> : null}
                  <button type='submit' className='inline-flex w-fit rounded-full bg-ember px-5 py-3 text-sm font-medium text-white hover:bg-[#e57a57] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2' disabled={isSubmitting}>
                    {isSubmitting ? 'Küldés...' : 'Üzenet küldése'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Section>
    </>
  );
}

export default KapcsolatPage;