import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import { siteMeta } from '../content/site';

function KapcsolatPage() {
  return (
    <>
      <PageHero
        eyebrow='Kapcsolat'
        title='Beszéljünk együttműködésről, meghívásról vagy térhasználatról'
        description='A kapcsolatoldal továbbra is könnyű belépési pont kulturális partnerek, szervezők és érdeklődők számára.'
        meta='A címadatok és az űrlap később CMS-re vagy backend lead-kezelésre is köthetők.'
      />

      <Section>
        <div className='grid gap-5 lg:grid-cols-[0.9fr_1.1fr]'>
          <div className='space-y-5'>
            <div className='rounded-[32px] border border-white/10 bg-canvas p-8 text-ink'>
              <p className='text-sm uppercase tracking-[0.24em] text-ink/45'>Elérhetőségek</p>
              <div className='mt-6 space-y-4'>
                <p>{siteMeta.contact.address}</p>
                <p>{siteMeta.contact.email}</p>
                <p>{siteMeta.contact.phone}</p>
              </div>
            </div>

            <div className='surface p-8'>
              <p className='text-sm uppercase tracking-[0.24em] text-canvas/45'>Social</p>
              <div className='mt-6 flex flex-wrap gap-3'>
                {siteMeta.socials.map((social) => (
                  <a key={social.label} href={social.href} className='rounded-full border border-white/10 px-4 py-2 text-sm text-canvas/75 hover:bg-white/10 hover:text-canvas'>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className='surface p-8'>
            <h2 className='text-3xl'>Kapcsolatfelvétel</h2>
            <form className='mt-6 grid gap-4 sm:grid-cols-2'>
              <input className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='Név' />
              <input className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35' placeholder='E-mail' />
              <input className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35 sm:col-span-2' placeholder='Tárgy' />
              <textarea className='min-h-40 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-canvas/35 sm:col-span-2' placeholder='Írd meg röviden, miben keresel bennünket.' />
              <button type='button' className='inline-flex w-fit rounded-full bg-ember px-5 py-3 text-sm font-medium text-white hover:bg-[#e57a57] sm:col-span-2'>
                Üzenetküldés UI
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

export default KapcsolatPage;