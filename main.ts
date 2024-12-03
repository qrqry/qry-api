import { Application, Status } from '@oak/oak'
import { filter } from './src/auth.ts'
import { router } from './src/router.ts'

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())
app.use((context) => {
  context.response.type = 'text/html; charset=utf-8'
  context.response.status = 404
  context.response.body = '<h1>404, Page not found!</h1>'
})

Deno.serve({ port: 1337 }, async (req) => {
  let response = await filter(req)
  if (response !== undefined) return response

  response = await app.handle(req)
  if (response !== undefined) return response

  return new Response(null, { status: Status.NotFound })
})
