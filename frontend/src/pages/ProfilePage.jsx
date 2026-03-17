import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Container from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/user.service';

const schema = Yup.object({
  firstName: Yup.string().trim().required('Kötelező'),
  lastName: Yup.string().trim().required('Kötelező'),
  phone: Yup.string().trim().test('phone', 'Érvényes telefonszám kell', (value) => !value || /^[\d\s()+-]{7,20}$/.test(value)),
  newsletterSubscribed: Yup.boolean(),
});

function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return null;
  }

  return (
    <section className='py-16 md:py-24'>
      <Container>
        <div className='mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.7fr_1fr]'>
          <div className='surface p-7 md:p-8'>
            <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>Profil</p>
            <h1 className='editorial-title mt-4 text-4xl md:text-5xl'>Saját adatok</h1>
            <p className='mt-5 text-base leading-8 text-canvas/65'>Itt tudod frissíteni az alapadataidat és a hírlevél-beállításaidat.</p>
            <div className='mt-8 rounded-[26px] border border-white/10 bg-white/[0.04] p-5 text-sm text-canvas/72'>
              <p className='text-xs uppercase tracking-[0.24em] text-canvas/42'>Bejelentkezve</p>
              <p className='mt-3 break-all text-base text-canvas'>{user.email}</p>
            </div>
          </div>
          <div className='surface p-7 md:p-8'>
            <Formik
              initialValues={{
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                newsletterSubscribed: Boolean(user.newsletterSubscribed),
              }}
              validationSchema={schema}
              enableReinitialize
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setError('');
                  setStatus('');
                  await userService.updateMe({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    newsletterSubscribed: values.newsletterSubscribed,
                  });
                  await refreshMe();
                  setStatus('A profil mentése sikeres volt.');
                } catch (submissionError) {
                  setError(submissionError.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className='grid gap-5'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div>
                      <Field name='firstName' className='w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5' placeholder='Keresztnév' />
                      {touched.firstName && errors.firstName ? <p className='mt-2 text-sm text-ember'>{errors.firstName}</p> : null}
                    </div>
                    <div>
                      <Field name='lastName' className='w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5' placeholder='Vezetéknév' />
                      {touched.lastName && errors.lastName ? <p className='mt-2 text-sm text-ember'>{errors.lastName}</p> : null}
                    </div>
                  </div>
                  <div>
                    <Field name='phone' className='w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5' placeholder='Telefonszám' />
                    {touched.phone && errors.phone ? <p className='mt-2 text-sm text-ember'>{errors.phone}</p> : null}
                  </div>
                  <label className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-canvas/80'>
                    <Field type='checkbox' name='newsletterSubscribed' />
                    Hírlevél feliratkozás
                  </label>
                  {status ? <p className='text-sm text-gold'>{status}</p> : null}
                  {error ? <p className='text-sm text-ember'>{error}</p> : null}
                  <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white transition hover:bg-[#e57a57]' disabled={isSubmitting}>Mentés</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProfilePage;