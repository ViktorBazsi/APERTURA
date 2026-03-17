# APERTURA

Fullstack Apertúra alap frontenddel és backenddel.

## Env fájlok

Szükséges env fájlok:

- `backend/.env`
- `frontend/.env`

A `.env.example` fájlok minták, ezeket másold át `.env` névre.
A backend `.env` fájlban szükséges a `DATABASE_URL`, valamint a Cloudinary adatok:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

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