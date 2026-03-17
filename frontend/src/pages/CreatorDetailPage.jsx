import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import { creatorService } from '../services/creator.service';

function CreatorDetailPage() {
  const { slug } = useParams();
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    creatorService.getBySlug(slug)
      .then(setCreator)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return <div className='px-6 py-20 text-center text-ember'>{error}</div>;
  }

  if (!creator) {
    return <div className='px-6 py-20 text-center text-canvas/60'>Betöltés...</div>;
  }

  return (
    <>
      <PageHero eyebrow='Társulat' title={creator.name} description={creator.longBio || creator.shortBio} meta={creator.profession} />
      <Section>
        <div className='grid gap-7 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            {creator.coverImageUrl ? (
              <img src={creator.coverImageUrl} alt={creator.name} className='h-[460px] w-full rounded-[34px] object-cover' />
            ) : (
              <div className='flex h-[460px] w-full items-end rounded-[34px] border border-dashed border-white/15 bg-gradient-to-br from-white/10 to-transparent p-6 text-sm text-canvas/40'>
                Portré hamarosan
              </div>
            )}
          </div>
          <div className='grid gap-6'>
            <div className='surface p-7 md:p-8'>
              <Badge tone='gold'>{creator.profession}</Badge>
              <p className='mt-5 text-base leading-8 text-canvas/72'>{creator.longBio || creator.shortBio}</p>
            </div>
            <div className='surface p-7 md:p-8'>
              <h2 className='text-2xl'>Kapcsolódó előadások</h2>
              <div className='mt-5 flex flex-wrap gap-3'>
                {(creator.performances || []).length ? creator.performances.map((performance) => {
                  const item = performance.performance || performance;
                  return <Link key={item.id} to={`/eloadasok/${item.slug}`} className='rounded-full border border-white/10 px-4 py-2.5 text-sm text-canvas/78 hover:bg-white/[0.07]'>{item.title}</Link>;
                }) : <p className='text-canvas/60'>Ehhez az alkotóhoz még nincs kapcsolt előadás.</p>}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default CreatorDetailPage;