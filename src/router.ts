import { Context, Router } from '@oak/oak'
import * as service from './service.ts'
import { Status } from 'jsr:@oak/commons@1/status'

export const router = new Router()

router.get('/', (context) => {
  context.response.body = 'Hello from QRY-API!'
})

router.get('/product/:id', async (context) => {
  const product = await service.getProduct(context.params.id)
  context.response.body = product
  adjustNullable(context, product)
})

router.get('/qr/generate/:id', async (context) => {
  const qr = await service.generateQr(context.params.id)
  context.response.type = 'image/svg+xml'
  adjustNullable(context, qr)
})

const adjustNullable = (context: Context, body: unknown): void => {
  if (body === null) {
    context.response.status = Status.NotFound
  }
}
