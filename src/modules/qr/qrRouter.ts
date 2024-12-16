import { Router } from '@oak/oak'
import { adjustNullable } from '../../../router.ts'
import { contentType } from 'jsr:@std/media-types@1/content-type'
import { generateQr } from './qrService.ts'

export const qrRouter = new Router()

qrRouter.get('/:id', async (context) => {
  const qr = await generateQr(context.params.id)
  context.response.type = contentType('.svg')
  context.response.body = qr
  adjustNullable(context, qr)
})
