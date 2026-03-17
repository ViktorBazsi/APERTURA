import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Container from '../components/ui/Container';
import { useAuth } from '../context/AuthContext';

const schema = Yup.object({
  email: Yup.string().email('Érvényes email kell').required('Kötelező'),
  password: Yup.string().min(6, 'Legalább 6 karakter').required('Kötelező'),
});

function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <section className='py-20'>
      <Container>
        <div className='mx-auto max-w-lg surface p-8'>
          <p className='text-xs uppercase tracking-[0.24em] text-canvas/45'>Belépés</p>
          <h1 className='editorial-title mt-4 text-4xl'>Fiók hozzáférés</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setError('');
                await login(values);
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
                <Field name='email' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Email' />
                {touched.email && errors.email ? <p className='text-sm text-ember'>{errors.email}</p> : null}
                <Field name='password' type='password' className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3' placeholder='Jelszó' />
                {touched.password && errors.password ? <p className='text-sm text-ember'>{errors.password}</p> : null}
                {error ? <p className='text-sm text-ember'>{error}</p> : null}
                <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white' disabled={isSubmitting}>
                  Belépés
                </button>
              </Form>
            )}
          </Formik>
          <p className='mt-6 text-sm text-canvas/62'>
            Ha még nem regisztráltál,{' '}
            <Link to='/register' className='text-gold hover:text-canvas'>
              itt tudsz.
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default LoginPage;