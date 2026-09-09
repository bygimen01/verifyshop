# Verify24 React

React + Vite frontend with an Express backend that sends structured requests to a Telegram bot.

## Configuration

Public website content is stored in `public/config.json`:

- brand name and tagline
- email and Telegram contacts
- prices and service descriptions
- statistics
- FAQ

Private Telegram credentials are stored in `server/server-config.json`:

- `botToken`
- `chatId`
- backend port

Never move the bot token into `public/config.json`. Everything inside `public` is available to the browser.

Before production deployment, replace the placeholder email and Telegram contact in `public/config.json` with the real company contacts.

## Local development

1. Run `npm install`.
2. Copy `server/server-config.example.json` to `server/server-config.json` if needed.
3. Fill in the Telegram bot token and target chat ID.
4. Run `npm run dev`.

Frontend: `http://localhost:5173`
Backend: `http://localhost:3001`

## Production

Run:

```bash
npm install
npm run build
npm start
```

Express serves the built `dist` directory and the `/api/requests` endpoint.

Use a reverse proxy such as Nginx or Caddy with HTTPS in front of the Node server. Keep `server/server-config.json` outside version control and restrict access to the server environment.


## Telegram setup

Copy `server/server-config.example.json` to `server/server-config.json` and fill in `botToken` and `chatId`.

Use `npm run dev` during development. It starts both Vite and the Express API. `npm run client` starts only the frontend, so requests cannot be delivered.

The backend stays online when the private config is missing and returns a readable JSON error. The frontend also handles empty or non-JSON API responses safely.

## GitHub Pages preview

The project is ready for GitHub Pages.

1. Create a GitHub repository and push this project to the `main` branch.
2. Open `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Open the `Actions` tab and wait for `Deploy GitHub Pages` to finish.
5. The site will be available at `https://<username>.github.io/<repository>/`.

Every push to `main` automatically rebuilds and republishes the site.

GitHub Pages hosts only the frontend. The Telegram request backend does not run on GitHub Pages, so `/api/requests` will not work there. The production backend still needs Node.js hosting.

