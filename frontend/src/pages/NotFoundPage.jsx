import ButtonLink from '../components/ui/ButtonLink';
import Container from '../components/ui/Container';

function NotFoundPage() {
  return (
    <section className="py-24">
      <Container>
        <div className="surface p-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-canvas/45">404</p>
          <h1 className="editorial-title mt-5 text-5xl">Ez az oldal most nincs műsoron.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-canvas/72">
            A keresett tartalom nem található, de a repertoár és a kapcsolati oldalak innen is elérhetők.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/">Vissza a nyitóoldalra</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NotFoundPage;
