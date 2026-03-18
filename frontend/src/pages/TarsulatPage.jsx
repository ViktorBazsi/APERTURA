import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import ImageOverlayLinkCard from '../components/ui/ImageOverlayLinkCard';
import { creatorService } from '../services/creator.service';

function TarsulatPage() {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    creatorService.list()
      .then(setCreators)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow='Társulat'
        title='Kis léptékű csapat, erős alkotói nyelv'
        description='A társulati oldal közvetlenül a backend creator adataiból épül fel.'
        meta='A profilok külön route-on érhetők el, kapcsolódó előadásokkal együtt.'
      />
      <Section>
        {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
        {error ? <p className='text-ember'>{error}</p> : null}
        {!isLoading && !error ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {creators.length ? creators.map((creator) => (
              <ImageOverlayLinkCard
                key={creator.id}
                to={`/tarsulat/${creator.slug}`}
                imageUrl={creator.coverImageUrl}
                alt={creator.name}
                title={creator.name}
                subtitle={creator.profession}
                description={creator.shortBio}
                badge='alkotó'
                meta={(creator.performances || []).length ? `${(creator.performances || []).length} előadás` : ''}
                imagePosition='center top'
                placeholder='Társulati portré hamarosan'
              />
            )) : <p className='text-canvas/60'>Nincs még publikált társulati adat.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default TarsulatPage;