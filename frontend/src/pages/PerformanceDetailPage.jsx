import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import DatePill from '../components/ui/DatePill';
import StarRating from '../components/ui/StarRating';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import { performanceService } from '../services/performance.service';
import { feedbackService } from '../services/feedback.service';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';

const feedbackSchema = Yup.object({
  content: Yup.string().trim().min(3, 'Legalább 3 karakter').required('Kötelező'),
});

function PerformanceDetailPage() {
  const { slug } = useParams();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { openError, openInfo, openConfirm } = useModal();
  const [performance, setPerformance] = useState(null);
  const [ratings, setRatings] = useState({ average: 0, count: 0, userRating: null });
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const loadDetails = async () => {
    try {
      const item = await performanceService.getBySlug(slug);
      setPerformance(item);
      const [summary, feedbackItems] = await Promise.all([
        performanceService.getRatingsSummary(item.id),
        performanceService.getFeedbacks(item.id),
      ]);
      setRatings(summary);
      setFeedbacks(feedbackItems);
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [slug]);

  if (error) {
    return <div className='px-6 py-20 text-center text-ember'>{error}</div>;
  }

  if (!performance) {
    return <div className='px-6 py-20 text-center text-canvas/60'>Betöltés...</div>;
  }

  return (
    <>
      <PageHero eyebrow='Előadás' title={performance.title} description={performance.longDescription} meta='Részletes adatlap' />
      <Section>
        <div className='grid gap-7 lg:grid-cols-[1.05fr_0.95fr]'>
          <div className='grid gap-6'>
            {performance.posterUrl ? <img src={performance.posterUrl} alt={performance.title} className='h-[460px] w-full rounded-[34px] object-cover' /> : null}
            <div className='surface p-7 md:p-8'>
              <h2 className='text-2xl'>Kapcsolódó alkotók</h2>
              <div className='mt-5 flex flex-wrap gap-3'>
                {(performance.creators || []).map((creator) => {
                  const item = creator.creator || creator;
                  return <Link key={item.id} to={`/tarsulat/${item.slug}`} className='rounded-full border border-white/10 px-4 py-2.5 text-sm text-canvas/78 hover:bg-white/[0.07]'>{item.name}</Link>;
                })}
              </div>
              <div className='mt-7 flex flex-wrap gap-3'>
                {performance.ticketLink ? <a href={performance.ticketLink} target='_blank' rel='noreferrer noopener' className='inline-flex rounded-full bg-ember px-5 py-3 text-sm text-white hover:bg-[#e57a57]'>Általános jegylink</a> : null}
              </div>
            </div>
            <div className='surface p-7 md:p-8'>
              <h2 className='text-2xl'>Értékelés</h2>
              <p className='mt-3 text-sm text-canvas/60'>Átlag: {ratings.average} / 5 · {ratings.count} értékelés</p>
              <div className='mt-5 flex flex-wrap items-center gap-4'>
                <StarRating
                  value={ratings.userRating || 0}
                  readOnly={!isAuthenticated}
                  size='lg'
                  onChange={async (value) => {
                    try {
                      const summary = await performanceService.submitRating(performance.id, value);
                      setRatings(summary);
                      openInfo({ title: 'Mentve', message: 'Az értékelésed rögzítettük.' });
                    } catch (submissionError) {
                      openError({ title: 'Hiba', message: submissionError.message });
                    }
                  }}
                />
                {!isAuthenticated ? <span className='text-sm text-canvas/55'>Értékeléshez jelentkezz be.</span> : null}
              </div>
            </div>
          </div>

          <div className='grid gap-6'>
            <div className='surface p-7 md:p-8'>
              <h2 className='text-2xl'>Közelgő események</h2>
              <div className='mt-5 space-y-4'>
                {(performance.events || []).length ? performance.events.map((event) => (
                  <div key={event.id} className='rounded-[24px] border border-white/10 bg-white/[0.05] p-5'>
                    <DatePill date={event.startAt} />
                    <p className='mt-4 text-sm text-canvas/70'>{event.venue}</p>
                    <div className='mt-5 flex flex-wrap gap-3'>
                      <Link to='/musor' className='inline-flex rounded-full border border-white/10 px-4 py-2.5 text-sm text-canvas/78 hover:bg-white/[0.07]'>Műsor megnyitása</Link>
                      {event.ticketLink ? <a href={event.ticketLink} target='_blank' rel='noreferrer noopener' className='inline-flex rounded-full bg-gold px-4 py-2.5 text-sm text-ink hover:opacity-90'>Jegy erre az időpontra</a> : null}
                    </div>
                  </div>
                )) : <p className='text-canvas/60'>Nincs még időpont ehhez az előadáshoz.</p>}
              </div>
            </div>
            {(performance.critiques || []).length ? (
              <div className='surface p-7 md:p-8'>
                <h2 className='text-2xl'>Kritikák</h2>
                <div className='mt-5 grid gap-4'>
                  {performance.critiques.map((critique) => (
                    <div key={critique.id} className='rounded-[24px] border border-white/10 bg-white/[0.05] p-5'>
                      <p className='text-sm uppercase tracking-[0.2em] text-canvas/45'>{critique.source}</p>
                      <h3 className='mt-3 text-xl'>{critique.title}</h3>
                      {critique.quote ? <p className='mt-4 text-canvas/70'>{critique.quote}</p> : null}
                      <a href={critique.url} target='_blank' rel='noreferrer noopener' className='mt-5 inline-flex text-sm text-gold hover:text-canvas'>Forrás megnyitása</a>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {(performance.images || []).length ? (
          <div className='mt-10'>
            <h2 className='text-2xl'>Galéria</h2>
            <div className='mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {performance.images.map((image, index) => (
                <button key={image.id} type='button' className='overflow-hidden rounded-[28px]' onClick={() => setLightboxIndex(index)}>
                  <img src={image.imageUrl} alt={performance.title} className='h-64 w-full rounded-[28px] object-cover transition hover:scale-[1.03]' />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className='mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]'>
          <div className='surface p-7 md:p-8'>
            <h2 className='text-2xl'>Feedbackek</h2>
            <div className='mt-5 grid gap-4'>
              {feedbacks.length ? feedbacks.map((feedback) => {
                const canDelete = isAdmin || user?.id === feedback.user?.id;
                return (
                  <div key={feedback.id} className='rounded-[24px] border border-white/10 bg-white/[0.05] p-5'>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <p className='text-sm uppercase tracking-[0.18em] text-canvas/45'>{feedback.user?.firstName} {feedback.user?.lastName}</p>
                        <p className='mt-2 text-sm text-canvas/60'>{new Date(feedback.createdAt).toLocaleString('hu-HU')}</p>
                      </div>
                      {canDelete ? <button type='button' className='rounded-full border border-ember/40 px-3 py-1.5 text-xs text-ember hover:bg-ember/10' onClick={() => openConfirm({ title: 'Feedback törlése', message: 'A kiválasztott feedback törlődik.', onConfirm: async () => {
                        try {
                          await feedbackService.remove(feedback.id);
                          setFeedbacks((current) => current.filter((item) => item.id !== feedback.id));
                          openInfo({ title: 'Törölve', message: 'A feedback törlése sikeres volt.' });
                        } catch (deleteError) {
                          openError({ title: 'Hiba', message: deleteError.message });
                        }
                      } })}>Törlés</button> : null}
                    </div>
                    <p className='mt-4 whitespace-pre-line text-sm leading-7 text-canvas/78'>{feedback.content}</p>
                  </div>
                );
              }) : <p className='text-canvas/60'>Még nincs feedback ehhez az előadáshoz.</p>}
            </div>
          </div>

          <div className='surface p-7 md:p-8'>
            <h2 className='text-2xl'>Új feedback</h2>
            {isAuthenticated ? (
              <Formik
                initialValues={{ content: '' }}
                validationSchema={feedbackSchema}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  try {
                    const created = await performanceService.createFeedback(performance.id, values.content);
                    setFeedbacks((current) => [created, ...current]);
                    resetForm();
                  } catch (submissionError) {
                    openError({ title: 'Hiba', message: submissionError.message });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className='mt-5 grid gap-4'>
                    <Field as='textarea' name='content' className='min-h-36 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3' placeholder='Írd meg a benyomásod az előadásról.' />
                    {touched.content && errors.content ? <p className='text-sm text-ember'>{errors.content}</p> : null}
                    <button type='submit' className='w-fit rounded-full bg-ember px-5 py-3 text-sm text-white hover:bg-[#e57a57]' disabled={isSubmitting}>Beküldés</button>
                  </Form>
                )}
              </Formik>
            ) : <p className='mt-4 text-canvas/60'>Feedback írásához jelentkezz be.</p>}
          </div>
        </div>
      </Section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={performance.images || []}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((current) => ((current - 1 + performance.images.length) % performance.images.length))}
          onNext={() => setLightboxIndex((current) => ((current + 1) % performance.images.length))}
        />
      ) : null}
    </>
  );
}

export default PerformanceDetailPage;