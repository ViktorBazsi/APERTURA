import { useEffect, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { documentService } from '../services/document.service';

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    documentService.list()
      .then(setDocuments)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <PageHero eyebrow='Dokumentumok' title='Letölthető anyagok és PDF-ek' description='Nyilvános dokumentumtár pályázati, szakmai és sajtóanyagokkal.' meta='Minden dokumentum külön megnyitható és letölthető.' />
      <Section>
        {isLoading ? <p className='text-canvas/60'>Betöltés...</p> : null}
        {error ? <p className='text-ember'>{error}</p> : null}
        {!isLoading && !error ? (
          <div className='grid gap-6'>
            {documents.length ? documents.map((document) => (
              <Card key={document.id} className='md:flex md:items-center md:justify-between md:gap-8'>
                <div>
                  <h2 className='text-2xl leading-tight'>{document.title}</h2>
                  {document.description ? <p className='mt-4 max-w-3xl text-sm leading-7 text-canvas/68'>{document.description}</p> : null}
                  <p className='mt-4 text-xs uppercase tracking-[0.2em] text-canvas/40'>{document.fileType} · {new Date(document.createdAt).toLocaleDateString('hu-HU')}</p>
                </div>
                <div className='mt-6 flex flex-wrap gap-3 md:mt-0'>
                  <a href={document.fileUrl} target='_blank' rel='noreferrer noopener' className='inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-canvas/82 hover:bg-white/[0.07]'>Megnyitás</a>
                  <a href={document.fileUrl} download className='inline-flex rounded-full bg-ember px-5 py-3 text-sm text-white hover:bg-[#e57a57]'>Letöltés</a>
                </div>
              </Card>
            )) : <p className='text-canvas/60'>Még nincs feltöltött dokumentum.</p>}
          </div>
        ) : null}
      </Section>
    </>
  );
}

export default DocumentsPage;