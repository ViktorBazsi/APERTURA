import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { performanceService } from '../services/performance.service';

function EloadasokPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    performanceService.list()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow='Előadások'
        title='Összekötött repertoárlogika'
        description='Az előadások listája és detail oldala teljesen a backend performance API-ra épül.'
        meta='Minden előadás külön slug alapú route-on érhető el, kapcsolódó alkotókkal és eseményekkel.'
      />

      <Section>
        {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
        {error ? <p className='text-ember'>{error}</p> : null}
        {!isLoading && !error ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {items.length ? items.map((performance) => (
              <Card key={performance.id}>
                {performance.posterUrl ? (
                  <img src={performance.posterUrl} alt={performance.title} className='h-72 w-full rounded-[24px] object-cover' />
                ) : (
                  <div className='flex h-72 w-full items-end rounded-[24px] border border-dashed border-white/15 bg-gradient-to-br from-white/10 to-transparent p-5 text-sm text-canvas/40'>
                    Előadáskép hamarosan
                  </div>
                )}
                <div className='mt-5 flex items-center justify-between gap-3'>
                  <Badge tone='gold'>előadás</Badge>
                  <span className='text-sm text-canvas/45'>{performance.events?.length || 0} időpont</span>
                </div>
                <h2 className='mt-4 text-3xl leading-tight'>{performance.title}</h2>
                <p className='mt-4 text-sm leading-7 text-canvas/70'>{performance.shortDescription}</p>
                <Link to={`/eloadasok/${performance.slug}`} className='mt-7 inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-canvas/82 hover:bg-white/[0.07]'>
                  Detail oldal
                </Link>
              </Card>
            )) : <p className='text-canvas/60'>Nincs még publikált előadás.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default EloadasokPage;