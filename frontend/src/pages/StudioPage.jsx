import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';

function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow='Stúdió'
        title='Stúdió'
        description='Itt jelennek meg később az Apertúra stúdiójához kapcsolódó tartalmak, bemutatók és háttéranyagok.'
        meta='Előkészített placeholder oldal'
      />
      <Section>
        <div className='surface p-8'>
          <p className='max-w-3xl text-base leading-8 text-canvas/72'>A stúdióoldal első körben helyőrzőként működik. A következő etapban ide kerülhetnek technikai információk, fotók, térhasználati részletek és kapcsolódó programok.</p>
        </div>
      </Section>
    </>
  );
}

export default StudioPage;