import {
  createGoogleOAuthConfig,
  createHelpers,
  getRequiredEnv
} from '@deno/kv-oauth'
import { Status } from 'jsr:@oak/commons@1/status'
import { UserSchema } from '../../schema/UserSchema.ts'
import * as userRepository from '../user/userRepository.ts'
import * as authRepository from './authRepository.ts'

const _oauthConfig = createGoogleOAuthConfig({
  redirectUri: getRequiredEnv('GOOGLE_AUTH_REDIRECT_URL'),
  scope: [
    getRequiredEnv('GOOGLE_AUTH_SCOPE_PROFILE'),
    getRequiredEnv('GOOGLE_AUTH_SCOPE_EMAIL'),
    'openid',
  ],
})

const { signIn, signOut, getSessionId, handleCallback } = createHelpers(
  _oauthConfig,
)

const getGoogleUserInfo = async (accessToken: string): Promise<UserSchema> => {
  const googleapis = getRequiredEnv('GOOGLE_AUTH_USERINFO')
  const userInfoResponse = await fetch(googleapis + accessToken)
  const userInfo = await userInfoResponse.json()
  return userInfo
}

export const filter = async (
  request: Request,
): Promise<Response | undefined> => {
  switch (new URL(request.url).pathname) {
    case '/signin': {
      return await signIn(request)
    }
    case '/auth-callback': {
      try {
        const { response, tokens, sessionId } = await handleCallback(request)
        const userInfo = await getGoogleUserInfo(tokens.accessToken)
        await authRepository.storeUserSession(sessionId, userInfo)
        const userFromDb = await userRepository.getUserByEmail(userInfo.email)
        if (userFromDb === null) {
          await userRepository.saveUser(userInfo)
        }
        return response
      } catch {
        return new Response(null, { status: Status.InternalServerError })
      }
    }
    case '/signout': {
      await authRepository.removeUserInfo(await getSessionId(request) ?? "")
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

export const getUserInfo = async (request: Request): Promise<UserSchema | null> => {
  return authRepository.getUserInfo(await getSessionId(request) ?? '')
}
