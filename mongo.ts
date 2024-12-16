import { MongoClient } from 'mongodb'
import { getRequiredEnv } from '@deno/kv-oauth'

export const client = new MongoClient(getRequiredEnv('MONGO_URL'))

export const connectToDb = () => {
  return client.db(getRequiredEnv('MONGO_DB_NAME'))
}

export const withTransaction = async <T>(func: () => Promise<T>): Promise<T | null> => {
  const session = client.startSession()
  try {
    session.startTransaction()
    const result = await func()
    await session.commitTransaction()
    return result
  } catch (error) {
    console.error(error)
    session.abortTransaction()
    return null
  } finally {
    await session.endSession()
  }
}
