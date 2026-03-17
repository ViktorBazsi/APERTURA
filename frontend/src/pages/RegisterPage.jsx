import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Container from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';

const phoneRegex = /^[\d\s()+-]{7,20}$/;

const schema = Yup.object({
  firstName: Yup.string().trim().required('Kötelező'),
  lastName: Yup.string().trim().required('Kötelező'),
  email: Yup.string().email('Érvényes email kell').required('Kötelező'),
  phone: Yup.string().trim().test('phone', 'Érvényes telefonszám kell', (value) => !value || phoneRegex.test(value)).nullable(),
  password: Yup.string().min(6, 'Legalább 6 karakter').required('Kötelező'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'A két jelszó nem egyezik').required('Kötelező'),
});

function RegisterPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <section className='py-20'>
      <Container>
        <div className='mx-auto max-w-lg surface p-8'>
          <p className='text-xs uppercase tracking-[0.24em] text-canvas/45'>Regisztráció</p>
          <h1 className='editorial-title mt-4 text-4xl'>Új fiók létrehozása</h1>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', phone: '', password: '', passwordConfirm: '' }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setError('');
                await register({
                  firstName: values.firstName.trim(),
                  lastName: values.lastName.trim(),
                  email: values.email,
                  phone: values.phone?.trim() || null,
                  password: values.password,
                });
                navigate('/');
              } catch (submissionError) {
                setError(submissionError.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className='mt-6 grid gap-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div>
                    <Field name='firstName' className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Keresztnév' />
                    {touched.firstName && errors.firstName ? <p className='mt-2 text-sm text-ember'>{errors.firstName}</p> : null}
                  </div>
                  <div>
                    <Field name='lastName' className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Vezetéknév' />
                    {touched.lastName && errors.lastName ? <p className='mt-2 text-sm text-ember'>{errors.lastName}</p> : null}
                  </div>
                </div>
                <Field name='email' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Email' />
                {touched.email && errors.email ? <p className='text-sm text-ember'>{errors.email}</p> : null}
                <Field name='phone' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Telefonszám (opcionális)' />
                {touched.phone && errors.phone ? <p className='text-sm text-ember'>{errors.phone}</p> : null}
                <Field name='password' type='password' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Jelszó' />
                {touched.password && errors.password ? <p className='text-sm text-ember'>{errors.password}</p> : null}
                <Field name='passwordConfirm' type='password' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Jelszó újra' />
                {touched.passwordConfirm && errors.passwordConfirm ? <p className='text-sm text-ember'>{errors.passwordConfirm}</p> : null}
                {error ? <p className='text-sm text-ember'>{error}</p> : null}
                <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white' disabled={isSubmitting}>
                  Regisztráció
                </button>
              </Form>
            )}
          </Formik>
          <p className='mt-6 text-sm text-canvas/62'>
            Ha már regisztráltál,{' '}
            <Link to='/login' className='text-gold hover:text-canvas'>
              itt tudsz belépni.
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default RegisterPage;