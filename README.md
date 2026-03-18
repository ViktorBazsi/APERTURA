# APERTURA

Fullstack Apertúra alap frontenddel és backenddel.

## Env fájlok

Szükséges env fájlok:

- `backend/.env`
- `frontend/.env`

A `.env.example` fájlok minták, ezeket másold át `.env` névre.
A backend `.env` fájlban szükséges a `DATABASE_URL`, a Cloudinary adatok és a contact email küldés SMTP adatai:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_RECEIVER_EMAIL`

A kapcsolat űrlap a `CONTACT_RECEIVER_EMAIL` címre küld, alapértelmezetten: `viktor.balazs.endre@gmail.com`.

## Backend indítás

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run seed
npm run dev
```

## Frontend indítás

```bash
cd frontend
npm install
npm run dev
```

## Contact email teszt

1. töltsd ki a backend `.env` SMTP mezőit
2. indítsd el a backendet és a frontendet
3. nyisd meg a `/kapcsolat` oldalt
4. küldj egy tesztüzenetet a formból
5. ellenőrizd, hogy az email megérkezik a `viktor.balazs.endre@gmail.com` címre

## Demo accountok

- admin: `admin@apertura.local` / `admin123`
- user: `lia@apertura.local` / `user123`
- user: `miklos@apertura.local` / `user123`
- user: `anna@apertura.local` / `user123`

## Új oldalak és funkciók

- profil oldal: `/profil`
- dokumentumok: `/dokumentumok`
- admin dokumentumkezelés: `/admin/documents`
- performance rating: 1 user / 1 előadás / 1 rating
- performance feedback: több feedback is írható, saját vagy admin törléssel
- galéria lightbox a performance detail oldalon
- havi műsornaptár kiválasztott nap eseménylistával
- kapcsolat űrlap backend email küldéssel a `POST /api/contact` végponton

## Dokumentumok és upload

- publikus dokumentumlista a `GET /api/documents` végpontról tölt
- admin PDF feltöltés: `POST /api/uploads/document`
- dokumentum létrehozás: `POST /api/documents`

## Rating és feedback

- rating összegzés: `GET /api/performances/:id/ratings-summary`
- saját rating mentése: `POST /api/performances/:id/rating`
- feedback lista: `GET /api/performances/:id/feedbacks`
- feedback küldés: `POST /api/performances/:id/feedbacks`
- feedback törlés: `DELETE /api/feedbacks/:id`