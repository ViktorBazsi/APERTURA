import ButtonLink from '../ui/ButtonLink';
import Section from '../ui/Section';
import Badge from '../ui/Badge';

function TeaserSplit() {
  return (
    <Section className="pt-0">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-gold/15 via-transparent to-transparent p-8">
          <Badge tone="gold">Cucli</Badge>
          <h3 className="editorial-title mt-5 text-4xl">Külön brand, mégis a társulat nyelvén.</h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-canvas/72">
            A Cucli játékosabb, nyitottabb belépési pont a fiatalabb közönség és a közösségi formák felé. Saját oldalszekcióként is erős marad.
          </p>
          <div className="mt-6">
            <ButtonLink to="/cucli" variant="secondary">Cucli oldal</ButtonLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-ember/15 via-transparent to-transparent p-8">
          <Badge tone="warm">Terembérlet</Badge>
          <h3 className="editorial-title mt-5 text-4xl">Nyitott stúdió próbákra, workshopokra, kisebb eseményekre.</h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-canvas/72">
            A felület már most alkalmas gyors kapcsolatfelvételre, később pedig egyszerű foglalási logikával bővíthető.
          </p>
          <div className="mt-6">
            <ButtonLink to="/teremberlet">Terembérlet részletei</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default TeaserSplit;
