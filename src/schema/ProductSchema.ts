import { ObjectId } from 'mongodb'

export interface ProductSchema {
  _id: ObjectId
  name: string
  txId?: string
  parentId?: ObjectId
}
