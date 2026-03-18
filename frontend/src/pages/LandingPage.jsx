import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import DatePill from '../components/ui/DatePill';
import ButtonLink from '../components/ui/ButtonLink';
import ImageOverlayLinkCard from '../components/ui/ImageOverlayLinkCard';
import { useAuth } from '../context/AuthContext';
import { creatorService } from '../services/creator.service';
import { eventService } from '../services/event.service';
import { newsService } from '../services/news.service';

function LandingPage() {
  const { user, isAuthenticated } = useAuth();
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const displayName = useMemo(() => user?.firstName || user?.lastName || user?.email?.split('@')[0] || '', [user]);

  useEffect(() => {
    Promise.all([newsService.list(), eventService.list(), creatorService.list()])
      .then(([newsItems, eventItems, creatorItems]) => {
        setNews(newsItems.slice(0, 4));
        setEvents(eventItems.slice(0, 4));
        setCreators(creatorItems.slice(0, 3));
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <section className='pb-14 pt-8 md:pb-20 md:pt-12'>
        <Container>
          <div className='grid gap-6 overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-transparent px-7 py-8 shadow-[0_34px_110px_rgba(0,0,0,0.24)] md:grid-cols-[1.18fr_0.82fr] md:px-10 md:py-12 lg:px-12 lg:py-14'>
            <div>
              {isAuthenticated && displayName ? <div className='mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-canvas/72'>Szia, <span className='ml-1 text-canvas'>{displayName}</span>!</div> : null}
              <Badge tone='warm'>Budapesti független színház</Badge>
              <h1 className='editorial-title mt-6 max-w-4xl text-5xl leading-[0.94] md:text-7xl'>Kortárs előadások, közeli terek, nyitott alkotói jelenlét.</h1>
              <p className='mt-6 max-w-2xl text-lg leading-8 text-canvas/72'>Az Apertúra nyitóoldala teljesen backend-alapú adatforrásból épül: hírek, műsor, társulat és részletes előadás-oldalak egyetlen szerkezetből frissíthetők.</p>
              <div className='mt-8 flex flex-wrap gap-3'>
                <ButtonLink to='/musor' size='lg'>Közelgő műsor</ButtonLink>
                <ButtonLink to='/eloadasok' variant='secondary' size='lg'>Repertoár megnyitása</ButtonLink>
              </div>
            </div>
            <div className='grid gap-4 md:pl-6 lg:pl-10'>
              <div className='surface p-6 md:p-7'>
                <p className='text-xs uppercase tracking-[0.28em] text-canvas/42'>Élő szerkezet</p>
                <p className='mt-3 editorial-title text-3xl leading-tight'>Adminból szerkeszthető képek, hírek és kapcsolatok egy levegős, bemutatható felületen.</p>
              </div>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='surface p-5 md:p-6'>
                  <p className='text-xs uppercase tracking-[0.28em] text-canvas/42'>Hírek</p>
                  <p className='mt-3 text-4xl text-gold'>{news.length}</p>
                </div>
                <div className='surface p-5 md:p-6'>
                  <p className='text-xs uppercase tracking-[0.28em] text-canvas/42'>Események</p>
                  <p className='mt-3 text-4xl text-ember'>{events.length}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section eyebrow='Kiemelések' title='Friss hírek és fókuszpontok' description='A hírek külön detail oldalakra mutatnak, SEO meta frissítéssel.'>
        {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
        {error ? <p className='text-ember'>{error}</p> : null}
        {!isLoading && !error ? (
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
            {news.length ? news.map((item) => (
              <Card key={item.id}>
                {item.coverImageUrl ? <img src={item.coverImageUrl} alt={item.title} className='h-48 w-full rounded-[24px] object-cover' /> : null}
                <div className='mt-5 flex items-center justify-between gap-3'>
                  <Badge>{new Date(item.publishedAt).getFullYear()}</Badge>
                  <DatePill date={item.publishedAt} />
                </div>
                <h3 className='mt-5 text-[1.75rem] font-medium leading-snug'>{item.title}</h3>
                <p className='mt-4 text-sm leading-7 text-canvas/68'>{item.excerpt}</p>
                <Link to={`/news/${item.slug}`} className='mt-7 inline-flex text-sm text-gold hover:text-canvas'>Hír megnyitása</Link>
              </Card>
            )) : <p className='text-canvas/60'>Nincs még publikált hír.</p>}
          </div>
        ) : null}
      </Section>

      <Section eyebrow='Műsor' title='Közelgő előadások' description='Az eseménykártyák az előadás detail oldalakra vezetnek.'>
        {!isLoading && !error ? (
          <div className='grid gap-6 lg:grid-cols-2'>
            {events.length ? events.map((event) => (
              <ImageOverlayLinkCard
                key={event.id}
                to={event.performance?.slug ? `/eloadasok/${event.performance.slug}` : '/musor'}
                imageUrl={event.performance?.posterUrl}
                alt={event.performance?.title || 'Program'}
                title={event.performance?.title || 'Program'}
                subtitle={event.venue}
                description={event.performance?.shortDescription}
                badge='műsor'
                meta={new Date(event.startAt).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}
                imagePosition='center top'
                placeholder='Eseményvizuál hamarosan'
                className='min-h-[380px]'
              />
            )) : <p className='text-canvas/60'>Nincs közelgő esemény.</p>}
          </div>
        ) : null}
      </Section>

      <Section eyebrow='Társulat' title='Alkotók, akik közeget is építenek' description='A társulati profilokhoz és kapcsolódó előadásokhoz külön route-ok tartoznak.'>
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
                meta='társulat'
                imagePosition='center top'
                placeholder='Társulati portré hamarosan'
                className='min-h-[380px]'
              />
            )) : <p className='text-canvas/60'>Nincs még társulati adat.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default LandingPage;