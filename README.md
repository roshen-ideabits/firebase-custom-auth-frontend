# auth-frontend

Minimal frontend to exercise the Firebase-powered auth backend.

## Scripts

- `npm start` – serves the static app on `http://localhost:5173`.

## Configuration

The frontend expects the backend base URL in `window.AUTH_API_BASE_URL`. By default it points to `http://localhost:4000`. To change it, define the variable before loading `main.js` or run the frontend behind a proxy that rewrites `/api` calls.
