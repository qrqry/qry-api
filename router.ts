import { Context, Router } from '@oak/oak'
import { Status } from 'jsr:@oak/commons@1/status'
import { productRouter } from './src/modules/product/productRouter.ts'
import { qrRouter } from './src/modules/qr/qrRouter.ts'
import { userRouter } from './src/modules/user/userRouter.ts'

export const router = new Router()

router.get('/', (context) => {
  context.response.body = 'Hello from QRY-API!'
})
router.use('/product', productRouter.routes())
router.use('/qr', qrRouter.routes())
router.use('/user', userRouter.routes())

export const adjustNullable = (context: Context, body: unknown): void => {
  if (body === null) {
    context.response.status = Status.NotFound
  }
}
