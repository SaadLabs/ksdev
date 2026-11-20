# KSDev Studio

MERN implementation of the supplied KSDev Studio Stitch export. It includes the public studio funnel, searchable portfolio and case studies, custom project brief intake, and a protected CMS for projects, pricing, site content, technology tags, and user roles.

## Frontend file map

```text
src/
  main.jsx                 Starts React and loads the app-wide stylesheet
  App.jsx                  Defines the public and admin routes
  pages/                   Public pages: home, project list, case study
  admin/                   Admin login, layout, dashboard, and CMS pages
  components/              Shared UI used by multiple pages
  hooks/useSite.js         Loads public content from the API
  lib/api.js               Shared function for API requests
  data/                    Default site settings and new-project form values
  style.css                Base styles
  stitch.css               Stitch layout, page styling, and responsive overrides
```

When changing a screen, start in its page file. For example, the public project archive is `src/pages/Projects.jsx`, while project editing in the admin is `src/admin/ProjectEditorPage.jsx`.

## Run locally

1. Install Node.js 18+ and MongoDB Community Server, then start MongoDB.
2. Copy `.env.example` to `.env` and set a private `JWT_SECRET` and `ADMIN_PASSWORD`.
3. Install and start the client and API:

   ```sh
   npm install
   npm run dev
   ```

The website runs at `http://localhost:5173`; the Express API runs at `http://localhost:5000`. On the first successful MongoDB connection, the API seeds example portfolio projects, service packages, technology tags, public site settings, and the first admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Admin

Open `/admin/login` and sign in with the email and password configured in `.env`. The admin can create, edit, publish, archive, and delete projects; upload project images (JPEG/PNG/WebP, max 5 MB each); edit packages and Fiverr URLs; update public copy and visibility; manage technology tags; and adjust user roles and access.

Project briefs are validated and saved by the API to `server/inquiries.json`. Uploaded images are stored under `server/uploads/`. Back up those folders along with MongoDB in production.

## Production build

`npm run build` creates the Vite bundle in `dist`. `npm start` runs the Express API and serves that bundle. Configure a persistent MongoDB database, strong secrets, HTTPS, and durable storage for uploads and brief submissions before deployment.
