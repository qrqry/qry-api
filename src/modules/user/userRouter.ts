import { Router } from '@oak/oak'
import { adjustNullable } from '../../../router.ts'
import { getUserInfo } from '../auth/authService.ts'

export const userRouter = new Router()

userRouter.get('/', async (context) => {
  const request = new Request(context.request.url.toString(), {
    method: context.request.method,
    headers: new Headers(context.request.headers),
  })
  const user = await getUserInfo(request)
  adjustNullable(context, user)
  if (user === null) return

  const { email, name, picture } = user
  context.response.body = { email, name, picture }
})
