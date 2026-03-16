import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ButtonLink from '../components/ui/ButtonLink';

const features = [
  'rugalmas próbatér és workshop-környezet',
  'alap fény- és hangtechnikai lehetőségek',
  'intim nézőtéri elrendezés kisebb eseményekhez',
  'belvárosi elhelyezkedés, kulturális közegben',
];

function TeremberletPage() {
  return (
    <>
      <PageHero
        eyebrow="Terembérlet"
        title="Karakteres tér próbákra, laborokra és kisebb eseményekre"
        description="A terembérlet-oldal egyszerűen értékesíthetővé teszi a helyszínt, miközben a későbbi inquiry vagy booking flow számára is előkészített."
        meta="A mostani form UI még nem küld adatot, de a mezők és a szekciólogika már készen állnak a backend-integrációra."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h2 className="text-3xl">A tér előnyei</h2>
            <div className="mt-6 space-y-3">
              {features.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-canvas/72">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <ButtonLink to="/kapcsolat">Érdeklődöm</ButtonLink>
            </div>
          </Card>

          <div className="surface p-6">
            <h2 className="text-3xl">Gyors érdeklődés</h2>
            <form className="mt-6 grid gap-4">
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35" placeholder="Név" />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35" placeholder="E-mail cím" />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35" placeholder="Milyen célra keresel teret?" />
              <textarea className="min-h-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35" placeholder="Rövid leírás, időpont, létszám" />
              <button type="button" className="inline-flex w-fit rounded-full bg-ember px-5 py-3 text-sm font-medium text-white hover:bg-[#e57a57]">
                Küldés későbbi backendhez
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

export default TeremberletPage;
