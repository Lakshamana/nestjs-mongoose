import { Types } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId
  email: string
  favoriteFoods: string[]
  deletedAt: Date
  createdAt?: Date
  updatedAt?: Date
}
