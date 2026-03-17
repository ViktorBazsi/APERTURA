# DEVLOG

## ETAP 1

- létrejött a `backend/` alapstruktúra Express + Prisma + JWT auth alappal
- elkészült a Prisma schema a `User`, `Creator`, `Performance`, `Event`, `News`, `Critique` modellekkel
- elkészültek az auth endpointok: `register`, `login`, `me`
- elkészültek az alap public/admin CRUD route-ok és a slug alapú public lekérdezések creator/performance entitásokhoz
- bekerült a Cloudinary config és a képfeltöltési middleware + upload route előkészítés
- a frontend kapott API clientet és service layert
- a frontend auth context most tokennel és current user betöltéssel működő alap
- elkészült az admin route guard és az admin layout
- elkészültek a Formik alapú admin formok: creator, performance, event, news, critique
- az előadások és alkotók külön detail route-ot kaptak a modalos megoldás helyett
- létrejött a `ModalContext`, valamint a későbbi theme és locale bővítés placeholder contextje

## ETAP 1.1

- normalizáltam az env-kezelést úgy, hogy a futó backend és frontend a normál `.env` fájlokat használja
- a `.env.example` fájlok sablonként megmaradtak dokumentációs célra
- pontosítottam a Neon + Prisma `DATABASE_URL` mintát és a README futtatási leírását

## ETAP 1.2

- kivettem a `multer-storage-cloudinary` csomagot, mert peer dependency konfliktust okozott a `cloudinary@2.x` verzióval
- a backend upload előkészítést stabil `multer` memory storage + `cloudinary.uploader.upload_stream` logikára cseréltem
- a frontend `package.json` BOM hibáját javítottam, mert ez törte el a PostCSS betöltést a Vite indításkor

## ETAP 2

- axios alapú frontend API kliensre váltottam a korábbi fetch helyett
- elkészült a Prisma seed script és a demo accountok létrehozása
- a publikus oldalak és detail oldalak backend API-ról töltik az adatokat
- elkészült a frontend regisztrációs oldal és a register flow
- az admin listák és create műveletek backend-alapúak lettek
- a korábbi mock adatfájlokat és a párhuzamos fallback adatforrást kivezettem

## ETAP 3

- a Prisma schema bővült a PerformanceImage modellel, és a seed is kapott galériaképeket
- teljesen bekötöttem a Cloudinary upload flow-t creator, performance poster, performance gallery és news cover képekhez
- az admin felületen elkészült a create, edit és delete flow minden fő entitáshoz confirm modallal és hiba-visszajelzéssel
- az előadásokhoz UI-ból szerkeszthető creator kapcsolat és galéria támogatás került
- elkészült a publikus news detail oldal SEO title és meta description frissítéssel


## Finomítás

- egyszerűsítettem a vendég auth CTA-t: a headerben csak a Belépés maradt
- a login és register oldal kapott egymásra mutató, kulturált cross-linket
- javítottam a publikus image renderelést a társulat-, alkotó- és előadásoldalakon, placeholder megjelenítéssel


## Műsor és regisztráció finomítás

- a műsor oldalon kattinthatóvá tettem az eseménykártyákat és elkészült a valódi havi naptárnézet hónapváltással
- a regisztráció bővült keresztnév, vezetéknév és opcionális telefon mezőkkel
- pontosítottam a register validációt frontend és backend oldalon is
- az előadás és esemény jegylinkjei kulturált, külön címkézett gombként jelennek meg


## Profil, rating, feedback, dokumentumok

- elkészült a bejelentkezett felhasználók profiloldala saját adatmódosítással és hírlevél kapcsolóval
- bekerült az előadás rating rendszer 1-5 csillaggal, userenként egy értékeléssel és átlag összegzéssel
- elkészült a performance feedback rendszer saját/admin törlési jogosultsággal
- a performance galéria kattintható lightbox nézegetőt kapott
- létrejött a publikus Dokumentumok oldal és az admin PDF feltöltés / törlés flow
- a műsor havi naptárnézete redesignolva lett kiválasztott napi eseménylistával


## Navigáció finomítás

- az Egyeztessünk gomb kikerült a headerből
- a Kilépés gomb piros, kiemelt destruktív CTA-ként jelenik meg desktopon és mobilon is
- bekerült az új Stúdió menüpont és a hozzá tartozó alap oldal


## Admin navigáció finomítás

- az admin most már ugyanazt a publikus felületet és főmenüt látja, mint a normál user
- az admin dashboard külön Admin menüponttal érhető el desktop és mobil nézetben is


## Műsor naptár finomítás

- a kiválasztott nap eseményei most már külön blokkban, a naptár alatt listázódnak
- az aznapi eseménylista teljes kártyafelülettel kattintható és az előadás detail oldalra visz
- a havi naptár celláiból kikerültek a zsúfolt részletek, helyettük finom eseményjelölés maradt
- a mobilos havi nézet arányosabb, tisztább, Apple Calendar-szerűbb irányt kapott
