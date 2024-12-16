import { Context, Router, Status } from '@oak/oak'
import * as service from './productService.ts'
import { adjustNullable } from '../../../router.ts'
import { contentType } from 'jsr:@std/media-types@1/content-type'
import { ProductSchema } from '../../schema/ProductSchema.ts'

export const productRouter = new Router()

productRouter.get('/:id', async (context) => {
  const product = await service.getProduct(context.params.id)
  context.response.body = product
  adjustNullable(context, product)
})

productRouter.get('/:parentId/children', async (context) => {
  const children = await service.getProducts(context.params.parentId)
  context.response.body = children
})

productRouter.post(
  '/save',
  async <P extends ProductSchema>(context: Context) => {
    if (!context.request.hasBody) {
      context.response.status = Status.BadRequest
      context.response.body = {
        success: false,
        message: 'No data',
      }
      return
    }
    const body: P = await context.request.body.json()
    const id = await service.saveProduct(body)
    context.response.body = {
      success: true,
      id,
    }
    context.response.status = Status.Created
    context.response.type = contentType('.json')
  },
)
