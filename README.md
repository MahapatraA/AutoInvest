# AutoInvest Backend

## Run

```bash
npm install
npm start
```

## Make the app work from any network

If your frontend only works on the same Wi-Fi, the frontend is usually calling a local backend URL instead of your deployed URL.

Use your Railway backend URL in the frontend environment config:

```env
API_BASE_URL=https://autoinvest-production.up.railway.app
```

For browser-based clients, configure CORS with your deployed frontend domains:

```env
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

Trailing slashes are accepted and normalized automatically, so both of these work:

```env
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
# or
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com/
```

If you use preview URLs that change often (for example Vercel previews), use wildcard patterns:

```env
CORS_ALLOWED_ORIGIN_PATTERNS=https://*.vercel.app,https://preview-*.yourdomain.com
```

`CORS_ALLOWED_ORIGIN_PATTERNS` supports `*` wildcards and is matched against the request origin.

For development, you can allow all origins:

```env
CORS_ALLOWED_ORIGINS=*
```

### Notes

- `HOST` falls back to `0.0.0.0` when it is unset or set to a loopback value (`localhost`, `127.0.0.1`, `::1`), so local server can accept connections from other devices.
- If MongoDB is temporarily unreachable, the API process now stays up and keeps retrying instead of exiting.
- `CORS_ALLOWED_ORIGINS` accepts a comma-separated list.
- Origins are normalized (parsed to URL origin, trailing slash removed, lowercased) before matching.
- `CORS_ALLOWED_ORIGIN_PATTERNS` accepts comma-separated wildcard patterns (for dynamic subdomains).
- CORS preflight now echoes requested headers automatically (falls back to `Content-Type, Authorization`).
- Non-browser clients (mobile native apps/Postman/curl) are accepted without an Origin header.
- On startup, the server logs LAN URLs (for example `http://192.168.1.10:3000`) when bound to `0.0.0.0`.
