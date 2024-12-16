import { connectToDb, withTransaction } from '../../../mongo.ts'
import { ObjectId, OptionalId } from 'mongodb'
import { ProductSchema } from '../../schema/ProductSchema.ts'

const COLLECTION_NAME = 'products'
const _mongo = connectToDb()

export const getProduct = async (
  id: string,
): Promise<ProductSchema | null> => {
  const db = _mongo
  const document = await db.collection<ProductSchema>(COLLECTION_NAME).findOne({
    _id: toObjectId(id),
  })
  return document ?? null
}

export const getProducts = async (
  parentId: string,
): Promise<ProductSchema[]> => {
  const db = _mongo
  return await db.collection<ProductSchema>(COLLECTION_NAME).find({
    parentId: toObjectId(parentId),
  }).toArray()
}

export const saveProduct = async (
  product: ProductSchema,
): Promise<string | null> => {
  if (product._id !== undefined) {
    throw Error(
      `Product with existing id ${product._id.toString()} can't be saved.`,
    )
  }
  return await withTransaction(async () => {
    const db = _mongo
    const insertResult = await db.collection<OptionalId<ProductSchema>>(
      COLLECTION_NAME,
    ).insertOne(product)
    return insertResult.insertedId?.toString() ?? null
  })
}

const toObjectId = (id: string): ObjectId => {
  if (!ObjectId.isValid(id)) {
    throw Error(`Invalid id format: ${id}`)
  }
  return new ObjectId(id)
}
