import { Application, Status } from '@oak/oak'
import { filter } from './src/modules/auth/authService.ts'
import { router } from './router.ts'
import { contentType } from 'jsr:@std/media-types@1/content-type'

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())
app.use((context) => {
  context.response.type = contentType('.html')
  context.response.status = 404
  context.response.body = '<h1>404, Page not found!</h1>'
})

Deno.serve({ port: 1337 }, async (req) => {
  try {
    let response = await filter(req)
    if (response !== undefined) return response

    response = await app.handle(req)
    if (response !== undefined) return response

    return new Response(null, { status: Status.NotFound })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error), {
      status: Status.InternalServerError,
    })
  }
})
