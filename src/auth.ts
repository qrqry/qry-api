import { createGoogleOAuthConfig, createHelpers } from '@deno/kv-oauth'
import { Status } from 'jsr:@oak/commons@1/status'

const _oauthConfig = createGoogleOAuthConfig({
  redirectUri: Deno.env.get('GOOGLE_AUTH_REDIRECT_URL') ??
    'http://localhost:1337/auth-callback',
  scope: Deno.env.get('GOOGLE_AUTH_SCOPE') ??
    'https://www.googleapis.com/auth/userinfo.profile',
})

const { signIn, signOut, getSessionId, handleCallback } = createHelpers(
  _oauthConfig,
)

export const filter = async (
  request: Request,
): Promise<Response | undefined> => {
  if (request.method !== 'GET') {
    return new Response(null, { status: Status.NotFound })
  }

  switch (new URL(request.url).pathname) {
    case '/signin': {
      return await signIn(request)
    }
    case '/auth-callback': {
      try {
        const { response } = await handleCallback(request)
        return response
      } catch {
        return new Response(null, { status: Status.InternalServerError })
      }
    }
    case '/signout': {
      return await signOut(request)
    }
    default: {
      const sessionId = await getSessionId(request)
      if (sessionId === undefined) {
        return new Response(null, { status: Status.Unauthorized })
      }
    }
  }
}
