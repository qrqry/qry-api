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
2. GET /:parentId/children - get all product children (example: get all items from container)
3. POST /save - save product 

### QR (/qr)
1. GET /:id - get qr by id (?)
