# QRQRY API app

API application for qrqry.

## Endpoints

### Authorization (Google)

1. /signin
2. /signout
3. /auth-callback

### User (/user)

1. GET / - get user information based on session id

### Product (/product)

1. GET /:id - get product by id
2. GET /:parentId/children - get all product children (example: get all items
   from container)
3. POST /save - save product

### QR (/qr)

1. GET /:id - get qr by id (?)

## Run app

1. Set environment variables (.env file is acceptable for local run only):
   - GOOGLE_AUTH_REDIRECT_URL
   - GOOGLE_AUTH_SCOPE_PROFILE
   - GOOGLE_AUTH_SCOPE_EMAIL
   - GOOGLE_AUTH_USERINFO
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - ARWEAVE_KEY
   - ARWEAVE_HOST
   - ARWEAVE_PORT
   - ARWEAVE_PROTOCOL
   - MONGO_USERNAME
   - MONGO_PASSWORD
   - MONGO_URL
   - MONGO_DB_NAME
2. Install Deno
3. Install required deps: `deno install`
4. Run app:
   1. Locally: `deno task dev`
   2. In prod: `deno task start`
