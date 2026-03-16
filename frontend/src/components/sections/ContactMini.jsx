import ButtonLink from '../ui/ButtonLink';
import Section from '../ui/Section';
import { siteMeta } from '../../data';

function ContactMini() {
  return (
    <Section
      eyebrow="Kapcsolat"
      title="Beszéljünk előadásról, együttműködésről vagy térről"
      description="Mock kapcsolati tartalommal, később valódi űrlapkezeléssel és admin oldali inbox-szal bővíthető."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-canvas p-8 text-ink">
          <p className="text-sm uppercase tracking-[0.24em] text-ink/45">Elérhetőségek</p>
          <div className="mt-6 space-y-4 text-lg">
            <p>{siteMeta.contact.address}</p>
            <p>{siteMeta.contact.email}</p>
            <p>{siteMeta.contact.phone}</p>
          </div>
        </div>
        <div className="surface flex flex-col justify-between p-8">
          <div>
            <p className="editorial-title text-3xl">Nyitottak vagyunk kulturális partnerségekre és befogadói együttműködésekre.</p>
          </div>
          <div className="mt-6">
            <ButtonLink to="/kapcsolat">Kapcsolati oldal</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ContactMini;
