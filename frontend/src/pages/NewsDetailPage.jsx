import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import { newsService } from '../services/news.service';

function ensureMetaDescription() {
  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }

  return meta;
}

function NewsDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    newsService.getBySlug(slug).then(setItem).catch((err) => setError(err.message));
  }, [slug]);

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const previousTitle = document.title;
    const meta = ensureMetaDescription();
    const previousDescription = meta.getAttribute('content');

    document.title = `${item.title} | Apertúra`;
    meta.setAttribute('content', item.excerpt || 'Apertúra hír');

    return () => {
      document.title = previousTitle;
      if (previousDescription) {
        meta.setAttribute('content', previousDescription);
      } else {
        meta.removeAttribute('content');
      }
    };
  }, [item]);

  if (error) {
    return <div className='px-6 py-20 text-center text-ember'>{error}</div>;
  }

  if (!item) {
    return <div className='px-6 py-20 text-center text-canvas/60'>Betöltés...</div>;
  }

  return (
    <>
      <PageHero eyebrow='Hír' title={item.title} description={item.excerpt} meta={new Date(item.publishedAt).toLocaleDateString('hu-HU')} />
      <Section>
        <article className='grid gap-8'>
          {item.coverImageUrl ? <img src={item.coverImageUrl} alt={item.title} className='h-[420px] w-full rounded-[32px] object-cover' /> : null}
          <div className='surface p-6 md:p-8'>
            <p className='text-sm uppercase tracking-[0.2em] text-canvas/45'>Publikálva: {new Date(item.publishedAt).toLocaleDateString('hu-HU')}</p>
            <p className='mt-6 whitespace-pre-line text-base leading-8 text-canvas/78'>{item.content}</p>
          </div>
        </article>
      </Section>
    </>
  );
}

export default NewsDetailPage;