import { UserSchema } from '../../schema/UserSchema.ts'
import { connectToDb, withTransaction } from '../../../mongo.ts'
import { OptionalId } from 'mongodb'

const _mongo = connectToDb()
const COLLECTION_NAME = 'users'

export const saveUser = async (user: UserSchema): Promise<string | null> => {
  return await withTransaction(async () => {
    const db = _mongo
    const insertResult = await db.collection<OptionalId<UserSchema>>(
      COLLECTION_NAME,
    ).insertOne(user)
    return insertResult.insertedId?.toString() ?? null
  })
}

export const getUserByEmail = async (
  email: string,
): Promise<UserSchema | null> => {
  const db = _mongo
  return await db.collection<UserSchema>(COLLECTION_NAME).findOne({
    email: email,
  })
}
