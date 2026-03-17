import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  { email: 'admin@apertura.local', password: 'admin123', role: 'admin', firstName: 'Apertúra', lastName: 'Admin', phone: '+36 30 555 0001', newsletterSubscribed: true },
  { email: 'lia@apertura.local', password: 'user123', role: 'user', firstName: 'Lia', lastName: 'Fodor', phone: '+36 30 555 0002', newsletterSubscribed: true },
  { email: 'miklos@apertura.local', password: 'user123', role: 'user', firstName: 'Miklós', lastName: 'Szép', phone: '+36 30 555 0003', newsletterSubscribed: false },
  { email: 'anna@apertura.local', password: 'user123', role: 'user', firstName: 'Anna', lastName: 'Toldi', phone: null, newsletterSubscribed: true },
];

const creators = [
  { slug: 'fodor-lia', name: 'Fodor Lia', profession: 'rendező, művészeti vezető', shortBio: 'Kortárs, közösségi fókuszú színházi alkotó.', longBio: 'Dokumentarista és költői színházi nyelven dolgozik, előadásai rendszeresen épülnek személyes történetekre és városi helyzetekre.', coverImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80' },
  { slug: 'szep-miklos', name: 'Szép Miklós', profession: 'színész, alkotótárs', shortBio: 'Fizikai színházi és zenei fókuszú alkotó.', longBio: 'Erős testi jelenléttel, mozgással és élő hangzással dolgozik, munkáiban a városi lét és az intimitás feszültsége jelenik meg.', coverImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80' },
  { slug: 'toldi-anna', name: 'Toldi Anna', profession: 'dramaturg', shortBio: 'Interjú- és irodalmi alapú dramaturgiai munkák.', longBio: 'Kortárs irodalmi szövegek és személyes interjúk alapján épít sokrétegű színházi dramaturgiát.', coverImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80' },
  { slug: 'varadi-noemi', name: 'Váradi Noémi', profession: 'produkciós vezető', shortBio: 'A társulat működésének szervező motorja.', longBio: 'A független működés operatív hátterét, a közönségkapcsolatot és a partneri egyeztetéseket is összefogja.', coverImageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80' },
  { slug: 'gellert-zsombor', name: 'Gellért Zsombor', profession: 'fény- és látványtervező', shortBio: 'Visszafogott, mégis erős vizuális atmoszférákat épít.', longBio: 'A tér és a fény dramaturgiáját a társulat kortárs előadásaihoz igazítva alakítja ki.', coverImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80' },
  { slug: 'bardosi-juli', name: 'Bárdosi Juli', profession: 'kommunikáció, közönségkapcsolat', shortBio: 'Közösségi jelenlét és programkommunikáció.', longBio: 'Beszélgetések, közönségtalálkozók és nyitott programok mentén épít kapcsolatot a társulat és a nézők között.', coverImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80' },
];

const performances = [
  { slug: 'remego-feny', title: 'Remegő fény', shortDescription: 'Intim stúdióelőadás testvérkapcsolatról és városi magányról.', longDescription: 'A Remegő fény egy kis térben játszódó, sűrű atmoszférájú kortárs előadás, ahol a családi közelség és az elhallgatások dramaturgiája kerül fókuszba.', posterUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80', ticketLink: 'https://example.com/jegyek/remego-feny' },
  { slug: 'udvarhang', title: 'Udvarhang', shortDescription: 'Helyspecifikus sétaelőadás udvarok és történetek között.', longDescription: 'Az Udvarhang belső udvarok, folyosók és kapualjak emlékezetéből dolgozik, mozgással és élő hangrétegekkel.', posterUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80', ticketLink: 'https://example.com/jegyek/udvarhang' },
  { slug: 'atjarok', title: 'Átjárók', shortDescription: 'Dokumentarista előadás személyes történetekből.', longDescription: 'Interjúkból, zenei motívumokból és közösségi gyűjtésből épülő produkció a kapcsolódás lehetőségeiről.', posterUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', ticketLink: 'https://example.com/jegyek/atjarok' },
  { slug: 'nyitott-hatar', title: 'Nyitott határ', shortDescription: 'Erősen vizuális, mozgásfókuszú színházi este.', longDescription: 'Kevés szöveggel, pontos testképekkel és zenei szerkezettel dolgozó fizikai színházi alkotás.', posterUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80', ticketLink: 'https://example.com/jegyek/nyitott-hatar' },
  { slug: 'cucli-labor', title: 'Cucli Labor', shortDescription: 'Közösségi és ifjúsági programvonal az Apertúrán belül.', longDescription: 'Workshopok, nyitott laborok és mini-események könnyedebb formában, de erős művészeti fókuszszal.', posterUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80', ticketLink: 'https://example.com/jegyek/cucli-labor' },
];

const performanceImages = {
  'remego-feny': ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80'],
  udvarhang: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=1200&q=80'],
  atjarok: ['https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80'],
  'nyitott-hatar': ['https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80'],
  'cucli-labor': ['https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?auto=format&fit=crop&w=1200&q=80'],
};

const creatorPerformanceMap = {
  'fodor-lia': ['remego-feny', 'udvarhang', 'atjarok'],
  'szep-miklos': ['udvarhang', 'nyitott-hatar'],
  'toldi-anna': ['remego-feny', 'atjarok'],
  'varadi-noemi': ['cucli-labor', 'nyitott-hatar'],
  'gellert-zsombor': ['remego-feny', 'udvarhang', 'cucli-labor'],
  'bardosi-juli': ['atjarok', 'cucli-labor'],
};

const events = [
  { id: 'evt-remego-1', performanceSlug: 'remego-feny', startAt: new Date('2026-04-04T19:00:00.000Z'), venue: 'Apertura Stúdió, Budapest VIII.', ticketLink: 'https://example.com/jegyek/remego-feny-1' },
  { id: 'evt-remego-2', performanceSlug: 'remego-feny', startAt: new Date('2026-04-18T19:00:00.000Z'), venue: 'Apertura Stúdió, Budapest VIII.', ticketLink: 'https://example.com/jegyek/remego-feny-2' },
  { id: 'evt-udvarhang-1', performanceSlug: 'udvarhang', startAt: new Date('2026-04-10T18:30:00.000Z'), venue: 'Kazánház Udvar, Budapest IX.', ticketLink: 'https://example.com/jegyek/udvarhang-1' },
  { id: 'evt-udvarhang-2', performanceSlug: 'udvarhang', startAt: new Date('2026-05-02T18:30:00.000Z'), venue: 'Kazánház Udvar, Budapest IX.', ticketLink: 'https://example.com/jegyek/udvarhang-2' },
  { id: 'evt-atjarok-1', performanceSlug: 'atjarok', startAt: new Date('2026-04-12T19:30:00.000Z'), venue: 'Apertura Stúdió, Budapest VIII.', ticketLink: 'https://example.com/jegyek/atjarok-1' },
  { id: 'evt-atjarok-2', performanceSlug: 'atjarok', startAt: new Date('2026-05-09T19:30:00.000Z'), venue: 'Apertura Stúdió, Budapest VIII.', ticketLink: 'https://example.com/jegyek/atjarok-2' },
  { id: 'evt-nyitott-1', performanceSlug: 'nyitott-hatar', startAt: new Date('2026-04-24T19:00:00.000Z'), venue: 'Trafó Klubszoba', ticketLink: 'https://example.com/jegyek/nyitott-hatar-1' },
  { id: 'evt-cucli-1', performanceSlug: 'cucli-labor', startAt: new Date('2026-04-17T17:00:00.000Z'), venue: 'Cucli Tér, Budapest VIII.', ticketLink: 'https://example.com/jegyek/cucli-1' },
];

const newsItems = [
  { slug: 'evadindito', title: 'Elindult az új évad arculata és tavaszi programja', excerpt: 'Új vizuális irány, fókuszált műsorstruktúra és közösségi programok.', content: 'Az Apertura új arculattal és tavaszi programkínálattal indul tovább, amely egyszerre koncentrál az előadásokra és a nyitott közösségi alkalmakra.', coverImageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80', publishedAt: new Date('2026-03-12T10:00:00.000Z') },
  { slug: 'cucli-labor-tavasz', title: 'Cucli Labor: nyitott alkotói délután', excerpt: 'Közös gondolkodás és kísérletezés fiatal alkotóknak.', content: 'A Cucli Labor következő alkalma workshopokkal, jelenetvázlatokkal és nyitott beszélgetésekkel várja az érdeklődőket.', coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80', publishedAt: new Date('2026-03-09T10:00:00.000Z') },
  { slug: 'udvarhang-turne', title: 'Az Udvarhang új helyszíneken folytatja útját', excerpt: 'Az előadás vidéki állomásokkal bővül.', content: 'A helyspecifikus produkció új városi terekben és új partnerhelyszíneken jelenik meg a tavasz során.', coverImageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80', publishedAt: new Date('2026-03-05T10:00:00.000Z') },
  { slug: 'teremberlet-nyitas', title: 'Elindult a terembérleti felület', excerpt: 'Próbákhoz és workshopokhoz is megnyílik az Apertura tere.', content: 'A stúdió mostantól külső kulturális partnerek számára is elérhető, egyszerű érdeklődési folyamattal.', coverImageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80', publishedAt: new Date('2026-02-28T10:00:00.000Z') },
  { slug: 'kozonsegtalalkozo-atjarok', title: 'Közönségtalálkozó az Átjárók után', excerpt: 'Az előadás után nyitott beszélgetés következik.', content: 'Az Átjárók következő estjéhez nyitott közönségtalálkozó kapcsolódik a társulat alkotóival.', coverImageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', publishedAt: new Date('2026-02-20T10:00:00.000Z') },
];

const critiques = [
  { id: 'crit-remego-1', performanceSlug: 'remego-feny', title: 'Sűrű közelség és pontos csöndek', source: 'Revizor', url: 'https://example.com/kritika/remego-1', quote: 'Intim, erős atmoszférájú előadás.' },
  { id: 'crit-udvarhang-1', performanceSlug: 'udvarhang', title: 'A városi udvar mint színházi tér', source: 'Színház.net', url: 'https://example.com/kritika/udvarhang-1', quote: 'A helyszín itt valódi dramaturgiai tényező.' },
  { id: 'crit-atjarok-1', performanceSlug: 'atjarok', title: 'Dokumentum és jelenlét határán', source: 'Kultúra.hu', url: 'https://example.com/kritika/atjarok-1', quote: 'Érzékeny és pontos dokumentarista munka.' },
  { id: 'crit-nyitott-1', performanceSlug: 'nyitott-hatar', title: 'Testképek és ritmusok', source: 'Fidelio', url: 'https://example.com/kritika/nyitott-1', quote: 'Erős vizualitás, fegyelmezett forma.' },
  { id: 'crit-cucli-1', performanceSlug: 'cucli-labor', title: 'Nyitott forma, erős közösségi figyelem', source: 'Papageno', url: 'https://example.com/kritika/cucli-1', quote: 'A részvételiség itt nem gesztus, hanem szerkezet.' },
];

const documents = [
  { title: 'Szakmai bemutatkozó', description: 'Rövid összefoglaló az Apertúra működéséről.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', fileType: 'application/pdf' },
  { title: 'Technikai rider', description: 'Alap technikai paraméterek és befogadási igények.', fileUrl: 'https://www.africau.edu/images/default/sample.pdf', fileType: 'application/pdf' },
];

const ratingSeeds = [
  { userEmail: 'lia@apertura.local', performanceSlug: 'remego-feny', value: 5 },
  { userEmail: 'miklos@apertura.local', performanceSlug: 'remego-feny', value: 4 },
  { userEmail: 'anna@apertura.local', performanceSlug: 'udvarhang', value: 5 },
];

const feedbackSeeds = [
  { userEmail: 'lia@apertura.local', performanceSlug: 'remego-feny', content: 'Nagyon sűrű és pontos előadás, finom közelséggel.' },
  { userEmail: 'miklos@apertura.local', performanceSlug: 'remego-feny', content: 'Erős vizuális és zenei jelenlét, jó ritmusváltásokkal.' },
  { userEmail: 'anna@apertura.local', performanceSlug: 'udvarhang', content: 'A helyszín itt valóban a dramaturgia része lett.' },
];

async function main() {
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: { firstName: user.firstName, lastName: user.lastName, phone: user.phone, newsletterSubscribed: user.newsletterSubscribed, passwordHash, role: user.role },
      create: { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, newsletterSubscribed: user.newsletterSubscribed, passwordHash, role: user.role },
    });
  }

  for (const creator of creators) {
    await prisma.creator.upsert({ where: { slug: creator.slug }, update: creator, create: creator });
  }

  for (const performance of performances) {
    await prisma.performance.upsert({ where: { slug: performance.slug }, update: performance, create: performance });
  }

  const userRecords = await prisma.user.findMany();
  const creatorRecords = await prisma.creator.findMany();
  const performanceRecords = await prisma.performance.findMany();
  const userByEmail = Object.fromEntries(userRecords.map((item) => [item.email, item]));
  const creatorBySlug = Object.fromEntries(creatorRecords.map((item) => [item.slug, item]));
  const performanceBySlug = Object.fromEntries(performanceRecords.map((item) => [item.slug, item]));

  await prisma.creatorPerformance.deleteMany();
  await prisma.creatorPerformance.createMany({ data: Object.entries(creatorPerformanceMap).flatMap(([creatorSlug, performanceSlugs]) => performanceSlugs.map((performanceSlug) => ({ creatorId: creatorBySlug[creatorSlug].id, performanceId: performanceBySlug[performanceSlug].id }))) });

  await prisma.performanceImage.deleteMany();
  await prisma.performanceImage.createMany({ data: Object.entries(performanceImages).flatMap(([performanceSlug, imageUrls]) => imageUrls.map((imageUrl, index) => ({ performanceId: performanceBySlug[performanceSlug].id, imageUrl, order: index }))) });

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: { performanceId: performanceBySlug[event.performanceSlug].id, startAt: event.startAt, venue: event.venue, ticketLink: event.ticketLink },
      create: { id: event.id, performanceId: performanceBySlug[event.performanceSlug].id, startAt: event.startAt, venue: event.venue, ticketLink: event.ticketLink },
    });
  }

  for (const newsItem of newsItems) {
    await prisma.news.upsert({ where: { slug: newsItem.slug }, update: newsItem, create: newsItem });
  }

  for (const critique of critiques) {
    await prisma.critique.upsert({
      where: { id: critique.id },
      update: { performanceId: performanceBySlug[critique.performanceSlug].id, title: critique.title, source: critique.source, url: critique.url, quote: critique.quote },
      create: { id: critique.id, performanceId: performanceBySlug[critique.performanceSlug].id, title: critique.title, source: critique.source, url: critique.url, quote: critique.quote },
    });
  }

  await prisma.document.deleteMany();
  await prisma.document.createMany({ data: documents });

  await prisma.performanceRating.deleteMany();
  for (const rating of ratingSeeds) {
    await prisma.performanceRating.create({ data: { userId: userByEmail[rating.userEmail].id, performanceId: performanceBySlug[rating.performanceSlug].id, value: rating.value } });
  }

  await prisma.performanceFeedback.deleteMany();
  for (const feedback of feedbackSeeds) {
    await prisma.performanceFeedback.create({ data: { userId: userByEmail[feedback.userEmail].id, performanceId: performanceBySlug[feedback.performanceSlug].id, content: feedback.content } });
  }

  console.log('Seed completed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});