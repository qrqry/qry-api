import { Document, ObjectId } from 'mongodb'

export interface ProductSchema extends Document {
  _id: ObjectId
  name: string
  txId?: string
  parentId?: ObjectId
}
