# Nutrishita Deployment (Free tier)

This app is a React (Vite) frontend + Express API in the same repo.
It is configured to deploy as one web service (single URL) while still keeping the same API routes:

- Frontend: built by Vite and served by Express
- Backend: booking, email, and optional Google Calendar routes

## Prerequisites

- A free MongoDB Atlas account + a free cluster (`M0`)
- GitHub account
- A free Render account

## 1) Environment variables

Create these environment variables in Render for the `nutrishita` service:

- `MONGO_URI` (required)
- `CLIENT_ORIGINS` (required for production CORS), e.g. your Render domain `https://nutrishita.onrender.com`
- `EMAIL_USER` (optional, Gmail address)
- `EMAIL_PASS` (optional, Gmail app password)
- `ADMIN_EMAIL` (optional)
- `DEFAULT_MEETING_LINK` (optional)
- `GOOGLE_CALENDAR_CLIENT_ID` (optional)
- `GOOGLE_CALENDAR_CLIENT_SECRET` (optional)
- `GOOGLE_CALENDAR_REFRESH_TOKEN` (optional)
- `GOOGLE_CALENDAR_ID` (optional)
- `GOOGLE_CALENDAR_TIMEZONE` (optional)
- `BRAND_NAME` (optional)

Notes:

- If `EMAIL_*` is missing, booking emails are skipped gracefully.
- If Google Calendar vars are missing, API falls back to `DEFAULT_MEETING_LINK`.

## 2) Deploy on Render

1. Push this repo to GitHub.
2. Create a new Web Service in Render and connect the repo.
3. Render can detect settings from `render.yaml`, or use manually:
   - **Root Directory**: repository root
   - **Build Command**: `npm run install:all && npm run build:client`
   - **Start Command**: `npm run start`
4. Set service plan to **Free**.
5. Set all required environment variables and deploy.

After deployment succeeds, open the service URL shown by Render (example: `https://nutrishita.onrender.com`).
That single URL serves both:

- Web UI
- API endpoints (`/api/slots`, `/api/book`, etc.)

## 3) Verify deployment

- Visit `https://<your-render-url>/api/health`
- Expected response:
  - `{"ok":true,"service":"nutrishita-api","mongo":true}` (mongo shows true after DB connects)

## Local dev commands

- Frontend + backend together: `npm run dev`
- Backend only: `npm run dev:server`
- Frontend only: `npm run dev:client`

## Optional one-click deploy

- `render.yaml` is included so Render can auto-detect the service config.
