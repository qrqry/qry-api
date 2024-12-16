import { ObjectId } from 'mongodb'

export interface UserSchema {
  _id: ObjectId
  email: string
  name: string
  picture: string
}
