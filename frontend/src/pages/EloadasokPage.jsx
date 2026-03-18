import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ImageOverlayLinkCard from '../components/ui/ImageOverlayLinkCard';
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
              <ImageOverlayLinkCard
                key={performance.id}
                to={`/eloadasok/${performance.slug}`}
                imageUrl={performance.posterUrl}
                alt={performance.title}
                title={performance.title}
                subtitle='Előadás'
                description={performance.shortDescription}
                badge='előadás'
                meta={`${performance.events?.length || 0} időpont`}
                imagePosition='center top'
                placeholder='Előadásplakát hamarosan'
              />
            )) : <p className='text-canvas/60'>Nincs még publikált előadás.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default EloadasokPage;