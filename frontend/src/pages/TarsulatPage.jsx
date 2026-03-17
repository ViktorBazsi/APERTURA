import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
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
              <Card key={creator.id}>
                {creator.coverImageUrl ? (
                  <img src={creator.coverImageUrl} alt={creator.name} className='h-64 w-full rounded-[24px] object-cover' />
                ) : (
                  <div className='flex h-64 w-full items-end rounded-[24px] border border-dashed border-white/15 bg-gradient-to-br from-white/10 to-transparent p-5 text-sm text-canvas/40'>
                    Társulati portré hamarosan
                  </div>
                )}
                <div className='mt-6 flex items-start justify-between gap-4'>
                  <div>
                    <h2 className='text-[1.8rem] leading-tight'>{creator.name}</h2>
                    <p className='mt-2 text-sm uppercase tracking-[0.18em] text-canvas/45'>{creator.profession}</p>
                  </div>
                  {(creator.performances || []).length ? <Badge tone='gold'>{(creator.performances || []).length} előadás</Badge> : null}
                </div>
                <p className='mt-5 text-sm leading-7 text-canvas/70'>{creator.shortBio}</p>
                <div className='mt-6 flex flex-wrap gap-2'>
                  {(creator.performances || []).slice(0, 3).map((performance) => {
                    const item = performance.performance || performance;
                    return <Badge key={item.id}>{item.title}</Badge>;
                  })}
                </div>
                <Link to={`/tarsulat/${creator.slug}`} className='mt-7 inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-canvas/82 hover:bg-white/[0.07]'>
                  Detail oldal
                </Link>
              </Card>
            )) : <p className='text-canvas/60'>Nincs még publikált társulati adat.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default TarsulatPage;