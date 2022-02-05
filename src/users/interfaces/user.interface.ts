import { Types } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId
  email: string
  favoriteFoods: string[]
  deleted_at: Date
  createdAt?: Date
  updatedAt?: Date
}
