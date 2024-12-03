import { Application, Status } from '@oak/oak'
import { filter } from './src/auth.ts'
import { router } from './src/router.ts'

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

Deno.serve({ port: 1337 }, async (req) => {
  let response = await filter(req)
  if (response !== undefined) return response

  response = await app.handle(req)
  if (response !== undefined) return response

  return new Response(null, { status: Status.NotFound })
})
