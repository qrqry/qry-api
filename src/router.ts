import { Router } from '@oak/oak'

export const router = new Router()

router.get('/', (context) => {
  context.response.body = 'Hello from QRY-API!'
})
