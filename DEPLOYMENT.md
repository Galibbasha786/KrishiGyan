Deployment guide

Overview
- Frontend: deploy `client/` to Vercel
- Backend: deploy `server/` to Render (or any Node host)

Required env vars
- On Render (service): set `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` (or `ALLOWED_ORIGINS`), `PORT` (optional)
- On Vercel (project settings): set `VITE_API_BASE` to `https://<your-backend>/api`

Steps (minimal)
1. Push code to GitHub (root repository).
   - git add .
   - git commit -m "Prepare for Vercel + Render deployment: env + CORS + security"
   - git push origin main

2. Backend (Render)
   - Create a new Web Service on Render and connect your GitHub repository.
   - Build command: `npm install`
   - Start command: `npm start`
   - Set environment variables in the Render dashboard using values from `.env.example`.
   - Deploy. Copy the service URL (e.g., `https://my-backend.onrender.com`).

3. Frontend (Vercel)
   - In Vercel, add a new project and connect the same GitHub repo, choose the `client/` folder as the project root.
   - Set environment variable `VITE_API_BASE` to `https://<your-backend>/api` in the Vercel project settings.
   - Vercel will run the build (`npm install` + `npm run build`) and deploy the site.

Security notes
- Keep `JWT_SECRET` and DB credentials private and never commit them.
- Restrict `ALLOWED_ORIGINS` or `FRONTEND_URL` to your Vercel domain to prevent unauthorized cross-origin requests.
- Render and Vercel provide HTTPS; ensure you use the HTTPS backend URL in `VITE_API_BASE`.

Local dev
- Copy `.env.example` to `.env` in `server/` or set env vars locally.
- For client local dev, create a `.env` file in `client/` with `VITE_API_BASE=http://localhost:8080/api`.

Git push from terminal (example)

```bash
# from repository root
git add .
git commit -m "Prepare for Vercel + Render deployment: env + CORS + security"
git push origin main
```

If you want, I can commit these changes for you and show the exact commands to push.
