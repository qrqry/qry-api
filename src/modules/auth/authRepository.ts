import { UserSchema } from '../../schema/UserSchema.ts'

export type KVResponse = { ok: boolean }

export const storeUserSession = async (
  sessionId: string,
  userInfo: UserSchema,
): Promise<KVResponse> => {
  const kv = await Deno.openKv()

  const entry = await kv.get([sessionId])
  return kv.atomic()
    .check(entry)
    .set([sessionId], userInfo)
    .commit()
}

export const getUserInfo = async (
  sessionId: string,
): Promise<UserSchema | null> => {
  const kv = await Deno.openKv()
  const entry = await kv.get<UserSchema>([sessionId])
  return entry.value
}

export const removeUserInfo = async (
  sessionId: string,
): Promise<KVResponse> => {
  const kv = await Deno.openKv()

  const entry = await kv.get([sessionId])
  return kv.atomic()
    .check(entry)
    .delete([sessionId])
    .commit()
}
