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

For development, you can allow all origins:

```env
CORS_ALLOWED_ORIGINS=*
```

### Notes

- `HOST` defaults to `0.0.0.0`, so local server can accept connections from other devices.
- `CORS_ALLOWED_ORIGINS` accepts a comma-separated list.
- Origins are normalized (trimmed, trailing slash removed, lowercased) before matching.
- Non-browser clients (mobile native apps/Postman/curl) are accepted without an Origin header.
